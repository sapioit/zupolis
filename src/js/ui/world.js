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
 * Main Zupolis world panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelWorld = function (params) {

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
    this.id = 'world';

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
        if (zupolis.ui.panelExists(el)) {
            this.destroy();
        }
        this.core.consoleLog('creating panel with id `' + this.id + '`');
        var city = this.core.getCity();
        $('.ui').append(zupolis.ui.worldmapPanelTemplate.replace(/{id}/g, this.id));
        var loc = zupolis['CITY_LOCATION_' + city.getClimate().name.toUpperCase()];
        var out = '<div data-name="yourcity" class="tips city your" title="' + zupolis.l('City of') + ' ' + city.getName() + '" style="left:' + loc.x + 'px;top:' + loc.y + 'px"></div>';
        for (var item in zupolis.CITIES) {
            out += zupolis.ui.cityWorldmapElement(item);
        }
        $(el + ' .contents .worldmap').empty().append(out);
        $(el).on('click', '.close', function () {
            self.destroy();
            return false;
        }).draggable({
            handle: 'header',
            containment: 'window',
            snap: '.panel'
        }).on('click', '.city', function () {
            var cityName = $(this).data('name');
            if (cityName === 'yourcity') {
                new zupolis.panelAdvisor({
                    core: self.core
                });
            }
            else {
                var _city = self.core.getCity(cityName);
                new zupolis.panelCity({
                    core: self.core,
                    data: _city
                });
            }
            return false;
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