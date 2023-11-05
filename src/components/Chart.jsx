import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React, { useContext } from 'react';
import { formatNumberNoFractions } from '../utils/util';
import { ChartContext } from './Card';

function Chart({ data, goals, dataName, compare, compareName, onBarClick }) {
    const { isIcognito } = useContext(ChartContext)
    if (!data || data.length === 0) {
        return (<></>)
    }

    let option = {
        textStyle: {
            color: '#595F6B',
            fontFamily: 'Inter, sans-serif',
        },
        backgroundColor: '#101418',
        xAxis: {
            type: 'category',
            data: data.map(d => d.label),
            axisLabel: {
                fontSize: 14,
                rotate: data.length > 12 ? 70 : 0,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
                show: !isIcognito,
                formatter: function (value, i) {
                    return formatNumberNoFractions(value)
                }
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
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(0, 0, 0, 0.1)',
                }
            },
            backgroundColor: '#101418',
            borderColor: '#1D232B',
            formatter: (args) => {
                let tooltip = `<p>${args[0].name}</p> `;
                tooltip += " <table>"
                args.forEach(({ marker, value, seriesName }) => {
                    value = value || 0;
                    tooltip += `<tr><td>${marker} <span>${seriesName.includes("series") ? "" : seriesName}<span></td> <td style="text-align: right; padding-left: 15px;"><strong >${formatNumberNoFractions(value)} kr</strong></td></tr>`;
                });

                return tooltip += "</table>";
            },
            rich: {
                yearStyle: {
                    // Make yearly text more standing out
                    color: '#000',
                    fontWeight: 'bold'
                },
                monthStyle: {
                    color: '#999'
                }
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
            goals && {
                type: 'line',
                color: 'white',
                name: "Goals",
                data: goals
            },
            compare && {
                name: compareName,
                data: compare.map(d => {
                    return {
                        name: d?.name,
                        value: d.value,
                        id: d?.id
                    }
                }),
                type: 'bar',
                itemStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#fb923c' },
                        { offset: 1, color: '#8A4D1A' }
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
            },
            {
                name: dataName,
                data: data.map(d => {
                    return {
                        name: d?.name,
                        value: d.value,
                        id: d?.id
                    }
                }),
                type: 'bar',
                itemStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#179BF5' },
                        { offset: 1, color: '#0E568E' }
                    ]),
                    borderRadius: [3, 3, 0, 0],
                },
            },
        ],
        stateAnimation: {
            duration: 2000
        }
    };

    let onEvents = {};
    if (onBarClick) {
        onEvents = {
            'click': onBarClick,
        }
    }


    return (
        <div className=''>
            {(compare || goals) && <div className='flex items-center space-x-5 text-white text-sm'>
                {compare && (<span className='flex space-x-2 items-center'>
                    <p className='w-3 h-3 bg-orange-400 rounded-full' />
                    <span className=''>{compareName}</span>
                </span>)}
                <span className='flex space-x-2 items-center'>
                    <p className='w-3 h-3 bg-[#179BF5] rounded-full' />
                    <span className=''>{dataName}</span>
                </span>
                {goals && (<span className='flex space-x-2 items-center'>
                    <p className='w-3 h-3 bg-white rounded-full' />
                    <span className=''>{"Goals"}</span>
                </span>)}

            </div>}
            <ReactECharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                onEvents={onEvents}
            />
        </div>
    );
}

export default Chart;
