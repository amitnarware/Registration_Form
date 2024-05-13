-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 06:28 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registration_form`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'madhya-pradesh', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'madhya-pradesh', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `stateId` int(11) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `countryId` int(11) NOT NULL,
  `areaOfInterest` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `gender`, `email`, `password`, `city`, `stateId`, `zip`, `countryId`, `areaOfInterest`, `profilePicture`, `createdAt`, `updatedAt`) VALUES
(4, 'John', 'Doe', 'male', 'john.doe@example.com', '$2b$10$BGGwZLq/xFOi2pYgySEJnuAaNvYfyTV/WGKeNcZ9niiS6d8sL/5k.', 'bhopal', 1, '12345', 1, 'Reading', 'profile.jpg', '2024-05-09 14:48:49', '2024-05-09 14:48:49'),
(5, 'Vivek', 'Doe', 'male', 'Vivek@example.com', '$2b$10$/AmYUFXVqAH3OPG8PlveSutc/BSPY10FtiDHC73PQXmjrcRqkPxka', 'York', 1, '10001', 1, 'Writing', 'profile.jpg', '2024-05-10 04:16:29', '2024-05-10 04:16:29'),
(6, 'Subhash', 'Gau', 'male', 'gautam@example.com', '$2b$10$f19GCyU7spUPpA0ehGtNcOxCwNErdYjG.G0HI6.KXr/T9065GaT2u', 'Bhopal', 1, '10001', 1, 'Writing', '', '2024-05-10 06:51:36', '2024-05-10 06:51:36'),
(7, 'Aniket', 'chou', 'male', 'ani@gmail.com', '$2b$10$.gDngwWk/2uDyZXWeXeDRejkp7V1S.Jag3/CwlRLW7bjE5s27vCNG', 'bhopal', 1, '876655', 1, 'writing', 'xyx.jpg', '2024-05-10 08:50:55', '2024-05-10 08:50:55'),
(8, 'Tanya', 'chouhan', 'female', 'tanya@gmail.com', '$2b$10$ivRdZTfkD3P6lW/kIQUNOeqPxti0zaT5bX5dgVGxsm8gqmz1Nh2hO', 'bhopal', 1, '342345', 1, 'writing', 'profilePicture-1715336392725-png-transparent-html-js-and-css-logo-cascading-style-sheets-javascript-html-css3-jquery-logo-miscellaneous-text-trademark-thumbnail.png', '2024-05-10 10:19:52', '2024-05-10 10:19:52'),
(9, 'Akilesh', 'chouhan', 'male', 'akhi@gmail.com', '$2b$10$jq0srpqarGQO7ifbGAdKTu95Nx5HR16iymhNxDPhZPKUpRQZu2zw.', 'bhopal', 1, '342345', 1, 'writing', 'profilePicture-1715344759470-Superbike-Wallpaper-4k.jpg', '2024-05-10 12:39:19', '2024-05-10 12:39:19'),
(10, 'kurban', 'chouhan', 'male', 'kurban@gmail.com', '$2b$10$TzahbNm5cCno4h2MUgB/Uut/8LQetLg68oVuIG5fthGkwEJhZpSnq', 'bhopal', 1, '342345', 1, 'writing', 'profilePicture-1715345554959-Superbike-Wallpaper-4k.jpg', '2024-05-10 12:52:35', '2024-05-10 12:52:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `stateId` (`stateId`),
  ADD KEY `countryId` (`countryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
