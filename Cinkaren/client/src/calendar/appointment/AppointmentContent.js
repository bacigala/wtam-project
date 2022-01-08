import React from "react";
import {getTimeFromDateString, getHoursFromDateString} from "../../UtilityFunctions";
import {Appointments} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

class AppointmentContent extends React.Component {
    
    constructor(props) {
        super(props);
    }

    getClassNames = (e) => {
      let classNames = "appointment";
      let startTime = moment(e.props.data.startDate);
      let endTime = moment(e.props.data.endDate);
      var duration = moment.duration(endTime.diff(startTime));
      if (duration.asHours() < 1) {
        classNames += " shortAppointment";
      }
      return classNames;
    };

    render(){
        return (
          <Appointments.AppointmentContent {...this.props}>
            <div className={this.getClassNames(this)} id={getHoursFromDateString(this.props.data.startDate)}>
              <p className="appointment_name">{this.props.data.name}</p>
              <p className="appointment_time_from">
                {getTimeFromDateString(this.props.data.startDate)} - {getTimeFromDateString(this.props.data.endDate)}
              </p>
              <p className="appointment_trainer">{this.props.data.trainer_name + " " + this.props.data.trainer_surname}</p>
            </div>
          </Appointments.AppointmentContent>
        );
    }
}

export default AppointmentContent;