routerApp.controller('findController', function(changeInfor, showLog, urlServices, $scope, $http, $state, $q, localStorageService) {
    //change infor
    changeInfor.change('main');

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
        if (!go || !to) {
              BootstrapDialog.alert("Please enter your place of departure, destination!!!");
          } else if (go == to) {
              BootstrapDialog.alert("The departure, the destination must be different!!!");
          } else {
        $http
            .post(urlServices.getURL('train'), {
                fromStation: go,
                toStation: to,
                time: dateOneWay.getTime()
            })
            .success(function(response, status) {
              $scope.journey.listTrain = response.listTrainResult;
              $scope.journey.fromStation = go;
              $scope.journey.toStation = to;
              $scope.journey.time = dateOneWay.getTime();
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
                        if(data ==  null){
                          BootstrapDialog.alert('Cannot connect to the server');
                        }else{
                          BootstrapDialog.alert("Round tip: Cannot find the train!");
                        }
                      });

                    }else{
                      $state.go('main.position-seat');
                    }
                }).error(function (data, status, header, config) {
                  if(data ==  null){
                    BootstrapDialog.alert('Cannot connect to the server');
                  }else{
                      BootstrapDialog.alert("On Way: Cannot find the train!");
                  }

                });
      }
    };
});
