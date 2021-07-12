import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination, useFilters } from 'react-table'
import { Checkbox } from '../components/checkbox';
import { GROUPS } from '../components/columns'
import '../components/table.css'

export default function Datatable({data}) {

    const columns = useMemo(() => GROUPS, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        allColumns,
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState: {pageSize: 10, hiddenColumns: ["app", "platform"]},
    },
    useFilters, useSortBy, usePagination);

    const { pageIndex } = state;

    return (
        <>
            <div className="flex flex-wrap items-center justify-center gap-x-10 mt-4">
                {
                    allColumns.map(column => (
                        <div key={column.id}>
                            <input type="checkbox" className="hover:shadow-inner transition" id={column.id} {...column.getToggleHiddenProps()} />
                            <label for={column.id} className="text-lg font-semibold cursor-pointer" >{column.Header}</label>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-around flex-wrap w-full sm:w-1/2 m-auto pl-4 pr-4 sm:p-0">
                <div className="flex items-center justify-between mt-4">
                    {
                        allColumns.map((column) => (
                            <div>{column.canFilter ? column.render('Filter') : null} </div>
                        ))
                    }
                </div>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => 
                        (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="relative">
                                                <div>
                                                    {column.render('Header')}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2">
                                                    {column.isSorted ? (column.isSortedDesc ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                                                        </svg>
                                                        : 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                                        </svg>
                                                        ) 
                                                        : 
                                                        ''}
                                                </div>
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })
                                    }
                                    
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-center mt-4 space-x-4">
                <button disabled={!canPreviousPage} 
                        className={!canPreviousPage ? 'btn-disabled' : 'btn-normal'}
                        onClick={() => gotoPage(0)}>
                        {'<<'}
                </button>
                <button disabled={!canPreviousPage} 
                        className={!canPreviousPage ? 'btn-disabled' : 'btn-normal'}
                        onClick={() => previousPage()}>
                        Previous
                </button>
                <button disabled={!canNextPage} 
                        className={!canNextPage ? 'btn-disabled' : 'btn-normal'}
                        onClick={() => nextPage()}>
                        Next
                </button>
                <button disabled={!canNextPage} 
                        className={!canNextPage ? 'btn-disabled' : 'btn-normal'}
                        onClick={() => gotoPage(pageCount - 1)}>
                        {'>>'}
                </button>
            </div>
            <div className="flex items-center justify-center mt-4">
                Page
                <strong className="ml-2">
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
                {' '}
            </div>
            <div className="flex items-center justify-center mt-2">
                Go to page: {' '}
                <input type="number" defaultValue={pageIndex + 1} onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0;
                    gotoPage(pageNumber);
                }} />
            </div>
        </>
    );


}