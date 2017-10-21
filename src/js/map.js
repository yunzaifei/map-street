var map, infowindow, bounds;
var markers = [];
/**
 * 包含地点名称和坐标的对象数组
 */
var locations = [
  {
    title: '天安门广场',
    pinyin: 'Tian An Men Guang Chang',
    position: {
      lat: 39.9063748,
      lng: 116.3925044
    }
  },
  {
    title: '奥林匹克公园',
    pinyin: 'Ao Lin Pi Ke Gong Yuan',
    position: {
      lat: 39.9942851,
      lng: 116.3915031
    }
  },
  {
    title: '颐和园',
    pinyin: 'Yi He Yuan',
    position: {
      lat: 39.9892384,
      lng: 116.232084212
    }
  },
  {
    title: '大观园',
    pinyin: 'Da Guan Yuan',
    position: {
      lat: 39.8712889,
      lng: 116.353961517
    }
  },
  {
    title: '故宫博物院',
    pinyin: 'Gu Gong Bo Wu Yuan',
    position: {
      lat: 39.9101321,
      lng: 116.363471212
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
      requestApi(this.title, function(data){
        var feature = data.geocode.feature;
        var displayContent = feature.highlightedName + '<br><b>En:</b> ' + feature.name;
        populateInfoWindow(this, displayContent);
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
    console.log('sss!');
    try{
    infowindow.open(map, marker);
  }catch(err){
    console.log('err:'+err);
  }
    // Make sure the marker property is cleared if the infowindow is closed.
    console.log('end!');
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