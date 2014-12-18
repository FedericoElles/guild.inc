function c(t){console.log(t)}


function appCtrl($scope, player){
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
    },
    data: {
      stats: player
    }
  };
  
  
  var cmds = {
    _reg: function(path, func){
      this[path] = func;
    },
    _exec: function(cmd){
      //stripe private functions
      if (cmd[0] === '_'){
        cmd = cmd.substr(1);
      }
      var words = cmd.split(' ');
      var key = words.shift();
      if (typeof this[key] === 'function'){
        this[key](words.join(' '));
      }
    }
  }  
  
  
  //message box
  cmds._reg('msg', function(text){
    $scope.ctrl.show.msg = true;
    $scope.ctrl.text.msg = text;
  });
  $scope.close = function(key){
    $scope.ctrl.show[key] = false;
  }
  
  
  //console
  $scope.enterConsole = function(){
    var text = $scope.ctrl.text.console;
    if (text){
      c('>' + text);
      cmds._exec(text);
      $scope.ctrl.text.console = '';
    }
  }
}


//PLAYER
function playerFactory(){
  var player = {
    name: 'Unnamed',
    lvl: 0,
    stats: {
      str: 1,
      vit: 1,
      wis: 1,
      agi: 1,
      int: 1,
      luck: 1
    }
  };
  
  return player;
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
  .factory('player', playerFactory)
  .directive('ngEnter', ngEnterDirective);