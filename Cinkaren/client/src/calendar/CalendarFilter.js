import React, { useState } from "react";
import { useEffect, useRef } from 'react';
import './CalendarFilter.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let CalendarFilter = ({handleUseCase, handleClose, show}) => {
  const showHideClassName = show ? "modal-filter display-block" : "modal-filter display-none";
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;   
  const [userInput, setUserInput] = useState('');

  const resetInputField = () => {
    setUserInput('');
    setDateRange([null, null]);
  };

  return (
    <div className={showHideClassName}>
      <h3 className="filter_name">Možnosti filtra kalendáru</h3>
      <section className="modal-main">
        <div className="datarange_picker">
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
                showTimeSelect
            />
            <input type="text" placeholder="Hľadanie podľa mena gymu" className="time_picker_overlay" value={userInput} onChange= 
            {(e) => setUserInput(e.target.value)}/>

            <select name="categories" id="category_select" className="category_selector">
              <option value="">--Vyberte kategóriu--</option>
            </select>

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
                  handleUseCase(startDate, endDate, userInput);  
               } }> 
          Použi filtre
        </button>
      </section>
    </div>
  );
};

export default CalendarFilter;