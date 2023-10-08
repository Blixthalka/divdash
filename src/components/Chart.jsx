import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import React from 'react';

function Chart({ data, onBarClick }) {
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

                args.forEach(({ marker, value }) => {
                    value = value || [0, 0];
                    tooltip += `<p>${marker} <strong>${value} kr</strong></p>`;
                });

                return tooltip;
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
                        { offset: 1, color: '#1D6DAC' }
                    ]),

                    borderRadius: [3, 3, 0, 0],

                },
                emphasis: {


                },

            }
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
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            onEvents={onEvents}
        />
    );
}

export default Chart;
