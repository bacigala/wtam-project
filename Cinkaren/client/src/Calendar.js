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
  CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import 'moment/locale/sk'
import { withStyles } from '@material-ui/core/styles';

const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    firstRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
      height: '260px',
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });

const formatTimeScaleDate = date => moment(date).format('HH:mm');

const TimeScaleLabel = (
    { formatDate, ...restProps },
  ) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;

const formatDayScaleDate = (date, options) => {
    moment.locale('sk');
    const momentDate = moment(date);
    const { weekday } = options;
    return momentDate.format(weekday ? 'dddd' : 'D');
};

const styles = {
    dayScaleCell: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

const DayScaleCell = withStyles(styles, 'DayScaleCell')((
    { formatDate, classes, ...restProps },
  ) => (
    <WeekView.DayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      className={classes.dayScaleCell}
    />
  ));


const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <div className="popup">
        <h2>{appointmentData.title}</h2>
        <h3>{appointmentData.gym}</h3>
        <ul>
            {appointmentData.plan.map(e => <li>{e}</li>)}
        </ul>
        <ul>
            {appointmentData.prihlaseny.map(e => <li>{e}</li>)}
        </ul>
    </div>
  ));

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.schedulerData = [
            { startDate: '2021-11-30T09:45', 
              endDate: '2021-11-30T11:00', 
              title: 'Meeting' , 
              gym: "Top Gym",
              plan: ["Rozcvicka", "Nohy", "Kondicka"], 
              prihlaseny: ["Rado", "Jozo"],
              trener: "trener1"},
            { startDate: '2021-11-30T12:00', 
              endDate: '2021-11-30T13:30', 
              title: 'Go to a gym' , 
              gym: "Strong Gym", 
              plan: ["Rozcvicka", "Biceps", "Triceps", "Prsia"], 
              prihlaseny: ["Rado", "Jozo"],
              trener: "trener2"},
        ];
        this.state = {
            data: this.schedulerData,
            currentDate: '2021-11-30',
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.updateInterval = 60000;
    }
        
    render() {
        const { data, currentDate } = this.state;
        return (
            <section className="calendar">
                <Scheduler data={data}>                       
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    <WeekView
                        timeScaleLabelComponent={TimeScaleLabel}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip
                        contentComponent={Content}
                        showCloseButton
                    />
                    <CurrentTimeIndicator
                        updateInterval={this.updateInterval}
                     />
                </Scheduler>
            </section>
        );
    }
}

export default Calendar;