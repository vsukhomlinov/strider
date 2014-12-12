'use strict';

var angular = require('angular');
var interpolate = require('../utils/interpolate');
var ManualController = require('./controllers/manual');
var ProjectsController = require('./controllers/projects');

var app = angular.module('projects', ['alerts', 'moment', 'ui.bootstrap.buttons'])
  .config(['$interpolateProvider', interpolate])
  .controller('ManualController', ['$scope', '$sce', ManualController])
  .controller('ProjectsController', ['$scope', ProjectsController])
  .directive('pluginTemplate', ['$compile', function($compile) {
    return {
      link: function(scope, element, attr) {
        element.append($compile('<div class="provider-specific">' + scope.$eval(attr['pluginTemplate']) + '</div>')(scope))
      }
    }
  }]);

module.exports = app; 
