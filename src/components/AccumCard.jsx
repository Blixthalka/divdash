import ReactECharts from 'echarts-for-react';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import { sortFirstDateFirst } from '../utils/util';
import { graphic } from 'echarts';
import { demoDividends } from '../utils/demo';

function AccumCard({ className, demo }) {
    const { dividends } = useContext(AppContext)

    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
    }

    const accum = divsToUse
        .sort(sortFirstDateFirst)
        .reduce((acc, val) => {
            if (acc.length === 0) {
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
            color: '#595F6B',
            fontFamily: 'Inter, sans-serif',
        },
        backgroundColor: '#101418',
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
            },
            splitLine: {
                lineStyle: {
                    color: '#1D232B'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#1D232B'
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 14,
                color: '#fff'
            },
            axisPointer: {
                type: 'line'
            },
            backgroundColor: '#101418',
            borderColor: '#1D232B',
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
                color: '#179BF5',
                showSymbol: false,
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#14222F'
                        },
                        {
                            offset: 1,
                            color: '#111519'
                        }])
                },

            }
        ]
    };


    return (
        <Card title={'Accumulated Dividends'} className={`${className}`} screenshot={true}>
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
