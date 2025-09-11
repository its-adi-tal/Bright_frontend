import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import styles from "./TaskDatePicker.module.css";
import { offset, flip, shift, limitShift } from "@floating-ui/dom";

export default function TaskDatePicker({value, onChange}) {
    return (
        <DatePicker 
            selected={value}
            onChange={onChange}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMM d, yyyy HH:mm"
            placeholderText="Choose date & time"
            className={styles.input}
            calendarClassName={styles.calendar}
            popperClassName={styles.popper}
            popperPlacement="bottom-start"
            /*popperModifiers={[
            offset(8),                       
            flip({ fallbackPlacements: ["top-start"] }),
            shift({ limiter: limitShift() }),   
        ]}*/
            portalId="datepicker-portal"
            shouldCloseOnSelect={false}
            isClearable
        />

    );
}