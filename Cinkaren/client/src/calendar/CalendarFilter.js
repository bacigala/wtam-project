import React, { useState } from "react";
import { useEffect, useRef } from 'react';
import './CalendarFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let CalendarFilter = ({handleUseCase, handleClose, show, isA}) => {
  const showHideClassName = show ? "modal-filter display-block" : "modal-filter display-none";

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;   

  const [userInputTrainer, setUserInputTrainer] = useState('');
  const [userInputGym, setUserInputGym] = useState('');
  const [userInputCategory, setUserInputCategory] = useState('');
  
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const[errorMessage, setErrorMessage] = useState('');

  const resetInputField = () => {
    setUserInputTrainer('');
    setUserInputGym('');
    setUserInputCategory('');
    setDateRange([null, null]);
    setStartTime(new Date());
    setEndTime(new Date());
  };

  return (
    <div className={showHideClassName}>
      <h3 className="filter_name">Možnosti filtra kalendáru</h3>
      <section className="modal-main">
        <div className="datarange_picker">
          {isA &&
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                withPortal
                placeholderText="Dátumový rozsah"
                className="time_picker_overlay"
                dateFormat="yyyy/MM/dd" 
            />}

            <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                placeholderText="Denný filter od:"
                dateFormat="hh:mm"
                className="time_picker_overlay"
            />
          <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="hh:mm"
                className="time_picker_overlay"
            />
            

            <input type="text" placeholder="Hľadanie podľa mena trénera" className="time_picker_overlay" value={userInputTrainer} onChange= 
            {(e) => setUserInputTrainer(e.target.value)}/>

            <input type="text" placeholder="Hľadanie podľa mena gymu" className="time_picker_overlay" value={userInputGym} onChange= 
            {(e) => setUserInputGym(e.target.value)}/>

            <input type="text" placeholder="Hľadanie podľa kategórie tréningu" className="time_picker_overlay" value={userInputCategory} onChange= 
            {(e) => setUserInputCategory(e.target.value)}/>

            {<h4 className="filter_error"> {errorMessage} </h4>}

        </div>   
          <button type="button" className="button_modal button-left" onClick={() => {handleClose()}}>
          Zatvoriť
        </button>
        <button type="button" className="button_modal button-middle" onClick={resetInputField}>
          Resetuj filtre
        </button>
        <button className="button_modal button-right" 
                type="submit" 
                onClick={ () => { 
                  handleUseCase(startDate, endDate, startTime, endTime, userInputTrainer, userInputGym, userInputCategory);  
               } }> 
          Použi filtre
        </button>
      </section>
    </div>
  );
};

export default CalendarFilter;