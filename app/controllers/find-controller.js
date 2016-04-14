routerApp.controller('findController', function(changeInfor, toastr, showLog, urlServices, $scope, $rootScope, $http, $state, $q, localStorageService) {
    //change infor
    changeInfor.change('main');
    var envi = 'product';
    $scope.journey = {
        "listTrain": [],
        "fromStation": '',
        "toStation": '',
        "time": ''
    };
    $scope.journeyReturn = {
        "listTrain": [],
        "fromStation": '',
        "toStation": '',
        "time": ''
    };
    $scope.respsoneJourne = '';
    $scope.respsoneJourneReturn = '';
    $scope.listTrain = '' ;
    $scope.timeOneWay ='';
    $scope.timeRountrip = '';
    $scope.changeSate = function() {
        $state.go('main.position-seat');
    }
    $scope.activeButton = true;
    $scope.disbaleRoundTripA = function() {
        $scope.activeButton = true;
    }
    $scope.disbaleRoundTripB = function() {
            $scope.activeButton = false;
        }
        //sendResult
    $scope.eventSubmit = function() {
        $scope.listTrain1;
        var go = document.getElementById('from').value;
        var to = document.getElementById('to').value;
        var dateGo =document.getElementById('dateGo').value;
        var dateTo =document.getElementById('dateTo').value;
        var dateOneWay = new Date(dateGo);
        var dateRountrip = new Date(dateTo);
        showLog.show(dateOneWay+" "+ dateRountrip, envi);
        if (!go) {
              $scope.classInputGo = "class-boder-red";
              toastr.error("Please enter your place of departure!!!");
          } else if (!to) {
              $scope.classInputTo = "class-boder-red";
              toastr.error("Please enter your place of  destination!!!");
          } else if (go == to) {
              toastr.error("The departure, the destination must be different!!!");
          } else if (!dateGo || !dateTo) {
              toastr.error("Please choose a date!!!");
          } else if ((dateOneWay.getDate() >= dateRountrip.getDate()) && ($scope.activeButton == false)) {
              toastr.error("Date for Oneway must be after day for date Roundtrip !!!");
          } else {
            // show load ding
            $rootScope.showLoad = "show-load";
        $http
            .post(urlServices.getURL('train'), {
                fromStation: go,
                toStation: to,
                time: dateOneWay.getTime()
            })
            .success(function(response, status) {
              $rootScope.showLoad = "hide-load";
              showLog.show('response', envi);
              showLog.show(response, envi);
              if((typeof response.listTrainResult) != 'undefined' )
              {
                  $scope.journey.listTrain = response.listTrainResult;
                  $scope.journey.fromStation = go;
                  $scope.journey.toStation = to;
                  $scope.journey.time = dateOneWay.getTime();
                  showLog.show('listGet',envi);
                  showLog.show(response.listTrainResult, envi);
                  localStorageService.set('journey', $scope.journey);
                  // set null if don't return
                  localStorageService.set('journeyReturn', null);
                  // if return
                  if($scope.activeButton == false){
                      $http
                          .post(urlServices.getURL('train'), {
                              fromStation: to,
                              toStation: go,
                              time: dateRountrip.getTime()
                          })
                          .success(function(response, status) {
                            // console.log('go to return');
                            $scope.journeyReturn.listTrain = response.listTrainResult;
                            $scope.journeyReturn.fromStation = to;
                            $scope.journeyReturn.toStation = go;
                            $scope.journeyReturn.time = dateRountrip.getTime();
                            localStorageService.set('journeyReturn', $scope.journeyReturn);
                            $state.go('main.position-seat');
                          }).error(function (data, status, header, config) {
                            $rootScope.showLoad = "hide-load";
                            if(data ==  null){
                              BootstrapDialog.alert('Cannot connect to the server');
                            }else{
                              BootstrapDialog.alert("Round tip: Cannot find the train!");
                            }
                          });

                        }else{
                          $rootScope.showLoad = "hide-load";
                          $state.go('main.position-seat');
                        }
                    }else{

                    }
                }).error(function (data, status, header, config) {
                  $rootScope.showLoad = "hide-load";
                  if(data ==  null){
                    BootstrapDialog.alert('Cannot connect to the server');
                  }else{
                      BootstrapDialog.alert("On Way: Cannot find the train!");
                  }

                });
      }
    };
});
