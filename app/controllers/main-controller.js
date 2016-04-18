
routerApp.controller('MainController',  function(URLServices, ChangeInfor, ShowLog, $scope, $rootScope,  $http, $state, toastr){

  var envi =  'dev';
  //menu
  $scope.activeHome = "li-active-menu";
  $scope.activeInfor = "";
  $scope.activeEvent = "";
  $scope.activeTimetable = "";
  $scope.activeGuide = "";
  $scope.activeContact= "";
  $scope.listTickets = [];
  $scope.listEvent = [];
  $rootScope.showLoad = "hide-load";
  // time hide toastr
  var timOutToastr = 10000;
  // ShowLog.show('showLoad',envi);
  // $scope.backgroundPage ="master-page";
  // $rootScope.pageTitle = "TrainTickets";
  ChangeInfor.change('main');
  // listen list when the postion-seat return
  $scope.$on('eventListTicketsFromPosition', function (event, args) {
    $scope.listTickets = args.listTickets;
   });
   $scope.$on('eventList', function (event, args) {
    $scope.listEvent = args.listEvent;
    });
  // ShowLog.show('test show log services', envi);
  $scope.changeAcitveMenu = function(index){
    // reset
    ShowLog.show('call main menu', envi);
    $scope.activeHome = "";
    $scope.activeInfor = "";
    $scope.activeEvent = "";
    $scope.activeTimetable = "";
    $scope.activeGuide = "";
    $scope.activeContact= "";
    switch (Number(index)) {
      case 1:
        $scope.activeHome = "li-active-menu";
        break;
      case 2:
        $scope.activeInfor = "li-active-menu";
        break;
      case 3:
        $scope.activeEvent = "li-active-menu";
        break;
      case 4:
        $scope.activeTimetable = "li-active-menu";
        break;
      case 5:
        $scope.activeGuide = "li-active-menu";
        break;
      case 6:
        $scope.activeContact = "li-active-menu";
        break;

    }
  }
  // check connect to server
  var autoCheckServer = function(){
    ShowLog.show(URLServices.getURL('train'), envi);
    $http.get(URLServices.getURL('train'))
            .success(function(response, status) {

            }).error(function (data, status, header, config) {
              ShowLog.show(data+", "+status+", "+header+", ", envi );
              ShowLog.show( config, envi);
              if(data == null){
                toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                            'Error',{timeOut:timOutToastr});
              }
          });
  }
  // run when app run
  autoCheckServer();
  ShowLog.show('call main', envi);
});
