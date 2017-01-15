<?php

require_once("MySQLManager.php");
/**
* Personne - Classe PHP
* Gestion du CRUD pour une personne - (Mis en place - SELECT)
*/
class DepartmentDAO {
	
	public static function getDeps ($eta_id) {
		$db = MySQLManager::get();
		$query = "SELECT dep_id, dep_nom FROM ccn_etablissement JOIN ccn_departement ON eta_id = dep_eta_id WHERE eta_id = ?";
		if ($stmt = $db->prepare($query)) {
			$stmt->bind_param('i', $eta_id);
			/* Exécution de la requête */
		    $stmt->execute();
		    /* Lecture des variables résultantes */
		    $stmt->bind_result($dep_id, $dep_nom);
		    /* Récupération des valeurs */
		    $array = array();
		    $dep = [];
		   	$hors = array();
		    while($stmt->fetch()) {
		        $dep['id'] = $dep_id;
		        $dep['nom'] = $dep_nom;
				$array[] = $dep;
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