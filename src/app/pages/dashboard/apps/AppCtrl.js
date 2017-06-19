/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('AppsCtrl', AppsCtrl);


      /*angular.module('demo', [])
.controller('Hello', function($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        then(function(response) {
            $scope.greeting = response.data;
        });
});*/

  /** @ngInject */
  function AppsCtrl($scope,  $http) {

    /*$http.get('http://rest-service.guides.spring.io/greeting').
        then(function(response) {
          alert("response.data "+response.data)
            //$scope.greeting = response.data;
        });*/
    $http.get('http://10.10.200.39:8080/HadoopJobRunner/job/rest/getapps').
        then(function(response) {          
            //$scope.appsData = response.data.data.apps;
        });

    $scope.appsData = [  
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