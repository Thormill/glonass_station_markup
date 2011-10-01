-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Окт 01 2011 г., 13:56
-- Версия сервера: 5.1.40
-- Версия PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `glonass_map_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `data`
--

CREATE TABLE IF NOT EXISTS `data` (
  `number` int(4) NOT NULL AUTO_INCREMENT COMMENT 'номер вышки',
  `type` varchar(200) CHARACTER SET cp1251 NOT NULL,
  `coord_n` varchar(8) CHARACTER SET cp1251 NOT NULL COMMENT 'северная широта, формат 11.11.11',
  `coord_e` varchar(8) CHARACTER SET cp1251 NOT NULL COMMENT 'западная долгота, -"-',
  `frequency_out` float NOT NULL DEFAULT '162.025' COMMENT 'частота, передача',
  `frequency_in` float NOT NULL DEFAULT '161.975' COMMENT 'частота, прием',
  `channel` int(2) NOT NULL COMMENT 'номер канала',
  `power` float NOT NULL COMMENT 'мощность передатчика',
  `class` varchar(7) CHARACTER SET cp1251 NOT NULL DEFAULT '25K0G2B' COMMENT 'класс излучения',
  `k` float NOT NULL COMMENT 'коэффициент усиления антенны',
  `angle` int(11) NOT NULL DEFAULT '360' COMMENT 'азимут/угол места главного лепестка антенны',
  `heigth` int(11) NOT NULL COMMENT 'высота подвеса антенны от поверхности земли',
  `absolute_heigth` int(3) NOT NULL COMMENT 'высота от уровня моря',
  PRIMARY KEY (`number`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `data`
--

INSERT INTO `data` (`number`, `type`, `coord_n`, `coord_e`, `frequency_out`, `frequency_in`, `channel`, `power`, `class`, `k`, `angle`, `heigth`, `absolute_heigth`) VALUES
(1, 'БС-2 Т-214', '57.35.50', '39.54.50', 162.025, 161.975, 0, 0.0125, '25K0G2B', 2.15, 360, 21, 184),
(2, 'БС-7 Т-600', '57.29.40', '42.08.00', 162.025, 161.975, 0, 0.005, '15K0G2B', 8.15, 360, 23, 190),
(3, 'БС-3 Т-214', '57.44.00', '40.55.50', 162.025, 161.975, 0, 0.0125, '25K0G2B', 8.15, 360, 22, 175),
(4, 'БС-8 Т-214', '57.18.30', '43.06.20', 162.025, 161.975, 0, 0.0125, '25K0G2B', 8.15, 360, 37, 176),
(5, 'БС-10 Т-600', '56.28.20', '43.38.10', 162.025, 161.975, 0, 0.005, '15K0G2B', 8.15, 360, 16, 91);
