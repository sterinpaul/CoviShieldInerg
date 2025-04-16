import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const TimeSeriesChart: React.FC = () => {
    const { currentData, selectedState } = useSelector((state: RootState) => state.covid);

    const traces = [
        {
            name: 'Total Cases',
            y: currentData.map(d => d.totalCases),
            x: currentData.map(d => d.state),
            type: 'scatter' as const,
            mode: 'lines+markers' as const,
            line: { color: '#2196F3' },
        },
        {
            name: 'Active Cases',
            y: currentData.map(d => d.activeCases),
            x: currentData.map(d => d.state),
            type: 'scatter' as const,
            mode: 'lines+markers' as const,
            line: { color: '#FFA500' },
        },
        {
            name: 'Recovered',
            y: currentData.map(d => d.recovered),
            x: currentData.map(d => d.state),
            type: 'scatter' as const,
            mode: 'lines+markers' as const,
            line: { color: '#4CAF50' },
        },
        {
            name: 'Deaths',
            y: currentData.map(d => d.deaths),
            x: currentData.map(d => d.state),
            type: 'scatter' as const,
            mode: 'lines+markers' as const,
            line: { color: '#FF0000' },
        },
    ];

    return (
        <Plot
            data={traces}
            layout={{
                title: 'COVID-19 Statistics Trends',
                height: 400,
                width: selectedState === "All States" ? 800 : 500,
                margin: { t: 10, b: 70, l: 30, r: 10 },
                xaxis: { title: 'States' },
                yaxis: { title: 'Number of Cases' },
            }}
            config={{ responsive: true }}
        />
    );
};

export default TimeSeriesChart;