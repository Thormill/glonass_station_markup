-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Окт 01 2011 г., 00:37
-- Версия сервера: 5.1.40
-- Версия PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- БД: `glonass_map_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `data`
--

CREATE TABLE IF NOT EXISTS `data` (
  `number` int(4) NOT NULL AUTO_INCREMENT COMMENT 'номер вышки',
  `type` varchar(200) NOT NULL,
  `coord_n` varchar(8) NOT NULL COMMENT 'северная широта, формат 11.11.11',
  `coord_e` varchar(8) NOT NULL COMMENT 'западная долгота, -"-',
  `frequency_out` float NOT NULL COMMENT 'частота, передача',
  `frequency_in` float NOT NULL COMMENT 'частота, прием',
  `channel` int(2) NOT NULL COMMENT 'номер канала',
  `power` float NOT NULL COMMENT 'мощность передатчика',
  `class` varchar(7) NOT NULL DEFAULT '25K0G2B' COMMENT 'класс излучения',
  `k` int(11) NOT NULL COMMENT 'коэффициент усиления антенны',
  `angle` int(11) NOT NULL DEFAULT '360' COMMENT 'азимут/угол места главного лепестка антенны',
  `heigth` int(11) NOT NULL COMMENT 'высота подвеса антенны от поверхности земли',
  `absolute_heigth` int(3) NOT NULL COMMENT 'высота от уровня моря',
  PRIMARY KEY (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251 AUTO_INCREMENT=1 ;

--
-- Дамп данных таблицы `data`
--

