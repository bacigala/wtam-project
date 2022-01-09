import React, { useState } from "react";
import { useEffect, useRef } from 'react';
import './CalendarFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let CalendarFilter = ({handleUseCase, handleClose, show, isB, isGymView, reset}) => {
  const showHideClassName = show ? "modal-filter display-block" : "modal-filter display-none";

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;   

  const [userInputTrainer, setUserInputTrainer] = useState('');
  const [userInputGym, setUserInputGym] = useState('');
  const [userInputCategory, setUserInputCategory] = useState('');
  
  const [startTime, setStartTime] = useState(new Date().setHours(0, 0, 0));
  const [endTime, setEndTime] = useState(new Date().setHours(23, 30, 0));

  const[errorMessage, setErrorMessage] = useState('');

  const resetInputField = () => {
    setUserInputTrainer('');
    setUserInputGym('');
    setUserInputCategory('');
    setDateRange([null, null]);
    setStartTime(new Date().setHours(0, 0, 0));
    setEndTime(new Date().setHours(23, 30, 0));
    reset();
  };

  return (
    <div className={showHideClassName}>
      <h3 className="filter_name">Možnosti filtra kalendáru</h3>
      <section className="modal-main">
        <div className="form">
          {isB && <div><label for="date" className="label">Dátum</label>
            <DatePicker
                id="date"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                autoComplete="off"
                placeholderText="Dátumový rozsah"
                className="time_picker_overlay"
                dateFormat="dd/MM/yyyy" 
            /></div>}
            <div>
              <label for="fromTime" className="label">Od</label>
              <DatePicker
                  id="fromTime"
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  className="time_picker_overlay"
              />
            </div>
            <div>
              <label for="toTime" className="label">Do</label>
              <DatePicker
                    id="toTime"
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    className="time_picker_overlay"
                />
            </div>
            <div>
              <label for="Trener" className="label">Trener <b>(optional)</b></label>
              <input type="text" id="Trener" placeholder="Hľadanie podľa mena trénera" className="time_picker_overlay" value={userInputTrainer} onChange= 
              {(e) => setUserInputTrainer(e.target.value)}/>
            </div>
            {!isGymView && <div><label for="Gym" className="label">Gym <b>(optional)</b></label><input type="text" id="Gym" placeholder="Hľadanie podľa mena gymu" 
            className="time_picker_overlay" value={userInputGym} onChange= 
            {(e) => setUserInputGym(e.target.value)}/></div>}
            <div>
              <label for="Category" className="label">Kategoria <b>(optional)</b></label>
              <input type="text" id="Category" placeholder="Hľadanie podľa kategórie tréningu" className="time_picker_overlay" value={userInputCategory} onChange= 
              {(e) => setUserInputCategory(e.target.value)}/>
            </div>
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