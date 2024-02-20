const fetchAppointment = async (id) => {
console.log('fetchAppointment called...');
  try {
    const response = await fetch(`/appointment/${id}`);
    const data = await response.json();
    
    if (response.status === 404) {
      console.log('No appointment found, creating new appointment...');
      const newAppointmentData = await createAppointment(id);
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(newAppointmentData.appointment))}`;
    } else {
      console.log('Appointment found...');
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(data.appointment))}`;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// This is for Clients only
const createAppointment = async (clientId) => {
  console.log('createAppointment called for clients...');
  const response = await fetch(`/appointment/create-appt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
    credentials: 'include',
  });
  const data = await response.json();
  console.log('New appointment created...');
  return data;
};

// Export to dashboard.js, client.js
export { fetchAppointment }; // fetchAppointment(id)