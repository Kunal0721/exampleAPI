import React, { useState } from 'react'

function AnxietyLevel() {
    const [text, setText] = useState("");
    const [prediction, setPrediction] = useState("");
    const [error, setError] = useState("");
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the form from submitting the usual way
  
      // Create the data object to send to the API
      const requestData = {
        text : text
      };
  
      try {
        // Send a POST request to the Flask API
        const response = await fetch("http://127.0.0.1:8000/anxi/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        console.log(data);
        console.log(data.prediction);
        setPrediction(data.prediction);
        // Set the prediction state with the API response
        // setPrediction(data.diagnosis);
        setError("");
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching prediction:", error);
        setError(`Failed to fetch prediction: ${error.message}`);
      }
    };

  return (
    <div>
      <h1>Anxiety Level Prediction</h1>

      {/* Form for user inputs */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter text :</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
{/* 
        <div>
          <label>Body Temperature:</label>
          <input
            type="text"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Number of Steps:</label>
          <input
            type="text"
            value={stepCount}
            onChange={(e) => setStepCount(e.target.value)}
            required
          />
        </div> */}

        {/* Submit button */}
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>prediction : {prediction}</h2>}

      {/* Display the prediction result */}

      {/* Display any error messages */}
      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default AnxietyLevel