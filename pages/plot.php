<?
define('ROOT', '../modules/');
require_once ROOT . 'constants.php';
require_once ROOT . 'database.class.php';
$oDB = new Database($aDatabase['host'], $aDatabase['user'], $aDatabase['pwd'], $aDatabase['name']);
?>
<link rel="stylesheet" type="text/css" href="styles/plot.css" />
<script type="text/javascript" src="scripts/math.js"></script>
<script type="text/javascript" src="modules/flot/jquery.flot.js"></script>
<script type="text/javascript" src="scripts/flot.js"></script>

<div>
    <select id="bs_num" onChange="getParams(this.options[this.selectedIndex].value)">
    <option value="0"> ---Выберите базовую станцию---</option>
        <?
            $aBSs = $oDB->selectTable('
                SELECT *
                FROM `stations_data`
                ORDER BY `number` ASC
            ');
            foreach($aBSs as $iBS => $aBS)
                print('
                <option value="' . $aBS['number'] . '">' . $aBS['number'] . '</optionoption>
                ');
        ?>
    </select>
</div>
<div>
    <table>
        <tr>
            <td>h0 (м): <input type="text" id="h0" /></td>
            <td>Частота передачи (fпер, Гц): <input type="text" id="frequency_out" /></td>
            <td>Коэффициент усиления: <input type="text" id="k" /></td>
        </tr>
        <tr>
            <td>h2 (м): <input type="text" id="h2" /></td>
            <td>Частота приема (fпр, Гц): <input type="text" id="frequency_in" /></td>
            <td>Угол (град): <input type="text" id="angle" /><br /></td>
        </tr>
        <tr>
            <td>N (дБ): <input type="text" id="N" /></td>
            <td>Мощность передатчика (Pi, Вт): <input type="text" id="power" /></td>
            <td>Высота над уровнем моря (м): <input type="text" id="absolute_height" /></td>
        </tr>
        <tr>
            <td>Высота вышки (h1, м): <input type="text" id="height" /></td>
            <td></td>
            <td></td>
        </tr>
    </table>
    <input type="button" onClick="makePlot();" value="Расчет моделей">
</div>
<div id="models">
    <div>
        <h3>1. Наилучший случай</h3>
        <img src="images/model11.png"><br />
        <img src="images/model12.png"><span id="model1"></span>
    </div>
    <div>
        <h3>2. Случай с учетом рельефа</h3>
        <img src="images/model21.png"><br />
        <img src="images/model22.png"><br />
        <span id="model2"></span>
    </div>
    <div>
        <h3>3. Движение</h3>
        <img src="images/model31.png">
        <div id="model3" style="height:400px; width:400px; border-style:solid;"></div>
    </div>
</div>
