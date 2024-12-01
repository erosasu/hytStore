import React, { useState, useRef } from "react";

const AutocompleteInput = ({ setAdress, address}) => {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const blurTimeout = useRef(null);  // New ref for managing the timeout

  const fetchPredictions = async (value) => {
    try {
      const response = await fetch(`api/autoCompleteAddress?input=${value}`);
      const data = await response.json();
      if (data && data.status === "OK") {
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const updateInputValue = (description) => {
    setInputValue(description);
    setAdress(description);
  };

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    setAdress(newVal);

    if (newVal) {
      fetchPredictions(newVal);
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (description) => {
    setInputValue(description);
    setPredictions([]);
    setAdress(description);
    setIsFocused(false);  // Hide the dropdown
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Add a delay to hide the dropdown to ensure click events on predictions are captured
    blurTimeout.current = setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handlePredictionMouseDown = () => {
    // Clear any existing timeout when a prediction is clicked to prevent hiding the dropdown
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-control"
        type="text"
        value={inputValue||address}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Ingresa la dirección "
      />
      {isFocused && predictions.length > 0 && (
        <div style={{
          color:'black',
          position: 'absolute',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          width: '100%',
          zIndex: 2,
          maxHeight: '150px',
          overflowY: 'auto'
        }}>
          
          {predictions.map((prediction) => (
            <div className="prediction-item" style={{color:'black'}}
              key={prediction.place_id}
              onMouseDown={handlePredictionMouseDown}  // Capture mousedown event
              onClick={() =>{ handlePredictionClick(prediction.description); updateInputValue(prediction.description);}}
            >
              {prediction.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
