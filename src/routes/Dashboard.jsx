import moment from 'moment/moment';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import AccumCard from '../components/AccumCard';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendTable from '../components/DividendTable';
import DividendYearCard from '../components/DividendYearCard';
import InstrumentChartCard from '../components/InstrumentChartCard';
import ContributionCard from '../components/ContributionCard';


function Dashboard() {
  const { dividends } = useContext(AppContext)


  const total = dividends
    .reduce((acc, value) => acc + value.amount, 0)

  const rolling = dividends
    .filter(dividend => dividend.date.isAfter(moment().subtract(1, 'years')))
    .reduce((acc, dividend) => acc + dividend.amount, 0)


  return (
    <div className="max-w-4xl pb-20 mx-auto">
      <div className="grid sm:grid-cols-3 gap-5 ">

        <CardSingleNumber title={"Rolling Year"} amount={rolling} currency={"kr"} />
        <CardSingleNumber title={"Total"} amount={total} currency={"kr"} />
        <CardSingleNumber title={`# Dividends`} amount={dividends.length} className="" />

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
