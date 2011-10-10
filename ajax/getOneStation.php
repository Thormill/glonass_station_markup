<?php
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);

$aStations = $oDB->selectTable('
    SELECT *
    FROM `stations_data`
    WHERE `number` = "' . $_POST['num'] . '"
');

foreach ($aStations as $iStation => $aStation) {
    echo $aStation['frequency_in'] . ';' . $aStation['frequency_out'] . ';' . $aStation['power'] . ';' . $aStation['k'] . ';'
         . $aStation['angle'] . ';' . $aStation['height'] . ';' . $aStation['absolute_height'] . ';';
}
