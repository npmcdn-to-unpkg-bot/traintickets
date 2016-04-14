
routerApp.controller('mainController',  function(changeInfor, showLog, $scope, $rootScope,  $http, $state, toastr){
  $scope.listTickets = [];
  $scope.listEvent = [];
  // $scope.backgroundPage ="master-page";
  // $rootScope.pageTitle = "TrainTickets";
  var envi =  'dev';
  changeInfor.change('main');
  console.log('in');
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
});
