//*MAP SCRIPT IZ LEAFLET
let map = L.map("map-container").setView([46.056946, 14.505751], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// //*ADD marker Z Novim klikom se zbrise stari. Updejta tudi koordinate glede na pointer
let currentPointerCoordinates = [46.056946, 14.505751];
let currentMarker = null;

function onMapClick(e) {
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  const x = e.latlng.lat;
  const y = e.latlng.lng;
  const coordinates = [x, y];
  currentMarker = L.marker(coordinates).addTo(map);
  currentPointerCoordinates = coordinates;
  updateCoordinates();

  //* Calculate distance between two markers
  if (previousPointerCoordinates) {
    const distance = calculateDistance(
      previousPointerCoordinates,
      currentPointerCoordinates
    );
    updateDistance(distance);
  }
  previousPointerCoordinates = currentPointerCoordinates;
}

let previousPointerCoordinates = null;

map.on("click", onMapClick);

//*UPDATE COORDINATES
function updateCoordinates() {
  const x = (document.getElementById("x").innerText =
    `X: ` + currentPointerCoordinates[0]);
  const y = (document.getElementById("y").innerText =
    `Y: ` + currentPointerCoordinates[1]);
}

//*THROW BOMB PRIKAŽE KROG EKSPLOZIJE KO PRITISNEŠ SLIDER
function handleThrowBomb() {
  const strongValue = document.getElementById("strong-slider").value;

  var circle = L.circle(currentPointerCoordinates, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: strongValue * 100,
  }).addTo(map);
}

//*DATUM IN URA
function showDate() {
  const dateText = document.getElementById("date");
  const date = new Date();
  const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if needed
  const formattedDate = date.toLocaleDateString();
  dateText.innerText = `${hours}:${minutes} ` + formattedDate;
}
showDate();
setInterval(showDate, 1000);
updateCoordinates();

//*CALCULATE DISTANCE BETWEEN 2 MARKERS
function calculateDistance(point1, point2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(point2[0] - point1[0]); // deg2rad below
  const dLon = deg2rad(point2[1] - point1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1[0])) *
      Math.cos(deg2rad(point2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

//*CONVERTS DEG TO RADIUS
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
//*UPDATE DISTANCE
function updateDistance(distance) {
  document.getElementById("distance").innerText =
    `Total Distance: ${distance.toFixed(2)} km`;
}
//*RESET DISTANCE
function resetDistance() {
  document.getElementById("distance").innerText = "Total Distance: 0.00 km";
  previousPointerCoordinates = null;
}
