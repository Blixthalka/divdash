import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import './Table.css';

function Table({ headers, sorting, onSortChange, dataList, className, sortable = true, selectable = false }) {


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
                                                <ChevronDownIcon className="h-4 w-4 ml-2 fill-secondary" /> :
                                                <ChevronUpIcon className="h-4 w-4 ml-2 fill-secondary" />}
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
                                        ${header.type === 'number' && 'number '}
                                        ${header.type === 'text' && 'text '}
                                        ${getHeaderSortname(header) === sorting.column && 'header-highlight '}
                                    `}
                                >
                                     {header.f(element)}

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
        </div>
    );
}

export default Table;
