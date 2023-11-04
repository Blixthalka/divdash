import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { demoDividends } from '../utils/demo';

function calculate(dividends, year) {
    const valid = dividends
        .filter(div => year ? div.date.year() === parseInt(year) : true)
        .filter(div => div.isin)

    const map = new Map();
    valid.forEach(div => {
        let list = [];
        if (map.has(div.isin)) {
            list = map.get(div.isin)
        }
        list.push(div)
        map.set(div.isin, list)
    })


    let result = [];
    let it = map.values()
    let loop = it.next()
    while (!loop.done) {
        const name = loop.value[0].name
        const isin = loop.value[0].isin
        const amount = loop.value.reduce((acc, val) => acc + val.amount, 0)

        const val = {
            value: amount,
            label: name.slice(0, 4),
            name: name,
            id: isin
        }

        result.push(val)
        loop = it.next()
    }

    return result.sort((a, b) => a.value - b.value)
}

const IntrumentChartCard = ({ year, demo, className }) => {
    const { dividends } = useContext(AppContext)
    const navigate = useNavigate();

    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
    }

    const data = calculate(divsToUse, year)


    if (data.length === 0) {
        return (<></>)
    }

    return (
        <Card title={"Dividends per Stock"} className={`grid gap-2 ${className}`} screenshot={true}>
            <Chart
                data={data}
                dataName={year}
                onBarClick={(params) => navigate(`/instruments/${params.data.id}`)}
            />
        </Card>

    );
}

export default IntrumentChartCard;
