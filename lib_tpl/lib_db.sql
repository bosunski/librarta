
CREATE TABLE IF NOT EXISTS `[@prefix]admins` (
`admin_id` int(20) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `section` varchar(30) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `priviledge` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `[@prefix]books` (
`book_id` bigint(20) NOT NULL,
  `acc_no` varchar(50) NOT NULL,
  `ISBN` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `call_number` varchar(50) NOT NULL,
  `thumb` varchar(100) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `[@prefix]borrows` (
`b_id` bigint(30) NOT NULL,
  `acc_no` varchar(30) NOT NULL,
  `title` varchar(500) NOT NULL,
  `lib_no` varchar(20) NOT NULL,
  `admin_id` int(20) NOT NULL,
  `admin_name` varchar(250) NOT NULL,
  `date` datetime NOT NULL,
  `due_date` varchar(30) NOT NULL,
  `status` enum('Returned','Due','Borrowed') NOT NULL DEFAULT 'Borrowed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `[@prefix]lib_config` (
  `lib_name` varchar(200) NOT NULL,
  `due_period` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `school` varchar(255) NOT NULL,
  `skin` varchar(50) NOT NULL,
  `layout` varchar(50) NOT NULL,
  `lockAfter` int(3) NOT NULL DEFAULT '15',
  `logo` varchar(100) NOT NULL,
  `blimit` int(2) NOT NULL,
  `priviledges` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `[@prefix]logged_in_admin` (
`id` bigint(20) NOT NULL,
  `admin_id` int(20) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `[@prefix]users` (
`uid` bigint(20) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `lib_no` varchar(20) NOT NULL,
  `school_no` varchar(20) NOT NULL,
  `level` enum('100','200','300','400','500','600','700','other') NOT NULL,
  `department` varchar(100) NOT NULL,
  `facaulty` varchar(100) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `date` varchar(100) NOT NULL,
  `nBorrow` int(20) NOT NULL DEFAULT '0',
  `nRenewal` int(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `[@prefix]admins`
 ADD PRIMARY KEY (`admin_id`);

ALTER TABLE `[@prefix]books`
 ADD PRIMARY KEY (`book_id`), ADD UNIQUE KEY `book_id` (`book_id`);

ALTER TABLE `[@prefix]borrows`
 ADD PRIMARY KEY (`b_id`), ADD KEY `fk_perAdmin` (`admin_id`);

ALTER TABLE `[@prefix]lib_config`
 ADD UNIQUE KEY `status` (`status`);

ALTER TABLE `[@prefix]logged_in_admin`
 ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `[@prefix]users`
 ADD PRIMARY KEY (`uid`);

ALTER TABLE `[@prefix]admins`
MODIFY `admin_id` int(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `[@prefix]books`
MODIFY `book_id` bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `[@prefix]borrows`
MODIFY `b_id` bigint(30) NOT NULL AUTO_INCREMENT;

ALTER TABLE `[@prefix]logged_in_admin`
MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `[@prefix]users`
MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT;