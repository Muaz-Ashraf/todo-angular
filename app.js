// app.js
var app = angular.module("todoApp", ["ngRoute"]);

app.controller("TodoController", function ($scope, $location) {
  $scope.tasks = [];
  $scope.nextTaskId = 1; // Initialize the ID counter

  $scope.addTask = function () {
    if ($scope.newTask) {
      $scope.tasks.push({
        id: $scope.nextTaskId,
        text: $scope.newTask,
        done: false,
      });
      $scope.newTask = "";
      $scope.nextTaskId++; // Increment the ID counter
    }
  };
  $scope.handleKeyPress = function (event) {
    if (event.keyCode === 13) {
      $scope.addTask();
    }
  };
  $scope.toggleTaskDone = function (task) {
    task.done = !task.done;
  };

  $scope.removeTask = function (task) {
    var index = $scope.tasks.indexOf(task);
    if (index !== -1) {
      // Set the 'removing' property to true for the task
      $scope.tasks[index].removing = true;
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.tasks.splice(index, 1);
        });
      }, 200);
    }
  };
  $scope.removeCompletedTasks = function () {
    var tasksToRemove = [];
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].done) {
        tasksToRemove.push($scope.tasks[i]);
      }
    }
    for (var i = 0; i < tasksToRemove.length; i++) {
      var index = $scope.tasks.indexOf(tasksToRemove[i]);
      if (index !== -1) {
        $scope.tasks.splice(index, 1);
      }
    }
  };
  $scope.hasCompletedTasks = function () {
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].done) {
        return true;
      }
    }
    return false;
  };
  $scope.goToTodoDetails = function (task) {
    $location.path("/todo/" + task.id); // Use the task's unique 'id' property
  };
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/mainView.html",
      controller: "TodoController",
    })
    .when("/todo/:id", {
      templateUrl: "views/todoDetailsView.html", // This should be the correct path to your details view template
      controller: "TodoDetailsController",
    })
    .otherwise({
      redirectTo: "/",
    });
});

app.controller("TodoDetailsController", function ($scope, $routeParams) {
  var taskId = parseInt($routeParams.id); // Convert the route parameter to an integer
  // Find the task with the matching 'id'
  $scope.taskDetails = $scope.tasks.find(function (task) {
    return parseInt(task.id) === taskId;
  });
});
