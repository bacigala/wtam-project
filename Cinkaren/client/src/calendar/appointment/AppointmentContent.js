import React from "react";
import {getTimeFromDateString} from "../../UtilityFunctions";
import {Appointments} from '@devexpress/dx-react-scheduler-material-ui';

class AppointmentContent extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props);
    }

    render(){
        return (
          <Appointments.AppointmentContent {...this.props}>
            <div className="appointment">
              <p className="appointment_name">{this.props.data.name}</p>
              <p className="appointment_time_from">Od: {getTimeFromDateString(this.props.data.startDate)}</p>
              <p className="appointment_time_to">Do: {getTimeFromDateString(this.props.data.endDate)}</p>
              <p className="appointment_trainer">{this.props.data.trainer_name + " " + this.props.data.trainer_surname}</p>
            </div>
          </Appointments.AppointmentContent>
        );
    }
}

export default AppointmentContent;