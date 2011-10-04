<?php
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);
?>

<table class="bs_list">
	<tr>
		<td>#</td>
		<td>Координаты</td>
		<td>Мощность передатчика</td>
		<td>Класс излучения</td>
		<td>Коэффициент усиления антенны</td>
		<td>Высота подвеса от Земли / от уровня моря</td>
		<td>&nbsp;</td>
	</tr>
    <?php
        $sBS = $oDB->selectTable('
            SELECT *
            FROM `stations_data`
            ORDER BY `number` ASC
        ');
        foreach($sBS as $iBS => $aBS)
            print('
            <tr id="tr' . $aBS['number'] . '">
                <td id="number' . $aBS['number'] . '">' . $aBS['number'] . '</td>
                <td id="coord'  . $aBS['number'] . '">' . $aBS['coord_n'] . '(N), ' . $aBS['coord_e'] . '(E)</td>
                <td id="power'  . $aBS['number'] . '">' . $aBS['power'] . '</td>
                <td id="class'  . $aBS['number'] . '">' . $aBS['class'] . '</td>
                <td id="k'      . $aBS['number'] . '">' . $aBS['k'] . '</td>
                <td id="height' . $aBS['number'] . '">' . $aBS['height']. ' / ' . $aBS['absolute_height']. '</td>
                <td id="link'   . $aBS['number'] . '">
                    <a href="nojs.php" id="bs-edit" onclick="Edit(' . $aBS['number'] . ');return false">редактировать</a>
                    <a href="nojs.php" id="bs-del" onclick="Del(' . $aBS['number'] . ');return false">удалить</a>
                </td>
            </tr>
            ');
    ?>
</table>
