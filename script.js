function c(t){console.log(t)}


function appCtrl($scope){
  $scope.ctrl = {
    show: {
      msg:false,
      console:true,
      debug: true,
      stats:true,
      skills:true
    },
    text: {
      msg: '',
      console: '',
    }
  };
  
  
  var cmds = {
    reg: function(path, func){
      this.path = func;
    }
  }  
  
  
  //message box
  cmds.reg('msg', function(text){
    $scope.ctrl.show.msg = true;
    $scope.ctrl.text.msg = text;
  });
  $scope.closeMsg = function(){
    $scope.ctrl.show.msg = false;
  }
  
  
  //console
  $scope.enterConsole = function(){
    var text = $scope.ctrl.text.console;
    if (text){
      c('>' + text);
      $scope.ctrl.text.console = '';
    }
  }
}


function ngEnterDirective() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
          scope.$apply(function(){
                  scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
      }
    });
  };
}

angular.module('app', [])
  .controller('appCtrl', appCtrl)
  .directive('ngEnter', ngEnterDirective);