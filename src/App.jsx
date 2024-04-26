import React, { useState } from 'react';
import DatePicker from "./Components/datePicker";
import './App.css'; // Import CSS for centering styles

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="center-container"> {/* Centering container */}
      <div className="app">
        <h1>Select a Date</h1>
        <DatePicker 
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
          maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
          // Additional customization props
        />
      </div>
    </div>
  );
}

export default App;
