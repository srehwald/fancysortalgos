import React from "react";
import { Chart } from "chart.js";
import * as _ from "lodash";
import { Algorithm, BubbleSort, Mergesort } from "../models";

interface IDiagramProps {
    size: number;
}

interface IDiagramState {
    data: number[];
    chart: Chart | undefined;
    algorithm: Algorithm;
}

export class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    private _chartRef: any = React.createRef();
    private _algorithms: Algorithm[];

    constructor(props: IDiagramProps) {
        super(props);
        this._algorithms = [new Mergesort(), new BubbleSort()];

        // TODO shuffle again if already ordered
        this.state = { data: _.shuffle(_.range(1, this.props.size + 1)), chart: undefined, algorithm: this._algorithms[0]};
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
                }
            }
        });

        this.setState(() => ({
            chart: chart
        }));
    }

    shuffle() {
        this.setState((state) => ({
            data: _.shuffle(state.data)
        }), () => {
            this.state.chart!.data.datasets![0].data = this.state.data;
            this.state.chart!.data.labels = this.state.data.map(x => x.toString());
            this.state.chart!.update();
        });

    }

    selectAlgorithm(event: any) {
        this.setState({algorithm: this._algorithms[event.target.value]});
    }

    sort() {
        this.state.algorithm.sort(this.state.chart!.data.datasets![0].data as number[],
            (data) => this.update(data));
    }

    update(data: number[]) {
        this.state.chart!.data.datasets![0].data = data;
        this.state.chart!.data.labels = data.map(x => x.toString());
        this.state.chart!.update();
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <canvas ref={this._chartRef} />
                <button onClick={() => this.shuffle()}>
                    Shuffle
                </button>
                <select onChange={(event: any) => this.selectAlgorithm(event)}>
                    {this._algorithms.map((val, index) => <option value={index}>{val.constructor.name}</option>)}
                </select>
                <button onClick={() => this.sort()}>Sort</button>
            </div>
        );
    }
}