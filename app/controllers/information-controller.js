routerApp.controller('InformationController', function(ChangeInfor, ShowLog, URLServices ,$scope, $rootScope, $http, $state) {

  // set active menu
  $scope.activeInfor = "li-active-menu";
  ShowLog.show($scope.activeInfor, envi);
  // show
  var envi = 'dev';
  ChangeInfor.change('information');

  ShowLog.show($scope.activeInfor, envi);
  ShowLog.show($rootScope.title);
  function hidetext() {
    $scope.tickcode = "";
    $scope.seatcode = "";
    $scope.TrainJourney = "";
    $scope.namecustomer = "";
    $scope.phonecustomer = "";
    $scope.email = "";
    $scope.Indentitycard = "";
    $scope.object = "";
    $scope.typeseat = "";
    $scope.inforticket = "";
    $scope.state = "";
    $scope.money = "";
    $scope.TotalPrice = "";
    $scope.companyname = "";
    $scope.taxnumber = "";
    $scope.addresscompany = "";
    $scope.emailcompany = "";
    $scope.datebuy = "";
    $scope._idDelete = null;
    $scope._idSearch = null;
    $scope.datego = "";

  };
  $scope.search = function() {
    if ($scope._idSearch == null) {
      BootstrapDialog.alert({
        title: 'Warrning',
        message: 'Please type ticket code'
      });
      hidetext();
    } else {
      $http.post(URLServices.getURL('customer') +"/" + $scope._idSearch).success(function(response) {

        $scope.tickcode = response.ticket._id;
        $scope.seatcode = response.ticket.seatNumber;
        $scope.TrainJourney = response.ticket.startStation + " - " + response.ticket.endStation;
        $scope.namecustomer = response.name;
        $scope.phonecustomer = response.phone;
        $scope.email = response.email;
        $scope.Indentitycard = response._id;
        $scope.object = response.ticket.object;
        $scope.typeseat = response.ticket.typeSeat;
        // $scope.setValues = ", time: ";
        $scope.datego = response.ticket.date;
        $scope.inforticket = "Code train: " + response.ticket._idTrain + ", name train: " + response.ticket.nameTrain + ", coach: " + response.ticket.coachTrain;
        $scope.state = response.ticket.state;
        $scope.money = response.ticket.price;
        $scope.TotalPrice = response.ticket.price;
        $scope.companyname = response.company.nameCompany;
        $scope.taxnumber = response.company.taxNumber;
        $scope.addresscompany = response.company.addressCompany;
        $scope.emailcompany = response.company.emailCompany;
        $scope._idSearch = ""
      }).error(function(response) {
        console.log($scope._idSearch + "sss");
        BootstrapDialog.show({
          title: 'Warrning',
          message: 'No ticket was found'
        });
        hidetext();
      });
    }
  };

  $scope.delete = function() {
    if ($scope._idDelete == null) {
      BootstrapDialog.alert({
        title: 'Warrning',
        message: 'Please type ticket code'
      });
    } else {
      $http.put(URLServices.getURL('customer') +"/"+ $scope._idDelete).success(function(response) {
        BootstrapDialog.show({
          title: 'Sucessed',
          message: 'You have cacel completed ticket'
        });
      }).error(function(response) {
        BootstrapDialog.show({
          title: 'Warrning',
          message: 'No ticket was found'
        });
      });
      hidetext();
    }
  };
});
