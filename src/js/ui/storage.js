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
zupolis.panelStorage = function (params) {
    
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
    this.id = 'storage';

    /**
     * Localized title of the panel.
     * 
     * @type {String}
     */
    this.title = zupolis.l('City Storage');

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
        this.core = params.core;
        var self = this;
        var el = '#panel-' + this.id;
        if (zupolis.ui.panelExists(el)) {
            this.destroy();
        }
        this.core.consoleLog('creating panel with id `' + this.id + '`');
        var city = this.core.getCity();
        var resources = city.getResources();
        var storageSpace = city.getStorageSpace();
        $('.ui').append(zupolis.ui.genericPanelTemplate.replace(/{id}/g, this.id).replace(/{title}/g, this.title));
        var out = '';
        for (var resource in zupolis.RESOURCES) {
            if (resource !== 'fame') {
                out += zupolis.ui.resourceStorageEl(resource, resources[resource].storage);
            }
        }
        out += '<div class="clearfix"></div>' +
                '<p>' + zupolis.l('Total storage space') + ': ' + storageSpace.all + '</p>' +
                '<p>' + zupolis.l('Total used space') + ': <span class="citystorage">' + storageSpace.occupied + '</span></p>';
        $(el + ' .contents').empty().append(out);
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