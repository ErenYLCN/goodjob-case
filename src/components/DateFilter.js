import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const DateFilter = ({column}) => {

    //filterValue expects a date, that is why we give pseudo-dates
    const options = [ 
        { value: new Date(2000,1,1), label: 'All Time', className: 'font-semibold' },
        { value: new Date(2001,1,1), label: 'Last 30 Days', className: 'font-semibold' },
        { value: new Date(2002,1,1), label: 'Last 7 Days', className: 'font-semibold' },
    ];

    var [ label, setLabel ] = useState(options[0]);
      
    const [ date, setDate ] = useState('');
    const { filterValue, setFilter } = column;

    return (
        <>
            <div className="mt-2 mr-6">

                <DatePicker 
                selected={date}
                onChange={(e) => {setFilter(e); setDate(e)}}
                dateFormat='yyyy-MM-dd'
                minDate={new Date(2020, 4, 2)} 
                maxDate={new Date(2020, 6, 30)}
                className="rounded-lg text-center w-48 border-2 font-semibold border-blue-400 pt-1 pb-1"
                placeholderText='Select a Date..' />

                <Dropdown 
                options={options} 
                onChange={(e) => {setFilter(e.value); setLabel(e)}} 
                value={label} 
                placeholder="Select an option"
                className="mt-2 border-2 rounded-md w-48 font-semibold text-center border-blue-400" 
                arrowClassName="mt-1"
                placeholderClassName='ml-8'/>

            </div>
        </>
    );
}