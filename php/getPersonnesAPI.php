<?php


	require_once("classes/Personne.php");
	
	$res = Personne::getPersonne(); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>