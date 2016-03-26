/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE-MIT
 * @package Zupolis
 * @subpackage Core
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Main Zupolis soldier object.
 * 
 * @param {type} params
 * @class {zupolis.soldier}
 * @returns {zupolis.__constructor}
 */
zupolis.soldier = function (params) {

    /**
     * Pointer to the city this sodier is located in.
     * 
     * @type {zupolis.city}
     * @private
     */
    this.city = null;

    /**
     * Attack rating of this soldier.
     * 
     * @type {Number}
     * @private
     */
    this.attack = 0;

    /**
     * Defense rating of this soldier.
     * 
     * @type {Number}
     * @private
     */
    this.defense = 0;

    /**
     * Requirements of this soldier.
     * 
     * @type {Object}
     * @private
     */
    this.cost = null;

    /**
     * Get the name of this soldier.
     * 
     * @type {String}
     * @private
     */
    this.name = null;

    /**
     * Object destructor
     * 
     * @private
     * @returns {Boolean}
     */
    this.__destructor = function () {
        return false;
    };

    /**
     * Method for destroying(disbanding) the soldier.
     * 
     * @public
     * @returns {Boolean}
     */
    this.destroy = function () {
        return this.__destructor();
    };

    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.soldier}
     * @param {Object} params
     */
    this.__constructor = function (params) {
        this.city = params.city;
        this.name = params.name;
        this.attack = params.data.attack;
        this.defense = params.data.defense;
        this.cost = params.data.cost;
        return this;
    };

    /**
     * Get the attack rating of this soldier.
     * 
     * @public
     * @returns {Number}
     */
    this.getAttack = function () {
        return this.attack;
    };

    /**
     * Get the defense rating of this soldier.
     * 
     * @public
     * @returns {Number}
     */
    this.getDefense = function () {
        return this.defense;
    };

    /**
     * Get the recruitment costs of this soldier.
     * 
     * @returns {Object}
     * @public
     */
    this.getCost = function () {
        return this.cost;
    };

    /**
     * Get the city this soldier is located into.
     * 
     * @public
     * @returns {zupolis.city}
     */
    this.getCity = function () {
        return this.city;
    };

    /**
     * Get the name of this soldier.
     * 
     * @public
     * @returns {String}
     */
    this.getName = function () {
        return this.name;
    };

    /**
     * Get a pointer to the game core.
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.getCore = function () {
        return this.getCity().getCore();
    };

    // Fire up the constructor
    return this.__constructor(params);
};