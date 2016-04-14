routerApp.controller('positionController',  function(changeInfor, urlServices, showLog, $scope, $http, $state, $window, $q, localStorageService, toastr ){
  /*INIT*/
  $scope.journey = '';
  $scope.journeyReturn = '';
  // current time of the train Run
  $scope.currentTime = '';
  //
  $scope.listTimeTrainJourney= [];
  $scope.listTimeTrainJourneyReturn= [];
  // list of the train has been seleted
  $scope.trainsActive = [];
  // The train position has been seleted
  $scope.positionTrainActive = 0;
  // The coach position has been seleted from the train.
  $scope.positionCoachctive = 0;
  // save temp tickets
  $scope.listTickets  = [];
  // list of the train has been selected
  $scope.trainsActive = "";
  // the train has been selected
  $scope.trainAcitve  = "";
  // the coach has been selected
  $scope.coachActive  = "";
  // list of the seat  view
  $scope.listSeat     = "";
  // isReturn tickets
  $scope.isReturn     = false;
  // from the station
  $scope.fromStation  = '';
  // to the station
  $scope.toStation    = '';
  // time
  $scope.time         = '';
  // name train
  $scope.nameTrain    = '';
  // show labale
  $scope.show = 'lbl-die';
  // show log console
  var envi = 'dev';
  // change infor
  changeInfor.change('position');
  /*
  * METHODS
  */

  // change state to regist-tickets when customer choose successlly
  $scope.changeSate = function(){
    if($scope.listTickets.length > 0)
      {
        var ticket = ($scope.listTickets.length == 1)? 'ticket' : 'tickets';
        BootstrapDialog.confirm('Are you sure want to buy the ' + ticket + '?', function(result){
           if(result) {
                $scope.$emit('eventListTicketsFromPosition', { listTickets: $scope.listTickets });
                $state.go('main.regist-tickets');
           }else {

           }
       });
      }
    else{
      toastr.warning('Your list is empty.', 'Warning');
    }
      // BootstrapDialog.alert('Your list is empty?');
  }
  /// show list of the coachss in the train when click menu
  $scope.changeListCoach =  function(li){
    $scope.positionTrainActive  = li.$index;
    changeActiveDivTrain($scope.positionTrainActive);
    $scope.trainActive          =  $scope.trainsActive[$scope.positionTrainActive];
    $scope.coachActive          =  $scope.trainActive.coachs[0];
    $scope.nameTrain            =  $scope.trainActive.title;
    if(!$scope.isReturn)
      $scope.currentTime  = $scope.listTimeTrainJourney[li.$index].timeStart;
    else
      $scope.currentTime  = $scope.listTimeTrainJourneyReturn[li.$index].timeStart;
    //
    changeActiveDivTrain(li.$index);
    filterListSeat().then(function(greeting) {
      changeActiveCoachMenus(0);

    }, function(reason) {
      showLog.show(reason);
    });
    // filterListSeat();
    // changeActiveTrainMenus(0);
  }
  /// show list of the seats in the coach when click menu
  $scope.changeListSeat =  function(li){
    changeActiveCoachMenus(li.$index);
    $scope.positionCoachctive = li.$index;
    $scope.coachActive        =  $scope.trainActive.coachs[$scope.positionCoachctive];

    //
    filterListSeat();
  }

  // add tickets
  $scope.chooseSeat =  function(div){
    $scope.seat = $scope.listSeat[div.$index];
    if($scope.listTickets.length > 2){// one customer only choose three the tickets
      toastr.warning('Your list is full.', 'Warning');
      return;
    }else if($scope.listTickets.length > 0){
      for(var j = 0; j < $scope.listTickets.length; j ++  ){
        if( ($scope.listTickets[j].seatNumber == $scope.seat.number)
            && $scope.listTickets[j]._idTrain == $scope.trainActive._id
            && $scope.listTickets[j].coachTrain == $scope.coachActive._id){
          toastr.warning('You chosen it!', 'Warning');
          // BootstrapDialog.alert('You chosen it!');
          return ;
        }

      };
    }
    var id =  $window.Math.round(Number(new Date().getTime())/1000*$window.Math.random());
    var price = Number($scope.coachActive.price)
                      + Number(getPriceDistance($scope.trainActive, $scope.fromStation, $scope.toStation));
    showLog.show('price '+ price, envi);
    $scope.seatO = {
      "_id"         : id,
      "_idTrain"    : $scope.trainActive._id,
      "coachTrain"  : $scope.coachActive._id,
      "date"        : convertTime($scope.time, $scope.currentTime),
      "dateBuy"     : new Date().getTime(),
      'object'      : 'Adult',
      "seatNumber"  : $scope.seat.number,
      "nameTrain"   : $scope.nameTrain,
      "typeSeat"    : $scope.coachActive.typeCoach,
      "isReturn"    : $scope.isReturn,
      "startStation": $scope.fromStation,
      "endStation"  : $scope.toStation,
      "price"       : price,
      "state"       : 'buy'
    };
    showLog.show('create seat', envi);
    showLog.show($scope.seatO, envi);
    $scope.listTickets.push($scope.seatO);
    filterListSeat();// update view
  }
  // remov tikect
  $scope.removeTicket = function(div){
    $scope.listTicketsTemp  = $scope.listTickets;
    $scope.listTickets      = []; //new listTicketsTemp
    $scope.posi             = div.$index;

    for($scope.i = 0; $scope.i < $scope.listTicketsTemp.length; $scope.i ++  ){
      if( $scope.i  != $scope.posi){
        $scope.listTickets.push($scope.listTicketsTemp[$scope.i]);
      }
    }
    changeActiveDivTrain(0);
    filterListSeat();// update view
  }
  // change Journey
  $scope.changeJourney  =  function(){
    //  flag the ticket type is type return
    $scope.isReturn     = false;
    $scope.fromStation  = $scope.journey.fromStation;
    $scope.toStation    = $scope.journey.toStation;
    $scope.time         = $scope.journey.time;
    // set default train
    $scope.trainsActive = $scope.journey.listTrain;
    $scope.trainActive  = $scope.trainsActive[0];
    $scope.coachActive  = $scope.trainActive.coachs[0];
    $scope.nameTrain    =  $scope.trainActive.title;

    $scope.currentTime  = $scope.listTimeTrainJourney[0].timeStart;
    //
    filterListSeat().then(function(greeting) {
      changeActiveTrainMenus(0);
      changeActiveDivTrain(0);
      changeActiveCoachMenus(0);

    }, function(reason) {
      showLog.show(reason, envi);
    });

  }
  //
  $scope.getTimeDate = function(idTrain, info){
    if($scope.isReturn){
      for(var i = 0; $scope.listTimeTrainJourneyReturn.length; i++){
        if($scope.listTimeTrainJourneyReturn[i].id == idTrain){
          switch (info) {
            case 'from':
              return $scope.listTimeTrainJourneyReturn[i].fromStation;
            case 'to':
              return $scope.listTimeTrainJourneyReturn[i].toStation;
            case 'time':
              var hour = $window.Math.round(Number($scope.listTimeTrainJourneyReturn[i].timeStart)/60);
              var min  = Number($scope.listTimeTrainJourneyReturn[i].timeStart) % 60;
              if (min == 0)
                min ="00";
              if(hour < 10)
                hour = "0"+hour.toString();
              return hour + ":" + min;
          }
        }
      }
    }else{
      for(var i = 0; $scope.listTimeTrainJourney.length; i++){
        if($scope.listTimeTrainJourney[i].id == idTrain){
          switch (info) {
            case 'from':
              return $scope.listTimeTrainJourney[i].fromStation;
            case 'to':
              return $scope.listTimeTrainJourney[i].toStation;
            case 'time':
              var hour = $window.Math.round($scope.listTimeTrainJourney[i].timeStart/60);
              var min  = $scope.listTimeTrainJourney[i].timeStart % 60;
              return hour + ":" + min;
          }
        }
      }
    }
    return '';
  }
  // click tag return journey
  $scope.changeJourneyReturn  =  function(){
      if($scope.journeyReturn == null
          || $scope.journeyReturn.listTrain.length == 0){
          changeActiveTrainMenus(0);
          toastr.error('You cannot choose this function!');
      }else{
        //  flag the ticket type is type return
        $scope.isReturn     = true;
        $scope.fromStation  = $scope.journeyReturn.fromStation;
        $scope.toStation    = $scope.journeyReturn.toStation;
        showLog.show($scope.fromStation + " return " +$scope.toStation, envi);
        $scope.time         = $scope.journeyReturn.time;
        // set default train
        $scope.trainsActive = $scope.journeyReturn.listTrain;
        $scope.trainActive  = $scope.trainsActive[0];
        $scope.coachActive  = $scope.trainActive.coachs[0];
        $scope.nameTrain    =  $scope.trainActive.title;
        // change current time
        $scope.currentTime  = $scope.listTimeTrainJourneyReturn[0].timeStart;
        // sort seat and opt to the menu
        filterListSeat().then(function(seats) {
          changeActiveDivTrain(0);
          changeActiveTrainMenus(1);
          changeActiveCoachMenus(0);
        }, function(reason) {
          showLog.show(reason, envi);
        });
      }
  }

    /*
    *createToast()
    */
    // filter list seat to show: use promise
    var filterListSeat  = function(){
      return $q(function(resolve, reject) {
        $scope.listSeat = []; // reset the list
        for(var i = 0; i < $scope.coachActive.seats.length; i++){
          $scope.seat =  $scope.coachActive.seats[i];
          // Is the seat has in the list of seat
          var isOfListTeckets = false;
          for( var j = 0 ; j < $scope.listTickets.length; j++){
            if( ($scope.listTickets[j].seatNumber == $scope.seat.number)
                && $scope.listTickets[j]._idTrain == $scope.trainActive._id
                && $scope.listTickets[j].coachTrain == $scope.coachActive._id){

                  isOfListTeckets =  true;
                  break;// the seat is exist in the list
            }
          }
          // if the seat has been the list
          if(isOfListTeckets)
            continue;
          // seat is block
          if( $scope.seat.state != false){
            $scope.listCustomer = $scope.seat.customer; // get the list of customer
            if($scope.listCustomer.length == 0){
                $scope.listSeat.push($scope.seat);
                continue;
            }
            // Check the seat have a person at that's time
            var isPush =  true;
            for(var k = 0; k < $scope.listCustomer.length; k++){
              // get time from the ticket of the customer
              $scope.datetime = $scope.listCustomer[k].ticket.date;
              showLog.show('time', envi);
              showLog.show(Number($scope.datetime) + "-" + Number($scope.time));
              $scope.sub = $window.Math.abs(Number($scope.datetime) - Number($scope.time));
              if( $scope.sub <= 24*60*60*1000){
                isPush = false;
                break;
              }
            }
            if(isPush){
              $scope.listSeat.push($scope.seat);
            }


          }
        }
        if($scope.listSeat.length == 0){
          $scope.show = 'lbl-live';
        }
        else
          $scope.show = 'lbl-die';
        // promise
        setTimeout(function() {
        if (true) {
          // return the result to handle
          resolve($scope.listSeat);
        } else {
          // return the error
          reject('nothing');
        }
      }, 10);
      });

    }
    // get price distance
    var getPriceDistance = function(train, fromStation, toStation){
      var pricesDistance =  train.pricesDistance;
      for( var i = 0; i< pricesDistance.length; i++){
        if( ((pricesDistance[i].fromStation == fromStation) && (pricesDistance[i].toStation == toStation))
            || ((pricesDistance[i].fromStation == toStation) && (pricesDistance[i].toStation == fromStation))){

              return pricesDistance[i].price;
            }
      }
      return 0;
    }
    // git the start time
    // condition = 1 return; condition = 0 not reutn
    var getTimeTrain  =  function(journey, condition){
      var timeStart = '';
      var timeEnd   = '';
      var listTrainJourney = [];
      var fromStation = journey.fromStation;
      var toStation   = journey.toStation;
      // get
      var listTrain   = journey.listTrain;
      for( var i = 0; i< listTrain.length; i++){
        // get journey
        var journeyG =  listTrain[i].trainJourney;
        var isStart =  false;// first station
        for(var j = 0 ; j< journeyG.length; j++){
          if(!isStart && (journeyG[j].station == fromStation)){
            isStart= true;
            timeStart = journeyG[j].time;
          }
          if(isStart && journeyG[j].station == toStation){// second state
            timeEnd = journeyG[j].time;
            break;
          }
        }

      if(timeStart.length == 0 || timeEnd.length == 0){// do not dectect journey
        // reste value
        timeStart = '';
        timeEnd   = '';
        // get journey
        var journeyG =  listTrain[i].trainJourneyReturn;
        var isStart =  false;// first station
        for(var j = 0 ; j< journeyG.length; j++){
          if(!isStart && (journeyG[j].station == fromStation)){
            isStart= true;
            timeStart = journeyG[j].time;
          }
          if(isStart && journeyG[j].station == toStation){// second state
            timeEnd = journeyG[j].time;
            break;
          }
        }
        }
        if(condition == 0 ){
          if(timeStart.length > 0 && timeEnd.length > 0){
              $scope.listTimeTrainJourney.push(
                {
                  'id'        : listTrain[i]._id,
                  'timeStart': timeStart,
                  'timeEnd'  : timeEnd,
                  'fromStation': fromStation,
                  'toStation': toStation
                }
              );
              // if the train don't have the journey so delete the train from list
              listTrainJourney.push(listTrain[i]);
          }
        }else{
          if(timeStart.length > 0 && timeEnd.length > 0){
            $scope.listTimeTrainJourneyReturn.push(
              {
                'id'        : listTrain[i]._id,
                'timeStart': timeStart,
                'timeEnd'  : timeEnd,
                'fromStation': fromStation,
                'toStation': toStation
              }
            );
            listTrainJourney.push(listTrain[i]);
          }
        }
      }
      journey.listTrain = listTrainJourney;
      return journey;
    }
    // change div
    var changeDiv=  function(){
      var listD =  angular.element('.select-train');
      listD[0].addClass('a');
    }
    // change time
    var convertTime =  function(timestamp, hour){
        var date =  new Date(Number(timestamp));
        var m = date.getMonth();
        var y = date.getFullYear();
        var d = date.getDate();
        var h =  $window.Math.round(Number(hour)/60);
        var min = Number(hour) % 60;
        return (new Date(y, m, d, h, min, 0, 0).getTime());
    }
    // check train
    var checkTrain = function(){
      $scope.journey = localStorageService.get('journey');
      $scope.journeyReturn = localStorageService.get('journeyReturn');
      if((typeof $scope.journey) != 'string'){
        if($scope.journey.listTrain.length >0){
                    // set default train
          $scope.trainsActive = $scope.journey.listTrain;
          $scope.trainActive  = $scope.trainsActive[0];
          $scope.coachActive  = $scope.trainsActive[0].coachs[0];
          $scope.nameTrain    = $scope.trainActive.title;
          //set current
          $scope.fromStation  = $scope.journey.fromStation;
          // to the station
          $scope.toStation  = $scope.journey.toStation;
          //time
          $scope.time         = $scope.journey.time;
          $scope.journey = getTimeTrain($scope.journey, 0);
          if((typeof $scope.journeyReturn)      != 'undefined'
              && (typeof $scope.journeyReturn)  != 'string'
              && ($scope.journeyReturn)  != null){
              if($scope.journeyReturn.listTrain.length > 0){
                $scope.journeyReturn = getTimeTrain($scope.journeyReturn, 1);
              }
          }
          // timestart
          $scope.currentTime  = $scope.listTimeTrainJourney[0].timeStart;
          filterListSeat().then(function(listSeat) {
            changeActiveDivTrain(0);
            changeActiveCoachMenus(0);
          }, function(reason) {
            showLog.show(reason);
          });
        }else{
          $state.go('main.home');
        }
      }else{
        $state.go('main.home');
      }
    }

    // get event for the regist.
    var getEvents = function(){
      $http.get(urlServices.getURL('event'))
              .success(function(response, status) {
                var listEvents = response;
                showLog.show('get event');
                showLog.show(response);
                $scope.$emit('eventList', { listEvent: listEvents });
              }).error(function (data, status, header, config) {

            });
    }
    /*
    * Run method the first load
    */
    checkTrain();
    getEvents();
    // toastr.warning('waiting..','Warning', { "positionClass": "toast-bottom-center","timOut":5000, "progressBar": true});
});
