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
 * Zupolis jailer (enforcing security) object.
 * 
 * @param {type} params
 * @class {zupolis.jailer}
 * @returns {zupolis.__constructor}
 */
zupolis.jailer = function (params) {

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
     * Perform an actual security audit.
     * 
     * @public
     * @returns {Boolean}
     */
    this.check = function () {
        return true;
    };

    // Fire up the constructor
    return this.__constructor(params);
};