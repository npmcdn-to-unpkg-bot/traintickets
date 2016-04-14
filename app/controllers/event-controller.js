routerApp.controller('eventController', function(changeInfor, showLog, urlServices ,$scope, $http, $state, $window, toastr) {
    // change infor
    changeInfor.change('event');
    $http
        .get(urlServices.getURL('event'))
        .success(function(response) {
            $scope.tabs = response;
            $scope.content = $scope.tabs[0].content;
            $scope.timeBegin = $scope.tabs[0].timeBegin;
            $scope.timeEnd = $scope.tabs[0].timeEnd;
            // $scope.object = $scope.tabs[0].object;
            var view = '';
            for (i = 0; i < $scope.tabs[0].objects.length; i++) {
                var type = $scope.tabs[0].objects[i].type;
                var price = $scope.tabs[0].objects[i].price;
                view = view + type + ': ' + price + '.';
            }
            console.log($scope.tabs[0].objects.length);
            $scope.object = view;
            $scope.name = $scope.tabs[0].name;
            $scope.onClickTab = function(tab) {
                var viewtab = '';
                $scope.content = tab.content;
                $scope.timeBegin = tab.timeBegin;
                $scope.timeEnd = tab.timeEnd;
                console.log(tab.objects.length);
                for (i = 0; i < tab.objects.length; i++) {
                    var type = tab.objects[i].type;
                    var price = tab.objects[i].price;
                    viewtab = viewtab + type + ': ' + price + '. ';
                }
                $scope.object = viewtab;
                $scope.name = tab.name;
            }

            $scope.isActiveTab = function(tabUrl) {
                return tabUrl == $scope.name;
            }
        })
        .error(function(){
            
            BootstrapDialog.alert("Currently no events. Please come back later!!!");
        });

});
