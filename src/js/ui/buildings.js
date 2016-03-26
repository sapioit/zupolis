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
 * Main Zupolis buildings panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelBuildings = function (params) {

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
    this.id = 'buildings';

    /**
     * Localized title of the panel.
     * 
     * @type {String}
     */
    this.title = zupolis.l('City Buildings');

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
        $('.ui').append(zupolis.ui.genericPanelTemplate.replace(/{id}/g, this.id).replace(/{title}/g, this.title));
        var _t = '<div class="left buildings">';
        var availableBuildings = zupolis['CITY_BUILDINGS_' + city.getClimate().name.toUpperCase()];
        _t += '<div class="tabs">' +
                '<ul>';
        for (var category in zupolis.BUILDINGS_CATEGORIES) {
            _t += '<li><a href="#tab-' + category.toLowerCase() + '">' + category + '</a></li>';
        }
        _t += '</ul>';
        for (var category in zupolis.BUILDINGS_CATEGORIES) {
            _t += '<div id="tab-' + category.toLowerCase() + '" class="bldg-tabs">';
            for (var i = 0; i < zupolis.BUILDINGS_CATEGORIES[category].length; i++) {
                var building = zupolis.BUILDINGS_CATEGORIES[category][i];
                if ($.inArray(building, availableBuildings) !== -1) {
                    var buildingData = zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(building)];
                    var _i = city.isBuildingBuilt(buildingData.handle);
                    _t += '<div data-handle="' + buildingData.handle + '" class="building-item' + ((_i === true) ? ' disabled' : '') + '">' +
                            '<span class="title">' + buildingData.name + '</span>' +
                            '<img class="building" src="' + zupolis.ASSETS_URL + 'images/buildings/' + buildingData.handle + '1.png" />' +
                            '</div>';
                }
            }
            _t += '</div>';
        }
        _t += '</div>' +
                '</div><div class="right">' +
                '<fieldset>' +
                '<legend>' + zupolis.l('Description') + '</legend>' +
                '<div class="b-desc"></div>' +
                '</fieldset>' +
                '<fieldset>' +
                '<legend>' + zupolis.l('Cost') + '</legend>' +
                '<div class="b-cost"></div>' +
                '</fieldset>' +
                '<fieldset class="materials">' +
                '<legend>' + zupolis.l('Materials') + '</legend>' +
                '<div class="b-mats"></div>' +
                '</fieldset>' +
                '<fieldset class="production">' +
                '<legend>' + zupolis.l('Production') + '</legend>' +
                '<div class="b-prod"></div>' +
                '</fieldset>' +
                '<fieldset class="extra">' +
                '<legend>' + zupolis.l('Chance of extra materials') + '</legend>' +
                '<div class="b-chance"></div>' +
                '</fieldset>' +
                '<fieldset class="storage">' +
                '<legend>' + zupolis.l('Storage') + '</legend>' +
                '<div class="b-store"></div>' +
                '</fieldset>' +
                '<fieldset class="taxes">' +
                '<legend>' + zupolis.l('Taxes') + '</legend>' +
                '<div class="b-tax"></div>' +
                '</fieldset>' +
                '<fieldset>' +
                '<legend>' + zupolis.l('Requirements') + '</legend>' +
                '<div class="b-req"></div>' +
                '</fieldset>' +
                '<div class="toolbar"></div>' +
                '</div>';
        $(el).on('click', '.building-item', function () {
            $(el).addClass('expanded');
            $(el + ' .building-item').removeClass('active');
            $(this).addClass('active');
            $(el + ' .b-chance, ' + el + ' .b-tax, ' + el + ' .b-store, ' + el + ' .b-req, ' + el + ' .b-cost, ' + el + ' .b-name, ' + el + ' .b-desc, ' + el + ' .b-mats, ' + el + ' .b-prod, ' + el + ' .toolbar').empty();
            var handle = $(this).data('handle');
            var building = zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(handle)];
            $(el + ' header .title').html(self.title + ' - ' + building.name);
            $(el + ' .b-desc').html(building.description);
            var _z = '<dl class="nomg">';
            for (var y in building.cost) {
                _z += '<dt>' + building.cost[y] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[y].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + y + '_small.png" /></dd>';
            }
            _z += '</dl>';
            $(el + ' .b-cost').append(_z);
            if (typeof building.requires !== 'undefined') {
                _z = '<dl class="nomg">';
                if (typeof building.requires.buildings !== 'undefined') {
                    if (typeof building.requires.buildings === 'object') {
                        for (var i = 0; i < building.requires.buildings.length; i++) {
                            _z += '<dt>' + zupolis.l('Building') + '</dt><dd>' + self.core.getBuildingConfigData(building.requires.buildings[i]).name + '</dd>';
                        }
                    }
                    else {
                        _z += '<dt>' + zupolis.l('Building') + '</dt><dd>' + self.core.getBuildingConfigData(building.requires.buildings).name + '</dd>';
                    }
                }
                _z += '<dt>City level</dt><dd>' + building.requires.cityLevel + '</dd>' +
                        '</dl>';
                $(el + ' .b-req').append(_z);
            }
            if (typeof building.chance !== 'undefined') {
                _z = '<dl class="nomg">';
                for (var chance in building.chance) {
                    _z += '<dt>' + building.chance[chance] * 100 + '%</dt><dd><img class="tips" title="' + zupolis.RESOURCES[chance].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + chance + '_small.png" /></dd>';
                }
                _z += '</dl>';
                $(el + ' .b-chance').append(_z);
                $('fieldset.extra').show();
            }
            else {
                $('fieldset.extra').hide();
            }
            if (building.isProduction === true) {
                $('fieldset.taxes, fieldset.production, fieldset.materials, fieldset.storage').hide();
                if (typeof building.production !== 'undefined') {
                    _z = '<dl class="nomg">';
                    for (var y in building.production) {
                        _z += '<dt>' + building.production[y] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[y].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + y + '_small.png" /></dd>';
                    }
                    _z += '</dl>';
                    $(el + ' .b-prod').append(_z);
                    $('fieldset.production').show();
                }
                if (typeof building.materials !== 'undefined') {
                    _z = '<dl class="nomg">';
                    for (var y in building.materials) {
                        _z += '<dt>' + building.materials[y] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[y].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + y + '_small.png" /></dd>';
                    }
                    _z += '</dl>';
                    $(el + ' .b-mats').append(_z);
                    $('fieldset.materials').show();
                }
            }
            else if (building.isHousing === true) {
                $('fieldset.production, fieldset.storage').hide();
                if (typeof building.materials !== 'undefined') {
                    _z = '<dl class="nomg">';
                    for (var y in building.materials) {
                        _z += '<dt>' + building.materials[y] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[y].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + y + '_small.png" /></dd>';
                    }
                    _z += '</dl>';
                    $(el + ' .b-mats').append(_z);
                    $('fieldset.materials').show();
                }

                if (typeof building.tax !== 'undefined') {
                    _z = '<dl class="nomg">' +
                            '<dt>Tax</dt>' +
                            '<dd>' + building.tax + '<img class="tips" title="' + zupolis.l('Coins') + '" src="' + zupolis.ASSETS_URL + 'images/resources/coins_small.png" /></dd>' +
                            '</dl>';
                    $(el + ' .b-tax').append(_z);
                    $('fieldset.taxes').show();
                }
            }
            else if (typeof building.storage !== 'undefined') {
                $('fieldset.taxes, fieldset.production, fieldset.materials').hide();
                _z = '<dl class="nomg">' +
                        '<dt>' + building.storage + '</dt><dd><img src="' + zupolis.ASSETS_URL + 'images/resources/storage_small.png" /></dd>' +
                        '</dl>';
                $(el + ' .b-store').append(_z);
                $('fieldset.storage').show();
            }
            else {
                $('fieldset.taxes, fieldset.production, fieldset.materials, fieldset.storage').hide();
            }
            var _i = city.isBuildingBuilt(building.handle);
            if (_i !== true) {
                $(el + ' .toolbar').append('<a href="#" class="btn build" data-handle="' + building.handle + '">' + zupolis.l('Build') + '</a>');
            }
            else {
                $(el + ' .toolbar').append(zupolis.l('You already constructed this building.'));
            }
            $(el + ' .tips').tipsy({
                gravity: 's'
            });
            $(el + ' .right').show();
            return false;
        });
        $(el + ' .contents').append(_t);
        $(el).on('click', '.btn.build', function () {
            var handle = $(this).data('handle');
            if (city.build(handle) !== false) {
                $(el + ' .building-item[data-handle=' + handle + ']').addClass('disabled');
                $(el + ' .toolbar').empty().append(zupolis.l('You already have this building.'));
            }
            return false;
        }).on('click', '.close', function () {
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