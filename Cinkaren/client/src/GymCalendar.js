import React from "react";
import Calendar from "./Calendar";
import 'moment/locale/sk'
import { useParams } from "react-router-dom";

const GymCalendar = () => {
    const {id} = useParams();
  
    return (
        <Calendar user="false" gymId={id}/>
    );
}

export default GymCalendar;