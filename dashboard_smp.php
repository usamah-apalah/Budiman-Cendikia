<?php
session_start();
// Keamanan: Kalau bukan role SMP, jangan boleh masuk!
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'smp') {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Guru SMP</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-green-50">
    <nav class="bg-green-900 p-4 text-white shadow-lg">
        <h1 class="text-xl font-bold">Panel Admin SMP</h1>
    </nav>
    <div class="p-8">
        <h2 class="text-2xl">Selamat Datang, <?php echo $_SESSION['user_name']; ?>!</h2>
        <p class="mt-2 text-gray-600">Ini adalah area khusus untuk mengelola data SMP.</p>
        <div class="mt-6">
            <a href="logout.php" class="bg-red-600 text-white px-4 py-2 rounded shadow">Logout</a>
        </div>
    </div>
</body>
</html>