/**
* Module qui fournit un Service pour les Notifications
* Il est adapté pour un formatage bien défini, à l'avenir il se pourrait créer aussi 
* des méthodes qui reçoivent les délai et plus de paramètres afin de rendre le service très personnalisable
**/
var ctrlCCNT = angular.module('mwl.calendar.docs');

/**
* Création du service NotifService qui reprend Notification
* 
**/
ctrlCCNT.service('NotifService', function(Notification) {
	return {
		/* Fonction qui reçoivent en paramètre les messages et titres à afficher selon le type de notification */
		success : function (titre, message) {
			Notification.success({message: '<p class="notifTexte">' + message + '</p>', delay: 3000, title: '<h3 class="notifTitre"><i class="fa fa-check"></i> ' + titre + '</h3>'});
		},
		error : function(titre, message) {
			Notification.error({message: '<p class="notifTexte">' + message + '</p>', delay: 1500, title: '<h3 class="notifTitre"><i class="fa fa-exclamation-triangle"></i> ' + titre + '</h3>'});
		},
		warning : function(titre, message) {
			Notification.warning({message: '<p class="notifTexte">' + message + '</p>', delay: 1500, title: '<h3 class="notifTitre"><i class="fa fa-exclamation-triangle"></i> ' + titre + '</h3>'});
		}
	}
});