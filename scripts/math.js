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
N = -114;                   // dB
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
function setVariables(_h1, _Pi, _h0, _h2, _N, _f) {
    h1 = _h1; 
    Pi = _Pi*1000;
    if (_h0 != undefined) 
		h0 = _h0;
	else
		h0 = 5;	
    if (_h2 != undefined) 
		h2 = _h2;
	else
		h2 = 8;
	if (_N != undefined)
		N = _N;
	else
		N = -114;
	
	if (_f != undefined) 
		f = _f;
	else
		f = 162.025;
	
	Pmin = Math.pow(10, N/10);
	l = 300/f;
}
/*
* Функция для нахождения распространения сигнала без помех
*/

function X() {
    return (Pi * G1 * G2 * (h1*h1 + h0*h0) * (h2*h2 + h0*h0) * l*l) / (2 * Pmin * 1000)
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
            // считаем с учетом рельефа для h1
            f_h1 = (X() * Math.pow(10, 0.1*F0[jj]*H[ii])) / Math.abs(Math.log(2) * Math.pow(10,-4));
            R[i] = Math.pow(f_h1, 0.25);
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
/*
* Вычисление интеграла по dy от выражения expression
*/
function integral(expression, a, b) {
    if (!expression || !b && !a) return 0;
    if (a == b) return 0;

    var y, x1, x2, n, length, dy, S=0;

    length = Math.abs(b - a);
    x1 = Math.min(a, b); 
    b = Math.max(a, b);  
    a = x1;
    n = 100;
    if (length>2)
        n = Math.round(100 * Math.log(length + 1));
    dy = length/n;
    y = a;
    x1 = eval(expression);
    y = a + dy;
    x2 = eval(expression);
    S = (x1 + x2) * dy/2;
    for(i=2; i<=n; i++) {
        x1 = x2;
        y = y + dy;
        x2 = eval(expression);
        S += (x1 + x2) * dy/2;
    }
    return S
}
/*
* Вычисление вероятности ошибки от заданного R1
*/
function Perr(R1) {
    return (8/Math.PI * Math.pow(X(),0.75)/Math.pow(R1,3)) *
        integral('Math.pow(y,0.5) * Math.exp(-(1/Math.pow(y,2) + Math.pow(X(),0.25)*y/(Math.PI*' + (R1*R1) + ')))', 0, Math.pow(10,9.5));
}
