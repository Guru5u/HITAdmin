/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $http, $timeout, baConfig, baUtil) {

    

    $http.get('http://10.10.200.39:8080/HadoopJobRunner/job/rest/getclustersandjobapps').
        then(function(response) {
            
            //$scope.charts[0].description = response.data.data.hadoop_clusters;

            //alert( "$scope.charts.description[0] "+$scope.charts[0].description);

             $scope.charts = [{
      //color: pieColor,
      description: 'Hadoop Clusters - '+response.data.data.hadoop_clusters,

     // stats: '57,820',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Spark Clusters - '+response.data.data.spark_clusters,
      //stats: '$ 89,745',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Total Apps - ' + response.data.data.total_apps,
      //stats: '178,391',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Total Jobs - ' + response.data.data.total_jobs,
      //stats: '32,592',
      icon: 'face',
    }
    ];


        });
     var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts1 = [{
      //color: pieColor,
      description: 'Hadoop Clusters - ',

     // stats: '57,820',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Spark Clusters',
      //stats: '$ 89,745',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Spark Apps : 5 \t Hadoop Apps : 10',
      //stats: '178,391',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Spark Jobs : 5 \n Hadoop Jobs : 10',
      //stats: '32,592',
      icon: 'face',
    }
    ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();