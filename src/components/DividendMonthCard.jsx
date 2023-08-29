import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
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
