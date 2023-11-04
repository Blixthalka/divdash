import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { demoDividends } from '../utils/demo';
export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


function calculate(dividends, year) {
    const data = dividends
        .filter(div => div.date.year() === parseInt(year))

    const yearData = []
    for (let i = 0; i < months.length; i++) {
        yearData.push(
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
    return yearData;
}



function DividendMonthCard({ year, demo, className }) {
    const { dividends } = useContext(AppContext)


    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
    }

    const yearData = calculate(divsToUse, year)
    const prevYearData = calculate(divsToUse, year - 1)

    if (yearData === undefined || yearData.length === 0) {
        return (<></>)
    }

    return (
        <Card
            title={'Monthly Dividends'}
            className={`${className}`}
            screenshot={true}
        >
            <Chart
                data={yearData}
                dataName={year}
                compare={prevYearData}
                compareName={year - 1}
            />
        </Card>
    );
}

export default DividendMonthCard;
