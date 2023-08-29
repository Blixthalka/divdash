import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Table from '../components/Table';
import { sortLastDateFirst } from '../utils/util';


function getSortingFun(direction, field) {
    const sort = getSortingFunField(field)
    return (a, b) => sort(a, b) * (direction === "asc" ? -1 : 1)
}

function getSortingFunField(field) {
    if (field === "amount") {
        return (a, b) => a.amount - b.amount
    } else if (field === "date"){
        return sortLastDateFirst
    } else if (field === "name") {
        return (a, b) => a.name.localeCompare(b.name)
    } else if (field === "isin") {
        return (a, b) => a.isin.localeCompare(b.isin)
    }
}

function DividendTable({ sorting, setSorting, isin, search, className, sortable = true, maxDividends = 0, year }) {
    const { dividends } = useContext(AppContext)

    const headers = [
        {
            name: "Instrument",
            type: "text",
            column_value: "name",
            f: t => t?.name
        },
        {
            name: "ISIN",
            type: "number",
            column_value: "isin",
            f: t => t?.isin
        },
        {
            name: "Date",
            type: "number",
            column_value: "date",
            f: t => t?.date.format("yyyy-MM-DD")
        },
        {
            name: "Amount",
            type: "number",
            column_value: "amount",
            f: t => Math.round(t?.amount) + ' kr'
        },
    ]
    const navigate = useNavigate()


    const sortFun = getSortingFun(sorting.direction, sorting.column)


    const data = dividends
        .filter(div => isin ? div.isin === isin : true)
        .filter(div => year ? div.date.year() === year : true)
        .sort(sortFun)
        .slice(0, maxDividends === 0 ? dividends.length : maxDividends)
        .map(d => {
            if (d.isin) {
                return {
                    ...d,
                    onRowClick: () => navigate(`/instruments/${d.isin}`)
                }
            }
            return d
        })



    return (
        <Table
            headers={headers}
            sorting={sorting}
            dataList={data}
            onSortChange={(s) => setSorting(s)}
            className={className}
            sortable={sortable}
        />
    );
}

export default DividendTable;
