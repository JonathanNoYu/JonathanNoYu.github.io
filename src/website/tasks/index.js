import { useState } from "react";
import DatePicker from "react-datepicker";
import "../../styles/tasks-styles.css"

import "react-datepicker/dist/react-datepicker.css";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}

function Tasks() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 24);
    const [deadlineDate, setDate] = useState(newDate);
    const diffTime = Math.abs(deadlineDate - new Date());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    return(
        <div className="wd-taskcontainer dflex justify-content-center mx-5">
            <div className="wd-bg-gray wd-rounded-10 mt-5 rows">
                <div className="row">
                    <p className="wd-date-p mx-3 pt-3 col"><strong>Date to Set!</strong></p>
                    <p className="wd-date-p mx-3 pt-3 col text-end"><strong>Today: {`${formatDate(new Date())}`}</strong></p>
                </div>
                <div className="row">
                    <DatePicker className=" mx-3 mb-3" selected={deadlineDate} onChange={(date) => setDate(date)} />
                    <p className="wd-date-p mx-3 col text-end"><strong>Remaining Days: {`${diffDays}`}</strong></p>
                </div>
            </div>
        </div>
    );
} export default Tasks