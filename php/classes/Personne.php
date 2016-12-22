<?php

require_once("MySQLManager.php");
/**
* 	
*/
class Personne {
	
	public static function getPersonne () {
		$db = MySQLManager::get();
		$query = "SELECT per_nom, per_prenom, per_admin, per_dep_id, per_genre FROM ccn_personne";

		
		if ($stmt = $db->prepare($query)) {
			/* Exécution de la requête */
		    $stmt->execute();

		    /* Lecture des variables résultantes */
		    $stmt->bind_result($per_nom, $per_prenom, $per_admin, $per_dep_id, $per_genre);

		    /* Récupération des valeurs */
		    $array = array();
		    while($stmt->fetch()) {
		    	$person = [];
		        $person['nom'] = $per_nom;
		        $person['prenom'] = $per_prenom;
		        $person['admin'] = $per_admin;
		        $person['dep_id'] = $per_dep_id;
		        $person['genre'] = $per_genre;
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