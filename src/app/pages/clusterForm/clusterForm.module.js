/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.clusterForm', ['ui.select', 'ngSanitize', 'ngTouch', 'ui.grid', 'ui.grid.importer', 'ui.grid.rowEdit', 'ui.grid.edit'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('clusterForm', {
          url: '/clusterForm',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'ClusterFormCtrl',
          title: 'Cluster',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('clusterForm.cluster', {
          url: '/cluster',
          templateUrl: 'app/pages/clusterForm/layouts/clusterLayouts.html',
          title: 'Big Data Sources',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('clusterForm.addCluster', {
          url: '/addCluster',
          templateUrl: 'app/pages/clusterForm/layouts/addClusterLayouts.html',
          title: 'Add Clusters',
          controller: 'ClusterFormCtrl',
          sidebarMeta: {
            order: 100,
          },
        })
  }
})();
