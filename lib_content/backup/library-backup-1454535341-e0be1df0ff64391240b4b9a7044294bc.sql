DROP TABLE lib_lib_config;

CREATE TABLE `lib_lib_config` (
  `lib_name` varchar(200) NOT NULL,
  `due_period` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `school` varchar(255) NOT NULL,
  `skin` varchar(50) NOT NULL,
  `layout` varchar(50) NOT NULL,
  `lockAfter` int(3) NOT NULL DEFAULT '15',
  `logo` varchar(100) NOT NULL,
  `blimit` int(2) NOT NULL,
  `priviledges` varchar(500) NOT NULL,
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO lib_lib_config VALUES("Nimbe Adedipe Library","14","on","FUNAAB","skin-blue","sidebar-mini","15","logo.png","10","10");



DROP TABLE lib_admins;

CREATE TABLE `lib_admins` (
  `admin_id` int(20) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `section` varchar(30) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `priviledge` varchar(500) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO lib_admins VALUES("1","Olatunbosun","Gabriel","bosunski","bosunski@gmail.com","cac1f47ea0af069e9ef0905160c23f7fc39dd88ce50296eb2083ca1d7dbf46938780ae5f62c973c835792ddc920f734605e627c28556abc5ec876f095847b586","superDUPER","ks7tsxbf5c4f1zc8sgxoh3sdc65x88ic1cfrtngm35dpfselgw","");



DROP TABLE lib_users;

CREATE TABLE `lib_users` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `nRenewal` int(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




DROP TABLE lib_borrows;

CREATE TABLE `lib_borrows` (
  `b_id` bigint(30) NOT NULL AUTO_INCREMENT,
  `acc_no` varchar(30) NOT NULL,
  `title` varchar(500) NOT NULL,
  `lib_no` varchar(20) NOT NULL,
  `admin_id` int(20) NOT NULL,
  `admin_name` varchar(250) NOT NULL,
  `date` datetime NOT NULL,
  `due_date` varchar(30) NOT NULL,
  `status` enum('Returned','Due','Borrowed') NOT NULL DEFAULT 'Borrowed',
  PRIMARY KEY (`b_id`),
  KEY `fk_perAdmin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




DROP TABLE lib_logged_in_admin;

CREATE TABLE `lib_logged_in_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `admin_id` int(20) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO lib_logged_in_admin VALUES("2","1","9actue2tim3lddjjosgm5gkta0","6e2a5d0831b96d8d34ab1a4ece68a66c9b05033a77d6ebf3fe675b00d9967f2d5ea6de00608b7158bbedcdda0dbc3ed7292a9a559aea88ccdcba6f41792fa361","2016-02-03 21:22:31");



DROP TABLE lib_books;

CREATE TABLE `lib_books` (
  `book_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acc_no` varchar(50) NOT NULL,
  `ISBN` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `call_number` varchar(50) NOT NULL,
  `thumb` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




