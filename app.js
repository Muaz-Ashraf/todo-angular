// app.js
var app = angular.module("todoApp", []);

app.controller("TodoController", function ($scope) {
  $scope.tasks = [];

  $scope.addTask = function () {
    if ($scope.newTask) {
      $scope.tasks.push({ text: $scope.newTask, done: false });
      $scope.newTask = "";
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
});
app.controller("myController", function ($scope) {
  var employees = [
    { name: "Ben", gender: "Male", city: "London", salary: 55000 },
    { name: "Sara", gender: "Female", city: "Chennai", salary: 68000 },
    { name: "Mark", gender: "Male", city: "Chicago", salary: 57000 },
    { name: "Pam", gender: "Female", city: "London", salary: 53000 },
    { name: "Todd", gender: "Male", city: "Chennai", salary: 60000 },
  ];

  $scope.employees = employees;
});
