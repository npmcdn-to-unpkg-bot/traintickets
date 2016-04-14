
routerApp.controller('mainController',  function(changeInfor, showLog, $scope, $rootScope,  $http, $state, toastr){

  var envi =  'dev';
  //menu
  $scope.active1 = "li-active-menu";
  $scope.active2 = "";
  $scope.active3 = "";
  $scope.active4 = "";
  $scope.active5 = "";
  $scope.active6 = "";
  $scope.listTickets = [];
  $scope.listEvent = [];
  $rootScope.showLoad = "hide-load";
  showLog.show('showLoad',envi);
  // $scope.backgroundPage ="master-page";
  // $rootScope.pageTitle = "TrainTickets";
  changeInfor.change('main');
  // wath
  $scope.$watch('backgroundPage', function() {
        showLog.show('change background page', envi);
        showLog.show($scope.backgroundPage);
    });
  // listen list when the postion-seat return
  $scope.$on('eventListTicketsFromPosition', function (event, args) {
   $scope.listTickets = args.listTickets;
   });
   $scope.$on('eventList', function (event, args) {
    $scope.listEvent = args.listEvent;
    });
  showLog.show('test show log services', envi);
  $scope.changeAcitveMenu = function(index){
    $scope.active1 = "";
    $scope.active2 = "";
    $scope.active3 = "";
    $scope.active4 = "";
    $scope.active5 = "";
    $scope.active6 = "";
    switch (Number(index)) {
      case 1:
        $scope.active1 = "li-active-menu";
        break;
      case 2:
        $scope.active2 = "li-active-menu";
        break;
      case 3:
        $scope.active3 = "li-active-menu";
        break;
      case 4:
        $scope.active4 = "li-active-menu";
        break;
      case 5:
        $scope.active5 = "li-active-menu";
        break;
      case 6:
        $scope.active6 = "li-active-menu";
        break;

    }
  }
});
