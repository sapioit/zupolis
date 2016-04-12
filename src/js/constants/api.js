'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Zupolis API version to connect to.
 *
 * @constant
 * @type {String}
 */
zupolis.API_VERSION = '0.2.0';

/**
 * URL of the main Zupolis API entry point.
 * 
 * @constant
 * @type {String}
 */
zupolis.API_ENTRY_POINT = 'https://zupolis.vox.space/api/';

/**
 * Main Zupolis API entry point + the API version
 *
 * @constant
 * @type {String}
 */
zupolis.API_VERSION_URL = zupolis.API_ENTRY_POINT + zupolis.API_VERSION + '/';
