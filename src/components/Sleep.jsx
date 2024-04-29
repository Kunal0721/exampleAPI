import React, { useState } from 'react'

function Sleep() {
   // Define state variables for form inputs and prediction result
   const [sleep_durations, setsleep_durations] = useState("");
   const [efficiency, setefficiency] = useState("");
   const [disturbance, setdisturbance] = useState("");
   const [prediction, setPrediction] = useState("");
   const [error, setError] = useState("");
 
   // Handle form submission
   const handleSubmit = async (e) => {
     e.preventDefault(); // Prevent the form from submitting the usual way
 
     // Create the data object to send to the API
     const requestData = {
        sleep_durations: parseFloat(sleep_durations),
        efficiency: parseFloat(efficiency),
        disturbance: parseInt(disturbance, 10),
     };
 
     try {
       // Send a POST request to the Flask API
       const response = await fetch("http://127.0.0.1:8000/sleep/", {
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
       <h1>Sleep Level Prediction</h1>
 
       {/* Form for user inputs */}
       <form onSubmit={handleSubmit}>
         <div>
           <label>Sleep Duration : </label>
           <input
             type="text"
             value={sleep_durations}
             onChange={(e) => setsleep_durations(e.target.value)}
             required
           />
         </div>
 
         <div>
           <label>Sleep Efficiency : </label>
           <input
             type="text"
             value={efficiency}
             onChange={(e) => setefficiency(e.target.value)}
             required
           />
         </div>
 
         <div>
           <label>Sleep Disturbance : </label>
           <input
             type="text"
             value={disturbance}
             onChange={(e) => setdisturbance(e.target.value)}
             required
           />
         </div>
 
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
   ); 
}

export default Sleep