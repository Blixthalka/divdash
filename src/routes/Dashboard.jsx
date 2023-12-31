import moment from 'moment/moment';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import AccumCard from '../components/AccumCard';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import ContributionCard from '../components/ContributionCard';
import DividendTable from '../components/DividendTable';
import DividendYearCard from '../components/DividendYearCard';
import Empty from '../components/Empty';
import GoalProgressCard from '../components/GoalProgressCard';
import InstrumentChartCard from '../components/InstrumentChartCard';
import { sumForYear } from '../utils/util';

function Dashboard() {
  const { dividends } = useContext(AppContext)

  const total = dividends
    .reduce((acc, value) => acc + value.amount, 0)

  const rolling = dividends
    .filter(dividend => dividend.date.isAfter(moment().subtract(1, 'years')))
    .reduce((acc, dividend) => acc + dividend.amount, 0)

  const prevRolling = dividends
    .filter(dividend => dividend.date.isAfter(moment().subtract(2, 'years'))
      && dividend.date.isBefore(moment().subtract(1, 'years')))
    .reduce((acc, dividend) => acc + dividend.amount, 0)

  const growth = ((rolling - prevRolling) / prevRolling) * 100

  const firstYear = dividends.reduce((acc, div) => div.date.year() < acc ? div.date.year() : acc, new Date().getFullYear())
  const sumFirstYear = sumForYear(dividends, firstYear)
  const years = new Date().getFullYear() - firstYear;
  const cagr = (Math.pow((rolling / sumFirstYear), (1 / years)) - 1) * 100



  if (total === 0) {
    return (
      <Empty />
    )
  }

  return (
    <div className="max-w-5xl pb-20 mx-auto">
      <div className="grid sm:grid-cols-3 gap-5 ">
        <CardSingleNumber title={"Rolling Year"} amount={rolling} currency={"kr"} change={growth} />
        <CardSingleNumber title={"Total"} amount={total} currency={"kr"} change={cagr} changeLabel={"cagr"} />
        <GoalProgressCard year={moment().year()} />

        <DividendYearCard className="sm:col-span-3" />
        <ContributionCard className="sm:col-span-3" />
        <AccumCard className="sm:col-span-3" />
        <InstrumentChartCard className="sm:col-span-3" />

        <Card
          title="Recent Dividends"
          className="sm:col-span-3 "
        >
          <DividendTable
            sortable={false}
            setSorting={(s) => { }}
            sorting={{ column: "date", direction: "desc" }}
            maxDividends={10}
            className="mt-2"
          />
        </Card>



      </div>

    </div>
  );
}

export default Dashboard;
