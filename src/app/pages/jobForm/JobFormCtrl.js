/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.jobForm')
      .controller('JobFormCtrl', JobFormCtrl);

  /** @ngInject */
  function JobFormCtrl($scope, $http, $interval, $q, toastr, toastrConfig) {

    console.log('In JobFormCtrl ');



    /**********************************UI Grid **************************/

  $scope.gridOptions1 = {};
  $scope.gridOptions2 = {};


  $scope.data1 = [];
    $scope.gridOptions1 = {
    enableFiltering: true,
    enableGridMenu: true,
   
    /*selectionRowHeaderWidth: 35,
    rowHeight: 35,*/
      /*columnDefs: [
            { field: 'Addr_1', headerCellClass: $scope.highlightFilteredHeader }],*/
      importerDataAddCallback: function(grid1, newObjects) {
        $scope.data1 = $scope.data1.concat(newObjects);
      },
      onRegisterApi: function(gridApi1) {
        $scope.gridApi1 = gridApi1;
        gridApi1.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
            //Do your REST call here via $hhtp.get or $http.post
            //This alert just shows which info about the edit is available
            //alert('Column: ' + columnDefs3.I_KEY );
          });
        gridApi1.rowEdit.on.saveRow($scope, $scope.saveRow1);
      },
      data: 'data1'
    };

    $scope.saveRow1 = function(rowEntity) {
      // create a fake promise - normally you'd use the promise returned by $http or $resource
      var promise = $q.defer();
      $scope.gridApi1.rowEdit.setSavePromise(rowEntity, promise.promise);

     // console.log(" rowEntity.I_KEY "+rowEntity.I_KEY  + " === "+rowEntity.I_KEY.length);
      // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
      $interval(function() {
          if (rowEntity.Gender === 'male') {
            alert( 'Ikey cannot be empty');
            promise.reject();
          } else {
            promise.resolve();
          }
        }, 3000, 1);
    };

    $scope.data2 = [];
    $scope.gridOptions2 = {
      enableGridMenu: true,
      importerDataAddCallback: function(grid2, newObjects) {
        $scope.data2 = $scope.data2.concat(newObjects);
      },
      onRegisterApi: function(gridApi2) {
        $scope.gridApi2 = gridApi2;
        gridApi2.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
          });
        gridApi2.rowEdit.on.saveRow($scope, $scope.saveRow2);
      },
      data: 'data2'
    };

    $scope.saveRow2 = function(rowEntity) {
      // create a fake promise - normally you'd use the promise returned by $http or $resource
      var promise = $q.defer();
      $scope.gridApi2.rowEdit.setSavePromise(rowEntity, promise.promise);

     // console.log(" rowEntity.I_KEY "+rowEntity.I_KEY  + " === "+rowEntity.I_KEY.length);
      // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
      $interval(function() {
          if (rowEntity.Gender === 'male') {
            alert( 'Ikey cannot be empty');
            promise.reject();
          } else {
            promise.resolve();
          }
        }, 3000, 1);
    };



      /****************************UI Grid *****************************/
  
    $scope.addCluster = function() {
      console.log('==== In addCluster =====');
      var clusterName = $scope.clusterName;
      var serverIP = $scope.serverIP;
      console.log(" clusterName "+clusterName);
      console.log(" serverIP "+serverIP);

       var data = $.param({
                "name":""+clusterName+"",
                "clusterIpAddr":""+serverIP+""
            });

       alert( ' data '+data );
        
            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }

            $http.post('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/add', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    };

    $scope.testConnection = function() {

      console.log(" in testConnection "+ $scope.serverIP);

      var clusterIp =  $scope.serverIP;
      console.log('clusterIp ' +'http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/'+clusterIp+'/testconnection')
        
      $http.get('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/'+clusterIp+'/testconnection').
        then(function(response) {
     
            var msg = response.data.message;
            $scope.options.title = '';
            $scope.options.msg = response.data.message;
            $scope.openToast();
            //alert("Connection Status : "+response.data.message);

          },function(response) {
              alert("Something went wrong");
        });
    };

/******************Toaster********************************/


var defaultConfig = angular.copy(toastrConfig);
    $scope.types = ['success', 'error', 'info', 'warning'];

    $scope.quotes = [
      {
        title: 'Come to Freenode',
        message: 'We rock at <em>#angularjs</em>',
        options: {
          allowHtml: true
        }
      },
      {
        title: 'Looking for bootstrap?',
        message: 'Try ui-bootstrap out!'
      },
      {
        title: 'Wants a better router?',
        message: 'We have you covered with ui-router'
      },
      {
        title: 'Angular 2',
        message: 'Is gonna rock the world'
      },
      {
        title: null,
        message: 'Titles are not always needed'
      },
      {
        title: null,
        message: 'Toastr rock!'
      },
      {
        title: 'What about nice html?',
        message: '<strong>Sure you <em>can!</em></strong>',
        options: {
          allowHtml: true
        }
      },
      {
        title: 'Ionic is <em>cool</em>',
        message: 'Best mobile framework ever',
        options: {
          allowHtml: true
        }
      }
    ];

    var openedToasts = [];
    $scope.options = {
      autoDismiss: false,
      positionClass: 'toast-top-right',
      type: 'info',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: false,
      tapToDismiss: true,
      progressBar: false,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
      title: "Some title here",
      msg: "Type your message here"
    };


    $scope.clearLastToast = function () {
      var toast = openedToasts.pop();
      toastr.clear(toast);
    };

    $scope.clearToasts = function () {
      toastr.clear();
    };

    $scope.openRandomToast = function () {
      var type = Math.floor(Math.random() * $scope.types.length);
      var quote = Math.floor(Math.random() * $scope.quotes.length);
      var toastType = $scope.types[type];
      var toastQuote = $scope.quotes[quote];
      openedToasts.push(toastr[toastType](toastQuote.message, toastQuote.title, toastQuote.options));
      $scope.optionsStr = "toastr." + toastType + "(\'" + toastQuote.message + "\', \'" + toastQuote.title + "', " + JSON.stringify(toastQuote.options || {}, null, 2) + ")";
    };

    $scope.openToast = function () {
      angular.extend(toastrConfig, $scope.options);
      openedToasts.push(toastr[$scope.options.type]($scope.options.msg, $scope.options.title));
      var strOptions = {};
      for (var o in  $scope.options) if (o != 'msg' && o != 'title')strOptions[o] = $scope.options[o];
      $scope.optionsStr = "toastr." + $scope.options.type + "(\'" + $scope.options.msg + "\', \'" + $scope.options.title + "\', " + JSON.stringify(strOptions, null, 2) + ")";
    };

    $scope.$on('$destroy', function iVeBeenDismissed() {
      angular.extend(toastrConfig, defaultConfig);
    })

   

  }

})();
