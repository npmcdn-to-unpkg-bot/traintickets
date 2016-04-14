var The_ga;
routerApp.controller('viewTimeController', function(changeInfor, urlServices ,$scope, $rootScope, $http, $state, $window) {
  $scope.station = "Station";
  $scope.timeaway = "Time away";
  $scope.timearrivals = "Time arrivals";
  $scope.Trainjourneygo = "Train journey go";
  //change infor
  changeInfor.change('timetable');
  function showJourney() {
    $scope.station = "Station";
    $scope.timeaway = "Time away";
    $scope.timearrivals = "Time arrivals";
    $scope.hide = false;
    $scope.show = true;
    $scope.connect = "";
    $scope.Trainjourneygo = "Train journey go"
  };

  function changeTitle() {
    $scope.station = "From station";
    $scope.timeaway = "To station";
    $scope.timearrivals = "Price";
    $scope.hide = true;
    $scope.show = false;
    $scope.connect = " - ";
    $scope.Trainjourneygo = "Price journey"
  };
  // Train Journey
  $scope.north_sound = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Sai Gon") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.hanoi_danang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Da Nang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.hanoi_laocai = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Lao Cai") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.hanoi_haiphong = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Hai Phong") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.hanoi_dongdang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Dong Dang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.hanoi_thainguyen = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Thai Nguyen") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.kep_halong = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Kep-Ha Long") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.saigon_danang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Da Nang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.saigon_phanthiet = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Phan Thiet") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.saigon_quinhon = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      console.log("response");
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Quy Nhon") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].trainJourney;
          $scope.stationListReturn = response[i].trainJourneyReturn;
        }
      }
      showJourney();
    }).error(function(response) {
      console.log(response);
    });
  };

  // Price Train journey

  $scope.Price_north_sound = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Sai Gon") {
          // $scope.coachsTrain = response[i].coachs;
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };

  $scope.Price_hanoi_danang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Da Nang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_hanoi_laocai = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Lao Cai") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_hanoi_haiphong = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Hai Phong") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_hanoi_dongdang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Dong Dang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_hanoi_thainguyen = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Ha Noi-Thai Nguyen") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_kep_halong = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Kep-Ha Long") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_saigon_danang = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Da Nang") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_saigon_phanthiet = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Phan Thiet") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
  //
  $scope.Price_saigo_quinhon = function() {
    $http.get(urlServices.getURL('train')).success(function(response) {
      console.log("response");
      $scope.train = response.data;
      $scope.listId = [];
      for (i = 0; i < response.length; i++) {
        if (response[i].title == "Sai Gon-Quy Nhon") {
          $scope.listId.push(response[i]._id);
          $scope.stationList = response[i].pricesDistance;
        }
      }
      changeTitle();
    }).error(function(response) {
      console.log(response);
    });
  };
});
