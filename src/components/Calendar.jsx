import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import { demoDividends } from '../utils/demo';
import { months } from './DividendMonthCard';
import { formatNumberNoFractions } from '../utils/util';

function Calendar({ className, demo, year }) {
    const { dividends } = useContext(AppContext)

    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
    }

    const valid = divsToUse
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

        const ret = []
        for (let i = 0; i < 12; i++) {
            const match = loop.value.filter(v => v.date.month() === i)
            const amount = match.reduce((acc, val) => acc + val.amount, 0)
            ret.push(amount)
        }

        const val = {
            label: name.slice(0, 4),
            name: name,
            id: isin,
            months: ret,
            total: ret.reduce((acc, val) => acc + val, 0)
        }

        result.push(val)
        loop = it.next()
    }

    const r = result.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })

    const total = [];
    for (let i = 0; i < 12; i++) {
        const tot = r.map(instr => instr.months[i]).reduce((acc, val) => acc + val, 0)
        total.push(tot)
    }


    const data = {
        months: r,
        total: total,
        total_total: total.reduce((acc, val) => acc + val, 0)
    }


    if (data.length === 0) {
        return (<></>)
    }


    return (
        <Card title={'Dividend Calendar'} className={`w-full ${className}`} useScreenshot={true}>
            <table className='w-full mt-3 text-sm'>
                <thead>
                    <tr>
                        <th></th>
                        {months.map(month => (
                            <th className='text-right text-white font-normal border border-card-off p-2 '>{month}</th>
                        ))}
                        <th className='text-right text-white font-normal border border-card-off p-2 '>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.months.map(instr => (
                        <tr className='group'>
                            <td className='text-white font-normal border border-card-off p-2'>{instr.label}</td>
                            {instr.months.map(m => (
                                <td className='text-secondary group-hover:text-white text-right font-normal border border-card-off p-2'>{m === 0 ? "" : formatNumberNoFractions(m)}</td>
                            ))}
                            <td className='text-white text-right border border-card-off p-2'>{formatNumberNoFractions(instr.total)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className='text-white border border-card-off p-2'>Total</td>
                        {data.total.map(tot_month => (
                            <td className='text-white text-right border border-card-off p-2'>{tot_month === 0 ? "" : formatNumberNoFractions(tot_month)}</td>
                        ))}
                        <td className='text-primary text-right font-bold border border-card-off p-2'>{formatNumberNoFractions(data.total_total)}</td>
                    </tr>

                </tbody>
            </table>
        </Card>

    );
}

export default Calendar;
