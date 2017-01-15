<?php

	require_once("classes/Sanitizer.php");
	require_once("classes/DepartmentDAO.php");
	$per_id = Sanitizer::getSanitizedJSInput();

	$res = DepartmentDAO::getDeps($per_id['eta_id']); // Récupère le résulat obtenu

	echo(json_encode($res)); // Retourner le résultat sous format json
?>