import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { demoDividends } from '../utils/demo';
import ButtonIcon from './ButtonIcon';
import { ZapIcon, ZapOffIcon } from 'lucide-react';
export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


function calculate(dividends, year) {
    const data = dividends
        .filter(div => div.date.year() === parseInt(year))
    return calculatez(data)
}

function calculatez(dividends) {
    const yearData = []
    for (let i = 0; i < months.length; i++) {
        yearData.push(
            {
                label: months[i],
                value: dividends
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
    const { dividends } = useContext(AppContext);
    const [showCompare, setShowCompare] = useState(true);

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
            zoomedTitle={showCompare ? undefined : `Monthly Dividends ${year}`}
            className={`${className}`}
            screenshot={true}
            settings={<ButtonIcon
                Icon={showCompare ? ZapIcon : ZapOffIcon}
                onClick={() => setShowCompare(!showCompare)}
            />}
        >

            {showCompare
                ? <Chart
                    data={yearData}
                    dataName={year}
                    compare={prevYearData}
                    compareName={year - 1}
                />
                : <Chart
                    data={yearData}
                    dataName={year}
                />}

        </Card>
    );
}

export default DividendMonthCard;
