routerApp.service('URLServices', function() {
  var urlPage   = "http://traintickets-61869.onmodulus.net/";
  var urlPage2  = "https://sheltered-hollows-98630.herokuapp.com/";
    this.getURL = function (name) {
        switch (name) {
          case 'customer':
              return urlPage+"customer";
            break;
          case 'train':
                return urlPage+"train";
              break;
          case 'event':
                return urlPage+"eventtrain";
              break;
          case 'mail':
                return urlPage+"mail";
              break;
        }
    }
});
