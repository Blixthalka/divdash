import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import Chart from '../components/Chart';
import Table from '../components/Table';

const Intruments = () => {
    const [instruments, setInstruments] = useState([]);
    const navigate = useNavigate();

    const headers = [
        {
            name: "Instrument",
            type: "text",
            column_value: "instrument_name",
            f: t => t.instrument_name
        },
        {
            name: "ISIN",
            type: "number",
            column_value: "isin",
            f: t => t.isin
        },
        {
            name: "Total Dividends",
            type: "number",
            column_value: "amount",
            f: t => t.amount + ' kr'
        }
    ]

    const [sorting, setSorting] = useState({
        column: headers[2].column_value,
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/instruments?sort_direction=${sorting.direction}&sort_column=${sorting.column}`)
            .then(i => i.json())
            .then(i => {
                setInstruments(i)
            })
    }, [sorting])

    const data = instruments.map((i) => {
        return {
            value: i.amount,
            label: i.instrument_name.slice(0, 4),
            name: i.instrument_name,
            id: i.isin
        }
    }).reverse()

    const onClickInstruments = instruments.map(i => {
        return {
            ...i,
            onRowClick: () => navigate(i.isin)
        }
    })


    return (
        <div className="grid gap-5">
            {data && data.length > 1 &&
                <Card>

                    <Chart
                        data={data}
                        onBarClick={params => {
                            navigate(`/instruments/${params.data.id}`)
                        }}
                    />

                </Card>
            }
            <Card >
                <Table
                    headers={headers}
                    sorting={sorting}
                    dataList={onClickInstruments}
                    onSortChange={(s) => setSorting(s)}
                />
            </Card>
        </div>
    );
}

export default Intruments;
