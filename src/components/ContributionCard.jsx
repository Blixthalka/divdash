
import moment from 'moment/moment';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { demoDividends } from '../utils/demo';
import { formatDateWithYear } from '../utils/util';
import Card from './Card';
/* eslint-disable */

function moment_equals(a, b) {
    return a.year() === b.year() && a.month() === b.month() && a.date() === b.date()
}


function get_color(value, max) {
    const quarter = max / 4

    if (value === "empty") {
        return "bg-transparent"
    } else if (value === 0) {
        return "bg-[#14222F]"
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

function ContributionCard({ year, demo, className }) {
    const { dividends } = useContext(AppContext)

    let divsToUse = dividends;
    if (demo) {
        divsToUse = demoDividends()
    }

    let from_date;
    let to_date;
    if (year) {
        from_date = moment("" + year + "-01-01")
        to_date = moment("" + year + "-12-31").add(1, 'days')
    } else {
        from_date = new moment().subtract(1, 'years')
        to_date = new moment().add(1, 'days')
    }

    const data = divsToUse.filter(div => div.date.isAfter(from_date) && div.date.isBefore(to_date))
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

    const result = res
    const max = res.reduce((acc, val) => val.value > acc ? val.value : acc, 0)


    if (!result) {
        return (<></>)
    }


    return (
        <Card
            title={'Dividend Contributions'}
            className={`${className}`}
        >
            <div className="grid bg-card grid-rows-[repeat(5,1fr)] grid-flow-col gap-1 mt-3 overflow-scroll lg:overflow-visible">
                {result.map((r, i) => (
                    <div key={i} className="group relative w-max">
                        <div className={`w-3 h-3 rounded-sm ${get_color(r.value, max)}`} />
                        {r.value !== "empty" && (
                            <div role="tooltip" className="z-10 shadow bg-card border border-card-off text-sm px-2 py-1 rounded text-white pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity md:group-hover:opacity-100">
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
