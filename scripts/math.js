/*
* Чтобы использовать необходимо присвоить данные вышки setVariables(h1, Pi), затем присвоить
* некой переменной результат calcRadiuses(). Получим массив радиусов с учетом рельефа.
* getRadiuses(calcRadiuses()) возвращает максимальный и минимальный радиусы.
*/
/*
* Исходные данные
*/
h0 = 5;
h1 = 0;                    // высота вышки
h2 = 8;
N = -114;                   //dB
Pmin = Math.pow(10, N/10);
Pi = 0;                     // Вт мощность  передатчика
f = 162.025;                // частота передачи
l = 300/f;                  // длина волны
G1 = 0.81;
G2 = 0.81;
/*
* Для учета рельефа
*/
H = [0.897, 0.99];          // отношение высоты препятствия к первой зоне Френеля
F0 = [0, -6.31, -20, -31];  // функция множителя ослабления
/*
* Функция установки параметров вышки
*/
function setVariables(_h1, _Pi) {
    h1 = _h1; Pi = _Pi;
}
/*
* Функция для нахождения распространения сигнала без помех
*/
function x(_h1) {
    return (Pi * G1 * G2 * (_h1*_h1 + h0*h0) * (h2*h2 + h0*h0) * l*l) / (2 * Pmin)
}
/*
* Функция получения максимального и минимального рельефа
*/
function getRadiuses(R) {
    max = R[0];
    min = R[0];
    for (var i = 1; i < R.length; i++) {
        if (R[i] > max) max = R[i];
        if (R[i] < min) min = R[i];
    }
    return [max, min];
}
/*
* Основной алгоритм
*/
function calcRadiuses() {
    R = [0,0,0,0,0,0,0,0];
    i = 0;
    for (var ii = 0; ii < H.length; ii++)
        for (var jj = 0; jj < F0.length; jj++) {
            // считаем с учетом рельефа
            f_h1 = (x(h1) * Math.pow(10, 0.1*F0[jj]*H[ii])) / Math.abs(Math.log(2) * Math.pow(10,-4));
            R[i] = Math.pow(f_h1, 0.25) / 100;
            i++;
        }
    return R;
}
/*
 * Для перевода координат
*/
function toGeo(str) {
	tmp = str.split('.', 3);
	result = parseFloat(parseFloat(tmp[0]) + (((parseFloat(tmp[1]) * 60) + parseFloat(tmp[2])) / 3600));
	return result;
}
