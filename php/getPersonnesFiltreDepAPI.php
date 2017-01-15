<?php

	require_once("classes/Sanitizer.php");
	require_once("classes/PersonneDAO.php");
	$data = Sanitizer::getSanitizedJSInput();

	$res = PersonneDAO::getPersonneDeps($data); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>