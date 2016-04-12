/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE
 * @package Zupolis
 * @subpackage Modules
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Main Zupolis API object.
 * 
 * @param {type} params
 * @class {zupolis.api}
 * @returns {zupolis.__constructor}
 */
zupolis.api = function (params) {

    /**
     * Reference to the core object.
     * 
     * @type {zupolis.game}
     */
    this.core = null;

    /**
     * Module version.
     * 
     * @private
     * @type {String}
     */
    this.version = '0.2.0';

    /**
     * Sign in a visitor using the specified data.
     * 
     * @param {Object} data
     * @returns {zupolis.api@call;request}
     */
    this.login = function (data) {
        return this.request({
            url: 'login',
            data: data
        });
    };

    /**
     * Return the module version.
     * 
     * @public
     * @returns {String}
     */
    this.getVersion = function () {
        return this.version;
    };

    /**
     * Sign out the currently logged in user.
     * 
     * @returns {zupolis.api@call;request}
     */
    this.logout = function () {
        return this.request({
            url: 'logout'
        });
    };

    /**
     * Get information about the application and API version.
     *
     * @returns {zupolis.api@call;request}
     */
    this.apiVersion = function() {
        return this.request({
            url: 'version'
        });
    };

    /**
     * Get information about the currently logged in user's city.
     *
     * @returns {zupolis.api@call;request}
     */
    this.cityInfo = function() {
        return this.request({
            url: 'city'
        });
    };

    /**
     * Perform a heartbeat request and get data about it.
     *
     * @returns {zupolis.api@call;request}
     */
    this.heartbeat = function() {
        return this.request({
            url: 'heartbeat'
        });
    };

    /**
     * Register a visitor using the specified data.
     * 
     * @param {Object} data
     * @returns {zupolis.api@call;request}
     */
    this.register = function (data) {
        return this.request({
            url: 'register',
            data: data
        });
    };

    /**
     * Export the specified data to the API endpoint.
     * 
     * @param {Object} data
     * @returns {zupolis.api@call;request}
     */
    this.doExport = function (data) {
        return this.request({
            url: 'export',
            data: data
        });
    };

    /**
     * Import the specified data from the API endpoint.
     * 
     * @param {Object} data
     * @returns {zupolis.api@call;request}
     */
    this.doImport = function (data) {
        return this.request({
            url: 'import',
            data: data
        });
    };

    /**
     * Internal function for performing an API AJAX request.
     * 
     * @param {Object} data
     * @returns {zupolis.api}
     */
    this._request = function (data) {
        $.ajax({
            type: (typeof data.requestType !== 'undefined') ? data.requestType : 'POST',
            dataType: typeof data.dataType !== 'undefined' ? data.dataType : 'jsonp',
            xhrFields: {
                withCredentials: (typeof data.auth === 'undefined' || data.auth === true) ? true : false
            },
            crossDomain: true,
            data: data.data,
            url: zupolis.API_VERSION_URL + data.url,
            async: (typeof data.async === 'undefined' || data.async == true) ? true : false,
            success: data.success instanceof Function ? data.success : function () {
                // TODO
            },
            error: data.error instanceof Function ? data.error : function () {
                // TODO
            }
        });
        return this;
    };

    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.event}
     * @param {Object} params
     */
    this.__constructor = function (params) {
        this.core = params.core;
        return this;
    };

    // Fire up the constructor
    return this.__constructor(params);
};