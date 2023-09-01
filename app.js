var app = angular.module("todoApp", ["ui.router"]);

app.service("TodoService", function () {
  this.tasks = [];
  this.nextTaskId = 1;

  this.addTask = function (text) {
    if (text) {
      this.tasks.push({
        id: this.nextTaskId,
        text: text,
        done: false,
      });
      this.nextTaskId++;
    }
  };

  this.removeTask = function (task) {
    var index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  };

  this.removeCompletedTasks = function () {
    this.tasks = this.tasks.filter(function (task) {
      return !task.done;
    });
  };

  this.getTaskById = function (taskId) {
    return this.tasks.find(function (task) {
      return task.id === taskId;
    });
  };

  this.toggleTaskDone = function (task) {
    task.done = !task.done;
  };
});

app.controller("TodoController", function ($scope, $location, TodoService) {
  $scope.tasks = TodoService.tasks;

  $scope.addTask = function () {
    TodoService.addTask($scope.newTask);
    $scope.newTask = "";
  };

  $scope.removeTask = TodoService.removeTask;

  $scope.removeCompletedTasks = TodoService.removeCompletedTasks;

  $scope.hasCompletedTasks = function () {
    return $scope.tasks.some(function (task) {
      return task.done;
    });
  };

  $scope.goToTodoDetails = function (task) {
    $location.path("/todo/" + task.id);
  };
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state("home", {
    url: "/",
    templateUrl: "views/mainView.html",
    controller: "TodoController",
  });

  $stateProvider.state("todoDetails", {
    url: "/todo/:id",
    templateUrl: "views/todoDetailsView.html",
    controller: "TodoDetailsController",
  });

  $urlRouterProvider.otherwise("/");
});

app.controller(
  "TodoDetailsController",
  function ($scope, $stateParams, TodoService) {
    var taskId = parseInt($stateParams.id);
    $scope.taskDetails = TodoService.getTaskById(taskId);
  }
);
