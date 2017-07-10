/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('ClusterCtrl', ClusterCtrl);

  /** @ngInject */
  function ClusterCtrl($scope,  $http, $q, $filter, editableOptions, editableThemes) {

    $scope.smartTablePageSize = 10;
  $scope.removecluster = function(index) {

    alert(" in remove "+index);

      //$scope.clusterData[index].name;
      //alert(" $scope.clusterData[index].name;  "+$scope.clusterData[index].name);
      $scope.clusterTableData.splice(index, 1);
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
      $http.get('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/add', JSON.stringify(clusterData),config).
        then(function(response) {
            //var msg = response.data.message;
            alert("Connection Status : "+response.data.message);
        },
        function(response) {
        alert("Something went wrong");
      });
    };

  $scope.testConnection = function(index) {

    console.log(" in testConnection "+index);

      $scope.clusterTableData[index].name;
      var clusterIp = $scope.clusterTableData[index].clusterIpAddr;
      console.log('clusterIp ' +'http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/'+clusterIp+'/testconnection')
      
      $http.get('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/'+clusterIp+'/testconnection').
        then(function(response) {
            //var msg = response.data.message;
            alert("Connection Status : "+response.data.message);
        },
        function(response) {
        alert("Something went wrong");
      });
    };
/***************************************UI GRID *********************/

$scope.gridOptions1 = {};
  
  $scope.data1 = [];
    $scope.gridOptions1 = {
      enableGridMenu: true,
      enableFiltering: true,
      /*importerDataAddCallback: function(grid1, newObjects) {
        $scope.data1 = $scope.data1.concat(newObjects);
      },*/
      onRegisterApi: function(gridApi1) {
        $scope.gridApi1 = gridApi1;
        gridApi1.edit.on.afterCellEdit($scope, function(rowEntity, newValue, oldValue) {
            //Do your REST call here via $hhtp.get or $http.post
            //This alert just shows which info about the edit is available
            //alert('Column: ' + columnDefs3.I_KEY );

           });
        gridApi1.rowEdit.on.saveRow($scope, $scope.saveRow1);
      }
        //data: 'data1'
      };

      $http.get("http://10.10.200.39:8080/HadoopJobRunner/profile/rest/clusters")
    .success(function(data) {
      /*for( var i=0; i<6; i++){
        data = data.concat(data);
      }*/
      $scope.gridOptions1.data = data.data.clusters;
    });

    $scope.saveRow1 = function(rowEntity) {
      var promise = $scope.saveRowFunction(rowEntity);
        $scope.gridApi1.rowEdit.setSavePromise(rowEntity, promise);

    };


    $scope.saveRowFunction = function(row) {
      jQuery.support.cors = true;

        var clusterDetails = {
          "id":row.id,
          "name":row.name,
          "clusterIpAddr":row.clusterIpAddr
      };

    var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }

            alert('JSON.stringify(clusterDetails) '+JSON.stringify(clusterDetails));

        var deferred = $q.defer();
        if (row.id == undefined){
            $http.post('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/update', JSON.stringify(clusterDetails), config).success(deferred.resolve).error(deferred.reject);

        }else{
            //console.log("10 put ID: " + row.id);
            alert('in else');
            $http.post('http://10.10.200.39:8080/HadoopJobRunner/profile/rest/cluster/update', JSON.stringify(clusterDetails), config).success(deferred.resolve).error(deferred.reject);
        }
        return deferred.promise;
    };

/**************************************UI GRID***********************/






    $scope.clusterTableData1 = [  
      {
        "id": 1,
        "name": "cdh4.7.1",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.101",
        "validated": true,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2016-02-03T06:20:55.877-06:00",
        "lastModifiedDate": "2016-11-10T07:38:21.943-06:00"
      },
      {
        "id": 2,
        "name": "Cloudera 4.7.x",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.101",
        "validated": true,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2016-04-07T14:01:49.067-05:00",
        "lastModifiedDate": "2016-04-07T14:02:05.990-05:00"
      },
      {
        "id": 3,
        "name": "NTSysTEst",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.221",
        "validated": false,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2016-06-10T14:05:12.300-05:00",
        "lastModifiedDate": "2017-04-21T12:13:50.850-05:00"
      },
      {
        "id": 1003,
        "name": "HSBC Dev Env",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.87",
        "validated": false,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2016-10-31T11:52:01.303-05:00",
        "lastModifiedDate": "2016-11-09T11:09:10.310-06:00"
      },
      {
        "id": 2003,
        "name": "Cloudera5",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.221",
        "validated": false,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2016-11-10T07:43:55.337-06:00",
        "lastModifiedDate": "2016-11-10T07:48:08.293-06:00"
      },
      {
        "id": 3003,
        "name": "Cloudera165",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.165",
        "validated": true,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2017-02-15T05:28:16.603-06:00",
        "lastModifiedDate": "2017-03-27T08:15:19.830-05:00"
      },
      {
        "id": 4003,
        "name": "10.10.200.51",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.5",
        "validated": true,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2017-03-03T12:51:44.203-06:00",
        "lastModifiedDate": "2017-04-19T15:12:45.900-05:00"
      },
      {
        "id": 5003,
        "name": "DevCluster",
        "distribution": {
          "id": 1,
          "name": "Cloudera",
          "description": "cloudera distribution"
        },
        "clusterIpAddr": "10.10.200.5",
        "validated": true,
        "isDeleted": false,
        "createdBy": "admin",
        "modifiedBy": "admin",
        "createdDate": "2017-04-11T13:57:00.607-05:00",
        "lastModifiedDate": "2017-04-21T12:13:47.090-05:00"
    
}];

    $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    }
  }
})();