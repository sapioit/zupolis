/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE-MIT
 * @package Zupolis
 * @subpackage UI
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Main Zupolis storage panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelCity = function (params) {

    /**
     * Reference to the core object.
     * 
     * @type {zupolis.game}
     */
    this.core = null;

    /**
     * DOM id of this panel.
     * 
     * @type {String}
     * @constant
     */
    this.id = 'city';

    /**
     * Object destructor.
     * 
     * @private
     * @returns {Boolean}
     */
    this.__destructor = function () {
        this.core.consoleLog('destroying panel with id `' + this.id + '`');
        var el = '#panel-' + this.id;
        $(el).remove();
        $('.tipsy').remove();
        return false;
    };

    /**
     * Method for destroying the window/panel.
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
     * @returns {zupolis.panel}
     * @param {Object} params
     */
    this.__constructor = function (params) {
        var self = this;
        this.core = params.core;
        var el = '#panel-' + this.id;
        var city = params.data;
        if (zupolis.ui.panelExists(el)) {
            this.destroy();
        }
        this.core.consoleLog('creating panel with id `' + this.id + '`');
        var trades = city.getTrades();
        $('.ui').append(zupolis.ui.genericPanelTemplate.replace(/{id}/g, this.id).replace(/{title}/g, city.getName()));
        $(el + ' .contents').append(zupolis.ui.tabs([zupolis.l('Info'), zupolis.l('Army'), zupolis.l('Navy'), zupolis.l('Imports'), zupolis.l('Exports')]));
        $(el + ' #tab-info').append('' +
                '<img class="avatar" src="' + zupolis.ASSETS_URL + 'images/avatars/avatar' + city.getAvatar() + '.png" />' +
                '<dl>' +
                '<dt>' + zupolis.l('Ruler') + '</dt><dd>' + city.getRuler() + '</dd>' +
                '<dt>' + zupolis.l('Climate') + '</dt><dd>' + city.getClimate().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Personality') + '</dt><dd>' + city.getPersonality().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Nationality') + '</dt><dd>' + city.getNationality().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Level') + '</dt><dd>' + city.getLevel() + '</dd>' +
                '<dt>' + zupolis.l('Prestige') + '</dt><dd>' + city.getPrestige() + '</dd>' +
                '<dt>' + zupolis.l('Influence') + '</dt><dd>' + this.core.getCity().getInfluenceWithCity(city.getName()) + '</dd>' +
                '</dl>');
        $(el + ' #tab-army').append(zupolis.ui.armyList(city.getArmyTotal()));
        $(el + ' #tab-navy').append(zupolis.ui.navyList(city.getNavyTotal()));
        $(el + ' #tab-imports').append('' +
                '<p>' + zupolis.l('Below are the goods this city will be buying this year.') + '</p>' +
                zupolis.ui.tradesList(trades, 'imports'));
        $(el + ' #tab-exports').append('' +
                '<p>' + zupolis.l('Below are the goods this city will be selling this year.') + '</p>' +
                zupolis.ui.tradesList(trades, 'exports'));
        $(el).on('click', '.close', function () {
            self.destroy();
            return false;
        }).draggable({
            handle: 'header',
            containment: 'window',
            snap: '.panel'
        });
        $(el + ' .tabs').tabs();
        $(el + ' .tips').tipsy({
            gravity: 's'
        });
        return this;
    };

    // Fire up the constructor
    return this.__constructor(params);
};