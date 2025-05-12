import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

function LineChart({ historicalData }) {
    const [data, setData] = useState([["Date", "Price"]]);

    useEffect(() => {
        if (!historicalData?.prices) return;

        const formattedData = [["Date", "Price"]];
        historicalData.prices.forEach(([timestamp, price]) => {
            const date = new Date(timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            });
            formattedData.push([date, price]);
        });

        setData(formattedData);
    }, [historicalData]);

    if (!historicalData?.prices) return <p>Loading chart...</p>;

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={{
                title: 'Price History (Last 10 Days)',
                hAxis: { title: 'Date' },
                vAxis: { title: 'Price' },
                legend: 'none',
                curveType: 'function',
            }}
        />
    );
}

export default LineChart;
