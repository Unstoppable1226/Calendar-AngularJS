<?php

require_once("MySQLManager.php");

/**
* Class php qui va gérer toutes les interactions avec la table possede (les département assignés aux personne) (Table : ccn_possede). 
* Tout le CRUD sera géré ici.	
*/
class HoraireDAO {
	/*
		Permet de récupérer le départements d'une personne
	*/
	public static function getHorairesPersonne ($per_id) {
		$db = MySQLManager::get();
		
		$query = "SELECT hop_id, hop_date, hop_heureDebut, hop_heureFin, hop_pauseDebut, hop_pauseFin FROM ccn_travail JOIN ccn_horairepersonne ON hop_id = tra_hop_id WHERE tra_per_id = ?";
		
		if ($stmt=$db->prepare($query)) {
			$stmt->bind_param('i', $per_id);
		  	$stmt->execute();
		  	$stmt->bind_result($hop_id, $hop_date, $hop_heureDebut, $hop_heureFin, $hop_pauseDebut, $hop_pauseFin);
		  	$array = array();
		    $horaire = [];
		    while($stmt->fetch()) {
		    	$horaire['id'] = $hop_id;
		        $horaire['date'] = $hop_date;
		        $horaire['heureDebut'] = $hop_heureDebut;
		        $horaire['heureFin'] = $hop_heureFin;
		        $horaire['pauseDebut'] = $hop_pauseDebut;
		        $horaire['pauseFin'] = $hop_pauseFin;
		        $array[] = $horaire;
		    }
		  	$stmt->close();
		  	MySQLManager::close();
	  		return $array;
		}
		MySQLManager::close();
		return false;
	}

}

?>