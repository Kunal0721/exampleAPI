import React, { useState } from 'react'

function Sleep() {
   // Define state variables for form inputs and prediction result
   const [sleep_duration, setsleep_duration] = useState("");
   const [sleep_efficiency, setsleep_efficiency] = useState("");
   const [sleep_disturbance, setsleep_disturbance] = useState("");
   const [prediction, setPrediction] = useState("");
   const [error, setError] = useState("");
 
   // Handle form submission
   const handleSubmit = async (e) => {
     e.preventDefault(); // Prevent the form from submitting the usual way
 
     // Create the data object to send to the API
     const requestData = {
        sleep_duration: parseFloat(sleep_duration),
        sleep_efficiency: parseFloat(sleep_efficiency),
        sleep_disturbance: parseInt(sleep_disturbance, 10),
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
             value={sleep_duration}
             onChange={(e) => setsleep_duration(e.target.value)}
             required
           />
         </div>
 
         <div>
           <label>Sleep sleep_efficiency : </label>
           <input
             type="text"
             value={sleep_efficiency}
             onChange={(e) => setsleep_efficiency(e.target.value)}
             required
           />
         </div>
 
         <div>
           <label>Sleep sleep_disturbance : </label>
           <input
             type="text"
             value={sleep_disturbance}
             onChange={(e) => setsleep_disturbance(e.target.value)}
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