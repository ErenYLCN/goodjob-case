import React, {useState} from 'react'


export const PlatfromFilter =({column}) => {



    const { filterValue, setFilter } = column;

    return (
        <>
            <div className="flex-col items-center justify-center text-lg mt-2">
                <div>
                    <input type="radio" className="mr-1" 
                            id="all" name="platforms" 
                            value={''} 
                            onChange={(e) => setFilter(e.target.value)} 
                            defaultChecked />
                    <label for="all" className="font-semibold">All</label>
                </div>
                <div className="block">
                    <input type="radio" className="mr-1" 
                            id="Android" 
                            name="platforms" value={'Android'} 
                            onChange={(e) => setFilter(e.target.value)} />
                    <label for="Android" className="font-semibold">Android</label>
                </div>
                <div>
                    <input type="radio" 
                            className="mr-1" id="iOS" name="platforms" 
                            value={'iOS'} 
                            onChange={(e) => setFilter(e.target.value)} />
                    <label for="iOS" className="font-semibold">iOS</label>
                </div>
            </div>
        </>
    );
}