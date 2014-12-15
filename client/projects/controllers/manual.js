'use strict';

var $ = require('jquery'); //todo: replace with $http.put

module.exports = function ($scope, $sce) {
  $scope.config = {};

  $scope.providers = globalVariables.manualProviders;
  $scope.projects = Object.keys(globalVariables.manualProjects).reduce(function (all, type) {
    return all.concat(globalVariables.manualProjects[type]);
  }, []);
  $scope.remove = function (project) {
    project.really_remove = 'removing';
    $.ajax('/' + project.name + '/', {
      type: 'DELETE',
      success: function () {
        $scope.projects.splice($scope.projects.indexOf(project), 1);
        $scope.success('Project removed', true);
      },
      error: function () {
        $scope.error('Failed to remove project', true);
      }
    })
  };
  $scope.markup = function(provider) {
    return $sce.trustAsHtml(provider.provider.html);
  };
  $scope.create = function (providerId, projectConfig) {
    var name = projectConfig.display_name.toLowerCase();
    if (!validName(name)) return;
    $.ajax('/' + name + '/', {
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        display_name: projectConfig.display_name,
        display_url: projectConfig.display_url,
        public: projectConfig.public,
        provider: {
          id: providerId,
          config: $scope.config
        }
      }),
      success: function () {
        $scope.projects.push({
          display_name: projectConfig.display_name,
          name: projectConfig.display_name.replace(/ /g, '-').toLowerCase(),
          display_url: projectConfig.display_url,
          provider: {
            id: providerId,
            config: $scope.config
          }
        });
        $scope.newJob = {};
        $scope.success('Created project!', true);
      },
      error: function () {
        $scope.error('failed to create project', true);
      }
    });
  }
};

function validName(name) {
  return !!name.match(/[\w-]+\/[\w-]+/);
}
