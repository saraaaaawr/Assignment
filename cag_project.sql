-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 05:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cag project`
--

-- --------------------------------------------------------

--
-- Table structure for table `home`
--

CREATE TABLE `home` (
  `itemID` int(10) NOT NULL,
  `productName` text NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home`
--

INSERT INTO `home` (`itemID`, `productName`, `image`) VALUES
(1, 'Fruits and vegetables', 'fruits.jpg'),
(2, 'Jelly Cat', 'soft toy.jpg'),
(3, 'Foldable chair', 'chair.jpg'),
(4, 'Handphone Case', 'hp cover.jpg'),
(5, 'Jansport bag ', 'jansport.jpg'),
(6, 'Water Bottle', 'waterbottle.jpg'),
(7, '530 New Balance Shoe In White', 'shoes.jpg'),
(8, 'Uniqlo AIRism Shirt', 'shirt.jpg'),
(9, 'Type C Cable', 'cable.jpg'),
(10, 'Wallet', 'wallet.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(10) NOT NULL,
  `productName` text NOT NULL,
  `quantity` int(255) NOT NULL,
  `price` double(10,2) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `productName`, `quantity`, `price`, `image`) VALUES
(1, 'Innisfree Cleanser', 100000, 35.00, 'innisfree cleanser.jpg'),
(2, 'Lovito Floral Squared Neck Dress', 10000, 15.00, 'dress.jpg'),
(3, 'Versatile Socks For Women', 500, 3.50, 'socks.jpg'),
(4, 'Men\'s Jogger', 2000, 9.90, 'men\'s jogger.jpg'),
(6, 'Wireless Power Bank', 5000, 29.90, 'powerbank.jpg'),
(7, 'Apple', 100, 1.50, 'apples.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `itemID` int(10) NOT NULL,
  `reviewTitle` text NOT NULL,
  `description` text NOT NULL,
  `rating` decimal(10,0) NOT NULL,
  `reviewerName` text NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`itemID`, `reviewTitle`, `description`, `rating`, `reviewerName`, `image`) VALUES
(1, 'Versatile Socks For Women', 'Socks material is thin but comfortable and smooth', 5, 'Sally Ong', ''),
(2, 'Men\'s Jogger', 'Material is thin and comfortable. Great for SG\'s weather!', 5, 'Timothy Lim', ''),
(3, 'Lovito Floral Squared Neck Dress', 'Love the dress. Amazing fit and knee length', 5, 'Amanda Tan', ''),
(5, 'Shampoo', 'Smells good and clean', 5, 'Kelly Tan', 'shampoo.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `home`
--
ALTER TABLE `home`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`itemID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
