import React from "react";
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <AppointmentTooltip.Header {...this.props} className="headerPopup">
                <h2 className="title">{this.props.appointmentData.name}</h2>
            </AppointmentTooltip.Header>
        );
    }
}

export default Header;