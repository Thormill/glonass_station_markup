-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- ����: localhost
-- ����� ��������: ��� 01 2011 �., 00:37
-- ������ �������: 5.1.40
-- ������ PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- ��: `glonass_map_db`
--

-- --------------------------------------------------------

--
-- ��������� ������� `data`
--

CREATE TABLE IF NOT EXISTS `data` (
  `number` int(4) NOT NULL AUTO_INCREMENT COMMENT '����� �����',
  `type` varchar(200) NOT NULL,
  `coord_n` varchar(8) NOT NULL COMMENT '�������� ������, ������ 11.11.11',
  `coord_e` varchar(8) NOT NULL COMMENT '�������� �������, -"-',
  `frequency_out` float NOT NULL COMMENT '�������, ��������',
  `frequency_in` float NOT NULL COMMENT '�������, �����',
  `channel` int(2) NOT NULL COMMENT '����� ������',
  `power` float NOT NULL COMMENT '�������� �����������',
  `class` varchar(7) NOT NULL DEFAULT '25K0G2B' COMMENT '����� ���������',
  `k` int(11) NOT NULL COMMENT '����������� �������� �������',
  `angle` int(11) NOT NULL DEFAULT '360' COMMENT '������/���� ����� �������� �������� �������',
  `heigth` int(11) NOT NULL COMMENT '������ ������� ������� �� ����������� �����',
  `absolute_heigth` int(3) NOT NULL COMMENT '������ �� ������ ����',
  PRIMARY KEY (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251 AUTO_INCREMENT=1 ;

--
-- ���� ������ ������� `data`
--

