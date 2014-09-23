angular.module('tp-angular').controller('UserCtrl',function($scope){

  $scope.showIndex = true;
  $scope.currentUser = {name: " ",email: " "};
  $scope.page = {current:1,total_items:0,items_per_page:20};
  $scope.isEditing = false;

  userService.query({page:$scope.page.current},function(data){
    $scope.users = data.users;
    $scope.page.total_items = data.count;
  });

  $scope.pageChanged = function(page){
      userService.query({page:page,per_page:$scope.page.items_per_page},function(data){
      $scope.users = data.users;
    });
  }

  $scope.newUserForm = function(){
    $scope.showIndex = false;
  };

  $scope.createUser = function(user){
    $scope.showIndex = true;
    $scope.isEditing = false;
    userService.save(user,function(res){
      console.log("success");
      console.log(res);
    },function(res){
      console.log("error");
      console.log(res);
    });
    $scope.users.push(user);
  };
  $scope.updateUser = function(user){
    userService.update({id:user.id},user);
    $scope.showIndex = true;
    $scope.isEditing = false;
  };

  $scope.editUserForm = function(user){
    $scope.showIndex = false;
    $scope.isEditing = true;
    $scope.currentUser = user;
  };

  $scope.cancelUserForm = function(){
    $scope.showIndex = true;
    $scope.newuser = {name: " ",email: " "};
  };

  $scope.submitForm = function() {
  };
  
});