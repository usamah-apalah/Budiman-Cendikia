<?php
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'sd') header("Location: login.php");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Dashboard SD</title>
</head>
<body class="bg-blue-50 min-h-screen p-10">
    <div class="bg-white p-6 rounded-lg shadow">
        <h1 class="text-3xl font-bold text-blue-900">Halo, <?php echo $_SESSION['user_name']; ?>!</h1>
        <p class="text-gray-600 mt-2">Selamat datang di Panel Admin **SD**.</p>
        <div class="mt-6">
            <a href="logout.php" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</a>
        </div>
    </div>
</body>
</html>