<?
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);
?>
<script type="text/javascript" src="scripts/math.js"></script>
<script type="text/javascript" src="modules/flot/jquery.flot.js"></script>
<script type="text/javascript" src="scripts/flot.js"></script>

<form>
<SELECT id="bs_num" onChange="getParams(this.options[this.selectedIndex].value)">
	<?
	    $sBS = $oDB->selectTable('
            SELECT *
            FROM `stations_data`
            ORDER BY `number` ASC
        ');
        foreach($sBS as $iBS => $aBS)
            print('
            <option value="' . $aBS['number'] . '">' . $aBS['number'] . '</optionoption>
            ');
	?>
</SELECT>
частота приема: <input type="text" id="frequency_in" />
частота передачи: <input type="text" id="frequency_out" /> <br />
мощность передатчика: <input type="text" id="power" />
коэффициент: <input type="text" id="k" />
угол: <input type="text" id="angle" /> <br />
высота: <input type="text" id="height" />
высота над уровнем моря: <input type="text" id="absolute_height" /><br />
Rmax: <input type="text" id="Rmax" />
Rmin: <input type="text" id="Rmin" /> <br />
<input type="button" onClick="makePlot();" value="Отобразить график">
</form>

<div id="myplot" style="height:400px; width:400px; border-style:solid;"></div>
