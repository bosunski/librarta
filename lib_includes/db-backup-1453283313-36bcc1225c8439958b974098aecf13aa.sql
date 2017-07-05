DROP TABLE el_comments;

CREATE TABLE `el_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO el_comments VALUES("1","1","Mr WordPress","","https://wordpress.org/","","2015-11-30 09:22:23","2015-11-30 09:22:23","Hi, this is a comment.\nTo delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.","0","1","","","0","0");



DROP TABLE el_options;

CREATE TABLE `el_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO el_options VALUES("1","siteurl","http://localhost/cms","yes");
INSERT INTO el_options VALUES("2","home","http://localhost/cms","yes");
INSERT INTO el_options VALUES("3","blogname","Dream Builders","yes");
INSERT INTO el_options VALUES("4","blogdescription","Just another Elyon site","yes");
INSERT INTO el_options VALUES("5","users_can_register","0","yes");
INSERT INTO el_options VALUES("6","admin_email","bosunski@gmail.com","yes");
INSERT INTO el_options VALUES("7","start_of_week","1","yes");
INSERT INTO el_options VALUES("8","use_balanceTags","0","yes");
INSERT INTO el_options VALUES("9","use_smilies","1","yes");
INSERT INTO el_options VALUES("10","require_name_email","1","yes");
INSERT INTO el_options VALUES("11","comments_notify","1","yes");
INSERT INTO el_options VALUES("12","posts_per_rss","10","yes");
INSERT INTO el_options VALUES("13","rss_use_excerpt","0","yes");
INSERT INTO el_options VALUES("14","mailserver_url","mail.example.com","yes");
INSERT INTO el_options VALUES("15","mailserver_login","login@example.com","yes");
INSERT INTO el_options VALUES("16","mailserver_pass","password","yes");
INSERT INTO el_options VALUES("17","mailserver_port","110","yes");
INSERT INTO el_options VALUES("18","default_category","1","yes");
INSERT INTO el_options VALUES("19","default_comment_status","open","yes");
INSERT INTO el_options VALUES("20","default_ping_status","open","yes");
INSERT INTO el_options VALUES("21","default_pingback_flag","1","yes");
INSERT INTO el_options VALUES("22","posts_per_page","10","yes");
INSERT INTO el_options VALUES("23","date_format","F j, Y","yes");
INSERT INTO el_options VALUES("24","time_format","g:i a","yes");
INSERT INTO el_options VALUES("25","links_updated_date_format","F j, Y g:i a","yes");
INSERT INTO el_options VALUES("26","comment_moderation","0","yes");
INSERT INTO el_options VALUES("27","moderation_notify","1","yes");
INSERT INTO el_options VALUES("28","permalink_structure","/%year%/%monthnum%/%postname%/","yes");
INSERT INTO el_options VALUES("29","admin-theme","joli","yes");
INSERT INTO el_options VALUES("30","site-theme","elyon","yes");



DROP TABLE el_posts;

CREATE TABLE `el_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `to_ping` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pinged` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT '0',
  `post_tag` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO el_posts VALUES("1","1","2015-11-30 09:22:23","2015-11-30 09:22:23","Welcome to WordPress. This is your first post. Edit or delete it, then start writing!","Hello world!","","publish","open","open","","hello-world","","","2015-11-30 09:22:23","2015-11-30 09:22:23","","0","http://localhost/wordpress/?p=1","0","post","","1","");
INSERT INTO el_posts VALUES("2","1","2015-11-30 09:22:23","2015-11-30 09:22:23","This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:\n\n<blockquote>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin\' caught in the rain.)</blockquote>\n\n...or something like this:\n\n<blockquote>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</blockquote>\n\nAs a new WordPress user, you should go to <a href=\"http://localhost/wordpress/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!","Sample Page","","publish","closed","open","","sample-page","","","2015-11-30 09:22:23","2015-11-30 09:22:23","","0","http://localhost/wordpress/?page_id=2","0","page","","0","");
INSERT INTO el_posts VALUES("3","1","2015-11-30 09:22:47","0000-00-00 00:00:00","","Auto Draft","","auto-draft","open","open","","","","","2015-11-30 09:22:47","0000-00-00 00:00:00","","0","http://localhost/wordpress/?p=3","0","post","","0","");
INSERT INTO el_posts VALUES("4","1","2015-11-30 09:26:14","2015-11-30 09:26:14","","tumblr_nawh41uztl1qb5gkjo1_400","","inherit","open","closed","","tumblr_nawh41uztl1qb5gkjo1_400","","","2015-11-30 09:26:14","2015-11-30 09:26:14","","2","http://localhost/wordpress/wp-content/uploads/2015/11/tumblr_nawh41uztl1qb5gkjo1_400.gif","0","attachment","image/gif","0","");
INSERT INTO el_posts VALUES("5","1","2015-11-30 09:28:16","2015-11-30 09:28:16","This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:\n<blockquote>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like piña coladas. (And gettin\' caught in the rain.)</blockquote>\n...or something like this:\n\n<a href=\"http://localhost/wordpress/wp-content/uploads/2015/11/tumblr_nawh41uztl1qb5gkjo1_400.gif\"><img class=\"alignnone size-medium wp-image-4\" src=\"http://localhost/wordpress/wp-content/uploads/2015/11/tumblr_nawh41uztl1qb5gkjo1_400-300x188.gif\" alt=\"tumblr_nawh41uztl1qb5gkjo1_400\" width=\"300\" height=\"188\" /></a>\n<blockquote>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</blockquote>\nAs a new WordPress user, you should go to <a href=\"http://localhost/wordpress/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!","Sample Page","","inherit","closed","closed","","2-autosave-v1","","","2015-11-30 09:28:16","2015-11-30 09:28:16","","2","http://localhost/wordpress/2015/11/30/2-autosave-v1/","0","revision","","0","");
INSERT INTO el_posts VALUES("6","1","2015-11-30 09:34:58","2015-11-30 09:34:58","","Home","","publish","closed","closed","","home","","","2015-11-30 09:34:58","2015-11-30 09:34:58","","0","http://localhost/wordpress/2015/11/30/home/","1","nav_menu_item","","0","");
INSERT INTO el_posts VALUES("7","1","2015-11-30 09:34:59","2015-11-30 09:34:59"," ","","","publish","closed","closed","","7","","","2015-11-30 09:34:59","2015-11-30 09:34:59","","0","http://localhost/wordpress/2015/11/30/7/","2","nav_menu_item","","0","");
INSERT INTO el_posts VALUES("8","1","2015-11-30 09:34:59","2015-11-30 09:34:59","","LibrATA","","publish","closed","closed","","librata","","","2015-11-30 09:34:59","2015-11-30 09:34:59","","0","http://localhost/wordpress/2015/11/30/librata/","3","nav_menu_item","","0","");
INSERT INTO el_posts VALUES("9","1","2015-11-30 12:26:37","0000-00-00 00:00:00","","Auto Draft","","auto-draft","open","open","","","","","2015-11-30 12:26:37","0000-00-00 00:00:00","","0","http://localhost/wordpress/?p=9","0","post","","0","");
INSERT INTO el_posts VALUES("10","1","2015-11-30 12:26:57","0000-00-00 00:00:00","","Auto Draft","","auto-draft","open","open","","","","","2015-11-30 12:26:57","0000-00-00 00:00:00","","0","http://localhost/wordpress/?p=10","0","post","","0","");
INSERT INTO el_posts VALUES("11","1","2015-11-30 12:29:37","0000-00-00 00:00:00","","Auto Draft","","auto-draft","open","open","","","","","2015-11-30 12:29:37","0000-00-00 00:00:00","","0","http://localhost/wordpress/?p=11","0","post","","0","");
INSERT INTO el_posts VALUES("12","1","2015-11-30 12:32:27","2015-11-30 12:32:27","","Mach Number","","inherit","open","closed","","mach-number","","","2015-11-30 12:32:27","2015-11-30 12:32:27","","0","http://localhost/wordpress/wp-content/uploads/2015/11/Mach-Number.html","0","attachment","text/html","0","");
INSERT INTO el_posts VALUES("13","1","2016-01-15 14:31:48","0000-00-00 00:00:00","<p>rn sdsdsdsdd rn</p>","sdsdsdd","","draft","","","","sdsdsddf","","","2016-01-15 14:31:48","2016-01-15 14:31:48","","0","http://localhost/cms/?p=13","0","","","0","OLa,GABE");



DROP TABLE el_users;

CREATE TABLE `el_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_pass` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_salt_key` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO el_users VALUES("1","bosunski","c6f11e6f66aa6e6862cc08711f3921b44a5c94aaf5c7b90c04ee945ebc7","bosunski","bosunski@gmail.com","","2016-01-15 12:58:30","","/+!]:x7<3>zk?{[/2i8^p_%a:^0190.6^~`9f;3.&[(p~$}.+w","0","bosunski");



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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO lib_admins VALUES("1","Ola","Gabe","bosunski","bosunski@gmail.com","9aca3d0927d9462fe44ecd5c19085565ab2d669db39eb5d1395c95a4dcb2376113042630724b38954efd79da229d3af69435e3fd4c2bb616d3c42e0ad6813bc0","superDUPER","dofb9zyv2s6gephx25phivxn3fp3wyff66120ghnz2gkgqvnbf","");
INSERT INTO lib_admins VALUES("2","Ola","Bolawa","bolawa","b@b.c","708c64adeb950a3b5e10dab75ae2c719f3fcc39001a0d3ddeb39da5c812851bf2854bfc8d8d82a732154ec5c2d1cb8fe9cf6bb10b41de319d4207fd455d00d9a","catalogue","jhkjef5gx4b74w4bf7uiowo1ci7gymxl7vhnprmykn65dhtxtv","");
INSERT INTO lib_admins VALUES("3","OLYOLY","DanDan","bolaaa","bbc@cnn.nta","5eb0bf0063357651aa0c9553404fb6d175eff3af8d937ede5369637ac8f47cca4a28e73ea766a0f9429cb11dc83bfd1c2fba28cf379be906400d8a2b9606523d","circulation","xc5bzdhnt72b4k65003na4hevusiyjgwmy21k295pr9f4t7vv6","borrowsR,booka");
INSERT INTO lib_admins VALUES("4","bosun","biodun","bosssssmi","bos@b.com","504dba9dabec820cb741b0675bd867fbe02b47b29d96a8cb0c3a3dd2a931c2c0c3ebd2ed988f8543acb732128e1d5ea0e7de1ebe1c6ffafaddd74fa8dfe39e71","superDUPER","mofedjrj6c29n60r52uin5x4vn1fhm1ra100nq2ihmlclhclno","");



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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO lib_books VALUES("1","23fgrty","1234567890123","Physics notes","Bosunskik Bosun","FUNAAB","QC132413-45","catalogue","2016-01-18 12:53:06");



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

INSERT INTO lib_lib_config VALUES("Dream Builders Library","14","on","FUNAABITEDB","skin-green","layout-boxed","15","b_o_sun.jpg","10","backs,newAdmin,booka,borrowsR,adminCol,libSettings,newAdmin,addNewUser");



DROP TABLE lib_logged_in_admin;

CREATE TABLE `lib_logged_in_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `admin_id` int(20) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

INSERT INTO lib_logged_in_admin VALUES("27","1","bn9j8id86ap2onp9ch1bpoo564","218757fc44eecacf9a451b298cc9838402baf9bc75245e52673c40dbfab031c823ba24cf068989fd5681f22ed8aa09553ffdf61f29f0ff13e32fc6408f7ace69","2016-01-19 11:30:02");
INSERT INTO lib_logged_in_admin VALUES("24","2","081mn4nukisu9hke5f2hq8oms7","44bf3ec0b75c9cd2049358dffca466ebf8ff076e30333e6ca77f83eeae8112e4ccbf1904c477a1dbbb0511464b2a07b5d41c831b0ef40fbc72bb6414a0eccb8d","2016-01-19 10:36:30");



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




