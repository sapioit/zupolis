/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE-MIT
 * @package Zupolis
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * List of the possible nation types.
 * 
 * @constant
 * @type {Array}
 */
zupolis.NATION_TYPES = [
    'none',
    'phoenician',
    'carthaginian',
    'greek',
    'egyptian',
    'assyrian',
    'roman',
    'thracian',
    'sudanese',
    'spanish',
    'sumerian',
    'chinese',
    'indian',
    'franks',
    'russian'
];

/**
 * Phoenicians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_PHOENICIAN = 1;

/**
 * Carthaginans
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_CARTHAGINIAN = 2;

/**
 * Greeks
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_GREEK = 3;

/**
 * Egyptians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_EGYPTIAN = 4;

/**
 * Assyrians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_ASSYRIAN = 5;

/**
 * Romans
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_ROMAN = 6;

/**
 * Thracians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_THRACIAN = 7;

/**
 * Sudanese
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_SUDANESE = 8;

/**
 * Spanish
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_SPANISH = 9;

/**
 * Sumerians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_SUMERIAN = 10;

/**
 * Chinese
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_CHINESE = 11;

/**
 * Indian
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_INDIAN = 12;

/**
 * Franks
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_FRANKS = 13;

/**
 * Russians
 * 
 * @constant
 * @type {Number}
 */
zupolis.NATION_TYPE_RUSSIAN = 14;