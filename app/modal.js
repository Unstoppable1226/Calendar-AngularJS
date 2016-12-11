angular
  .module('mwl.calendar.docs')
  .factory('alert', function($uibModal) {

    function show(action, event, obj) {
      return $uibModal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;

          vm.supprimer = function() {
            console.log($uibModal);
          }
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  });
