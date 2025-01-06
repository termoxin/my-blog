import React from "react";
import { Chart } from "react-charts";

import ResizableBox from "./ResizableBox";

export const KmAndWhChart = ({ data, chargeKm }) => {
    const primaryAxis = React.useMemo(
        () => ({
            getValue: (datum) => datum.x,
            scaleType: "linear",
            formatters: {
                scale: (value) => `${value} km`,
            },
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: (datum) => datum.y,
                scaleType: "linear",
                formatters: {
                    scale: (value) => `${value} W`,
                },
                stacked: true,
            },
        ],
        []
    );


    const chartData = [
        {
            label: "Km and Wh",
            data: data.map(({ x, y }) => ({ x, y })),
        },
    ];

    return (
        <ResizableBox width={800}>
            <Chart
                options={{
                    tooltip: false,
                    data: chartData,
                    primaryAxis,
                    secondaryAxes,
                    getDatumStyle: (data) => {
                        return {
                            circle: {
                                r: 5,
                                fill: data.originalDatum.x > +chargeKm ? 'red' : 'lightgreen'
                            }
                        }
                    },
                    getSeriesStyle: ({ label }) => {
                        return { color: 'orange' }
                    }
                }}
            />
        </ResizableBox>
    );
}
