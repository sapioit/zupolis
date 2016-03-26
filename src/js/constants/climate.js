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
 * List of the possible climate types.
 * 
 * @constant
 * @type {Array}
 */
zupolis.CLIMATE_TYPES = [
    'none',
    'temperate',
    'tropical',
    'arid',
    'continental',
    'polar'
];

/**
 * Temperate climate, all balanced.
 * 
 * @constant
 * @type {Number}
 */
zupolis.CLIMATE_TYPE_TEMPERATE = 1;

/**
 * Tropical climate, favoring farms and exotic goods.
 * 
 * @constant
 * @type {Number}
 */
zupolis.CLIMATE_TYPE_TROPICAL = 2;

/**
 * Arid climate, favoring ore mines.
 * 
 * @constant
 * @type {Number}
 */
zupolis.CLIMATE_TYPE_ARID = 3;

/**
 * Continental climate, no sea access.
 * 
 * @constant
 * @type {Number}
 */
zupolis.CLIMATE_TYPE_CONTINENTAL = 4;

/**
 * Polar climate, very extreme.
 * 
 * @constant
 * @type {Number}
 */
zupolis.CLIMATE_TYPE_POLAR = 5;

/**
 * Worldmap position of city when the climate is temperate.
 * 
 * @constant
 * @type {Object}
 */
zupolis.CITY_LOCATION_TEMPERATE = {
    x: 530,
    y: 300
};

/**
 * Worldmap position of city when the climate is tropical.
 * 
 * @constant
 * @type {Object}
 */
zupolis.CITY_LOCATION_TROPICAL = {
    x: 45,
    y: 400
};

/**
 * Worldmap position of city when the climate is arid.
 * 
 * @constant
 * @type {Object}
 */
zupolis.CITY_LOCATION_ARID = {
    x: 340,
    y: 380
};

/**
 * Worldmap position of city when the climate is continental.
 * 
 * @constant
 * @type {Object}
 */
zupolis.CITY_LOCATION_CONTINENTAL = {
    x: 540,
    y: 300
};

/**
 * Worldmap position of city when the climate is polar.
 * 
 * @constant
 * @type {Object}
 */
zupolis.CITY_LOCATION_POLAR = {
    x: 490,
    y: 30
};
