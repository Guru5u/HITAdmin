/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.jobForm', ['ui.select', 'ngSanitize', 'ngTouch', 'ui.grid', 'ui.grid.importer', 'ui.grid.rowEdit', 'ui.grid.edit', 'ui.grid.pagination'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('jobForm', {
          url: '/jobForm',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'JobFormCtrl',
          title: 'Job',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('jobForm.job', {
          url: '/job',
          templateUrl: 'app/pages/jobForm/layouts/jobLayouts.html',
          title: 'Apps',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('jobForm.addJob', {
          url: '/addJob',
          templateUrl: 'app/pages/jobForm/layouts/addjobLayouts.html',
         title: 'Run Spark Jobs',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('jobForm.adhocJob', {
          url: '/adhocJob',
          templateUrl: 'app/pages/jobForm/layouts/adhocjobLayouts.html',
          title: 'Adhoc',
          sidebarMeta: {
            order: 100,
          },
        })
  }
})();
