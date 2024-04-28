import React, { useState } from 'react'

function Chatbot() {
    const [user_input, setuser_input] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault(); 
  
      const requestData = {
        user_input : user_input
      };
  
      try {
        const response = await fetch("http://127.0.0.1:8000/chatbot/", {
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
        console.log(data.response);
        setResponse(data.response);
        setError("");
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setError(`Failed to fetch prediction: ${error.message}`);
      }
    };

  return (
    <div>
      <h1>Anxiety Level Prediction</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter text :</label>
          <input
            type="text"
            value={user_input}
            onChange={(e) => setuser_input(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {response && <h2>Response  : {response}</h2>}

      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default Chatbot