<?php
$host = 'localhost';
$db   = 'BudimanCendikia'; // Perhatikan huruf besar/kecilnya!
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Gagal koneksi: " . $e->getMessage());
}
?>