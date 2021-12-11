import React from "react";
import {Appointments} from '@devexpress/dx-react-scheduler-material-ui';

class CustomAppointment extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Appointments.Appointment
                {...this.props}
                style={{ backgroundColor: "green" }}
                className="CLASS_ROOM2"
            />
        );
    }
}

export default CustomAppointment;