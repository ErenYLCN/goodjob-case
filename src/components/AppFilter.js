import React from 'react'


export const AppFilter =({column}) => {



    const { filterValue, setFilter } = column;

    return (
        <div className="flex items-center pr-6">
            <span className="font-semibold w-24">
                Search App: {' '}
                <input 
                    value={filterValue || ''}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border-2 border-blue-400 rounded-lg pl-2 w-24"
                />
            </span>
        </div>
    );
}