'use strict';

/**
 * Initialization of the main object
 * 
 * @type {Object}
 */
var zupolis = {};

/**
 * i8n function.
 * 
 * @param {String} value
 * @returns {String}
 */
zupolis.l = function (value) {
    if (typeof zupolis.lang[value] !== 'undefined' && zupolis.lang[value] !== '') {
        return zupolis.lang[value];
    }
    else {
        return value;
    }
};

/**
 * Autostart music or not.
 * 
 * @constant
 * @type {Boolean}
 */
zupolis.AUTOSTART_MUSIC = false;

/**
 * Max level a city can have.
 * 
 * @constant
 * @type {Number}
 */
zupolis.MAX_CITY_LEVEL = 30;

/**
 * URL to the game assets
 * 
 * @constant
 * @type {String}
 */
zupolis.ASSETS_URL = 'assets/';

/**
 * Amount of influence your city loses each year.
 * 
 * @constant
 * @type {Number}
 */
zupolis.YEARLY_INFLUENCE_LOSS = 10;

/**
 * Number of city ruler avatars available to choose.
 * 
 * @constant
 * @type {Number}
 */
zupolis.AVATARS = 36;

zupolis.TRADES_ADDITION = 10;

zupolis.TRADES_DISCOUNT = 20;

/**
 * The black market discount.
 * 
 * @constant
 * @type {Number}
 */
zupolis.BLACK_MARKET_DISCOUNT = 80;

/**
 * The resources that will be shown on the toolbar.
 * 
 * @constant
 * @type {Array}
 */
zupolis.TOOLBAR_RESOURCES = [
    'coins',
    'wood',
    'stones',
    'wheat',
    'flour',
    'bread',
    'cattle',
    'meat',
    'iron',
    'weapons'
];

/**
 * Fame required for each city level.
 * 
 * @constant
 * @type {Array}
 */
zupolis.LEVELS = [
    0, 100, 500, 1000, 2000,
    3500, 5000, 7000, 10000, 13000,
    16000, 20000, 25000, 29000, 35000,
    40000, 45000, 50000, 60000, 70000,
    80000, 90000, 100000, 120000, 150000,
    180000, 200000, 240000, 280000, 350000,
    400000, 450000, 500000, 550000, 600000,
    650000, 750000, 850000, 900000, 1000000,
    1200000, 1400000, 1600000, 1800000, 2000000,
    2200000, 2400000, 2600000, 2800000, 3000000
];

/**
 * Application version.
 * 
 * @constant
 * @type {String}
 */
zupolis.VERSION = '0.2.0';

/**
 * Whether the application is in debug mode.
 * 
 * @default false
 * @constant
 * @type {Boolean}
 */
zupolis.DEBUG = true;
