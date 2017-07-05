<?php
/**
 * The base configurations of the LIBRAta.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, LIBRAta Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.LIBRAta.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package LIBRAta
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for LIBRAta */
define('DB', 'test');

/** MySQL database username */
define('UNAME', 'root');

/** MySQL database password */
define('PASSWORD', 'gabriel10');

/** MySQL hostname */
define('DBHOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('PREFIX', 'brrr_');

define('INSTALL_DIR', 'http://localhost/librarta');
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.LIBRAta.org/secret-key/1.1/salt/ LIBRAta.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'e8e9f0cfaa3178745bda3fbc9ccc23db4d69bcb4143192c8f8');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

/**#@-*/

/**
 * LIBRAta Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'brrr_';

/**
 * For developers: LIBRAta debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the LIBRAta directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up LIBRAta vars and included files. */
//require_once(ABSPATH . 'lib-settings.php');
