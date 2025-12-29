import { useState } from "react";
import {parseDate} from '@internationalized/date';
import "../../styles/tasks-styles.css"
import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Popover} from 'react-aria-components';
import {ChevronDown, ChevronLeft, ChevronRight} from 'lucide-react';

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

function formatDateYearMonthDay(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function Tasks() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 24);
    const [deadlineDate, setDate] = useState(parseDate(formatDateYearMonthDay(newDate)));
    const diffTime = Math.abs(new Date(deadlineDate) - new Date());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    return(
        <div className="wd-taskcontainer dflex justify-content-center mx-5">
            <div className="wd-bg-gray wd-rounded-10 mt-5 rows">
                <div className="row">
                    <p className="wd-date-p mx-3 pt-3 col"><strong>Date to Set!</strong></p>
                    <p className="wd-date-p mx-3 pt-3 col text-end"><strong>Today: {`${formatDate(new Date())}`}</strong></p>
                </div>
                <div className="row">
                    <DatePicker className={"mx-3"} value={deadlineDate} onChange={setDate}>
                        <Group className={`d-flex`}>
                            <DateInput>
                                {(segment) => <DateSegment segment={segment} />}
                            </DateInput>
                            <Button>
                                <ChevronDown className="wd-datepicker-icon" size={20} />
                            </Button>
                        </Group>
                        <Popover>
                            <Dialog>
                            <Calendar>
                                <header>
                                <Button slot="previous">
                                    <ChevronLeft className="wd-datepicker-icon" size={20} />
                                </Button>
                                <Heading />
                                <Button slot="next">
                                    <ChevronRight className="wd-datepicker-icon" size={20} />
                                </Button>
                                </header>
                                <CalendarGrid>
                                    {(date) => <CalendarCell date={date} />}
                                </CalendarGrid>
                            </Calendar>
                            </Dialog>
                        </Popover>
                    </DatePicker>
                    <p className="wd-date-p mx-3 col text-end"><strong>Remaining Days: {`${diffDays}`}</strong></p>
                </div>
            </div>
        </div>
    );
} export default Tasks