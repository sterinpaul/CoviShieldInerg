import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const PieChart: React.FC = () => {
    const { currentData } = useSelector((state: RootState) => state.covid);

    const totalStats = currentData.reduce(
        (acc, curr) => ({
            active: acc.active + curr.activeCases,
            recovered: acc.recovered + curr.recovered,
            deaths: acc.deaths + curr.deaths,
        }),
        { active: 0, recovered: 0, deaths: 0 }
    );

    const pieData = [
        {
            values: [totalStats.active, totalStats.recovered, totalStats.deaths],
            labels: ['Active Cases', 'Recovered', 'Deaths'],
            type: 'pie' as const,
            marker: {
                colors: ['#FFA500', '#4CAF50', '#FF0000'],
            },
        },
    ];

    return (
        <Plot
            data={pieData}
            layout={{
                title: 'COVID-19 Statistics Distribution',
                height: 400,
                width: 500,
                margin: { t: 40, b: 40, l: 40, r: 40 },
            }}
            config={{ responsive: true }}
        />
    );
};

export default PieChart;