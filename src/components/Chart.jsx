import ReactECharts from 'echarts-for-react';
import React from 'react';

function Chart({ data, onBarClick }) {
    if (!data || data.length === 0) {
        return (<></>)
    }

    let option = {
        textStyle: {
            color: '#94a3b8',
            fontFamily: 'Inter, sans-serif',
        },
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
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 14
            },
            axisPointer: {
                type: 'shadow'
            },
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
                color: '#334155',
                emphasis: {
                    itemStyle: {
                        shadowColor: '#404040'
                    }
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
