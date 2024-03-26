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
}
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

updateCoordinates();

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
