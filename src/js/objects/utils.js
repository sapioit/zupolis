/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE-MIT
 * @package Zupolis
 * @subpackage Utils
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Utils object.
 */
zupolis.utils = {
    
    /**
     * Calculate the resource price for the specified amount minus the discount.
     * 
     * @param {Number} amount
     * @param {String} resource
     * @param {Number} discount
     * @returns {Number}
     * @public
     */
    calcPriceMinusDiscount: function (amount, resource, discount) {
        return Math.round(amount * (zupolis.RESOURCES[resource].price - discount));
    },
    
    /**
     * Calculate the resource price for the specified amount plus the discount.
     * 
     * @param {Number} amount
     * @param {String} resource
     * @param {Number} discount
     * @returns {Number}
     * @public
     */
    calcPricePlusDiscount: function (amount, resource, discount) {
        return Math.round(amount * (zupolis.RESOURCES[resource].price + discount));
    },
    
    /**
     * Format the current time.
     * 
     * @returns {String}
     * @public
     */
    getNow: function () {
        var today = new Date();
        var hh = today.getHours();
        var mm = today.getMinutes();
        var ss = today.getSeconds();
        return hh + ':' + mm + ':' + ss;
    }
};