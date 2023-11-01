import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';
import { months } from './DividendMonthCard';

function AccumCard({ className, year }) {
    const { dividends } = useContext(AppContext)
    const [data, setData] = useState([]);

    useEffect(() => {

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

            const ret = []
            for(let i = 0; i < 12; i++) {
                const match = loop.value.filter(v => v.date.month() === i)
                const amount = match.reduce((acc, val) => acc + val.amount, 0)
                ret.push(amount)
            }

            const val = {
                label: name.slice(0, 4),
                name: name,
                id: isin,
                months: ret
            }

            result.push(val)
            loop = it.next()
        }

        const r = result.sort((a, b) => {
            const nameA = a.label.toUpperCase(); // ignore upper and lowercase
            const nameB = b.label.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          })

        console.log(r)
        const total = [];
        for(let i = 0; i < 12; i++) {
            const tot = r.map(instr => instr.months[i]).reduce((acc, val) => acc + val, 0)
            total.push(tot)
        }

        setData({months: r, total: total})
    }, [year, dividends])


    if (data.length === 0) {
        return (<></>)
    }







    return (
        <Card title={'Dividend Calendar'} className={`w-full ${className}`} screenshot={true}>
            <table className='w-full mt-3 text-sm'>
                <thead>
                    <tr>
                        <th></th>
                        {months.map(month => (
                            <th className='text-right text-white font-normal border border-card-off p-2 '>{month}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.months.map(instr => (
                        <tr>
                            <td className='text-white font-normal border border-card-off p-2'>{instr.label}</td>
                            {instr.months.map(m => (
                                <td className='text-secondary text-right font-normal border border-card-off p-2'>{m === 0 ? "" : m}</td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td className='text-white  font-bold border border-card-off p-2'>Total</td>
                        {data.total.map(tot_month => (
                            <td className='text-white text-right font-bold border border-card-off p-2'>{tot_month === 0 ? "" : tot_month}</td>
                        ))}
                    </tr>
                </tbody>

            </table>
        </Card>

    );
}

export default AccumCard;
