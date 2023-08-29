import React, { useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { AppContext } from '../App';
import ButtonIcon from '../components/ButtonIcon';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendTable from '../components/DividendTable';
import InstrumentChartCard from '../components/InstrumentChartCard';
import { ChevronLeftIcon, ChevronRightIcon, CrossIcon } from '../icons/Icons';


function DashboardYear() {
    const { dividends } = useContext(AppContext)

    const [data, setData] = useState(null);
    let params = useParams();

    const year = parseInt(params.year);
    const currentYear = new Date().getFullYear();
    const [sorting, setSorting] = useState({
        column: "date",
        direction: "desc"
    });


    const filtered = dividends.filter(div => div.date.year() === year)

    const thisYear = filtered
        .reduce((acc, val) => acc + val.amount, 0)

    const perMonth = thisYear / 12;


    return (
        <div className="max-w-4xl pb-20 mx-auto">
            <div className="grid grid-cols-3 gap-5 ">
                <div className="col-span-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2 ">
                        <Link to={`/dashboard/${year - 1}`}>
                            <ButtonIcon Icon={ChevronLeftIcon} />
                        </Link>

                        <h1 className="text-center text-2xl text-primary">{params.year}</h1>

                        {year === currentYear ?
                            <ButtonIcon Icon={ChevronRightIcon} disabled={true} /> :
                            <Link to={`/dashboard/${year + 1}`}>
                                <ButtonIcon Icon={ChevronRightIcon} />
                            </Link>
                        }
                    </div>
                    <Link to={`/dashboard`}>
                        <ButtonIcon Icon={CrossIcon} />
                    </Link>
                </div>

                <CardSingleNumber title={"Year"} amount={thisYear} currency={"kr"} />
                <CardSingleNumber title={"Per Month"} amount={perMonth} currency={"kr"} />
                <CardSingleNumber title={"# Dividends"} amount={filtered.length} />

                <DividendMonthCard year={params.year} className="col-span-3" />
                <InstrumentChartCard year={params.year} className="col-span-3" />

                <Card
                    title="Dividends"
                    className="col-span-3 "
                >
                    <DividendTable
                        sortable={true}
                        sorting={sorting}
                        setSorting={(s) => setSorting(s)}
                        className="mt-2"
                        year={year}
                    />
                </Card>

            </div>

        </div>
    );
}

export default DashboardYear;
