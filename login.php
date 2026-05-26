<?php
// Cek jika session belum ada, baru jalankan session_start
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require 'koneksi.php';

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Cek user di database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifikasi password
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['role'] = $user['role'];
        
        if ($user['role'] === 'sd') header("Location: dashboard_sd.php");
        elseif ($user['role'] === 'smp') header("Location: dashboard_smp.php");
        exit;
    } else {
        $error = "Email atau password salah!";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Login - Budiman Cendikia</title>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Ruang Panel Guru</h2>
        
        <?php if ($error): ?>
            <p class="text-red-500 mb-4 text-center"><?php echo $error; ?></p>
        <?php endif; ?>

        <form method="POST">
            <input type="email" name="email" placeholder="Email" required class="w-full p-2 mb-4 border rounded">
            <input type="password" name="password" placeholder="Password" required class="w-full p-2 mb-4 border rounded">
            <button type="submit" class="w-full bg-blue-900 text-white p-2 rounded">Masuk</button>
        </form>
    </div>
</body>
</html>