import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { setCurrentCovidData, setSelectedState } from '../redux/covidSlice';
import { Table, Select } from 'antd';
import type { TableColumnsType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
    id: React.Key;
    state: string;
    activeCases: number;
    totalCases: number;
    recovered: number;
    deaths: number;
}

const StateFilter: React.FC = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const { data, currentData } = useSelector((state: RootState) => state.covid);
    const states = [{ value: 'All States', label: 'All States' }, ...data.map(({ state }) => ({ label: state, value: state }))];

    // Handler for choosing a state
    const handleSelectState = (value: string) => {
        setPage(1)
        if (value === 'All States') {
            dispatch(setCurrentCovidData(data))
        } else {
            dispatch(setSelectedState(value))
            dispatch(setCurrentCovidData(data.filter(({ state }) => state === value)))
        }
    }

    // Table column data
    const columns: TableColumnsType<DataType> = [
        {
            title: 'No.',
            key: 'id',
            dataIndex: 'id',
            width: 70,
            align: 'center',
            render: (_, __, index: number) => (page - 1) * 10 + 1 + index
        },
        {
            title: 'State',
            key: 'state',
            dataIndex: 'state',
            showSorterTooltip: { target: 'full-header' },
            sorter: (a, b) => a.state.length - b.state.length,
            width: 250,
        },
        {
            title: 'Total Cases',
            key: 'totalCases',
            dataIndex: 'totalCases',
            sorter: (a, b) => a.totalCases - b.totalCases,
            align: 'end'
        },
        {
            title: 'Active Cases',
            key: 'activeCases',
            dataIndex: 'activeCases',
            sorter: (a, b) => a.activeCases - b.activeCases,
            align: 'end'
        },
        {
            title: 'Recovered Cases',
            key: 'recovered',
            dataIndex: 'recovered',
            sorter: (a, b) => a.recovered - b.recovered,
            align: 'end'
        },
        {
            title: 'Deaths',
            key: 'deaths',
            dataIndex: 'deaths',
            sorter: (a, b) => a.deaths - b.deaths,
            align: 'end'
        },
    ];


    return (
        <div className="w-full mb-6">
            <div className='w-100 m-auto flex items-center gap-2'>
                <label className='text-nowrap'>Choose State:</label>
                <Select
                    showSearch
                    className='w-full'
                    defaultValue={"All States"}
                    placeholder="Select State"
                    optionFilterProp="label"
                    onChange={handleSelectState}
                    options={states}
                    suffixIcon={<SearchOutlined />}
                />

            </div>
            <div className='mt-8 overflow-x-scroll shadow-xl no-scrollbar'>
                <Table<DataType>
                    bordered
                    rowKey="id"
                    tableLayout="auto"
                    size="middle"
                    columns={columns}
                    dataSource={currentData}
                    showSorterTooltip={{ target: 'sorter-icon' }}
                    pagination={{
                        current: page,
                        onChange: (pageNumber) => setPage(pageNumber),
                    }}
                />

            </div>
        </div>
    );
};

export default StateFilter;