import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';
import { first_date, last_date } from '../utils/util';
import ButtonIcon from './ButtonIcon';
import { AppContext } from '../App';
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];



function DividendMonthCard({ year, className }) {
    const { dividends } = useContext(AppContext)
    const [yearData, setYearData] = useState(undefined);


    useEffect(() => {
        const data = dividends
            .filter(div => div.date.year() === parseInt(year))

        const result = []
        for (let i = 0; i < months.length; i++) {
            result.push(
                {
                    label: months[i],
                    value: data
                        .filter(div => {
                            return div.date.month() === i
                        })
                        .reduce((acc, val) => acc + val.amount, 0)
                }
            )
        }
        setYearData(result)

    }, [year])

    if (yearData === undefined || yearData.length === 0) {
        return (<></>)
    }

    return (
        <Card
            title={'Monthly'}
            className={`${className}`}
        >
            <Chart data={yearData} />
        </Card>
    );
}

export default DividendMonthCard;
