<?php
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);

$aStations = $oDB->selectTable('
    SELECT `coord_n`, `coord_e`, `power`, `height`
        FROM `stations_data`'
);

foreach ($aStations as $iStation => $aStation) {
    echo $aStation['coord_n'] . ';' . $aStation['coord_e'] . ';' . $aStation['power'] . ';' . $aStation['height'] . ';';
}
