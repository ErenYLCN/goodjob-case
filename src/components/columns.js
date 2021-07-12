import { PlatfromFilter } from './PlatformFilter'
import { DateFilter } from './DateFilter'
import { AppFilter } from './AppFilter'

export const GROUPS = [
    {
        Header: 'Breakdowns',
        columns: [
            {
                Header: 'App',
                accessor: 'app',
                disableSortBy: true,
                Filter: AppFilter,
            },
            {
                Header: 'Date',
                accessor: 'date',
                filter: (rows, columnIds, filterValue) => {
                    //This function takes the value from the date picker or dropdown menu to filter dates
                    if(filterValue == null) {
                        return rows
                    }

                    let year = filterValue.getFullYear();
                    let month = filterValue.getMonth() + 1;
                    let day = filterValue.getDate();

                    if(filterValue.getFullYear() == 2000) {
                        return rows;
                    }
                    else if(filterValue.getFullYear() == 2001) {
                        let filteredRows = rows.filter((row) => {
                            return row.original.date <= '2020-07-30' && row.original.date >= '2020-06-30';
                        });
                        return filteredRows;
                    }
                    else if(filterValue.getFullYear() == 2002) {
                        let filteredRows = rows.filter((row) => {
                            return row.original.date <= '2020-07-30' && row.original.date >= '2020-07-23';
                        });
                        return filteredRows;
                    }
                    else {
                        if (month / 10 < 1) {
                            month = `0${month}`
                        }
                        if ((day / 10) < 1) {
                            day = `0${day}`;
                        }
                        let fullDate = `${year}-${month}-${day}`

                        let filteredRows = rows.filter((row) => {
                            return row.original.date == fullDate;
                        });
                        return filteredRows;
                    }
                },
                Filter: DateFilter,
            },
            {
                Header: 'Platform',
                accessor: 'platform',
                disableSortBy: true,
                filter: (rows, columnIds, filterValue) => {
                    if (filterValue == '')
                        return rows;
                    let filteredRows = rows.filter((row) => {
                        return row.original.platform == filterValue;
                    });
                    return filteredRows;
                },
                Filter: PlatfromFilter,
                
            },
        ],
    },
    {
        Header: 'Metrics',
        columns: [
            {
                Header: 'Clicks',
                accessor: 'clicks',
                Filter: PlatfromFilter,
                disableFilters: true,
            },
            {
                Header: 'Dau',
                accessor: 'dau',
                Filter: PlatfromFilter,
                disableFilters: true,
            },
            {
                Header: 'Impressions',
                accessor: 'impressions',
                Filter: PlatfromFilter,
                disableFilters: true,
            },
            {
                Header: 'Installs',
                accessor: 'installs',
                Filter: PlatfromFilter,
                disableFilters: true,
            },
            {
                Header: 'Revenue',
                accessor: 'revenue',
                Filter: PlatfromFilter,
                disableFilters: true,
                Cell: ({ value }) => { return Math.round(value * 10) / 10 }  //to get rid of extra decimal places
            },
        ],
    },
]