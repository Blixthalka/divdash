import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../App';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendTable from '../components/DividendTable';
import DividendYearCard from '../components/DividendYearCard';
import NoData from '../components/NoData';


function Instrument() {
    let params = useParams();
    const { dividends } = useContext(AppContext);
    const [instrument, setInstrument] = useState(undefined);
    const [sorting, setSorting] = useState({
        column: "date",
        direction: "desc"
    });

    useEffect(() => {
        const filtered = dividends
            .filter(div => div.isin === params.isin)

        if (filtered.length > 0) {
            setInstrument(filtered[0])
        } else {
            setInstrument(undefined)
        }
    }, [params.isin, dividends])

    if (!instrument) {
        return (
            <Card>
                <NoData />
            </Card>
        )
    }

    const totalAmount = dividends
        .filter(div => div.isin === params.isin)
        .reduce((acc, val) => acc + val.amount, 0)

    return (
        <div className="grid grid-cols-3 gap-5">
            <CardSingleNumber title={instrument.isin} amount={instrument.name.substring(0, 32)} className="col-span-2">
                {/* <p className="text-3xl font-bold text-primary">{instrument.instrument_name}</p> */}
            </CardSingleNumber>
            <CardSingleNumber title={"Total"} amount={totalAmount} currency="kr" />
            <DividendYearCard isin={instrument.isin} className="col-span-3" />
            <Card title={"Dividends"} className="col-span-3">
                <DividendTable
                    sorting={sorting}
                    sortable={true}
                    setSorting={setSorting}
                    isin={instrument.isin}
                    className="mt-2"
                />
            </Card>
        </div>
    );
}


export default Instrument;
