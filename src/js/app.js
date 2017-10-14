var ViewModel = function(){
  var self = this;
  self.menuVisable = ko.observable(true);
  self.filter = ko.observable('');

  self.toggleMenu = function(){
    self.menuVisable(!self.menuVisable());
  }
};

function initApp(){
  initMap();
  ko.applyBindings(new ViewModel());
}