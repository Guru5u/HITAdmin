/**
 * @author guru
 * created on 06.08.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('cluster', cluster);

  /** @ngInject */
  function cluster() {
    return {
      restrict: 'E',
      controller: 'ClusterCtrl',
      templateUrl: 'app/pages/dashboard/cluster/cluster.html'
    };
  }
})();