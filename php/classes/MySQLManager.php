<?php
/**
 * MySQLManager - Classe PHP
 * Elle s'occupe de créer l'instance mysqli, de la fermer et de la retourner
 */

require_once("InfoDatabase.php");

class MySQLManager {

	private static $db = NULL;

	public static function get() {
		if (self::$db == NULL) {
			self::$db = new mysqli(SERVER, USER, PASS, DATABASE);
			if (self::$db->connect_error) {
				die("Impossible de se connecter à la base");
				self::$db = NULL;
			}
		}
		return self::$db;
	}

	public static function close() {
		if (self::$db != NULL) {
			self::$db->close();
			self::$db = NULL;
		}
	}
}
?>
