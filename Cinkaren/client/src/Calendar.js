import React from "react";
import "./Calendar.css";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
//import moment from 'moment';

//const formatTimeScaleDate = date => moment(date).format('hh:mm');

/*const TimeScaleLabel = (
    { formatDate, ...restProps },
  ) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;
*/
class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.schedulerData = [
            { startDate: '2021-11-30T09:45', endDate: '2021-11-30T11:00', title: 'Meeting' , infoNaviac: "dsadasdas"},
            { startDate: '2021-11-30T12:00', endDate: '2021-11-30T13:30', title: 'Go to a gym' , infoNaviac: "dsadasdas" },
        ];
        this.state = {
            data: this.schedulerData,
            currentDate: '2021-11-30',
          };
          this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    }
        
    render() {
        const { data, currentDate } = this.state;
        return (
            <div className="calendar">
                <Scheduler data={data}>                       
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    <WeekView
                        
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip
                    />
                </Scheduler>
            </div>
        );
    }
}

export default Calendar;