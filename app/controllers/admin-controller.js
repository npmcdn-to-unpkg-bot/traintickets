routerApp.controller('AdminController',  function(ChangeInfor, ShowLog, $scope, $http, $state){
  // $scope.show = true;
  //change infor
  ChangeInfor.change('admin');
  $scope.$on('$stateChangeSuccess', function (event, toState) {
      // $scope.show = false;
      // console.log($scope.show);
    if (toState.name === 'main.admin.profile') {
      changeActiveMenu('profile');
      // $scope.show = true;
    }
    if (toState.name === 'main.admin.event') {
      changeActiveMenu('event');
      // $scope.show = true;
    }
    if (toState.name === 'main.admin.user') {
      changeActiveMenu('user');
      // $scope.show = true;
    }
    if (toState.name === 'main.admin.train') {
      changeActiveMenu('train');
      // $scope.show = true;
    }
    if (toState.name === 'main.admin.coach') {
      changeActiveMenu('coach');
      // $scope.show = true;
    }
    // console.log($scope.show);
  });
});
