/**
 * knockout视图对象
 */
var ViewModel = function(){
  var self = this;
  self.menuVisable = ko.observable(true);
  self.filter = ko.observable('');
  self.mapClass = ko.computed(function(){
    return self.menuVisable()? 'btn-show' : 'btn-hide';
  }, self);
  /**
   * 动态绑定地址列表
   */
  self.filteredLots = ko.computed(function () {
    var res = locations.filter(function (lot) {
      return lot.title.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
    });
    // 设置地图标记
    setMarkers(res);
    return res;
  });
  /**
   * 切换侧边栏
   */
  self.toggleMenu = function(){
    self.menuVisable(!self.menuVisable());
  }
  /**
   * 点击地点高亮地图上的标记
   */
  self.markLot = function (lot) {
    google.maps.event.trigger(markers[locations.indexOf(lot)], 'click');
  }
};

function initApp(){
  initMap();
  ko.applyBindings(new ViewModel());
}
/**
 * 获取 foursquare 数据
 * @param { String } location
 */
function requestApi(location, cb) {
  var clientId = 'OZZCNKKL5HB1R52BAPET3N32Y3YZ40TR2XG0W53JTH3C00GH';
  var clientSecret = 'E4TWWGI4NXBFG1IIRH3GRKREAQNKGE1FZDGL2VJJDTHRWGVF';
  var url = 'https://api.foursquare.com/v2/venues/search?v=20161016';
  var requestUrl = url + '&near=' + location + '&client_id=' + clientId + '&client_secret=' + clientSecret;
  axios.get(requestUrl)
    .then(function (res) {
      console.log(res);
      console.log(res.data.response);
      cb(res.data.response);
    })
    .catch(function(err){
      alert('获取api错误：' + err);
    });
}