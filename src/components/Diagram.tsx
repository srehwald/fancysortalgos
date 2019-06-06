import React from "react";
import { Chart } from "chart.js";
import * as _ from "lodash";
import { Algorithm, BubbleSort, MergeSort, Bogosort, InsertionSort } from "../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faRandom, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";

interface IDiagramProps {
    size: number;
}

interface IDiagramState {
    data: number[];
    chart: Chart | undefined;
    algorithm: Algorithm;

    isSorting: boolean;
}

export class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    private _chartRef: any = React.createRef();
    private _algorithms: Algorithm[];

    constructor(props: IDiagramProps) {
        super(props);
        this._algorithms = [new MergeSort(), new BubbleSort(), new InsertionSort(), new Bogosort()];

        // TODO shuffle again if already ordered
        this.state = { data: _.shuffle(_.range(1, this.props.size + 1)), chart: undefined,
            algorithm: this._algorithms[0], isSorting: false};
    }

    componentDidMount() {
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
                    duration: 100
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
        this.setState({algorithm: this._algorithms[event.target.value]});
    }

    sort() {
        this.setState({isSorting: true},
            () => {
                // sort the chart data using the currently selected algorithm
                this.state.algorithm.sort(this.state.chart!.data.datasets![0].data as number[],
                    (data) => this.update(data))
                    .then(() => {
                        this.setState({isSorting: false});
                    }, () => {
                        this.setState({isSorting: false});
                    });
            });
    }

    update(data: number[]) {
        // update chart
        this.state.chart!.data.datasets![0].data = data;
        this.state.chart!.data.labels = data.map(x => x.toString());
        this.state.chart!.update();
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <canvas ref={this._chartRef} />
                <div className="field has-addons has-addons-centered">
                    <div className="control has-icons-left">
                        <div className="select">
                            <select onChange={(event: any) => this.selectAlgorithm(event)} disabled={this.state.isSorting}>
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
                        <button className="button" onClick={() => this.sort()} disabled={this.state.isSorting}>
                            <FontAwesomeIcon icon={faSortAmountUp} />&nbsp;Sort
                        </button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={() => this.shuffle()} disabled={this.state.isSorting}>
                            <FontAwesomeIcon icon={faRandom} />&nbsp;Shuffle
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}