const getUserLocations = () => localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [];

const setUserLocations = data => localStorage.setItem('locations', JSON.stringify(data));

const trackUserLocation = () => {
  setInterval(getLocation, 5000);
};

const getLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(saveLocation);
  } else {
    alert("Geo Location not supported by browser");
  }
}

const saveLocation = (position) => {
  const location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
    timestamp: new Date().getTime()
  };
  const locations = getUserLocations();
  locations.push(location);
  setUserLocations(locations);
}

export {
  trackUserLocation,
  getUserLocations
};