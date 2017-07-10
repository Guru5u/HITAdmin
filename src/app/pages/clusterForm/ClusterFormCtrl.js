  /**
   * @author v.lugovsky
   * created on 16.12.2015
   */
  (function () {
    'use strict';

    angular.module('BlurAdmin.pages.clusterForm')
        .controller('ClusterFormCtrl', ClusterFormCtrl);

    /** @ngInject */
    function ClusterFormCtrl($scope, $http, $interval, $q, toastr, toastrConfig) {

      console.log('In ClusterFormCtrl ');



      /**********************************UI Grid **************************/
    $scope.data = [];
    $scope.gridOptions = {
      enableGridMenu: true,
      importerDataAddCallback: function( grid, newObjects ) {
        $scope.data = $scope.data.concat( newObjects );
      },
      onRegisterApi: function(gridApi){ 
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
      },
      data: 'data'
    };

    $scope.saveRow = function( rowEntity ) {
      jQuery.support.cors = true;

     
      // create a fake promise - normally you'd use the promise returned by $http or $resource
      var promise = $q.defer();
      $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
            
      $http.post('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/update',row).success(function(){
      $interval(function(){
          promise.resolved();
          },3000, 1)
      }).error(promise.reject);
    };
    
    var handleFileSelect = function( event ){
      var target = event.srcElement || event.target;
      
      if (target && target.files && target.files.length === 1) {
        var fileObject = target.files[0];
        $scope.gridApi.importer.importFile( fileObject );
        target.form.reset();
      }
    };

    var fileChooser = document.querySelectorAll('.file-chooser');
    
    if ( fileChooser.length !== 1 ){
      console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
    } else {
      fileChooser[0].addEventListener('change', handleFileSelect, false);  // TODO: why the false on the end?  Google  
    }



        /****************************UI Grid *****************************/

    var updateCluster = function () {
    alert(' in send data '+index);
    alert(" $scope.clusterTableData[index].id  "+$scope.clusterTableData[index].id);
    alert(" $scope.clusterTableData[index].name  "+$scope.clusterTableData[index].name);
    alert(" $scope.clusterTableData[index].clusterIpAddr  "+$scope.clusterTableData[index].clusterIpAddr);
       jQuery.support.cors = true;
    alert('Send Request to external server...!');
    var clusterDetails = {
        "id":"6009",
        "name":"Cloudera Test1234",
        "clusterIpAddr":"10.10.200.165"
    };

    /*var clusterDetails = {
        "id":$scope.clusterTableData[index].id,
        "name":$scope.clusterTableData[index].name,
        "clusterIpAddr":$scope.clusterTableData[index].clusterIpAddr
    };*/

    var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }

     $http.post(' http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/update', JSON.stringify(clusterDetails), config)
            .success(function (data, status, headers, config) {

              console.log(" Cluster added successfully");
                $http.get('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/clusters').
        then(function(response) {
            $scope.clusterTableData = response.data.data.clusters;
        });
            })
            .error(function (data, status, header, config) {

            });
 };




    
      $scope.addCluster = function() {

    alert(" In addCluster ");
    jQuery.support.cors = true;

    var clusterData = {
        "name":$scope.clusterName,
        "clusterIpAddr":$scope.serverIP,
      };

    var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            } 


      alert('JSON.stringify(clusterData) '+JSON.stringify(clusterData) );          
      $http.get('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/add', JSON.stringify(clusterData),config).
        then(function(response) {
            //var msg = response.data.message;
            alert("Connection Status : "+response.data.message);
        },
        function(response) {
        alert("Something went wrong");
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
