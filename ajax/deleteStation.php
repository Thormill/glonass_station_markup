<?php
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);

$dBS = $oDB->query('
	DELETE FROM `stations_data`
	WHERE `number` = "' . $_POST['number'] . '"
');
if ($dBS != 0)
	echo 'данные о базовой станции удалены';
else
	echo 'данные не удалось удалить';
