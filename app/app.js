var appPrincipal = angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module', 'ngAria','ngMaterial']);

var appCal = angular.module('mwl.calendar.docs');
//you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']

appCal.config(['calendarConfig', function(calendarConfig) {
  calendarConfig.dateFormatter = 'angular'; // use moment to format dates
}]);

appCal.controller('CalendarCtrl', function(moment, alert, calendarConfig) {

    var vm = this;
    /* Ces deux variables doivent être définis sinon problème !! */
    vm.calendarView = 'month'; // Définit l'affichage par défaut en 'mois'
    vm.viewDate = new Date(); // Prend la date du jour

    /* Récupérer les données des personnes et créer ainsi les horaires  */
    vm.persons = [{nom: 'Baptiste Bartolomei'}, {nom: 'Joel Marques'}];

    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);      
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        vm.events.splice(args.calendarEvent.calendarEventId, 1);
      }
    }];

    /* Toutes les dates configurées */
    vm.events = [
      {
        title: 'Baptiste Bartolomei',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'Joel Marques',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'Vincent Jalley',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true,
        actions: actions
      }
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: 'Un employé',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function(event) {

      var res = alert.show('Clicked', event);
      console.log(res);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {
/*
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } */

    };

  });


