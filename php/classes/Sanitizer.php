<?php
/**
 * Sanitizer.php
 */
class Sanitizer {

    public static function getSanitizedJSInput() {
        // Récupérer les données
        $post = file_get_contents("php://input");

        // Decoder les json
        $data = json_decode($post, true);

        // Enleve les caractères spéciaux
        $data = filter_var_array($data, FILTER_SANITIZE_STRING);

        return $data;
    }
}
?>