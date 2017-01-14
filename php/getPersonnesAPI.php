<?php

	require_once("classes/Sanitizer.php");
	require_once("classes/Personne.php");
	$eta_id = Sanitizer::getSanitizedJSInput();

	$res = Personne::getPersonne($eta_id['eta_id']); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>