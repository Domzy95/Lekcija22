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

let map = L.map("map-container").setView([46.056946, 14.505751], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//*ADD marker

let currentMarker = null;
function onMapClick(e) {
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  currentMarker = L.marker(e.latlng).addTo(map);
}

map.on("click", onMapClick);
