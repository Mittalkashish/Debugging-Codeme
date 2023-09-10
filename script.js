if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, () => {
      alert("Can't get your coordinates!");
    });
  }

function success(pos){
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];
    var map = L.map('map').setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

    document.getElementById("demo").innerHTML =
    "Latitude: " + coords[0] + "<br>" +
    "Longitude: " + coords[1];
}



