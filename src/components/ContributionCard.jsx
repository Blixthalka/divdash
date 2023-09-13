
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { formatDateWithYear } from '../utils/util';
import Card from './Card';

function moment_equals(a, b) {
    return a.year() === b.year() && a.month() === b.month() && a.date() === b.date()
}


function get_color(value, max) {
    const quarter = max / 4

    if (value === "empty") {
        return "bg-white"
    } else if (value === 0) {
        return "bg-gray-200"
    } else if (value > (3 * quarter)) {
        return "bg-blue-900"
    } else if (value > (2 * quarter)) {
        return "bg-blue-700"
    } else if (value > (1 * quarter)) {
        return "bg-blue-500"
    } else {
        return "bg-blue-300"
    }
}

function ContributionCard({ year, className }) {
    const { dividends } = useContext(AppContext)
    const [result, setResult] = useState(undefined)
    const [max, setMax] = useState(undefined)



    useEffect(() => {
        let from_date;
        let to_date;
        if (year) {
            from_date = moment("" + year + "-01-01")
            to_date = moment("" + year + "-12-31").add(1, 'days')
        } else {
            from_date = new moment().subtract(1, 'years')
            to_date = new moment().add(1, 'days')
        }


        const data = dividends.filter(div => div.date.isAfter(from_date) && div.date.isBefore(to_date))

        const res = []

        let cur_date = from_date;

        let i = 0
        while (i < cur_date.day()) {
            res.push({ label: "", value: "empty" })
            i++;
        }

        while (!moment_equals(cur_date, to_date)) {
            if (cur_date.day() === 6 || cur_date.day() === 0) {
                cur_date = cur_date.add(1, 'days')
                console.log("DEAD")
                continue;
            }
            res.push(
                {
                    label: cur_date.format("YYYY-MM-DD"),
                    value: data
                        .filter(div => {
                            return moment_equals(div.date, cur_date)
                        })
                        .reduce((acc, val) => acc + val.amount, 0)
                }
            )
            cur_date = cur_date.add(1, 'days')
        }

        setResult(res)
        setMax(res.reduce((acc, val) => val.value > acc ? val.value : acc, 0))
    }, [year, dividends])

    if(!result) {
        return (<></>)
    }


    return (
        <Card
            title={'Days'}
            className={`${className}`}
        >
            <div className="grid grid-rows-[repeat(5,1fr)] grid-flow-col gap-1 mt-3 overflow-scroll md:overflow-visible">
                {result.map((r, i) => (
                    <div key={i} className="group relative w-max">
                        <div className={`w-3 h-3 rounded-sm ${get_color(r.value, max)}`} />
                        {r.value !== "empty" && (
                            <div role="tooltip" className="z-10 shadow bg-white border text-sm px-2 py-1 rounded text-primary pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity md:group-hover:opacity-100">
                                {formatDateWithYear(r.label) + " - " + r.value + " kr"}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </Card>
    );
}

export default ContributionCard;
