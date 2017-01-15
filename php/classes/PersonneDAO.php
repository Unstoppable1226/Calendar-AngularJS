<?php

require_once("MySQLManager.php");
/**
* Personne - Classe PHP
* Gestion du CRUD pour une personne - (Mis en place - SELECT)
*/
class PersonneDAO {
	
	public static function getPersonne ($eta_id) {
		$db = MySQLManager::get();
		$query = "SELECT per_id, per_nom, per_prenom, per_admin, per_genre, dep_id, dep_nom FROM ccn_etablissement JOIN ccn_departement ON eta_id = dep_eta_id JOIN ccn_possede ON dep_id = pos_dep_id JOIN ccn_personne ON per_id = pos_per_id WHERE per_admin = 0 AND eta_id = ?";
		if ($stmt = $db->prepare($query)) {
			$stmt->bind_param('i', $eta_id);
			/* Exécution de la requête */
		    $stmt->execute();
		    /* Lecture des variables résultantes */
		    $stmt->bind_result($per_id, $per_nom, $per_prenom, $per_admin, $per_genre, $dep_id, $dep_nom);
		    /* Récupération des valeurs */
		    $array = array();
		    $person = [];
		   	$hors = array();
		    while($stmt->fetch()) {
		    	$person['id'] = $per_id;
		        $person['nom'] = $per_nom;
		        $person['prenom'] = $per_prenom;
		        $person['admin'] = $per_admin;
		        $person['genre'] = $per_genre;
		        $person['dep_id'] = $dep_id;
		        $person['dep_nom'] = $dep_nom;
				$array[] = $person;
		    }
		    $stmt->close();
		    MySQLManager::close();
	  		return $array;
		}
		MySQLManager::close();
		return null;
	} // setPersonne

	public static function getPersonneDeps ($data) {
		$db = MySQLManager::get();
		$query = "SELECT per_id, per_nom, per_prenom, per_admin, per_genre, dep_id, dep_nom FROM ccn_etablissement JOIN ccn_departement ON eta_id = dep_eta_id JOIN ccn_possede ON dep_id = pos_dep_id JOIN ccn_personne ON per_id = pos_per_id WHERE per_admin = 0 AND eta_id = ?";

		if ($data['deps'] == null) {
			$query = $query . " AND dep_id = 0";
		} else {
			$query = $query . " AND (";
			$i = 0;
			$count = count($data['deps']);
			foreach ($data['deps'] as $key => $val) {
				if ($i == $count-1) {
					$query = $query . "dep_id = " . $val['id'];
				} else {
					$query = $query . "dep_id = " . $val['id'] . " OR ";	
				}
				$i += 1;
			}
			$query = $query . ")";
		}

		if ($stmt = $db->prepare($query)) {
			$stmt->bind_param('i', $data['eta_id']);

			/* Exécution de la requête */
		    $stmt->execute();
		    /* Lecture des variables résultantes */
		    $stmt->bind_result($per_id, $per_nom, $per_prenom, $per_admin, $per_genre, $dep_id, $dep_nom);
		    /* Récupération des valeurs */
		    $array = array();
		    $person = [];
		   	$hors = array();
		    while($stmt->fetch()) {
		    	$person['id'] = $per_id;
		        $person['nom'] = $per_nom;
		        $person['prenom'] = $per_prenom;
		        $person['admin'] = $per_admin;
		        $person['genre'] = $per_genre;
		        $person['dep_id'] = $dep_id;
		        $person['dep_nom'] = $dep_nom;
				$array[] = $person;
		    }
		    $stmt->close();
		    MySQLManager::close();
	  		return $array;
		}
		MySQLManager::close();
		return null;
	} // setPersonne
}

?>