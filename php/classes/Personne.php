<?php

require_once("MySQLManager.php");
/**
* Personne - Classe PHP
* Gestion du CRUD pour une personne - (Mis en place - SELECT)
*/
class Personne {
	
	public static function getPersonne () {
		$db = MySQLManager::get();
		$query = "SELECT per_nom, per_prenom, per_admin, per_dep_id, per_genre, dep_nom FROM ccn_personne JOIN ccn_departement ON dep_id = per_dep_id";
		if ($stmt = $db->prepare($query)) {
			/* Exécution de la requête */
		    $stmt->execute();
		    /* Lecture des variables résultantes */
		    $stmt->bind_result($per_nom, $per_prenom, $per_admin, $per_dep_id, $per_genre, $dep_nom);
		    /* Récupération des valeurs */
		    $array = array();
		    $person = [];
		    while($stmt->fetch()) {
		        $person['nom'] = $per_nom;
		        $person['prenom'] = $per_prenom;
		        $person['admin'] = $per_admin;
		        $person['dep_id'] = $per_dep_id;
		        $person['genre'] = $per_genre;
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