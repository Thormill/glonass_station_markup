<?php
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);

$coords = explode(',', $_POST['coord']);
$N = $coords[0];
$E = $coords[1];
$N = explode('(', $N);
$N = Ltrim($N[0]);
$E = explode('(', $E);
$E = Ltrim($E[0]);

$heights = explode('/', $_POST['heights']);
$height = trim($heights[0]);
$abs_height = trim($heights[1]);

$uBS = $oDB->query('
	UPDATE `stations_data`
	SET `coord_n`  = "' . $N . '",
	    `coord_e`  = "' . $E . '",
	    `power`    = "' . $_POST['power'] . '",
	    `k`        = "' . $_POST['k']. '",
	    `height`   = "' . $height. '",
	    `absolute_height` = "' . $abs_height . '"
	WHERE `number` = "' . $_POST['number'] . '"
');
if ($uBS != 0)
	echo 'данные базовой станции обновлены';
else
	echo 'данные не удалось обновить';
