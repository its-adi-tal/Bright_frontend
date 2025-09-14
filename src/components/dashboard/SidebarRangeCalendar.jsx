//import '@mantine/core/styles.css';
//import '@mantine/dates/styles.css';
import { useState, useEffect } from 'react';
import { DatePicker  } from '@mantine/dates';
import dayjs from 'dayjs';

//users are allowed to pick any date - fit

//user picks 2 dates

export default function SidebarRangeCalendar({onChange, firstDayIfWeek=0}) {
    const [range, setRange] = useState([null, null]); //range is an array [from,to]

    useEffect(() => {
        const [from,to] = range;
        if (from && to && onChange) {
            onChange({
                startISO: dayjs(from).startOf("day").toISOString(),
                endISO: dayjs(to).endOf("day").toISOString(),
            });
        }
    },[range, onChange]);
   

    
    return (
        <DatePicker
            type = "range"
            value = {range}
            onChange= {setRange}
            numberOfColumns={1}
            allowSingleDateInRange //allowing single day
            firstDayOfWeek={0} //sunday
            hideOutsideDates
            weekendDays={[]} //avoid coloring weekends
            radius= "md"
            size = "xs"

        />
    );

 };

/*
function startOfWeek(date) {
    //identify the start of week for a selected date
    return dayjs(date).subtract(getDay() + 1, 'day').toDate();
}

function endOfWeek(date) {
    //identify the end of week for a selected date
    return dayjs(date).add(6 - getDay(), 'day').endOf('day').toDate();
}

function isInRange(date, value) {
    return value ? dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value)) : false;
}*/




