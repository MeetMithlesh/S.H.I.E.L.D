const predictFlood = async (city) => {
    try {
      const response = await fetch('http://localhost:8000/predict/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city })
      });
      
      const result = await response.json();
      console.log('Prediction:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  predictFlood('Delhi');