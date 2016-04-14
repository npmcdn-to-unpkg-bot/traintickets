routerApp.controller('registTicketsController',  function(changeInfor, showLog, urlServices, $scope, $http, $state, toastr, $interval, $timeout){
  /*
  * INIT
  */
  $scope.objects = [
    {
      'id'      : 'adult',
      'name'    : 'Adult',
      'discount': 0,
      'event'   : [],
      'title'   :''
    },
    {
      'id'      : 'children',
      'name'    : 'Children',
      'discount': 0.3,
      'event'   : [],
      'title'   :'less 12 age.'
    },
    {
      'id'      : 'student',
      'name'    : 'Student',
      'discount': 0.2,
      'event'   : [],
      'title'   :'have a student card.'
    },
    {
      'id'      : 'oldperson',
      'name'    : 'Old person',
      'discount': 0.1,
      'event'   : [],
      'title'   :'than 100 age.'
    },
  ];
  $scope.company = {
    "nameCompany"     : '',
    "taxNumber"       : '',
    "addressCompany"  : '',
    "emailCompany"    : ''
  }

  // timOUt
  var timOuToastr = 10000;
    // list customer
  $scope.listCustomer = [];
  $scope.listEventRegister = [];
  // ng-disabled journeyReturn: default is hide div
  // list thick
  $scope.ticketNumber     = 0;
  $scope.firstTicket      = '';
  $scope.secondTicket     = '';
  $scope.thirdTicket      = '';
  //discout
  $scope.firstDiscout      = 0;
  $scope.secondDiscout     = 0;
  $scope.thirdDiscout      = 0;
  // view
  $scope.showThirdTicket  = false;
  $scope.showSecondTicket = false;
  $scope.showFirstTicket  = false;
  // objecat
  $scope.selectFirstTicket = 'adult';
  $scope.selectSecondTicket= 'adult';
  $scope.selectThirdTicket = 'adult';
  // addtional information from the person registed
  $scope.firstEmail   = "";
  $scope.firstPhone   = "";
  $scope.firstCompany = "";
  $scope.firstAddress = "";
  // default price
  $scope.firstDefaultPrice    = 0;
  $scope.secondDefaultPrice   = 0;
  $scope.thirdDefaultPrice    = 0;
  // total
  $scope.total                = 0;
  // list event show
  $scope.firstEventsPrice     = 0;
  $scope.secondEventsPrice    = 0;
  $scope.thirdSEventsPrice    = 0;
  //
  $scope.btnRegister =  true;
  $scope.btnPrinter =  false;
  // BUTTON
  $scope.btnContent = 'Register';
  $scope.isRegist   =  true;
  // container
  $scope.isDisabledElement = false;
  //change infor
  changeInfor.change('register');
  /*
  * METHODS
  */
    // event slected objec
    $scope.chooseObject =  function(name){
      chooseObjectVar(name);
    }
    // remove item
    $scope.removeTicket  =  function(index){
      removeTicketVar(index);
    }
    var removeTicketVar =  function(index){
      if(index == '1'){
        if($scope.ticketNumber == 3) {
          // move 0 to 1
          $scope.ticketNumber     -= 1;
          $scope.showFirstTicket  = true;
          $scope.firstTicket     = $scope.secondTicket;
          $scope.firstDefaultPrice= $scope.secondDefaultPrice;
          $scope.firstDiscout     = $scope.secondDiscout;
          // set name and id
          $scope.inputNameFirstTicket =$scope.inputNameSecondTicket;
          // console.log('gi day');
          // console.log($scope.inputIDSecondTicket);
          $scope.inputIDFirstTicket = $scope.inputIDSecondTicket;

          //move three to two
          $scope.showSecondTicket  = true;
          $scope.secondTicket     = $scope.thirdTicket;
          $scope.secondDefaultPrice= $scope.thirdDefaultPrice;
          $scope.secondDiscout     = $scope.thirdDiscout;
          // set name and id
          $scope.inputNameSecondTicket =$scope.inputNameThirdTicket;
          $scope.inputIDSecondTicket = $scope.inputIDThirdTicket;
          // delete three ticket
          $scope.showThirdTicket  = false;
          $scope.thirdTicket      = '';
          $scope.thirdDefaultPrice    = 0;
          $scope.thirdDiscout      = 0;

        }else if($scope.ticketNumber == 2){
          $scope.ticketNumber     -= 1;
          $scope.showFirstTicket  = true;
          $scope.firstTicket     = $scope.secondTicket;
          $scope.firstDefaultPrice= $scope.secondDefaultPrice;
          $scope.firstDiscout     = $scope.secondDiscout;
          // set name and id
          $scope.inputNameFirstTicket =$scope.inputNameSecondTicket;
          $scope.inputIDFirstTicket = $scope.inputIDSecondTicket;
          //move three to two
          $scope.showSecondTicket  = false;
          $scope.secondTicket     = '';
          $scope.secondDefaultPrice= 0;
          $scope.secondDiscout     = 0;
        }else{
          $scope.showFirstTicket  = false;
          $scope.firstTicket      = '';
          $scope.firstDefaultPrice    = 0;
          $scope.firstDiscout      = 0;
        }

          //  }else {
          //  }
      //  });
     }else if(index  == '2'){
      if($scope.ticketNumber == 3) {
        //move three to two
        $scope.ticketNumber     -= 1;
        $scope.showSecondTicket  = true;
        $scope.secondTicket     = $scope.thirdTicket;
        $scope.secondDefaultPrice= $scope.thirdDefaultPrice;
        $scope.secondDiscout     = $scope.thirdDiscout;
        // set name and id
        $scope.inputNameSecondTicket =$scope.inputNameThirdTicket;
        $scope.inputIDSecondTicket = $scope.inputIDThirdTicket;
        // delete three ticket
        $scope.showThirdTicket  = false;
        $scope.thirdTicket      = '';
        $scope.thirdDefaultPrice    = 0;
        $scope.thirdDiscout      = 0;

      }else{
        $scope.ticketNumber     -= 1;
        $scope.showSecondTicket  = false;
        $scope.secondTicket      = '';
        $scope.secondDefaultPrice    = 0;
        $scope.secondDiscout      = 0;
      }
          // }else {
          // }
      // });
    }else if(index == '3'){
          $scope.ticketNumber     -= 1;
          $scope.showThirdTicket  = false;
          $scope.thirdTicket      = '';
          $scope.thirdDefaultPrice    = 0;
          $scope.thirdDiscout      = 0;
    }
    // change sate();
    if( ((typeof $scope.firstTicket) == 'string')
        && ((typeof $scope.secondTicket) == 'string')
        && ((typeof $scope.thirdTicket) == 'string' )){
          $state.go('main.home');
        }
    // update total
    $scope.total = $scope.thirdDefaultPrice - $scope.thirdDiscout + $scope.secondDefaultPrice - $scope.secondDiscout
                  + $scope.firstDefaultPrice - $scope.firstDiscout;
    }

    // change state
    $scope.changeState  =  function(){
      if($scope.isRegist){
        var isFirst   = false;
        var isSecond  = false;
        var isThird   = false;
        // reset list
        $scope.listCustomer = [3];
        // save tickets
          // the first ticket
        if( ((typeof $scope.firstTicket) != 'string') ){
          // console.log('login one');
            var isFirstName = true;
            var isFirstID = true;
           var firstCustomerName  = $scope.inputNameFirstTicket;
           var firstCustomerID    = $scope.inputIDFirstTicket;
           // catch erro
           if(!checkInput(firstCustomerName)){
             $scope.classFirstTicketName = "class-boder-red";
             toastr.error('Name of the <lable id="lbl-error-toasrt">FIRST ticket </lable> failed.',
                          'Error',{allowHtml:true, timeOut: timOuToastr});
             isFirstName = false;
           }else{
             $scope.classFirstTicketName = "";
             isFirstName = true;
           }
           if(!checkInput(firstCustomerID)){
             $scope.classFirstTicketID = "class-boder-red";
             toastr.error('ID/Passport of the <lable id="lbl-error-toasrt">FIRST ticket </lable> failed.'
                          ,'Error',{allowHtml:true, timeOut: timOuToastr});
             isFirstID = false;
           }else{
             $scope.classFirstTicketID = "";
             isFirstID = true;
           }
           if(isFirstName && isFirstID){
             var email = $scope.firstEmail  ;
             var phone = $scope.firstPhone;
             var address = $scope.firstAddress;
             isFirst = true;
             // addtional the company information
             $scope.company.nameCompany = $scope.firstCompanyName;
             $scope.company.taxNumber = $scope.firstTaxCompany;
             $scope.company.addressCompany = $scope.firstCompanyAddress;
             $scope.company.emailCompany = $scope.firstEmailCompany;

             var customer =  createCustomer(firstCustomerID, firstCustomerName
                            , address, phone , email, $scope.company,$scope.firstTicket);
             $scope.listCustomer[0] = customer;
           }
        }
        if( ((typeof $scope.secondTicket) != 'string') ){
          var isSecondName = true;
          var isSecondID = true;
          var secondCustomerName  = $scope.inputNameSecondTicket;
          var secondCustomerID    = $scope.inputIDSecondTicket;
          // catch erro
          if(!checkInput(secondCustomerName)){
            $scope.classSecondTicketName = "class-boder-red";
            toastr.error('Name of the <lable id="lbl-error-toasrt">SECOND ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOuToastr});
            isSecondName = false;
          }else{
            $scope.classSecondTicketName = "";
            isSecondName = true;
          }
          if(!checkInput(secondCustomerID)){
            $scope.classSecondTicketID = "class-boder-red";
            toastr.error('ID/Passport of the <lable id="lbl-error-toasrt">SECOND ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOuToastr});
            isSecondID = false;
          }else{
            $scope.classSecondTicketID = "";
            isSecondID = true;
          }
          // made customer
          if(isSecondName && isSecondID){
            isSecond = true;
            var customer =  createCustomer(secondCustomerID, secondCustomerName
                           , '', '' ,'', $scope.company,$scope.secondTicket);
          //  console.log(customer);
            $scope.listCustomer[1] = customer;
          }
        }
        if( ((typeof $scope.thirdTicket) != 'string') ){
          var isThirdName = true;
          var isThirdID = true;
          var thirdCustomerName  = $scope.inputNameThirdTicket;
          var thirdCustomerID    = $scope.inputIDThirdTicket;
          // catch erro
          if(!checkInput(thirdCustomerName)){
            $scope.classThirdTicketName = "class-boder-red";
            toastr.error('Name of the <lable id="lbl-error-toasrt">THIRD ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOuToastr});
            isThirdName = false;
          }else{
            $scope.classThirdTicketName = "";
            isThirdName = true;
          }
          if(!checkInput(thirdCustomerID) || isThird){
            $scope.classThirdTicketID = "class-boder-red";
            toastr.error('ID/Passport of the <lable id="lbl-error-toasrt">THIRD ticket </lable> failed.'
                          ,'Error',{ allowHtml: true, timeOut: timOuToastr});
            isThirdID = false;

          }else{
            $scope.classThirdTicketID = "";
            isThirdID = true;
          }
          // made the customer
          if(isThirdName && isThirdID){
            isThird = true;
            var customer =  createCustomer(thirdCustomerID, thirdCustomerName
                           , '', '' ,'', $scope.company,$scope.thirdTicket);
          //  console.log(customer);
            $scope.listCustomer[2] = customer;
          }
        }
        // console.log($scope.ticketNumber);
        // console.log($scope.ticketNumber +" " +isFirst +"&&"+ isSecond +"&&"+ isThird);
        if(($scope.ticketNumber == 3) && isFirst && isSecond && isThird){

          var isTrueInfor = checkPassPort(3);
          if(!isTrueInfor){
            return;
          }
          $scope.isDisabledElement = true;
          $scope.isRegist =  false;
          if(!$scope.isRegist){
            $scope.btnContent = 'Printer';
          }else{
            $scope.btnContent = 'Register';
          }
          $http.post(urlServices.getURL('customer'), $scope.listCustomer[2])
                .success(function (data, status, headers, config) {
                  toastr.success('Name: '+ $scope.listCustomer[2].name
                                +" \n"+$scope.listCustomer[2]._id+" success", 'Registed',
                                {timeOut: timOuToastr});
                  $http.post(urlServices.getURL('customer'), $scope.listCustomer[1])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ $scope.listCustomer[1].name
                                      +" \n"+$scope.listCustomer[1]._id+" success", 'Registed',
                                      {timeOut: timOuToastr});
                          $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ $scope.listCustomer[0].name
                                                  +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                                                  {timeOut: timOuToastr});
                                })
                                .error(function (data, status, header, config) {
                                  toastr.error('Name: '+ $scope.listCustomer[0].name
                                                  +" \n"+$scope.listCustomer[0]._id+" "+ data.error,'Error',{timeOut:timOuToastr});
                                  removeTicketVar(1);
                                });
                        })
                        .error(function (data, status, header, config) {
                          toastr.error('Name: '+ $scope.listCustomer[1].name
                                          +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                          removeTicketVar(2);
                          $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ $scope.listCustomer[0].name
                                  +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOuToastr});
                                })
                                .error(function (data, status, header, config) {
                                  toastr.error('Name: '+ $scope.listCustomer[0].name
                                                  +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                                  removeTicketVar(1);
                                });
                        });
                })
                .error(function (data, status, header, config) {
                  toastr.error('Name: '+ $scope.listCustomer[2].name
                                  +" \n"+$scope.listCustomer[2]._id+" "+data.error,'Error',{timeOut:timOuToastr});
                  removeTicketVar(3);
                  //save firt ticket
                  $http.post(urlServices.getURL('customer'), $scope.listCustomer[1])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ $scope.listCustomer[1].name
                          +" \n"+$scope.listCustomer[1]._id+" success", 'Registed',
                          {timeOut: timOuToastr});

                          $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ $scope.listCustomer[0].name
                                  +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOuToastr});
                                })
                                .error(function (data, status, header, config) {
                                  toastr.error('Name: '+ $scope.listCustomer[0].name
                                                  +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                                  removeTicketVar(1);
                                });
                        })
                        .error(function (data, status, header, config) {
                          toastr.error('Name: '+ $scope.listCustomer[1].name
                                          +" \n"+$scope.listCustomer[1]._id+" "+data.error,'Error',{timeOut:timOuToastr});
                          removeTicketVar(2);
                          $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ $scope.listCustomer[0].name
                                  +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOuToastr});
                                })
                                .error(function (data, status, header, config) {
                                  toastr.error('Name: '+ $scope.listCustomer[0].name
                                                  +" \n"+$scope.listCustomer[0]._id+" "+data.error,'Error',{timeOut:timOuToastr});
                                  removeTicketVar(1);
                                });
                        });
                });

          //change state
          // $state.go('main.information');
        }else if(($scope.ticketNumber == 2) && isFirst && isSecond){

          var isTrueInfor = checkPassPort(2);
          if(!isTrueInfor){
            return;
          }
          //
          $scope.isRegist =  false;
          // console.log('first');
          if(!$scope.isRegist){
            $scope.btnContent = 'Printer';
          }else{
            $scope.btnContent = 'Register';
          }
          $scope.isDisabledElement = true;
          $http.post(urlServices.getURL('customer'), $scope.listCustomer[1])
                .success(function (data, status, headers, config) {
                  toastr.success('Name: '+ $scope.listCustomer[1].name
                  +" \n"+$scope.listCustomer[1]._id+" success", 'Registed',
                  {timeOut: timOuToastr});

                  $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ $scope.listCustomer[0].name
                          +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                          {timeOut: timOuToastr});

                        })
                        .error(function (data, status, header, config) {
                          toastr.error('Name: '+ $scope.listCustomer[0].name
                                          +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                          removeTicketVar(1);
                        });
                })
                .error(function (data, status, header, config) {
                  toastr.error('Name: '+ $scope.listCustomer[1].name
                                  +" \n"+$scope.listCustomer[1]._id+" "+data,'Error',{timeOut:timOuToastr});
                  removeTicketVar(2);
                  //save firt ticket
                  $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ $scope.listCustomer[0].name
                          +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                          {timeOut: timOuToastr});

                        })
                        .error(function (data, status, header, config) {
                          toastr.error('Name: '+ $scope.listCustomer[0].name
                                          +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                          removeTicketVar(1);
                        });
                });
              }
        else if( ($scope.ticketNumber == 1) && isFirst){
          $scope.isRegist =  false;
          $scope.isDisabledElement = true;
          if(!$scope.isRegist){
            $scope.btnContent = 'Printer';
          }else{
            $scope.btnContent = 'Register';
          }
          $http.post(urlServices.getURL('customer'), $scope.listCustomer[0])
                .success(function (data, status, headers, config) {
                  toastr.success('Name: '+ $scope.listCustomer[0].name
                  +" \n"+$scope.listCustomer[0]._id+" success", 'Registed',
                  {timeOut: timOuToastr});
                })
                .error(function (data, status, header, config) {
                  toastr.error('Name: '+ $scope.listCustomer[0].name
                                  +" \n"+$scope.listCustomer[0]._id+" "+data,'Error',{timeOut:timOuToastr});
                  removeTicketVar(1);
                });
        }else{
          toastr.warning('Information failed', 'WARNING',{timeOut: timOuToastr});
        }

      }else{
        printPDF();
      }
    }
    /*
    * METHOD
    */

    // var chooseSeat
    var chooseObjectVar =  function(name){
      // console.log(name);
      switch (name) {
        case 'first':
          var object =  $scope.selectFirstTicket;
          var objectName = 'Adult';
          if(object == 'children'){
            $scope.firstDiscout      = $scope.objects[1].discount;
            objectName = 'Children';
          }else if( object == 'oldperson'){
            $scope.firstDiscout      = $scope.objects[3].discount;
            objectName = 'Old person';
          }else if( object == 'student'){
            $scope.firstDiscout      = $scope.objects[2].discount;
            objectName = 'Student';
          }else{// adult
            $scope.firstDiscout      = $scope.objects[0].discount;
          }
          $scope.firstDiscout =  Number($scope.firstDefaultPrice) * Number($scope.firstDiscout) ;
          // update price of the ticket
          $scope.firstTicket.price = Number($scope.firstDefaultPrice) - Number($scope.firstDiscout);
          // update object of the tikcet
          $scope.firstTicket.object = objectName;
          break;
        case 'second':
            var object =  $scope.selectSecondTicket;
            var objectName = 'Adult';
            if(object == 'children'){
              $scope.secondDiscout      = $scope.objects[1].discount;
              objectName = 'Children';
            }else if( object == 'oldperson'){
              $scope.secondDiscout      = $scope.objects[3].discount;
              objectName = 'Old person';
            }else if( object == 'student'){
              $scope.secondDiscout      = $scope.objects[2].discount;
              objectName = 'Student';
            }else{// adult
              $scope.secondDiscout      = $scope.objects[0].discount;
            }
            $scope.secondDiscout =  Number($scope.secondDefaultPrice) * Number($scope.secondDiscout) ;
            // update price of the ticket
            $scope.secondTicket.price = Number($scope.secondDefaultPrice) - Number($scope.secondDiscout);
            // update object of the tikcet
            $scope.secondTicket.object = objectName;
          break;
        case 'third':
            var object =  $scope.selectThirdTicket;
            var objectName = 'Adult';
            if(object == 'children'){
              $scope.thirdDiscout      = $scope.objects[1].discount;
              objectName = 'Children';
            }else if( object == 'oldperson'){
              $scope.thirdDiscout      = $scope.objects[3].discount;
              objectName = 'Old person';
            }else if( object == 'student'){
              $scope.thirdDiscout      = $scope.objects[2].discount;
              objectName = 'Student';
            }else{// adult
              $scope.thirdDiscout      = $scope.objects[0].discount;
            }
            $scope.thirdDiscout =  Number($scope.thirdDefaultPrice) * Number($scope.thirdDiscout);
            // update price of the ticket
            $scope.thirdTicket.price = Number($scope.thirdDefaultPrice) - Number($scope.thirdDiscout);
            // update object of the tikcet
            $scope.thirdTicket.object = objectName;
          break;
      }
      $scope.total = $scope.thirdDefaultPrice - $scope.thirdDiscout + $scope.secondDefaultPrice - $scope.secondDiscout
                    + $scope.firstDefaultPrice - $scope.firstDiscout;
    }
    var checkPassPort =  function(condition){
      if(condition == 3){// check three the tickets
        var firstTicketL =  $scope.firstTicket;
        var secondTicketL =  $scope.secondTicket;
        var thirdTicketL =  $scope.thirdTicket;
        if(firstTicketL.isReturn == secondTicketL.isReturn){
          if($scope.listCustomer[0]._id == $scope.listCustomer[1]._id){
            BootstrapDialog.alert('Ticket 1 and Ticket 2 are same ID/Passport number/Date of birth (for children)');
            return false;
          }
        }
        if(firstTicketL.isReturn == thirdTicketL.isReturn){
          if($scope.listCustomer[0]._id == $scope.listCustomer[2]._id){
            BootstrapDialog.alert('Ticket 1 and Ticket 3 are same ID/Passport number/Date of birth (for children)');
            return false;
          }
        }
        if(thirdTicketL.isReturn == secondTicketL.isReturn){
          if($scope.listCustomer[2]._id == $scope.listCustomer[1]._id){
            BootstrapDialog.alert('Ticket 2 and Ticket 3 are same ID/Passport number/Date of birth (for children)');
            return false;
          }
        }
        return true;
      }else{ // check two the tickets
        var firstTicketL =  $scope.firstTicket;
        var secondTicketL =  $scope.secondTicket;
        if(firstTicketL.isReturn == secondTicketL.isReturn){
          if($scope.listCustomer[0]._id == $scope.listCustomer[1]._id){
            BootstrapDialog.alert('Ticket 1 and Ticket 2 are same ID/Passport number/Date of birth (for children)');
            return false;
          }
        }
        return true;
      }

    }
    // create customer
    var createCustomer =  function(id, name, address, phone, email, company, ticket){
            var customer= {
            "_id"     : id,
            "name"    : name,
            "address" : address,
            "phone"   : phone,
            "email"   : email,
            "company": company,
            "ticket": ticket
          }
          return customer
    }
    // check content of tag input
    var checkInput  = function(str){
      if(str == null)
        return false;
      if(((typeof str) == 'undefined') )
        return false;
      if((str.length == 0)){
        return false;
      }
      return true;
    }
    // the first load state it run to show ui
    var getTicket   = function(){
      // get Events
      // console.log($scope.listEvent);
      // $scope.listEventRegister = $scope.listEvent;
      // filter the event wes die
      // filterEvent();
      // console.log('filer');
      // console.log($scope.listEventRegister);
      // add the event to the object
      // addEventToObject();
      // console.log('event object');
      // console.log($scope.objects);
      // get listTickets
      if($scope.listTickets.length == 3){
        $scope.ticketNumber       = 3;
        // get the first ticket
        $scope.firstTicket        = $scope.listTickets[0];
        $scope.firstDefaultPrice  = $scope.listTickets[0].price;
        // second ticket
        $scope.secondTicket     = $scope.listTickets[1];
        $scope.secondDefaultPrice  = $scope.listTickets[1].price;
        //third ticket
        $scope.thirdTicket      = $scope.listTickets[2];
        $scope.thirdDefaultPrice  = $scope.listTickets[2].price;
        // show list of the tickets
        $scope.showThirdTicket  = true;
        $scope.showSecondTicket = true;
        $scope.showFirstTicket  = true;
      }else if($scope.listTickets.length == 2){
        $scope.ticketNumber     = 2;
        // infor
        // first ticket
        $scope.firstTicket      = $scope.listTickets[0];
        $scope.firstDefaultPrice  = $scope.listTickets[0].price;
        // second ticket
        $scope.secondTicket     = $scope.listTickets[1];
        $scope.secondDefaultPrice  = $scope.listTickets[1].price;
        // show list of the tickets
        $scope.showSecondTicket = true;
        $scope.showFirstTicket = true;
      }else if($scope.listTickets.length == 1){
        $scope.ticketNumber     = 1;
        $scope.firstTicket      = $scope.listTickets[0];
        $scope.firstDefaultPrice  = $scope.listTickets[0].price;
        // show list of the tickets
        $scope.showFirstTicket = true;
      }else{
        $state.go('main.home');
      }
      $scope.total = $scope.thirdDefaultPrice - $scope.thirdDiscout + $scope.secondDefaultPrice - $scope.secondDiscout
                    + $scope.firstDefaultPrice - $scope.firstDiscout;
    }
    // add event to object
    var addEventToObject =  function(){
      if($scope.listEventRegister.length > 0){
        var listEvent = $scope.listEventRegister;
        for(var i = 0;  i< listEvent.length; i++){
          var objects = listEvent[i].objects;
          for(var j = 0; j < objects.length; j++){
            switch (objects[j].type) {
              case 'adult':
                console.log(objects[j].type);
                $scope.objects[0].event.push(listEvent[i]);
                break;
              case 'children':
                console.log(objects[j].type);
                $scope.objects[1].event.push(listEvent[i]);
                break;
              case 'student':
                console.log(objects[j].type);
                $scope.objects[2].event.push(listEvent[i]);
                break;
              case 'oldperson':
                console.log(objects[j].type);
                $scope.objects[3].event.push(listEvent[i]);
                break;

            }
          }
        }
      }
    }
    // filter event die
    var filterEvent = function(){
      if($scope.listEventRegister.length > 0){
        var listEvent = JSON.parse( JSON.stringify($scope.listEventRegister));
        $scope.listEventRegister = [];
        for(var i = 0;  i< listEvent.length; i++){
          var endTime =  listEvent[i].timeEnd;
          var startTime =  listEvent[i].timeBegin;
          var dateNow =  new Date().getTime();
          if((Number(endTime) >= Number(dateNow)) &&  (Number(startTime) <= Number(dateNow))){
            $scope.listEventRegister.push(listEvent[i]);
          }
        }
      }
    }
    var printPDF =  function(){
      var innerContents = document.getElementById('div-register').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    /*
    * RUN METHODS
    */
    getTicket();
});
