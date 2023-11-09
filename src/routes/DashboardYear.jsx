import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { AppContext } from '../App';
import ButtonIcon from '../components/ButtonIcon';
import Calendar from '../components/Calendar';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import ContributionCard from '../components/ContributionCard';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendTable from '../components/DividendTable';
import GoalProgressCard from '../components/GoalProgressCard';
import InstrumentChartCard from '../components/InstrumentChartCard';
import { sumForYear } from '../utils/util';



function DashboardYear() {
    const { dividends } = useContext(AppContext)
    let params = useParams();

    const year = parseInt(params.year);
    const currentYear = new Date().getFullYear();
    const [sorting, setSorting] = useState({
        column: "date",
        direction: "desc"
    });

    const thisYear = sumForYear(dividends, year)
    const lastYear = sumForYear(dividends, year - 1)

    let yearChange = undefined;
    if (lastYear !== 0) {
        yearChange = ((thisYear - lastYear) / lastYear) * 100;
    }

    const perMonth = thisYear / 12;

    return (
        <div className="max-w-5xl pb-20 mx-auto">
            <div className="grid grid-cols-3 gap-5 ">
                <div className="col-span-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2 ">
                        <Link to={`/dashboard/${year - 1}`}>
                            <ButtonIcon Icon={ChevronLeftIcon} />
                        </Link>

                        <h1 className="text-center text-2xl text-secondary tabular-nums">{params.year}</h1>

                        {year === currentYear ?
                            <ButtonIcon Icon={ChevronRightIcon} disabled={true} /> :
                            <Link to={`/dashboard/${year + 1}`}>
                                <ButtonIcon Icon={ChevronRightIcon} />
                            </Link>
                        }
                    </div>
                    <Link to={`/dashboard`}>
                        <ButtonIcon Icon={XIcon} />
                    </Link>
                </div>

                <CardSingleNumber
                    title={"Year"}
                    amount={thisYear}
                    change={yearChange}
                    currency={"kr"}
                />
                <CardSingleNumber
                    title={"Per Month (average)"}
                    amount={perMonth}
                    currency={"kr"}
                    Icon={CalendarIcon}
                />

                <GoalProgressCard year={parseInt(params.year)} />

                <DividendMonthCard year={params.year} className="col-span-3" />
                <InstrumentChartCard year={params.year} className="col-span-3" />
                <ContributionCard className="col-span-3" year={year} />

                <Calendar className={"col-span-3"} year={year} />

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
