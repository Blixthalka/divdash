import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';
import ButtonIcon from './ButtonIcon';
import { AppContext } from '../App'


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


function DividendYearCard({ isin, className }) {
    const [years, setYears] = useState(undefined);
    const [biggestSort, setBiggestSort] = useState(false)
    const { dividends } = useContext(AppContext)
    let navigate = useNavigate()

    useEffect(() => {
        const filtered = dividends.filter(d => {
            if (isin) {
                return d.isin === isin
            }
            return true;
        })

        setYears(fillData(filtered))

    }, [isin])

    if (years === undefined || years === []) {
        return (<></>)
    }

    const data = years
        .sort(function (a, b) {
            if (biggestSort) {
                return a.value - b.value;
            } else {
                return a.label - b.label;
            }
        })

    return (
        <Card
            title={'Yearly'}
            className={`${className}`}

        >
            <Chart data={data} onBarClick={params => navigate(`/dashboard/${params.name}`)} />
        </Card>

    );
}

export default DividendYearCard;
