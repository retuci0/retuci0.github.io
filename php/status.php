<?php
header('Content-Type: application/json');

$host = '127.0.0.1';
$port = 25565;

$fp = @fsockopen($host, $port, $errno, $errstr, 2);
$online = ($fp !== false);
if ($online) fclose($fp);

echo json_encode([
    'online' => $online,
    'timestamp' => time()
]);
?>