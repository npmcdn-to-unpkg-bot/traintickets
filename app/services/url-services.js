routerApp.service('urlServices', function() {
  var urlPage   = "https://secure-citadel-19906.herokuapp.com/";
  var urlPage2  = "https://sheltered-hollows-98630.herokuapp.com/";
  var urlPage3  = "https://desolate-meadow-21571.herokuapp.com/";
  var urlPage4  = "https://sheltered-plateau-81861.herokuapp.com/";
    this.getURL = function (name) {
        switch (name) {
          case 'customer':
              return urlPage3+"customer";
            break;
          case 'train':
                return urlPage3+"train";
              break;
          case 'event':
                return urlPage3+"eventtrain";
              break;

        }
    }
});
