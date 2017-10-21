var map, infowindow, bounds;
var markers = [];
/**
 * 包含地点名称和坐标的对象数组
 */
var locations = [
  {
    title: '五一广场',
    pinyin: 'Wu Yi Guang Chang',
    position: {
      lat: 37.860819,
      lng: 112.574535
    }
  },
  {
    title: '龙潭公园',
    pinyin: 'Longtan Park',
    position: {
      lat: 37.884749,
      lng: 112.554009
    }
  },
  {
    title: '柳巷食品街',
    pinyin: 'Liuxiang Food Street',
    position: {
      lat: 37.869010,
      lng: 112.562318
    }
  },
  {
    title: '晋祠公园',
    pinyin: 'Jinci Temple',
    position: {
      lat: 37.706952,
      lng: 112.447634
    }
  },
  {
    title: '学府公园',
    pinyin: 'Xue Fu Gong Yuan',
    position: {
      lat: 37.812106,
      lng: 112.573411
    }
  }
]
/**
 * 初始化地图
 */
function initMap() {
  infowindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.868495, lng: 112.553638}
  });
  setMarkers(locations);
  map.fitBounds(bounds);
}
/**
 * 设置地图上显示的markers
 * @param {Array} locations 包含地点名称和坐标的对象数组
 */
function setMarkers(locations){
  clearMarker();
  for(var i = 0; i < locations.length; i++){
    var loc = locations[i];
    var position = loc.position;
    var title = loc.title;
    var marker = showMarker(loc, i);
    markers.push(marker);
    bounds.extend(loc.position);
    marker.addListener('click', function(){
      var self = this;
      requestApi(self, function(data){
        populateInfoWindow(self, data);
      })
    });
  }
}
/**
 * 清除地图上的marker
 */
function clearMarker(){
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
}
/**
 * 在地图上显示marker
 * @param {Object} marker marker对象
 * @param {Number} index marker在数组中的index
 */
function showMarker(marker, index){
  return new google.maps.Marker({
    position: marker.position,
    map: map,
    title: marker.title,
    animation: google.maps.Animation.DROP,
    id: index
  })
}
/**
 *
 * @param { Object } marker Marker对象
 * @param { Object } infowindow InfoWindow对象
 */
function populateInfoWindow(marker, displayContent) {
  if (!marker.map) {
    marker.setMap(map);
  }
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent(displayContent);
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function () {
      infowindow.setMarker = null;
    });
    // bounce marker
    marker.setAnimation(google.maps.Animation.BOUNCE);
    // clear animation
    setTimeout(function () {
      marker.setAnimation(null);
    }, 1400)
  }
}
/**
 * Google Map Error Handler
 */
function mapError(){
  alert('Google Map initialized Error');
}