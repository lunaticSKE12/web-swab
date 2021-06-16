-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 16, 2021 at 02:55 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `swab_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `cabin_info`
--

CREATE TABLE `cabin_info` (
  `id` int(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `region` varchar(120) NOT NULL,
  `cabin_type` varchar(120) NOT NULL,
  `cabin_tool` varchar(120) DEFAULT NULL,
  `cabin_tool_name` varchar(120) NOT NULL,
  `cabin_spec` varchar(120) DEFAULT NULL,
  `cabin_toot_amount` int(10) DEFAULT NULL,
  `cabin_expired` int(10) DEFAULT NULL,
  `cabin_toot_buy_from` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cabin_info`
--

INSERT INTO `cabin_info` (`id`, `created_at`, `region`, `cabin_type`, `cabin_tool`, `cabin_tool_name`, `cabin_spec`, `cabin_toot_amount`, `cabin_expired`, `cabin_toot_buy_from`) VALUES
(1, '2021-06-05 14:49:33', 'N', 'P', 'LED', 'Phillips', '24W', 4, 3, 'homepro'),
(25, '2021-06-12 14:28:59', 'S', 'P', 'w', 'w', 'w', 2, 2, 'e'),
(26, '2021-06-15 13:11:37', 'N', 'N', 'n', 'n', 'n', 2, 2, 'n');

-- --------------------------------------------------------

--
-- Table structure for table `cabin_order`
--

CREATE TABLE `cabin_order` (
  `id` int(100) NOT NULL,
  `cabin_serial_number` varchar(120) NOT NULL,
  `created_at` datetime NOT NULL,
  `vendor_name` varchar(120) NOT NULL,
  `cabin_order_status` varchar(120) DEFAULT NULL,
  `hospital_name` varchar(120) NOT NULL,
  `deliver_date` date DEFAULT NULL,
  `cabin_type` varchar(120) NOT NULL,
  `cabin_tool` varchar(120) DEFAULT NULL,
  `cabin_tool_name` varchar(120) DEFAULT NULL,
  `cabin_spec` varchar(120) DEFAULT NULL,
  `cabin_tool_amount` int(10) DEFAULT NULL,
  `cabin_tool_expried` int(10) DEFAULT NULL,
  `cabin_tool_buyform` varchar(255) DEFAULT NULL,
  `cabin_tool_lasttime_maintenance` date DEFAULT NULL,
  `cabin_tool_nexttime_maintenance` date DEFAULT NULL,
  `cabin_status` varchar(255) DEFAULT NULL,
  `cabin_status_detail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cabin_order`
--

INSERT INTO `cabin_order` (`id`, `cabin_serial_number`, `created_at`, `vendor_name`, `cabin_order_status`, `hospital_name`, `deliver_date`, `cabin_type`, `cabin_tool`, `cabin_tool_name`, `cabin_spec`, `cabin_tool_amount`, `cabin_tool_expried`, `cabin_tool_buyform`, `cabin_tool_lasttime_maintenance`, `cabin_tool_nexttime_maintenance`, `cabin_status`, `cabin_status_detail`) VALUES
(1, 'BKKP2106001', '2021-06-05 14:53:08', 'vendor 1', 'status 1', 'รพ 1', '2021-06-12', 'P', 'tool', 'tool name', 'pec', 1, 2, 'mall', '2021-06-05', '2021-08-05', 'status', 'status detail');

-- --------------------------------------------------------

--
-- Table structure for table `create_order`
--

CREATE TABLE `create_order` (
  `id` int(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `hospital_name` varchar(120) NOT NULL,
  `province` varchar(120) NOT NULL,
  `region` varchar(50) NOT NULL,
  `csc` varchar(50) NOT NULL,
  `customer_name` varchar(120) NOT NULL,
  `customer_phone` varchar(120) NOT NULL,
  `customer_email` varchar(120) NOT NULL,
  `cabin_type` varchar(120) NOT NULL,
  `express` varchar(120) NOT NULL,
  `deliver_date` date DEFAULT NULL,
  `sequence` varchar(120) NOT NULL,
  `vendor_group` varchar(120) NOT NULL,
  `amount` int(100) NOT NULL,
  `donate` varchar(120) DEFAULT NULL,
  `vendor_name` varchar(120) NOT NULL,
  `cabin_serial_number` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `create_order`
--

INSERT INTO `create_order` (`id`, `created_at`, `hospital_name`, `province`, `region`, `csc`, `customer_name`, `customer_phone`, `customer_email`, `cabin_type`, `express`, `deliver_date`, `sequence`, `vendor_group`, `amount`, `donate`, `vendor_name`, `cabin_serial_number`) VALUES
(1, '2021-06-05 14:45:59', 'รพ 1', '', '', '', 'ลูกค้า1', '08123456789', 'q@q.com', 'p', 'no', '2021-06-12', '1', 'N', 1, 'no', 'vendor 1', 'BKKP2106001'),
(13, '2021-06-16 20:25:50', 'test', 'NMA', 'N', 'CPAC Solution Center ชลบุรี', 'test', '02134538', 'asdfasdf@asdfdf.com', 'P', 'ด่วน', '2021-06-18', '1', 'sadf', 1, '1', 'sd', 'zxc123456'),
(14, '2021-06-16 20:30:42', 'กรุงเทพ', 'BKK', 'C', 'RMC Production and Service Metro 1', 'ณพงศ์ ดั่งดวงศศิธร', '0840257894', 'jamesnapongd@gmail.com', 'N', 'ไม่ด่วน', '2021-06-17', '1', 'S1', 1, '0', 'STL', 'BKK2106001');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(10) NOT NULL,
  `title` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(10) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `last_name` varchar(120) NOT NULL,
  `phone_number` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `supervisor_email` varchar(120) NOT NULL,
  `region` varchar(120) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `create_at` datetime NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `supervisor_email`, `region`, `username`, `password`, `create_at`, `role`) VALUES
(3, 'ad', 'ad', '0123', 'ad', 'sup', 'C', 'asd', 'asd', '2021-06-16 14:24:09', 'Chain'),
(4, 'ณพงศ์', 'ดั่งดวงศศิธร', '0812345678', 'asdfasdfsdf@sdfasf.com', 'zxcvxcv@zxcv.com', 'C', 'napong', 'napong', '2021-06-16 14:30:10', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cabin_info`
--
ALTER TABLE `cabin_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cabin_order`
--
ALTER TABLE `cabin_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cabin_serial_number` (`cabin_serial_number`);

--
-- Indexes for table `create_order`
--
ALTER TABLE `create_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cabin_serial_number` (`cabin_serial_number`) USING BTREE;

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cabin_info`
--
ALTER TABLE `cabin_info`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `cabin_order`
--
ALTER TABLE `cabin_order`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `create_order`
--
ALTER TABLE `create_order`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
