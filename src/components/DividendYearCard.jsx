import { FlagTriangleRightIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { demoDividends } from '../utils/demo';
import { findGoal } from '../utils/util';
import ButtonIcon from './ButtonIcon';

const fillData = (dividends) => {
    const lastYear = new Date().getFullYear();

    const firstYear = dividends
        .map(div => div.date.year())
        .reduce((acc, value) => value < acc ? value : acc, lastYear);
    let result = []

    for (let year = firstYear; year <= lastYear; year++) {
        result.push({
            label: year,
            value: dividends
                .filter(div => {
                    return div.date.year() === year
                })
                .reduce((acc, val) => acc + val.amount, 0)
        })
    }
    return result
}


function DividendYearCard({ name, isin, demo, className }) {
    const { dividends, settings } = useContext(AppContext)
    const [showGoal, setShowGoal] = useState(true)
    let navigate = useNavigate()

    let divsToUse = dividends;
    let goalsToUse = settings.goals;
    if (demo) {
        divsToUse = demoDividends()
        goalsToUse = []
    }

    const filtered = divsToUse.filter(d => {
        if (isin) {
            return d.isin === isin
        }
        return true;
    })

    const years = fillData(filtered)


    if (years === undefined) {
        return (<></>)
    }

    const yy = [...new Set(divsToUse.map(div => div.date.year()))]
        .sort((a, b) => a > b ? 1 : -1)

    const goals = yy.map(year => findGoal(goalsToUse, year)?.amount || "-")

    const data = years
        .sort(function (a, b) {
            return a.label - b.label;
        })

    return (
        <Card
            title={`Dividends`}
            zoomedTitle={`Dividends ${name ? name : ""}`}
            className={`${className}`}
            useScreenshot
            useIcognito
            settings={
                <>
                    {(!isin && goalsToUse.length !== 0) && <ButtonIcon
                        Icon={FlagTriangleRightIcon}
                        selected={showGoal}
                        onClick={() => setShowGoal(!showGoal)}
                    />}
                </>
            }>

            {isin || !showGoal || goalsToUse.length === 0
                ? (<Chart
                    data={data}
                    onBarClick={params => navigate(`/dashboard/${params.name}`)}
                />)
                : <Chart
                    data={data}
                    dataName={"Dividends"}
                    onBarClick={params => navigate(`/dashboard/${params.name}`)}
                    goals={goals}
                />}
        </Card >

    );
}

export default DividendYearCard;
