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
  `priviledges` varchar(2000) NOT NULL,
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO lib_lib_config VALUES("Dream Builders Library","14","on","FUNAABITEDB","skin-blue","layout-boxed","15","b_o_sun.jpg","10","backs,newAdmin,booka,borrowsR,adminCol,libSettings,newAdmin,addNewUser");



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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO lib_admins VALUES("1","Ola","Gabe","bosunski","bosunski@gmail.com","9aca3d0927d9462fe44ecd5c19085565ab2d669db39eb5d1395c95a4dcb2376113042630724b38954efd79da229d3af69435e3fd4c2bb616d3c42e0ad6813bc0","superDUPER","dofb9zyv2s6gephx25phivxn3fp3wyff66120ghnz2gkgqvnbf","");
INSERT INTO lib_admins VALUES("2","Ola","Bolawa","bolawa","b@b.c","708c64adeb950a3b5e10dab75ae2c719f3fcc39001a0d3ddeb39da5c812851bf2854bfc8d8d82a732154ec5c2d1cb8fe9cf6bb10b41de319d4207fd455d00d9a","superDUPER","jhkjef5gx4b74w4bf7uiowo1ci7gymxl7vhnprmykn65dhtxtv","");
INSERT INTO lib_admins VALUES("3","OLYOLY","DanDan","bolaaa","bbc@cnn.nta","5eb0bf0063357651aa0c9553404fb6d175eff3af8d937ede5369637ac8f47cca4a28e73ea766a0f9429cb11dc83bfd1c2fba28cf379be906400d8a2b9606523d","circulation","xc5bzdhnt72b4k65003na4hevusiyjgwmy21k295pr9f4t7vv6","");
INSERT INTO lib_admins VALUES("4","bosun","biodun","bosssssmi","bos@b.com","504dba9dabec820cb741b0675bd867fbe02b47b29d96a8cb0c3a3dd2a931c2c0c3ebd2ed988f8543acb732128e1d5ea0e7de1ebe1c6ffafaddd74fa8dfe39e71","circulation","mofedjrj6c29n60r52uin5x4vn1fhm1ra100nq2ihmlclhclno","backs,borrowsR,booka");
INSERT INTO lib_admins VALUES("5","tobi","anifowose","anis","a@a.com","b84ff96d341d39c3bc68b529c043e3b06e90ab5dae2a4c3a3bb6ee6e25feb5655e95f2795477aaac6eb7eb80ac93fd5b942856eeecf93b51903f729531484988","catalogue","5562d0e6ubua6zl9gurpleeazotoim7uojbhkjz67cnscra3mj","");



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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;

INSERT INTO lib_users VALUES("1","B85Z05PE","20141893","B85Z05PE","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","1","0");
INSERT INTO lib_users VALUES("2","4KI00MI5","20141893","4KI00MI5","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","1","0");
INSERT INTO lib_users VALUES("3","1K7T507S","20141893","1K7T507S","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("4","6X7P8MV7","20141893","6X7P8MV7","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("5","0TVTVWCH","20141893","0TVTVWCH","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("6","EJOSNC4L","20141893","EJOSNC4L","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("7","YAS8HB79","20141893","YAS8HB79","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("8","N83EDX5N","20141893","N83EDX5N","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("9","DN3DXNV6","20141893","DN3DXNV6","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("10","3E1CNK3X","20141893","3E1CNK3X","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:36","0","0");
INSERT INTO lib_users VALUES("11","3OQ9KB5V","20141893","3OQ9KB5V","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("12","VE55UU6R","20141893","VE55UU6R","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("13","6087N9WL","20141893","6087N9WL","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("14","FP7ZGDGD","20141893","FP7ZGDGD","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("15","2QYPPBIZ","20141893","2QYPPBIZ","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("16","K0FK12YZ","20141893","K0FK12YZ","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("17","SBCGE13D","20141893","SBCGE13D","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("18","047782WW","20141893","047782WW","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("19","K1LPZSRW","20141893","K1LPZSRW","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("20","9E7116N1","20141893","9E7116N1","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("21","9VP8IE0S","20141893","9VP8IE0S","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("22","8HSZAB9Y","20141893","8HSZAB9Y","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("23","6DOHFQEY","20141893","6DOHFQEY","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("24","S28AOIT1","20141893","S28AOIT1","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("25","0K13AKQG","20141893","0K13AKQG","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("26","YOADMDHN","20141893","YOADMDHN","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("27","HFTEF6P5","20141893","HFTEF6P5","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("28","FT4TYPH8","20141893","FT4TYPH8","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("29","73ZY8I2I","20141893","73ZY8I2I","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:37","0","0");
INSERT INTO lib_users VALUES("30","58FZR8JJ","20141893","58FZR8JJ","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("31","7F8F1W24","20141893","7F8F1W24","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("32","EWR1A8S1","20141893","EWR1A8S1","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("33","CUPSQ7IP","20141893","CUPSQ7IP","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("34","3Z1MQ8GI","20141893","3Z1MQ8GI","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("35","6CGFVF0Q","20141893","6CGFVF0Q","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("36","OAJJHENW","20141893","OAJJHENW","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("37","QM0KDU1E","20141893","QM0KDU1E","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("38","RUTMNOZA","20141893","RUTMNOZA","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("39","2KC9E12M","20141893","2KC9E12M","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("40","37HBKIJK","20141893","37HBKIJK","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("41","7TVAQC6L","20141893","7TVAQC6L","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("42","O5L6A6W4","20141893","O5L6A6W4","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("43","Y1NFVO7G","20141893","Y1NFVO7G","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("44","8FZLSZT3","20141893","8FZLSZT3","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("45","M90SYFLB","20141893","M90SYFLB","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("46","8BHSQV0O","20141893","8BHSQV0O","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("47","V4B50SBU","20141893","V4B50SBU","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("48","RTTU6S1I","20141893","RTTU6S1I","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:38","0","0");
INSERT INTO lib_users VALUES("49","17XY5LN7","20141893","17XY5LN7","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("50","JMJJT7YM","20141893","JMJJT7YM","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("51","AS35KHYO","20141893","AS35KHYO","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("52","P7V8GDTL","20141893","P7V8GDTL","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("53","8MTUGLRH","20141893","8MTUGLRH","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("54","WNPVO8QV","20141893","WNPVO8QV","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("55","XNMTJZOS","20141893","XNMTJZOS","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("56","KSCYDE7H","20141893","KSCYDE7H","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("57","TR7VPX93","20141893","TR7VPX93","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("58","JW9J5FZW","20141893","JW9J5FZW","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("59","DK5IIVEN","20141893","DK5IIVEN","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("60","7Z65ODC2","20141893","7Z65ODC2","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("61","UL5WA2RC","20141893","UL5WA2RC","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:39","0","0");
INSERT INTO lib_users VALUES("62","UVP7APOJ","20141893","UVP7APOJ","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("63","S8X530FJ","20141893","S8X530FJ","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("64","YXCBO68J","20141893","YXCBO68J","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("65","R9KSLSFR","20141893","R9KSLSFR","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("66","2VH5LI6S","20141893","2VH5LI6S","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("67","ZZQ1I735","20141893","ZZQ1I735","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("68","M9CS4LDC","20141893","M9CS4LDC","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("69","NIG0LC7N","20141893","NIG0LC7N","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("70","XM40UXBS","20141893","XM40UXBS","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("71","U0MSQY4C","20141893","U0MSQY4C","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("72","372BSLP7","20141893","372BSLP7","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("73","GBMA7P4Y","20141893","GBMA7P4Y","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("74","X2SYRTWD","20141893","X2SYRTWD","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("75","HCVU2A8J","20141893","HCVU2A8J","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("76","JYD91HTL","20141893","JYD91HTL","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("77","UOXY8P0E","20141893","UOXY8P0E","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("78","NDP10H60","20141893","NDP10H60","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("79","KLSJ61OH","20141893","KLSJ61OH","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("80","0JD7MW3N","20141893","0JD7MW3N","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("81","FGA804Y9","20141893","FGA804Y9","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:40","0","0");
INSERT INTO lib_users VALUES("82","R1R5300C","20141893","R1R5300C","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("83","MVIJ4KHO","20141893","MVIJ4KHO","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("84","RNSB1BY6","20141893","RNSB1BY6","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("85","T4C3EQEV","20141893","T4C3EQEV","The Shepherd","700","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("86","WS729BE2","20141893","WS729BE2","The Shepherd","600","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("87","DD8KZTU2","20141893","DD8KZTU2","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("88","ND70XTD0","20141893","ND70XTD0","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("89","NPYIJSP2","20141893","NPYIJSP2","The Shepherd","400","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("90","9GA6LW2U","20141893","9GA6LW2U","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("91","4JREUNCI","20141893","4JREUNCI","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("92","Z94YNP8R","20141893","Z94YNP8R","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("93","I6ZZJDDL","20141893","I6ZZJDDL","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("94","W9M6RADU","20141893","W9M6RADU","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("95","AMDH31BO","20141893","AMDH31BO","The Shepherd","200","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("96","7YGUJALT","20141893","7YGUJALT","The Shepherd","100","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("97","SF1L51WT","20141893","SF1L51WT","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("98","165J0BA0","20141893","165J0BA0","The Shepherd","300","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");
INSERT INTO lib_users VALUES("99","27ZCHWLU","20141893","27ZCHWLU","The Shepherd","500","bosunski","bosunski","bosunski","08169545481","bosunski@gmail.com","regular","2016-01-21 18:52:41","0","0");



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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO lib_borrows VALUES("1","m7gztbwl","Lindsay Of Great","B85Z05PE","1","Ola Gabe","2016-01-21 19:04:54","Thu  Feb 04 2016 19:04:54","Borrowed");
INSERT INTO lib_borrows VALUES("2","IV3W2GDA","Lindsay The English","4KI00MI5","1","Ola Gabe","2016-01-21 19:14:06","Thu  Feb 04 2016 19:14:06","Borrowed");
INSERT INTO lib_borrows VALUES("3","IV3W2GDA","Lindsay The English","fdgggt","1","Ola Gabe","2016-01-21 22:04:14","Thu  Feb 04 2016 22:04:14","Borrowed");



DROP TABLE lib_logged_in_admin;

CREATE TABLE `lib_logged_in_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `admin_id` int(20) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

INSERT INTO lib_logged_in_admin VALUES("40","1","n5qrnpt5poe6p9h6fbdlsifjo1","ad72ac1e7914c599cacaccaaadcc84a6f8fe4adb2614e6b60e45819a47186274f9a4963cc10a98b1411746ebb1f1c65a3ac977eb8c3bce8c7632527beac31714","2016-01-21 23:12:07");
INSERT INTO lib_logged_in_admin VALUES("24","2","081mn4nukisu9hke5f2hq8oms7","44bf3ec0b75c9cd2049358dffca466ebf8ff076e30333e6ca77f83eeae8112e4ccbf1904c477a1dbbb0511464b2a07b5d41c831b0ef40fbc72bb6414a0eccb8d","2016-01-19 10:36:30");
INSERT INTO lib_logged_in_admin VALUES("33","5","bn9j8id86ap2onp9ch1bpoo564","342e404eb1f935fdbae2e89f4543e1954cbc5698eff7ea87fdac06acdefabf8c06e958daf6b8e6a0750a04887a8f3826b9818287ac3a5ebc869db6ae6ea4f71b","2016-01-21 20:55:49");



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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

INSERT INTO lib_books VALUES("1","23fgrty","1234567890123","Physics notes","Bosunskik Bosun","FUNAAB","QC132413-45","catalogue","2016-01-18 12:53:06");
INSERT INTO lib_books VALUES("2","X9ANFAMC","3783464625221117648747478","The Of Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:52:59");
INSERT INTO lib_books VALUES("3","FIKYS9X9","3783464625221117648747478","Physics Lorem Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("4","G1YKP7W1","3783464625221117648747478","The Lorem Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("5","2FSDUB7W","3783464625221117648747478","The Lorem Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("6","KGBI5MAH","3783464625221117648747478","Of The Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("7","FZ17127M","3783464625221117648747478","Great The Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("8","JJN4R6NB","3783464625221117648747478","Lorem Lohan The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("9","69LLZ9CJ","3783464625221117648747478","The Great Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("10","QN2WC5AZ","3783464625221117648747478","English Physics Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("11","OQK3EQDC","3783464625221117648747478","Chemistry English Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("12","QOTDXVRU","3783464625221117648747478","Lindsay Of English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("13","7U8XG48C","3783464625221117648747478","English Lindsay Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("14","KYM2HWSE","3783464625221117648747478","Of Discus Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("15","GKIADKHS","3783464625221117648747478","Yoruba English Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("16","29JDULAY","3783464625221117648747478","Yoruba Physics Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("17","IUK23XFH","3783464625221117648747478","Lohan Of Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("18","K9QDXZM8","3783464625221117648747478","Physics Of Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("19","OIR3MTBX","3783464625221117648747478","Discus English Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("20","5LA1PK9T","3783464625221117648747478","Yoruba Lorem Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("21","8BX6Y1Y0","3783464625221117648747478","Of Lindsay Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:00");
INSERT INTO lib_books VALUES("22","YYMPFAS3","3783464625221117648747478","Great Discus English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("23","5QJF43H6","3783464625221117648747478","English Of Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("24","SO6A3CEH","3783464625221117648747478","Lindsay Chemistry Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("25","MRXX4B4P","3783464625221117648747478","Chemistry Yoruba Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("26","ZGZDLVAV","3783464625221117648747478","English Lindsay Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("27","F3O783DC","3783464625221117648747478","Yoruba Physics Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("28","LGZQRIBD","3783464625221117648747478","Physics Great Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("29","BD2XH3HS","3783464625221117648747478","Lorem Chemistry Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("30","S290KLQ3","3783464625221117648747478","Great Physics Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("31","HB2IBAVI","3783464625221117648747478","Yoruba The Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("32","5AQYQ794","3783464625221117648747478","The Lorem English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("33","8W75A12G","3783464625221117648747478","Lohan Discus Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:01");
INSERT INTO lib_books VALUES("34","9X0WO4IS","3783464625221117648747478","Chemistry English Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("35","AEUTPD7S","3783464625221117648747478","Lorem Lindsay Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("36","WBD28230","3783464625221117648747478","Of Great Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("37","QVSXZMO8","3783464625221117648747478","Yoruba Discus Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("38","GWM55VQA","3783464625221117648747478","English Lindsay Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("39","TFYAA1BN","3783464625221117648747478","Great Lorem Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("40","YYDJXWK0","3783464625221117648747478","English Chemistry Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("41","3ZHUX96L","3783464625221117648747478","Chemistry Discus Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("42","56UC95ML","3783464625221117648747478","Yoruba Chemistry Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("43","4AOWF2O6","3783464625221117648747478","Great Physics Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("44","F2X6FTM3","3783464625221117648747478","Lindsay Yoruba Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("45","CLYOW9U8","3783464625221117648747478","Lindsay Of The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("46","BCORY0D1","3783464625221117648747478","Lohan The Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("47","QCU7BG8Q","3783464625221117648747478","Lindsay Lorem Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("48","7VQQLW3Y","3783464625221117648747478","Yoruba Lindsay Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("49","1NYWSNU5","3783464625221117648747478","Great The Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("50","DYD5TILT","3783464625221117648747478","Great Physics Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("51","HD3JVJBY","3783464625221117648747478","Lindsay Of Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("52","4CWUPYT3","3783464625221117648747478","Discus Lindsay Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("53","ZNQ31RH2","3783464625221117648747478","Of Lorem Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:02");
INSERT INTO lib_books VALUES("54","N4MIMR1A","3783464625221117648747478","Discus Lindsay Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("55","TIA8MBQB","3783464625221117648747478","English Lorem Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("56","5U0A5FYI","3783464625221117648747478","Yoruba Discus Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("57","6G530LFS","3783464625221117648747478","Lohan Great Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("58","NVXQEA82","3783464625221117648747478","Lindsay Yoruba Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("59","T9LL6U33","3783464625221117648747478","Physics The Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("60","QYTL8GS5","3783464625221117648747478","The Physics Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("61","STR4MBJT","3783464625221117648747478","Lohan Of Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("62","Z98Y101W","3783464625221117648747478","Physics Of Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("63","9D867GGE","3783464625221117648747478","Chemistry Great Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("64","VBZK84O8","3783464625221117648747478","English Chemistry Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("65","551H8197","3783464625221117648747478","Discus Of Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("66","Q3D4QQTA","3783464625221117648747478","Of Discus The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("67","M58GVR1I","3783464625221117648747478","Lohan English Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("68","J0KW9DBT","3783464625221117648747478","Great Physics Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("69","6RL6P8ZA","3783464625221117648747478","The Great Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("70","LACG7FVJ","3783464625221117648747478","Of Lindsay Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:03");
INSERT INTO lib_books VALUES("71","HR4UUVIK","3783464625221117648747478","Yoruba Lohan The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("72","UB09HGLB","3783464625221117648747478","Lohan The English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("73","KFYIHEOD","3783464625221117648747478","Discus Lorem Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("74","IXS8OQTU","3783464625221117648747478","Lorem English Discus","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("75","4MFV8WAG","3783464625221117648747478","Of Discus English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("76","K8TMYFY5","3783464625221117648747478","Physics Lohan Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("77","TIYMXCBK","3783464625221117648747478","Discus Lohan English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("78","X3Q6OCVW","3783464625221117648747478","Chemistry Discus Yoruba","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("79","7T45JIZB","3783464625221117648747478","Of Discus Lorem","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("80","W0011V33","3783464625221117648747478","The English Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("81","HWSMJQAR","3783464625221117648747478","Physics Lohan Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("82","NZYMIQOQ","3783464625221117648747478","Discus Of Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("83","397RDCLR","3783464625221117648747478","Discus Chemistry The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("84","XYTH6GW3","3783464625221117648747478","Yoruba Physics English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("85","Y0VDGS4F","3783464625221117648747478","Great Lindsay Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("86","SE3JXLUA","3783464625221117648747478","Lorem Lindsay Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("87","5URLX0AP","3783464625221117648747478","English Discus Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("88","RJXN11UC","3783464625221117648747478","Of Great The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("89","ENT9JVRQ","3783464625221117648747478","Lohan Discus Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("90","MT81LMRP","3783464625221117648747478","Lindsay Yoruba Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:04");
INSERT INTO lib_books VALUES("91","YQS39XBV","3783464625221117648747478","Lohan Of Chemistry","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("92","NK78LW5D","3783464625221117648747478","Physics English The","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("93","OR0RCY9Z","3783464625221117648747478","Great Lorem Of","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("94","IV3W2GDA","3783464625221117648747478","Lindsay The English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("95","JPENGSJ6","3783464625221117648747478","The Chemistry Lohan","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("96","WPAP20XU","3783464625221117648747478","Physics Chemistry Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("97","BEA2SHBU","3783464625221117648747478","Lohan Discus Lindsay","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("98","RBMK750M","3783464625221117648747478","Chemistry Lorem English","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("99","S2PK5ODM","3783464625221117648747478","Great Chemistry Physics","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("100","M7GZTBWL","3783464625221117648747478","Lindsay Of Great","The Shepherd","bosunski","08169545481","bosunski@gmail.com","2016-01-21 18:53:05");
INSERT INTO lib_books VALUES("103","1323thsdhTT","7348374343","35534545342edfdfd","fdgdfhfhgf","fhgfhgfhfghgfh","ddgd34545","circulation","2016-01-21 22:55:53");



