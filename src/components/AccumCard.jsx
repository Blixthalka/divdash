import ReactECharts from 'echarts-for-react';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import { sortFirstDateFirst } from '../utils/util';

function AccumCard({ className }) {
    const { dividends } = useContext(AppContext)



    const accum = dividends
        .sort(sortFirstDateFirst)
        .reduce((acc, val) => {
            if (acc.length == 0) {
                return [
                    {
                        date: val.date,
                        amount: val.amount
                    }
                ]
            }

            if (acc[acc.length - 1].date.calendar() === val.date.calendar()) {
                acc[acc.length - 1].amount = acc[acc.length - 1].amount + val.amount
                return acc;
            }


            acc.push(
                {
                    date: val.date,
                    amount: val.amount + acc[acc.length - 1].amount
                }
            )
            return acc
        }, [])

    if (!accum || accum.length <= 1) {
        return (<></>)
    }


    let option = {
        textStyle: {
            color: '#94a3b8',
            fontFamily: 'Inter, sans-serif',
        },
        xAxis: {
            type: 'time',

            axisLabel: {
                fontSize: 14,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 14
            },
            axisPointer: {
                type: 'line'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '10%',
            containLabel: true
        },
        series: [
            {
                data: accum?.map(d => [d.date.format("yyyy-MM-DD"), d.amount]),
                type: 'line',
                color: '#334155',
                showSymbol: false,

            }
        ]
    };


    return (
        <Card title={'Accumulated'} className={`${className}`}>
            {accum &&
                <ReactECharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />}
        </Card>

    );
}

export default AccumCard;
