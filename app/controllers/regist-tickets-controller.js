routerApp.controller('registTicketsController',  function(changeInfor, showLog, urlServices, $scope, $http, $state, toastr, $interval, $timeout){
  /*
  * INIT
  */
  // type objects of the customer when they register the train ticket.
  $scope.objects = [
    {
      'name'    : 'Adult',
      'discount': 0,
      'event'   : [],
      'title'   :''
    },
    {
      'name'    : 'Student',
      'discount': 0.2,
      'event'   : [],
      'title'   :'have a student card.'
    },
    {
      'name'    : 'Old person',
      'discount': 0.1,
      'event'   : [],
      'title'   :'than 100 age.'
    },
  ];
  // company's information of customer
  var companyCustomer = {
    "nameCompany"     : '',
    "taxNumber"       : '',
    "addressCompany"  : '',
    "emailCompany"    : ''
  }

  // time to hide toastr
  var timOutToastr = 10000;

    // list of customer
    // value default: 3 element
  var listRegisterCustomer = [3];

  $scope.listEventRegister = [];

  // number ticket when customer register
  var ticketRegisterNumber = 0;
  // the first ticket's information
  $scope.firstTicket      = '';
  // the second ticket's information
  $scope.secondTicket     = '';
  // the third ticket's information
  $scope.thirdTicket      = '';

  //discount price each customer's object
  $scope.firstCustomerDiscount      = 0;
  $scope.secondCustomerDiscount     = 0;
  $scope.thirdCustomerDiscount      = 0;

  // attribute ng-show: show or hide customer's information;
  // default value is false(hide information)
  $scope.showThirdTicket  = false;
  $scope.showSecondTicket = false;
  $scope.showFirstTicket  = false;

  // attribute ng-model: get valule of customer's object
  // default is adult
  $scope.selectFirstTicket = 'Adult';
  $scope.selectSecondTicket= 'Adult';
  $scope.selectThirdTicket = 'Adult';

  // addtional information of the customer
  $scope.firstEmail   = "";
  $scope.firstPhone   = "";
  $scope.firstCompany = "";
  $scope.firstAddress = "";

  // default price of the ticket
  $scope.firstDefaultPrice    = 0;
  $scope.secondDefaultPrice   = 0;
  $scope.thirdDefaultPrice    = 0;
  // total price from list of the ticket
  $scope.total                = 0;

  // list event show
  $scope.firstEventsPrice     = 0;
  $scope.secondEventsPrice    = 0;
  $scope.thirdSEventsPrice    = 0;

  // text of the submit button
  $scope.btnContent = 'Register';
  // the submit button has two value
  // value: true: click to register the ticket
  // value: false: save the regist to image
  var isRegister   =  true;
  // container
  $scope.isDisabledElement = false;
  // enviroment to show log when dev write code
  // dev: show log at browser. other value is hide.
  var envi = 'dev';
  //change infor page
  changeInfor.change('register');
  /*
  * METHODS
  */
  // check input when customer fill information
  // index is position of the ticket. value is Number
  // return: show message for customer know if they fill wrong information
  $scope.changeName = function(index){
    switch (index) {
      case 1:// first ticket
        showLog.show($scope.inputNameFirstTicket, envi);
        // when customer don't fill name or fill 1 letter
        // $scope.inputNameFirstTicket has value undefined
        if((typeof $scope.inputNameFirstTicket) != 'undefined')
        {
          var len = $scope.inputNameFirstTicket.length;
          var chLast = $scope.inputNameFirstTicket.charAt(len-1);
          showLog.show(len, envi);
          showLog.show($scope.inputNameFirstTicket, envi);
          if((Number(chLast) > 0)){
            // show error
            toastr.error('Name Cannot have any number.','ERROR',{timeOut:timOutToastr});
            // delete number letter
            $scope.inputNameFirstTicket = $scope.inputNameFirstTicket.substring(0, len-1);
          }
        }
        break;
      case 2:// second ticket

        if((typeof $scope.inputNameSecondTicket) != 'undefined')
          {var len = $scope.inputNameSecondTicket.length;
          var chLast = $scope.inputNameSecondTicket.charAt(len-1);
          if((Number(chLast) > 0)){
            toastr.error('Cannot write number here.','ERROR',{timeOut:timOutToastr});
            if(len == 1)
              $scope.inputNameSecondTicket = "undefined";
            else
            $scope.inputNameSecondTicket = $scope.inputNameSecondTicket.substring(0, len-1);
          }}
        break;
      case 3:// third ticket
        if((typeof $scope.inputNameThirdTicket) != 'undefined')
        {  var len = $scope.inputNameThirdTicket.length;
          var chLast = $scope.inputNameThirdTicket.charAt(len-1);
          if((Number(chLast) > 0)){
            toastr.error('Cannot write number here.','ERROR',{timeOut:timOutToastr});
            if(len == 1)
              $scope.inputNameThirdTicket = "undefined";
            else
            $scope.inputNameThirdTicket = $scope.inputNameThirdTicket.substring(0, len-1);
          }}
        break;

    }
  }
    // when customer choose ticket's object
    $scope.chooseObject =  function(name){
      chooseObjectVar(name);
    }

    // remove the ticket
    // index is position of ticket in the list tickets
    $scope.removeTicket  =  function(index){
      removeTicketVar(index);
    }
    //
    var removeTicketVar =  function(index){
      // remove the first ticket
     if(index == '1'){
       if(ticketRegisterNumber == 3) {// if list have three ticket
         // update number of list ticket
         ticketRegisterNumber     -= 1;
         // move second ticket to first ticket
         $scope.showFirstTicket  = true;
         $scope.firstTicket     = $scope.secondTicket;
         $scope.firstDefaultPrice= $scope.secondDefaultPrice;
         $scope.firstDiscout     = $scope.secondCustomerDiscount;
         // set name and id
         $scope.inputNameFirstTicket =$scope.inputNameSecondTicket;
         $scope.inputIDFirstTicket = $scope.inputIDSecondTicket;

         //move three to two
         $scope.showSecondTicket  = true;
         $scope.secondTicket     = $scope.thirdTicket;
         $scope.secondDefaultPrice= $scope.thirdDefaultPrice;
         $scope.secondCustomerDiscount     = $scope.thirdCustomerDiscount;
         // set name and id
         $scope.inputNameSecondTicket =$scope.inputNameThirdTicket;
         $scope.inputIDSecondTicket = $scope.inputIDThirdTicket;

         // delete three ticket
         $scope.showThirdTicket  = false;
         $scope.thirdTicket      = '';
         $scope.thirdDefaultPrice    = 0;
         $scope.thirdCustomerDiscount      = 0;

       }else if(ticketRegisterNumber == 2){// if list have two tickets
         ticketRegisterNumber     -= 1;
         $scope.showFirstTicket  = true;
         $scope.firstTicket     = $scope.secondTicket;
         $scope.firstDefaultPrice= $scope.secondDefaultPrice;
         $scope.firstDiscout     = $scope.secondCustomerDiscount;
         // set name and id
         $scope.inputNameFirstTicket =$scope.inputNameSecondTicket;
         $scope.inputIDFirstTicket = $scope.inputIDSecondTicket;
         //move three to two
         $scope.showSecondTicket  = false;
         $scope.secondTicket     = '';
         $scope.secondDefaultPrice= 0;
         $scope.secondCustomerDiscount     = 0;
       }else{
         $scope.showFirstTicket  = false;
         $scope.firstTicket      = '';
         $scope.firstDefaultPrice    = 0;
         $scope.firstDiscout      = 0;
       }

    }else if(index  == '2'){ // remove second ticket
     if(ticketRegisterNumber == 3) {// if list have three tickets
       //move three to two
       ticketRegisterNumber     -= 1;
       $scope.showSecondTicket  = true;
       $scope.secondTicket     = $scope.thirdTicket;
       $scope.secondDefaultPrice= $scope.thirdDefaultPrice;
       $scope.secondCustomerDiscount     = $scope.thirdCustomerDiscount;
       // set name and id
       $scope.inputNameSecondTicket =$scope.inputNameThirdTicket;
       $scope.inputIDSecondTicket = $scope.inputIDThirdTicket;
       // delete three ticket
       $scope.showThirdTicket  = false;
       $scope.thirdTicket      = '';
       $scope.thirdDefaultPrice    = 0;
       $scope.thirdCustomerDiscount      = 0;

     }else{// if list have two tickets
       ticketRegisterNumber     -= 1;
       $scope.showSecondTicket  = false;
       $scope.secondTicket      = '';
       $scope.secondDefaultPrice    = 0;
       $scope.secondCustomerDiscount      = 0;
     }
   }else if(index == '3'){// remove third ticket
         ticketRegisterNumber     -= 1;
         $scope.showThirdTicket  = false;
         $scope.thirdTicket      = '';
         $scope.thirdDefaultPrice    = 0;
         $scope.thirdCustomerDiscount      = 0;
   }
   // check list of ticket if it is empty change state to main.home
   if( ((typeof $scope.firstTicket) == 'string')
       && ((typeof $scope.secondTicket) == 'string')
       && ((typeof $scope.thirdTicket) == 'string' )){
         $state.go('main.home');
       }
   // update total price
   $scope.total = $scope.thirdDefaultPrice - $scope.thirdCustomerDiscount + $scope.secondDefaultPrice - $scope.secondCustomerDiscount
                 + $scope.firstDefaultPrice - $scope.firstDiscout;
    }

    // register the ticket
    $scope.registerTicket  =  function(){
      // if cutomer is at register state.
      if(isRegister){
        // flag is mark ticket's sate
        // default value is flase: ticket's iformation is fail
        var isFirstCustomer   = false;
        var isSecondCustomer  = false;
        var isThirdCustomer   = false;

        // reset list of customer
        listRegisterCustomer = [3];
        // check customer's information

        // the first ticket
        // typeof $scope.firstTicket = string: first ticket not have information
        if( ((typeof $scope.firstTicket) != 'string') ){
          //flag mark check input
          // true is correct information
          // false is not correct information
          var isFirstCustomerName = true;
          var isFirstCustomerID = true;
          // get name and id of first customer
          var firstCustomerName  = $scope.inputNameFirstTicket;
          var firstCustomerID    = $scope.inputIDFirstTicket;
           // check name of customer
           if(!checkInput(firstCustomerName)){
             // change border color of input box
             $scope.classFirstTicketName = "class-boder-red";
             // inform the customer
             toastr.error('Name of the <lable id="lbl-error-toasrt">FIRST ticket </lable> failed.',
                          'Error',{allowHtml:true, timeOut: timOutToastr});
              // set the first ticket have fail information
             isFirstCustomerName = false;
           }else{
             // reset border color if before changed
             $scope.classFirstTicketName = "";
             // name of the first cutomer is correct
             isFirstCustomerName = true;
           }
           // check id of customer
           if(!checkInput(firstCustomerID)){
             $scope.classFirstTicketID = "class-boder-red";
             toastr.error('Passport of the <lable id="lbl-error-toasrt">FIRST ticket </lable> failed.'
                          ,'Error',{allowHtml:true, timeOut: timOutToastr});
             isFirstCustomerID = false;
           }else{
             $scope.classFirstTicketID = "";
             isFirstCustomerID = true;
           }
           // if name and id of customer are correct, so create customer prepare to save database.
           if(isFirstCustomerName && isFirstCustomerID){
             // first customer's iformation is correct so
             isFirstCustomer = true;
             // get addtional information for customer
             var email = $scope.firstCustomerEmail;
             var phone = $scope.firstCustomerPhone;
             var address = $scope.firstCustomerAddress;
             // addtional the company's information
             companyCustomer.nameCompany = $scope.firstCompanyName;
             companyCustomer.taxNumber = $scope.firstTaxCompany;
             companyCustomer.addressCompany = $scope.firstCompanyAddress;
             companyCustomer.emailCompany = $scope.firstEmailCompany;
             // create first customer
             var customer =  createCustomer(firstCustomerID, firstCustomerName
                            , address, phone , email, companyCustomer,$scope.firstTicket);
            // add customer to list customer
             listRegisterCustomer[0] = customer;
           }
        }
        // check the second customer's information
        if( ((typeof $scope.secondTicket) != 'string') ){
          //flag mark check input
          // true is correct information
          // false is not correct information
          var isSecondCustomerName = true;
          var isSecondCustomerID = true;
          // get name and id of the second customer
          var secondCustomerName  = $scope.inputNameSecondTicket;
          var secondCustomerID    = $scope.inputIDSecondTicket;
          // check name
          if(!checkInput(secondCustomerName)){

            $scope.classSecondTicketName = "class-boder-red";
            toastr.error('Name of the <lable id="lbl-error-toasrt">SECOND ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOutToastr});

            isSecondCustomerName = false;
          }else{
            $scope.classSecondTicketName = "";
            isSecondCustomerName = true;
          }
          // chekc id
          if(!checkInput(secondCustomerID)){
            $scope.classSecondTicketID = "class-boder-red";
            toastr.error('Passport of the <lable id="lbl-error-toasrt">SECOND ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOutToastr});
            isSecondCustomerID = false;
          }else{
            $scope.classSecondTicketID = "";
            isSecondCustomerID = true;
          }
          // made customer
          if(isSecondCustomerName && isSecondCustomerID){
            isSecondCustomer = true;
            var customer =  createCustomer(secondCustomerID, secondCustomerName
                           , '', '' ,'', companyCustomer,$scope.secondTicket);

            listRegisterCustomer[1] = customer;
          }
        }
        // check the third customer's iformation
        if( ((typeof $scope.thirdTicket) != 'string') ){
          var isThirdCustomerName = true;
          var isThirdCustomerID = true;
          var thirdCustomerName  = $scope.inputNameThirdTicket;
          var thirdCustomerID    = $scope.inputIDThirdTicket;
          // catch erro
          if(!checkInput(thirdCustomerName)){
            $scope.classThirdTicketName = "class-boder-red";
            toastr.error('Name of the <lable id="lbl-error-toasrt">THIRD ticket </lable> failed.'
                         ,'Error',{allowHtml:true, timeOut: timOutToastr});
            isThirdCustomerName = false;
          }else{
            $scope.classThirdTicketName = "";
            isThirdCustomerName = true;
          }
          if(!checkInput(thirdCustomerID) || isThirdCustomer){
            $scope.classThirdTicketID = "class-boder-red";
            toastr.error('Passport of the <lable id="lbl-error-toasrt">THIRD ticket </lable> failed.'
                          ,'Error',{ allowHtml: true, timeOut: timOutToastr});
            isThirdCustomerID = false;

          }else{
            $scope.classThirdTicketID = "";
            isThirdCustomerID = true;
          }
          // made the customer
          if(isThirdCustomerName && isThirdCustomerID){
            isThirdCustomer = true;
            var customer =  createCustomer(thirdCustomerID, thirdCustomerName
                           , '', '' ,'', companyCustomer,$scope.thirdTicket);
            listRegisterCustomer[2] = customer;
          }
        }
        // if the customer register three the tickets
        if((ticketRegisterNumber == 3) && isFirstCustomer && isSecondCustomer && isThirdCustomer){
          // check Passport
          var isTrueInfor = checkPassPort(3);
          // if information do not correct stop here
          if(!isTrueInfor){
            return;
          }
          // disabled all compenent on page when register successfully.
          $scope.isDisabledElement = true;
          // change state submit button to save image
          isRegister =  false;
          // change text of submit button
          if(!isRegister){
            $scope.btnContent = 'Save Image';
          }else{
            $scope.btnContent = 'Register';
          }
          // save customer to server
          // save third customer.
          $http.post(urlServices.getURL('customer'), listRegisterCustomer[2])
                .success(function (data, status, headers, config) {
                  // inform customer save third customer successfully
                  toastr.success('Name: '+ listRegisterCustomer[2].name
                                +" \n"+listRegisterCustomer[2]._id+" success", 'Registed',
                                {timeOut: timOutToastr});
                  // continue save second customer
                  $http.post(urlServices.getURL('customer'), listRegisterCustomer[1])
                        .success(function (data, status, headers, config) {
                          // inform customer save second customer successfully
                          toastr.success('Name: '+ listRegisterCustomer[1].name
                                      +" \n"+listRegisterCustomer[1]._id+" success", 'Registed',
                                      {timeOut: timOutToastr});
                          // continue save first customer
                          $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                                .success(function (data, status, headers, config) {
                                  // inform customer save first customer successfully
                                  toastr.success('Name: '+ listRegisterCustomer[0].name
                                                  +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                                                  {timeOut: timOutToastr});
                                })
                                .error(function (data, status, header, config) {
                                  // if server cannot connect, inform customer.
                                  if(data == null){
                                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                                'Error',{timeOut:timOutToastr});
                                    // change submit button to register state
                                    isRegister = true;
                                    // stop here
                                    return;
                                  }
                                  // inform customer know server cannot register cusomter's ticket
                                  toastr.error('Name: '+ listRegisterCustomer[0].name
                                                  +" \n"+listRegisterCustomer[0]._id+" "+ data.error,'Error',{timeOut:timOutToastr});
                                  // remove this ticket
                                  removeTicketVar(1);
                                });
                        })
                        .error(function (data, status, header, config) {
                          // if server cannot connect, inform customer.
                          if(data == null){
                            toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                        'Error',{timeOut:timOutToastr});
                            // change submit button to register state
                            isRegister = true;
                            // stop here
                            return;
                          }
                          // inform customer know server cannot register cusomter's ticket
                          toastr.error('Name: '+ listRegisterCustomer[1].name
                                          +" \n"+listRegisterCustomer[1]._id+" "+data,'Error',{timeOut:timOutToastr});
                          // remove this ticket
                          removeTicketVar(2);
                          // continue save first ticket
                          $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                                .success(function (data, status, headers, config) {

                                  toastr.success('Name: '+ listRegisterCustomer[0].name
                                  +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOutToastr});
                                })
                                .error(function (data, status, header, config) {

                                  if(data == null){
                                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                                'Error',{timeOut:timOutToastr});
                                    isRegister = true;
                                    return;
                                  }

                                  toastr.error('Name: '+ listRegisterCustomer[0].name
                                                  +" \n"+listRegisterCustomer[0]._id+" "+data,'Error',{timeOut:timOutToastr});
                                  removeTicketVar(1);
                                });
                        });
                })
                // error from third ticket
                .error(function (data, status, header, config) {

                  if(data == null){
                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                'Error',{timeOut:timOutToastr});
                    // set enable elements
                    $scope.btnContent = 'Register';
                    $scope.isDisabledElement = true;
                    isRegister = true;
                    return;
                  }
                  toastr.error('Name: '+ listRegisterCustomer[2].name
                                  +" \n"+listRegisterCustomer[2]._id+" "+data.error,'Error',{timeOut:timOutToastr});
                  removeTicketVar(3);
                  //continue save second ticket
                  $http.post(urlServices.getURL('customer'), listRegisterCustomer[1])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ listRegisterCustomer[1].name
                          +" \n"+listRegisterCustomer[1]._id+" success", 'Registed',
                          {timeOut: timOutToastr});
                          // continue save first ticket
                          $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ listRegisterCustomer[0].name
                                  +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOutToastr});
                                })
                                .error(function (data, status, header, config) {
                                  toastr.error('Name: '+ listRegisterCustomer[0].name
                                                  +" \n"+listRegisterCustomer[0]._id+" "+data,'Error',{timeOut:timOutToastr});
                                  removeTicketVar(1);
                                });
                        })
                        .error(function (data, status, header, config) {
                          if(data == null){
                            toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                        'Error',{timeOut:timOutToastr});
                            // set enable elements
                            $scope.btnContent = 'Register';
                            $scope.isDisabledElement = true;
                            return;
                          }
                          toastr.error('Name: '+ listRegisterCustomer[1].name
                                          +" \n"+listRegisterCustomer[1]._id+" "+data.error,'Error',{timeOut:timOutToastr});
                          removeTicketVar(2);
                          $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                                .success(function (data, status, headers, config) {
                                  toastr.success('Name: '+ listRegisterCustomer[0].name
                                  +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                                  {timeOut: timOutToastr});
                                })
                                .error(function (data, status, header, config) {
                                  if(data == null){
                                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                                'Error',{timeOut:timOutToastr});
                                    return;
                                  }
                                  toastr.error('Name: '+ listRegisterCustomer[0].name
                                                  +" \n"+listRegisterCustomer[0]._id+" "+data.error,'Error',{timeOut:timOutToastr});
                                  removeTicketVar(1);
                                });
                        });
                });


        }else if((ticketRegisterNumber == 2) && isFirstCustomer && isSecondCustomer){// save two ticket

          var isTrueInfor = checkPassPort(2);
          if(!isTrueInfor){
            return;
          }
          //
          isRegister =  false;
          if(!isRegister){
            $scope.btnContent = 'Save image';
          }else{
            $scope.btnContent = 'Register';
          }
          $scope.isDisabledElement = true;
          $http.post(urlServices.getURL('customer'), listRegisterCustomer[1])
                .success(function (data, status, headers, config) {
                  toastr.success('Name: '+ listRegisterCustomer[1].name
                  +" \n"+listRegisterCustomer[1]._id+" success", 'Registed',
                  {timeOut: timOutToastr});

                  $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ listRegisterCustomer[0].name
                          +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                          {timeOut: timOutToastr});

                        })
                        .error(function (data, status, header, config) {
                          if(data == null){
                            toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                        'Error',{timeOut:timOutToastr});
                            isRegister = true;
                            return;
                          }
                          toastr.error('Name: '+ listRegisterCustomer[0].name
                                          +" \n"+listRegisterCustomer[0]._id+" "+data,'Error',{timeOut:timOutToastr});
                          removeTicketVar(1);
                        });
                })
                .error(function (data, status, header, config) {
                  if(data == null){
                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                'Error',{timeOut:timOutToastr});
                    isRegister = true;
                    return;
                  }
                  toastr.error('Name: '+ listRegisterCustomer[1].name
                                  +" \n"+listRegisterCustomer[1]._id+" "+data,'Error',{timeOut:timOutToastr});
                  removeTicketVar(2);
                  //save firt ticket
                  $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                        .success(function (data, status, headers, config) {
                          toastr.success('Name: '+ listRegisterCustomer[0].name
                          +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                          {timeOut: timOutToastr});

                        })
                        .error(function (data, status, header, config) {
                          if(data == null){
                            toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                        'Error',{timeOut:timOutToastr});
                            isRegister = true;
                            return;
                          }
                          toastr.error('Name: '+ listRegisterCustomer[0].name
                                          +" \n"+listRegisterCustomer[0]._id+" "+data,'Error',{timeOut:timOutToastr});
                          removeTicketVar(1);
                        });
                });
              }
        else if( (ticketRegisterNumber == 1) && isFirstCustomer){
          isRegister =  false;
          $scope.isDisabledElement = true;
          if(!isRegister){
            $scope.btnContent = 'Save image';
          }else{
            $scope.btnContent = 'Register';
          }
          $http.post(urlServices.getURL('customer'), listRegisterCustomer[0])
                .success(function (data, status, headers, config) {
                  toastr.success('Name: '+ listRegisterCustomer[0].name
                  +" \n"+listRegisterCustomer[0]._id+" success", 'Registed',
                  {timeOut: timOutToastr});
                })
                .error(function (data, status, header, config) {
                  if(data == null){
                    toastr.error('Cannot connect to the server. Please try again after few minutes. Thanks',
                                'Error',{timeOut:timOutToastr});
                    isRegister = true;
                    return;
                  }
                  toastr.error('Name: '+ listRegisterCustomer[0].name
                                  +" \n"+listRegisterCustomer[0]._id+" "+data,'Error',{timeOut:timOutToastr});
                  removeTicketVar(1);
                });
        }else{
          toastr.warning('Information failed', 'WARNING',{timeOut: timOutToastr});
        }

      }else{
        // then registered ticket successfully
        saveImage();
      }
    }
    /*
    * METHOD
    */
    // event choose object of ticket
    // name is order of the ticket
    var chooseObjectVar =  function(name){

      switch (name) {
        case 'first':
          // get value had chosen by customer.
          var objectName = $scope.selectFirstTicket;
          showLog.show('select');
          showLog.show(objectName, envi);
          showLog.show((objectName == 'Old person') + "old ", envi);
          showLog.show((objectName == 'Student') + "student ", envi);
          if(objectName == 'Old person'){
            $scope.firstCustomerDiscount      = $scope.objects[2].discount;
          }else if( objectName == 'Student'){
            $scope.firstCustomerDiscount      = $scope.objects[1].discount;
          }else{// adult
            objectName = 'Adult';
            $scope.firstCustomerDiscount      = $scope.objects[0].discount;
          }
          showLog.show($scope.firstCustomerDiscount + "discount ", envi);
          // calculate discount
          $scope.firstCustomerDiscount =  Number($scope.firstDefaultPrice) * Number($scope.firstCustomerDiscount) ;
          showLog.show($scope.firstCustomerDiscount + "discount ", envi);
          // update price of the ticket
          $scope.firstTicket.price = Number($scope.firstDefaultPrice) - Number($scope.firstCustomerDiscount);
          showLog.show($scope.firstTicket.price + "discount ", envi);
          // update object of the tikcet
          $scope.firstTicket.object = objectName;
          break;
        case 'second':

            var objectName = $scope.selectSecondTicket;
          if( objectName == 'Old person'){
              $scope.secondCustomerDiscount      = $scope.objects[2].discount;
            }else if( objectName == 'Student'){
              $scope.secondCustomerDiscount      = $scope.objects[1].discount;
            }else{// adult
              objectName = 'Adult';
              $scope.secondCustomerDiscount      = $scope.objects[0].discount;
            }
            $scope.secondCustomerDiscount =  Number($scope.secondDefaultPrice) * Number($scope.secondCustomerDiscount) ;
            // update price of the ticket
            $scope.secondTicket.price = Number($scope.secondDefaultPrice) - Number($scope.secondCustomerDiscount);
            // update object of the tikcet
            $scope.secondTicket.object = objectName;
          break;
        case 'third':
            var objectName = $scope.selectThirdTicket;
            if( objectName == 'Old person'){
              $scope.thirdCustomerDiscount      = $scope.objects[2].discount;
            }else if( objectName == 'Student'){
              $scope.thirdCustomerDiscount      = $scope.objects[1].discount;
            }else{// adult
              objectName = 'Adult';
              $scope.thirdCustomerDiscount      = $scope.objects[0].discount;
            }
            $scope.thirdCustomerDiscount =  Number($scope.thirdDefaultPrice) * Number($scope.thirdCustomerDiscount);
            // update price of the ticket
            $scope.thirdTicket.price = Number($scope.thirdDefaultPrice) - Number($scope.thirdCustomerDiscount);
            // update object of the tikcet
            $scope.thirdTicket.object = objectName;
          break;
      }
      // update total price
      $scope.total = $scope.thirdDefaultPrice - $scope.thirdCustomerDiscount + $scope.secondDefaultPrice - $scope.secondCustomerDiscount
                    + $scope.firstDefaultPrice - $scope.firstCustomerDiscount;
    }
    // check passport of customer
    // condition: number of list customer.
    var checkPassPort =  function(condition){

      if(condition == 3){// check three the tickets
        // assigned value
        var firstTicket =  $scope.firstTicket;
        var secondTicket =  $scope.secondTicket;
        var thirdTicket =  $scope.thirdTicket;
        // at the moment cannot have one customer can register two tickets which are same journey.
        // check first customer and second customer
        if(firstTicket.isReturn == secondTicket.isReturn){
          if(listRegisterCustomer[0]._id == listRegisterCustomer[1]._id){
            toastr.error("Ticket 1 and Ticket 2 are same Passport.","ERROR",{timeOut: timOutToastr});
            // stop check here
            return false;
          }
        }
        // check first customer and third customer
        if(firstTicket.isReturn == thirdTicket.isReturn){
          if(listRegisterCustomer[0]._id == listRegisterCustomer[2]._id){
            toastr.error("Ticket 1 and Ticket 3 are same Passport.","ERROR",{timeOut: timOutToastr});
            return false;
          }
        }
        // check third customer and second customer
        if(thirdTicket.isReturn == secondTicket.isReturn){
          if(listRegisterCustomer[2]._id == listRegisterCustomer[1]._id){
            toastr.error("Ticket 2 and Ticket 3 are same Passport.","ERROR",{timeOut: timOutToastr});
            return false;
          }
        }
        // when end check if no any wrong, so return true;
        return true;
      }else{ // check two the tickets

        var firstTicket =  $scope.firstTicket;
        var secondTicket =  $scope.secondTicket;
        if(firstTicket.isReturn == secondTicket.isReturn){
          if(listRegisterCustomer[0]._id == listRegisterCustomer[1]._id){
            toastr.error("Ticket 1  and Ticket 2 are same Passport.","ERROR",{timeOut: timOutToastr});
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
    // check string input
    // return true if this string has than 1 letter; false otherwise.
    var checkInput  = function(str){
      if(str == null)
        return false;
      if(((typeof str) == 'undefined') )
        return false;
      if((str.length < 2)){
        return false;
      }
      return true;
    }

    // the first load state it wil be execute to set list tickets
    var getTicket   = function(){
      if($scope.listTickets.length == 3){
        ticketRegisterNumber       = 3;
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
        ticketRegisterNumber     = 2;
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
        ticketRegisterNumber     = 1;
        $scope.firstTicket      = $scope.listTickets[0];
        $scope.firstDefaultPrice  = $scope.listTickets[0].price;
        // show list of the tickets
        $scope.showFirstTicket = true;
      }else{
        $state.go('main.home');
      }
      $scope.total = $scope.thirdDefaultPrice - $scope.thirdCustomerDiscount + $scope.secondDefaultPrice - $scope.secondCustomerDiscount
                    + $scope.firstDefaultPrice - $scope.firstCustomerDiscount;
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
                $scope.objects[0].event.push(listEvent[i]);
                break;
              case 'children':
                $scope.objects[1].event.push(listEvent[i]);
                break;
              case 'student':
                $scope.objects[2].event.push(listEvent[i]);
                break;
              case 'oldperson':
                $scope.objects[3].event.push(listEvent[i]);
                break;

            }
          }
        }
      }
    }
    // filter event die; if it die remove from list
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
    // convert page to image to save
    var saveImage =  function(){
      html2canvas($("#div-register"), {
       onrendered: function(canvas) {
           // canvas is the final rendered <canvas> element
           var myImage = canvas.toDataURL("image/png");
           window.open(myImage);
       }
     });
    }

    /*
    * RUN METHODS
    */
    // exec when main.register had been call
    getTicket();
});
