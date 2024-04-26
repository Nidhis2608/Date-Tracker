import React, { useEffect, useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, isToday } from 'date-fns';
import '../Styles/datePicker.css';

const DatePicker = ({
  dateFormat = 'dd/MM/yyyy',
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(2100, 11, 31),
  onSelectDate = () => {}
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showSelectedRange, setShowSelectedRange] = useState(false);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
    setShowSelectedRange(false);
  };

  const changeMonth = (offset) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset));
  };

  useEffect(() => {
    onSelectDate(selectedDate);
  }, [selectedDate]);

  const applySelectedRange = () => {
    setShowSelectedRange(true);
    setSelectedRange([selectedRange[0] || selectedDate, selectedDate]);
  };

  const cancelSelectedRange = () => {
    setSelectedDate(new Date());
    setSelectedRange([]);
    setShowSelectedRange(false);
  };

  const selectToday = () => {
    setSelectedDate(new Date());
  };

  const renderDaysOfWeek = () => {
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day-name" key={i}>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className="days-of-week">{days}</div>;
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`day${isSameMonth(day, monthStart) ? "" : " disabled"}${isSameDay(day, selectedDate) ? " selected" : ""}`}
            key={day}
            onClick={() => handleDayClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>{format(currentMonth, 'MMMM yyyy')}</span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="selected-date-input">
        <input type="text" value={format(selectedDate, dateFormat)} readOnly />
        {isToday(selectedDate) && !showSelectedRange && (
          <button className="today-btn" onClick={selectToday}>Today</button>
        )}
      </div>
      <div className="calendar">
        {renderDaysOfWeek()}
        {renderDays()}
      </div>
      <div className="actions">
        {!showSelectedRange && (
          <>
            <button className="cancel-btn" onClick={cancelSelectedRange}>Cancel</button>
            <button className="apply-btn" onClick={applySelectedRange}>Apply</button>
          </>
        )}
      </div>
      {showSelectedRange && (
        <div className="selected-range-box" style={{gap:"10px"}}>
          <span>{format(selectedRange[0], dateFormat)}</span>
          <span> - </span>
          <span>{format(selectedRange[1], dateFormat)}</span>
          <button className="cancel-btn" onClick={cancelSelectedRange}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
