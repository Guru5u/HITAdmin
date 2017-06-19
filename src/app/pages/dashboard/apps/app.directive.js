/**
 * @author guru
 * created on 06.08.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('apps', apps);

  /** @ngInject */
  function apps() {
    return {
      restrict: 'E',
      controller: 'AppsCtrl',
      templateUrl: 'app/pages/dashboard/apps/app.html'
    };
  }
})();