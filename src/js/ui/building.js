/**
 * Zupolis HTML5 game
 * vox.SPACE
 *
 * @author Marius Stanciu - Sergiu <marius@vox.space>
 * @license https://vox.space/LICENSE
 * @package Zupolis
 * @subpackage UI
 * @url https://vox.space
 * @version 0.2.0
 */

'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Main Zupolis building panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelBuilding = function (params) {

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
    this.id = 'building';

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
        var _c = this.core.getCity().getBuildingByHandle(params.data.handle);
        $('.ui').append(zupolis.ui.buildingPanelTemplate.replace(/{id}/g, this.id));
        $(el + ' header .title').html(params.data.name);
        var _t = '<p class="smalldesc">' + params.data.description + '</p>' +
                '<dl>' +
                zupolis.ui.costPanel(params.data.cost) +
                zupolis.ui.materialsPanel(params.data.materials) +
                zupolis.ui.productionPanel(params.data.production) +
                zupolis.ui.requiresPanel(params.data.requires) +
                zupolis.ui.taxPanel(params.data.tax) +
                zupolis.ui.storagePanel(params.data.storage) +
                '</dl>';
        $(el + ' .contents').append(_t);
        if (_c.isMarketplace()) {
            $(el + ' header .demolish').remove();
        }
        else {
            $(el).on('click', '.demolish', function () {
                self.destroy();
                return false;
            });
        }
        if (_c.isProductionBuilding()) {
            if (_c.isProducing()) {
                $(el + ' .pause').removeClass('start');
            }
            else {
                $(el + ' .start').removeClass('pause');
            }
            $(el).on('click', '.pause', function () {
                _c.stopProduction();
                $(this).removeClass('pause').addClass('start');
                return false;
            }).on('click', '.start', function () {
                $(this).removeClass('start').addClass('pause');
                _c.startProduction();
                return false;
            });
        }
        else {
            $(el + ' .start, ' + el + ' .pause').remove();
        }
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