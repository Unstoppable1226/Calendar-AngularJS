<?php

	require_once("classes/Sanitizer.php");
	require_once("classes/HoraireDAO.php");
	$per_id = Sanitizer::getSanitizedJSInput();

	$res = HoraireDAO::getHorairesPersonne($per_id['per_id']); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>