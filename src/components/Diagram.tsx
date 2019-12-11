import React from "react";
import { Chart } from "chart.js";
import * as _ from "lodash";
import { Algorithm, BubbleSort, MergeSort, Bogosort, InsertionSort, Util } from "../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faRandom, faStop, faStepBackward, faStepForward, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

interface IDiagramProps {
    size: number;
}

interface IDiagramState {
    data: number[];
    chart: Chart | undefined;
    algorithm: Algorithm;

    index: number;
    steps: number[][];
    isPaused: boolean;
    isStopped: boolean;
}

export class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    private _chartRef: any = React.createRef();
    private _algorithms: Algorithm[];

    constructor(props: IDiagramProps) {
        super(props);
        this._algorithms = [new MergeSort(), new BubbleSort(), new InsertionSort(), new Bogosort()];

        // TODO shuffle again if already ordered
        this.state = { data: _.shuffle(_.range(1, this.props.size + 1)), chart: undefined,
            algorithm: this._algorithms[0], steps: [], index: 0, isPaused: false, isStopped: true};
    }

    componentDidMount() {
        document.addEventListener("keydown", event => this.handleArrowKey(event));
        const chartRef = this._chartRef.current.getContext("2d");

        const chart = new Chart(chartRef, {
            type: "bar",
            data: {
                labels: this.state.data.map(x => x.toString()),
                datasets: [
                    {
                        label: "Data",
                        data: this.state.data,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                },
                animation: {
                    duration: 0
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        });

        this.setState(() => ({
            chart: chart
        }));
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", event => this.handleArrowKey(event));
      }

    shuffle() {
        this.setState((state) => ({
            // shuffle data
            data: _.shuffle(state.data)
        }), () => {
            // update chart
            this.state.chart!.data.datasets![0].data = this.state.data;
            this.state.chart!.data.labels = this.state.data.map(x => x.toString());
            this.state.chart!.update();
        });

    }

    selectAlgorithm(event: any) {
        // update the currently selected algorithm
        this.setState({algorithm: this._algorithms[event.target.value]}, () => this.stopSort());
    }

    startSort() {
        let steps = this.state.algorithm.sort(this.state.chart!.data.datasets![0].data as number[]);
        this.setState({steps: steps, index: 0, isStopped: false}, () => {
            this.continueSort();
        });
    }

    continueSort() {
        this.setState({isPaused: false, isStopped: false},
            async () => {
                // TODO possibly warning if max integer reached?
                for (let i = this.state.index; i < Number.MAX_SAFE_INTEGER && i < this.state.steps.length; i++) {
                    if (this.state.isPaused) {
                        // save current index so that we can step through
                        this.setState({index: i});
                        return;
                    } else if (this.state.isStopped) {
                        return;
                    }

                    // get current step
                    const step = this.state.steps[i];
                    // update diagram with current data
                    this.update(step);
                    // delay
                    await Util.sleep(10);

                    if (i === this.state.steps.length - 1 && !Util.isSorted(step)) {
                        /*
                        algorithms like Bogosort do not guarantee to sort data. Hence, even after running them for
                        many iterations, it might be that we still did not reach a sorted state. To make sure that they
                        can basically run forever, we compute some additional sorting steps.
                        */
                        const additionalSteps = this.state.algorithm.sort(step);
                        return this.setState({steps: this.state.steps.concat(additionalSteps)}, () => this.continueSort());
                    }
                }

                this.setState({isPaused: false, isStopped: true});
            });
    }

    pauseSort() {
        this.setState({isPaused: true});
    }

    stopSort() {
        this.setState({isStopped: true, steps: [], index: 0}, () => this.shuffle());
    }

    nextStep() {
        // TODO max
        this.setState({index: this.state.index + 1}, () => this.update(this.state.steps[this.state.index]));
    }

    prevStep() {
        // TODO min
        this.setState({index: this.state.index - 1}, () => this.update(this.state.steps[this.state.index]));
    }

    update(data: number[]) {
        // update chart
        this.state.chart!.data.datasets![0].data = data;
        this.state.chart!.data.labels = data.map(x => x.toString());
        this.state.chart!.update();
        this.forceUpdate();
    }

    handleArrowKey(event: any) {
        if (this.state.isPaused) {
            if (event.keyCode === 37) {
                this.prevStep();
            } else if (event.keyCode === 39) {
                this.nextStep();
            }
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this._chartRef} />
                <div className="field has-addons has-addons-centered">
                    <div className="control has-icons-left">
                        <div className="select">
                            <select onChange={event => this.selectAlgorithm(event)}>
                                {/* the value property of each option is set to the index of the algorithm in the array */}
                                {this._algorithms.map((val: Algorithm, index: number) =>
                                    <option key={index} value={index}>{val.name}</option>)}
                            </select>
                            <span className="icon is-left">
                                <FontAwesomeIcon icon={faCogs} />
                            </span>
                        </div>
                    </div>
                    <div className="control">
                        {(() => {
                            if (this.state.isStopped) {
                                return (
                                    <button className="button" onClick={() => this.startSort()}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </button>
                                );
                            } else if (this.state.isPaused) {
                                return (
                                    <button className="button" onClick={() => this.continueSort()}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </button>
                                );
                            } 
                            else {
                                return (
                                    <button className="button" onClick={() => this.pauseSort()}>
                                        <FontAwesomeIcon icon={faPause} />
                                    </button>
                                );
                            }
                        })()}
                    </div>
                    <div className="control">
                        {(() =>{
                            if (this.state.isStopped) {
                                return (
                                    <button className="button" onClick={() => this.shuffle()}>
                                        <FontAwesomeIcon icon={faRandom} />
                                    </button>
                                );
                            } else {
                                return (
                                    <button className="button" onClick={() => this.stopSort()}>
                                        <FontAwesomeIcon icon={faStop} />
                                    </button>
                                );
                            }
                        })()}
                    </div>
                    <div className="control">
                        <button className="button" onClick={() => this.prevStep()} disabled={!this.state.isPaused}>
                            <FontAwesomeIcon icon={faStepBackward} />
                        </button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={() => this.nextStep()} disabled={!this.state.isPaused}>
                            <FontAwesomeIcon icon={faStepForward} />
                        </button>
                    </div>
                </div>
                {/* TODO hint for using arrow keys */}
            </div>
        );
    }
}