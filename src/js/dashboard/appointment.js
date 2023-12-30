const fetchAppointment = async (clientId) => {
  console.log(`Fetching appointment for client with ID: ${clientId}`); //!! just for debugging
  try {
    const response = await fetch(`/appointment/${clientId}`);
    const data = await response.json();
    
    //!! just for debugging
    console.log(`Server responded with status code: ${response.status}`);
    console.log(`Response data: ${JSON.stringify(data)}`);
    
    if (response.status >= 400) {
      // The server responded with an error
      console.error(`Server responded with status code ${response.status}`);
    }
    
    if (response.status === 404) {
      console.log('No appointment found, creating new appointment...');
      const newAppointmentData = await createAppointment(clientId);
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(newAppointmentData.appointment))}`;
    } else {
      console.log('Appointment found...');
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(data.appointment))}`;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const createAppointment = async (clientId) => {
  console.log(`Sending POST request to /appointment with client ID: ${clientId}`); //!! just for debugging
  const response = await fetch(`/appointment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
    credentials: 'include',
  });
  const data = await response.json();
  console.log('New appointment created...');
  //!! just for debugging
  console.log(`Server responded with status code: ${response.status}`);
  console.log(`New appointment data: ${JSON.stringify(data)}`);
  return data;
};

// Export to client.js
export { fetchAppointment };