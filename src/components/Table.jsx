import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../icons/Icons';
import Button from './Button';
import './Table.css';

function Table({ headers, sorting, onSortChange, dataList, className, sortable = true, selectable = false }) {
    const [selected, setSelected] = useState([])

    const headerClick = (headerName) => {
        if (sorting.column === headerName) {
            if (sorting.direction === "asc") {
                onSortChange({
                    column: headerName,
                    direction: "desc"
                })
            } else {
                onSortChange({
                    column: headerName,
                    direction: "asc"
                })
            }
        } else {
            onSortChange({
                column: headerName,
                direction: "desc"
            })
        }
    }

    const getHeaderSortname = (header) => {
        return header?.column_value ? header.column_value : header.name;
    }

    return (
        <div>
            <table className={`dividends-table ${className}`}>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                className={`
                                        ${getHeaderSortname(header) === sorting.column && 'header-highlight'}
                                        ${sortable && 'header-sortable'}
                                    `}
                                onClick={(e) => headerClick(getHeaderSortname(header))}
                            >
                                <div className="flex justify-between">
                                    <span>{header.name}</span>
                                    {(sortable && getHeaderSortname(header) === sorting.column) &&
                                        <span>
                                            {sorting.direction === "desc" ?
                                                <ChevronDownIcon className="h-4 w-4 ml-2 fill-primary" /> :
                                                <ChevronUpIcon className="h-4 w-4 ml-2 fill-primary" />}
                                        </span>}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((element) => (
                        <tr
                            className={`text-primary text-sm ${element?.onRowClick && "clickable-row"}`}
                            onClick={element?.onRowClick}
                        >
                            {headers.map((header, index) => (
                                <td
                                    className={`
                                        ${header.type === 'number' && 'number'}
                                        ${header.type === 'text' && 'text'}
                                        ${getHeaderSortname(header) === sorting.column && 'header-highlight'}
                                    `}
                                >
                                    <div className="flex items-center">
                                        {selectable && index === 0 && <input
                                            type="checkbox"
                                            checked={selected.filter(i => i === element.isin).length > 0}
                                            className="mr-3 border-secondary accent-primary "
                                            onClick={(e) => {
                                                if (selected.filter(i => i === element.isin).length > 0) {
                                                    setSelected(s => {
                                                        let listIndex = s.indexOf(element.isin);
                                                        return [
                                                            ...selected.slice(0, listIndex),
                                                            ...selected.slice(listIndex + 1),
                                                        ]
                                                    })
                                                } else {
                                                    setSelected([element.isin, ...selected])
                                                }

                                            }}
                                        />}
                                        {header.f(element)}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    {dataList.length === 0 && (
                        <tr>
                            <td className="empty-td text-primary" colSpan={`${headers.length}`}>huh, nothing here</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {selectable && selected.length > 0 && <div className="fixed w-full left-0 bottom-0 bg-white border-t text-primary">
                <div className="max-w-4xl mx-auto py-2 px-5 flex justify-between items-center">
                    <p>You have selected {selected.length} items.</p>
                    <div>
                        <Button design="secondary" text="Deselect" className="mr-5" />
                        <Button text="Compare" />
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Table;
