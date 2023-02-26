const miniMap = document.querySelector('#map-address');
$(document).ready(function () {
  var mapObj = null;
  var defaultCoord = [15.986664203108441, 108.27116211305282]; // coord mặc định, Hà Nội
  var zoomLevel = 15; // Mức phóng to bản đồ
  var mapConfig = {
    attributionControl: false, // để ko hiện watermark nữa, nếu bị liên hệ đòi thì nhớ open nha
    center: defaultCoord, // vị trí map mặc định hiện tại
    zoom: zoomLevel,
  };

  mapObj = L.map('map-address', mapConfig);

  // thêm tile để map có thể hoạt động, xài free từ OSM
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapObj);

  // Add marker
  var marker_coord = [15.986664203108441, 108.27116211305282]; // Toạ độ marker
  L.marker(marker_coord).addTo(mapObj);
});
