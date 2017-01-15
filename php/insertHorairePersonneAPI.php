<?php

	require_once("classes/Sanitizer.php");
	require_once("classes/HoraireDAO.php");
	$data = Sanitizer::getSanitizedJSInput();

	$res = HoraireDAO::insertHoraire($data); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>