import React from "react";
import { Chart } from "chart.js";
import * as _ from "lodash";

interface IDiagramProps {
    size: number;
}

interface IDiagramState {
    data: number[];
    chart: Chart | undefined;
}

export class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    private _chartRef: any = React.createRef();

    constructor(props: IDiagramProps) {
        super(props);

        // TODO shuffle again if already ordered
        this.state = { data: _.shuffle(_.range(1, this.props.size + 1)), chart: undefined};
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

    render() {
        return (
            <div>
                <canvas ref={this._chartRef} />
                <button onClick={() => this.shuffle()}>
                    Shuffle
                </button>
            </div>
        );
    }
}