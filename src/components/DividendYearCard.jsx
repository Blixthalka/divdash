import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { demoDividends } from '../utils/demo';

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
    const { dividends } = useContext(AppContext)
    let navigate = useNavigate()

    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
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

    const data = years
        .sort(function (a, b) {
            return a.label - b.label;
        })

    return (
        <Card
            title={`Dividends`}
            zoomedTitle={`Dividends ${name ? name : ""}`}
            className={`${className}`}
            screenshot={true}

        >
            <Chart data={data} onBarClick={params => navigate(`/dashboard/${params.name}`)} />
        </Card>

    );
}

export default DividendYearCard;
