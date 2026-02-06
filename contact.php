<?php
// ==========================
// CONFIGURATION DB - À ADAPTER
// ==========================
$host = "sql308.infinityfree.com";          
$db   = "if0_40724496_HACKANGE";           
$user = "if0_40724496";                     
$pass = "UrC4AaJaNN0mEG2";

// ==========================
// CONNEXION À LA BASE
// ==========================
header('Content-Type: application/json; charset=utf-8');

// Désactiver l'affichage des erreurs en production
error_reporting(0);

try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        throw new Exception("Erreur de connexion à la base de données");
    }

    // ==========================
    // TRAITEMENT DU FORMULAIRE
    // ==========================
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Valider et sécuriser les données
        $nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $sujet = isset($_POST['sujet']) ? trim($_POST['sujet']) : '';
        $service = isset($_POST['service']) ? trim($_POST['service']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        // Validation
        if(empty($nom) || empty($email) || empty($message)){
            echo json_encode([
                "status" => "error", 
                "message" => "Veuillez remplir tous les champs obligatoires (nom, email, message)"
            ]);
            exit;
        }

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            echo json_encode([
                "status" => "error", 
                "message" => "Adresse email invalide"
            ]);
            exit;
        }

        if(strlen($message) < 10){
            echo json_encode([
                "status" => "error", 
                "message" => "Le message doit contenir au moins 10 caractères"
            ]);
            exit;
        }

        // Sécurisation
        $nom = $conn->real_escape_string($nom);
        $email = $conn->real_escape_string($email);
        $sujet = $conn->real_escape_string($sujet);
        $service = $conn->real_escape_string($service);
        $message = $conn->real_escape_string($message);

        // Date actuelle
        $date_creation = date('Y-m-d H:i:s');
        $ip_address = $_SERVER['REMOTE_ADDR'];

        // Vérifier si la table existe, sinon la créer
        $checkTable = "SHOW TABLES LIKE 'contacts'";
        $result = $conn->query($checkTable);
        
        if ($result->num_rows == 0) {
            // Créer la table si elle n'existe pas
            $createTable = "CREATE TABLE IF NOT EXISTS contacts (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                sujet VARCHAR(200),
                service VARCHAR(50),
                message TEXT NOT NULL,
                date_creation DATETIME NOT NULL,
                ip_address VARCHAR(45),
                lu TINYINT(1) DEFAULT 0
            )";
            
            if (!$conn->query($createTable)) {
                throw new Exception("Erreur lors de la création de la table");
            }
        }

        // Requête d'insertion
        $sql = "INSERT INTO contacts (nom, email, sujet, service, message, date_creation, ip_address) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Erreur de préparation de la requête");
        }
        
        $stmt->bind_param("sssssss", $nom, $email, $sujet, $service, $message, $date_creation, $ip_address);
        
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success", 
                "message" => "✅ Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais."
            ]);
            
            // Optionnel : Envoyer un email de notification
            // $to = "contact@hackange.fr";
            // $subject = "Nouveau message de $nom";
            // $headers = "From: $email\r\n";
            // $headers .= "Reply-To: $email\r\n";
            // mail($to, $subject, $message, $headers);
            
        } else {
            throw new Exception("Erreur lors de l'enregistrement du message");
        }
        
        $stmt->close();
        
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Méthode de requête non autorisée"
        ]);
    }

} catch (Exception $e) {
    // Log l'erreur (en production, utiliser un fichier de log)
    error_log("HACKANGE Contact Error: " . $e->getMessage());
    
    // Message générique pour l'utilisateur
    echo json_encode([
        "status" => "error", 
        "message" => "Une erreur est survenue. Veuillez réessayer plus tard ou me contacter directement par email."
    ]);
    
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>