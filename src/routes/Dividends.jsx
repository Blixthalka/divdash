import React, { useState } from 'react';
import Card from '../components/Card';
import DividendTable from '../components/DividendTable';
import TextInput from '../components/TextInput';

function Dividends() {
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState({
        column: "amount",
        direction: "desc"
    })


    return (

        <Card>
            <div className="mb-5">
                <TextInput
                    value={search}
                    setFunction={setSearch}
                    placeholder="Instrument, ISIN"
                    label="Search"
                />
            </div>

            <DividendTable
                sorting={sorting}
                setSorting={setSorting}
                search={search}
            />

        </Card>

    );
}

export default Dividends;
