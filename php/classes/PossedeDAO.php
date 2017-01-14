<?php

require_once("MySQLManager.php");

/**
* Class php qui va gérer toutes les interactions avec la table possede (les département assignés aux personne) (Table : ccn_possede). 
* Tout le CRUD sera géré ici.	
*/
class PossedeDAO {


	/*
		Permet de récupérer le départements d'une personne
	*/
	public static function getDepsPersonne ($per_id) {
		$db = MySQLManager::get();
		$query = "SELECT dep_id, dep_nom FROM ccn_possede JOIN ccn_departement ON dep_id = pos_dep_id WHERE pos_per_id = ?";
		if ($stmt = $db->prepare($query)) {
			$dep = $data['dep'];
			$stmt->bind_param('ii', $dep['id'], $data['id']);
		  	$stmt->execute();
		  	$stmt->close();
	  		MySQLManager::close();
	  		return true;
		}
		MySQLManager::close();
		return false;
	}

}

?>