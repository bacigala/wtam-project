
//
// Version B of "calendar" for AB testing
// displays calendar as a list of events
// copied from ../calendar/GymCalendar.js
//

import React from "react";
import Calendar from "./Calendar";
import 'moment/locale/sk'
import { useParams } from "react-router-dom";

const GymCalendar = () => {
    const {id} = useParams();
    return (
        <Calendar showAll={false} user={false} gymId={id}/>
    );
}

export default GymCalendar;