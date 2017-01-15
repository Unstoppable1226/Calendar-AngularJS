(function(){

// Déclarer les dépendances au module ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
var appPrincipal = angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module', 'ngAria', 'ngMaterial', 'ui-notification']);

var appCal = angular.module('mwl.calendar.docs');


appCal.config(['calendarConfig', function(calendarConfig) {
  calendarConfig.dateFormatter = 'angular'; // Utiliser par défaut 'Angular' pour le format des dates
}]);


/* 
* Contrôleur de l'application - KitchenSinkCtrl
* Paramètres : $scope, moment (pour les dates), alert (pour les fenêres modales), calendarConfig (Objet du calendrier), $http (Requêtes HTTP)
* Gère le calendrier
*/
appCal.controller('KitchenSinkCtrl', function($timeout, $scope, moment, alert, calendarConfig, $http, NotifService) {

    var vm = this; // Je prend la référence de moi-même et je la stocke

    /*****************************************************************************/
    /* Ces variables doivent être défini sinon le calendrier ne fonctionnera pas */

    vm.viewDate = new Date(); // Défini la date d'aujourd'hui
    vm.calendarView = 'month'; // Vue par défaut : 'Mois'
    vm.cellIsOpen = true; // La cellule d'aujourd'hui est ouverte
    vm.events = []; // Liste des évennements (Horaires des personnes)
    $scope.departments = [];

    $scope.departmentsSel = [];
    $scope.deps = [ // Stocke les codes couleurs nécessaires pour les départements
      {}, // Premier objet vide
      {primary: '#00695c', secondary: '#00695c'}, 
      {primary: '#388e3c', secondary: '#388e3c'},
      {primary: '#039be5', secondary: '#039be5'},
      {primary: '#f57c00', secondary: '#f57c00'},
      {primary: '#6d4c41', secondary: '#6d4c41'},
      {primary: '#512da8', secondary: '#512da8'},
      {primary: '#33691E', secondary: '#33691E'}, 
      {primary: '#212121', secondary: '#212121'}
    ];
    $scope.persons = [];
    $scope.myPerson = null;
    $scope.depSel = "";
    $scope.styleDep = {'color': 'black'};

    $scope.event = {
      title: '',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true,
      actions : actions
    };


    $scope.majAffDep = function(item) {
      var pos = -1;
      //console.log(item);
      for (var i = 0; i < $scope.departmentsSel.length; i++) {
        if ($scope.departmentsSel[i].id == item.id) {
          pos = i;
        }
      }
      if (pos != -1) {
        $scope.departmentsSel.splice(pos, 1);
      } else {
        $scope.departmentsSel.push(item);
      }
      var $req = $http.post("php/getPersonnesFiltreAPI.php", {'eta_id': 1, 'deps' : $scope.departmentsSel});
      $req.then(function (message) {
        console.log(message.data);
        if (message.data.length > 0) { // Si il y a des données
          for (var i = 0; i < tabPerson.length; i++) {
            $scope.persons.push(tabPerson[i]);
            getHoraires(tabPerson[i]);
          }
        }
      });
    }

    var getDeps = function () {
      var $req = $http.post("php/getDepartmentsAPI.php", {'eta_id': 1});
      $req.then(function (message) {
        $scope.departments = message.data;
        $scope.departmentsSel = angular.copy($scope.departments);
      });
    }
    
    getDeps();
    
    var getTime = function (time) {
      var objTime = time.split(':');
      return {'heures' : objTime[0], 'minutes' : objTime[1], 'secondes' : objTime[2]};
    }

    var getTimeDate = function (date) {
      return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    var rechercherPersonne = function (id) {
      for (var i = 0; i < $scope.persons.length; i++) {
        if ($scope.persons[i].id == id) {
          return $scope.persons[i];
        }
      }
      return null;
    }

    /* Récupère l'objet couleur selon l'id du départements */
    $scope.getColor = function (id) {
      return $scope.deps[id];
    };

    $scope.majPerson = function() {
      var person = rechercherPersonne($scope.myPerson);
      if (person != null) {
        $scope.depSel = person.dep_nom;
        $scope.styleDep = {'color' : $scope.getColor(person.dep_id).primary}
        $scope.event.title = person.nom + " " + person.prenom;
        $scope.event.color = $scope.getColor(person.dep_id);
      }
    }

    var getDateFin = function (heureDebut, heureFin, date) {
      var dateFin;
      if (heureDebut > heureFin) {
        dateFin = moment(new Date(date)).subtract(1, 'hours').add(1, 'day'); // On enleve une heure, car GMT+1
      } else {
        dateFin = moment(new Date(date)).subtract(1, 'hours');
      }
      return dateFin;
    }

    var getHoraires = function (personne) {
      var $req = $http.post("php/getHorairesPersonnesAPI.php", {'per_id': personne.id});
      $req.then(function (message) {
        tabHoraires = message.data;
        if (tabHoraires.length > 0) { // Si l'employé n'a pas d'horaires n'ajoute rien au calendrier
          for (var i = 0; i < tabHoraires.length; i++) {
            var hor = tabHoraires[i];
            var heureDebut = getTime(hor.heureDebut);
            var heureFin = getTime(hor.heureFin);
            var dateDebut = moment(new Date(hor.date)).subtract(1, 'hours'); // On enleve une heure, car GMT+1
            var dateFin = getDateFin(hor.heureDebut, hor.heureFin, hor.date);
            
            var horaire = {
                      title: personne.nom + " " + personne.prenom,
                      color: $scope.getColor(personne.dep_id),
                      startsAt: dateDebut.add(heureDebut.heures, 'hours').add(heureDebut.minutes, 'minutes').toDate(),
                      endsAt: dateFin.add(heureFin.heures, 'hours').add(heureFin.minutes, 'minutes').toDate(),
                      draggable: true,
                      resizable: true,
                      actions: actions
                    };
            vm.events.push(horaire);
          }
        }
      });
    }

    $scope.addHoraire = function () {
      if ($scope.event.title != "") {

        var dateDebut = $scope.event.startsAt;
        
        var heureDebut = getTimeDate(dateDebut);
        var heureFin = getTimeDate($scope.event.endsAt);
        var dateFin = moment(new Date(dateDebut.getFullYear() + "-" + dateDebut.getMonth() + 1 + "-" + dateDebut.getDate())).subtract(1, 'hours').toDate();
        moment(dateFin).subtract(1, 'hours');
        if (heureDebut > heureFin) {
          //console.log(dateDebut.getFullYear() + "-" + dateDebut.getMonth() + "-" + dateDebut.getDay());
          dateFin = moment(dateFin).add(1, 'days').toDate();
        }
        var objHeureFin = getTime(heureFin);
        dateFin = moment(dateFin).add(objHeureFin.heures, 'hours').add(objHeureFin.minutes, 'minutes').add(objHeureFin.secondes, 'seconds').toDate();
        $scope.event.endsAt = dateFin;
        vm.events.push($scope.event);

        NotifService.success('Ajout Horaire', "L'horaire pour l'employé : " + $scope.event.title + " a été ajouté avec succès");

        $scope.event = { // Réinitialiser l'objet
          title: '',
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          resizable: true,
          actions : actions
        };

        $scope.myPerson = null;
        $scope.depSel = "";
        $scope.styleDep = {'color': 'black'};

      } else {

      }
    }

    /* Récupère les personnes avec leurs horaires et initialise le calendrier */
    $scope.getPersons = function () {
      var $res = $http.post("php/getPersonnesAPI.php", {'eta_id' : 1}); // Envoie de la requête en 'POST'
      
      $res.then(function (message) { // Réponse de la promesse

        var tabPerson = message.data; // Stocke le tableau d'objet

        if (message.data.length > 0) { // Si il y a des données
          for (var i = 0; i < tabPerson.length; i++) {
            $scope.persons.push(tabPerson[i]);
            getHoraires(tabPerson[i]);
          }
        }
      });

    } // Fin getPerson()

    $scope.getPersons(); // Initialiser le calendrier avec les données des horaires
    
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];

    vm.addEvent = function() {
      vm.events.push({
        title: '',
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

    vm.modifyCell = function (calendarCell) {

    }

    vm.timespanClicked = function(date, cell) {

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
      }

    };

  });

})();