routerApp.service('urlServices', function() {
  var urlPage   = "https://secure-citadel-19906.herokuapp.com/";
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

        }
    }
});
