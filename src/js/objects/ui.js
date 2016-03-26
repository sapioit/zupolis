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
 * Main Zupolis UI interface.
 */
zupolis.ui = {
    
    buildingPanelTemplate: '<div id="panel-{id}" class="panel pb black">' +
            '<header>' +
            '<span class="title"></span>' +
            '<a class="tips close btn" title="' + zupolis.l('Close this panel') + '"></a>' +
            '<a class="tips demolish btn" title="' + zupolis.l('Demolish this building') + '"></a>' +
            '<a class="tips pause start btn" title="' + zupolis.l('Control (start/pause) production') + '"></a>' +
            '</header>' +
            '<div class="contents"></div>' +
            '<foooter></footer>' +
            '</div>',
    
    worldmapPanelTemplate: '<div id="panel-{id}" class="panel">' +
            '<header>' +
            '<span class="title">' + zupolis.l('World Map') + '</span>' +
            '<a class="tips btn close" title="' + zupolis.l('Close this panel') + '"></a>' +
            '</header>' +
            '<div class="contents"><div class="worldmap"></div></div>' +
            '</div>',
    
    genericPanelTemplate: '<div id="panel-{id}" class="panel">' +
            '<header>' +
            '<span class="title">{title}</span>' +
            '<a class="tips btn close" title="' + zupolis.l('Close this panel') + '"></a>' +
            '</header>' +
            '<div class="contents"></div>' +
            '</div>',
    
    normalPanel: function (section, contents) {
        var out = '<fieldset>' +
                '<legend>' + section + '</legend>' +
                contents +
                '</fieldset>';
        return out;
    },
    
    costPanel: function (costs) {
        var out = '';
        if (typeof costs !== 'undefined') {
            out += '<dt>Cost</dt>';
            for (var item in costs) {
                out += '<dd>' + costs[item] + zupolis.ui.resourceSmallImg(item) + '</dd>';
            }
        }
        return out;
    },
    
    cityWorldmapElement: function (name) {
        return '<div data-name="' + name + '" class="tips city" title="' + zupolis.l('City of') + ' ' + name + '" style="left:' + zupolis.CITIES[name].location.x + 'px;top:' + zupolis.CITIES[name].location.y + 'px"></div>';
    },
    
    armyImg: function (name) {
        return '<img class="tips" title="' + name + '" src="' + zupolis.ASSETS_URL + 'images/armies/' + name.toLowerCase() + '_small.png" />';
    },
    
    armyList: function (army, noMargin) {
        var out = '<dl' + ((typeof noMargin !== 'undefined' && noMargin === true) ? ' class="nomg"' : '') + '>';
        var total = 0;
        for (var soldier in army.army) {
            out += '<dt>' + army.army[soldier] + '</dt>' +
                    '<dd>' + zupolis.ui.armyImg(soldier) + '</dd>';
            total += army.army[soldier];
        }
        out += '<dt>' + zupolis.l('Total') + '</dt><dd>' + (typeof army.total !== 'undefined' ? army.total : total) + ' ' + zupolis.l('soldiers') + '.</dd>' +
                '</dl>';
        return out;
    },
    
    /**
     * Check if a panel exists and is opened.
     * 
     * @param {String} id
     * @public
     * @returns {Boolean}
     */
    panelExists: function (id) {
        if ($(id).length == 0) {
            return false;
        }
        return true;
    },
    
    panelBtn: function (text, title, handle, className, disabled) {
        return '<a title="' + title + '" data-handle="' + handle + '" class="tips ' + className + (disabled === true ? ' disabled' : '') + '" href="#">' + text + '</a></td>';
    },
    
    tradesList: function (trades, mode) {
        mode = (typeof mode === 'undefined' || mode === 'imports') ? 'imports' : 'exports';
        var out = '';
        if (trades !== null) {
            out += '<dl>';
            var trade = trades[mode];
            for (var item in trade) {
                out += '<dt>' + trade[item] + '</dt>' +
                        '<dd>' + zupolis.ui.resourceSmallImg(item) + '</dd>';
            }
            out += '</dl>';
        }
        return out;
    },
    
    navyList: function (army, noMargin) {
        var out = '<dl' + ((typeof noMargin !== 'undefined' && noMargin === true) ? ' class="nomg"' : '') + '>';
        for (var soldier in army.navy) {
            out += '<dt>' + army.navy[soldier] + '</dt>' +
                    '<dd>' + zupolis.ui.armyImg(soldier) + '</dd>';
        }
        out += '<dt>' + zupolis.l('Total') + '</dt><dd>' + army.total + ' ' + zupolis.l('ships') + '.</dd>' +
                '</dl>';
        return out;
    },
    
    buildingElement: function (params) {
        var description = '<br /><span class="smalldesc">' + params.data.description + '</span>';
        var image = (typeof params.data.visibleUpgrades === 'undefined' || params.data.visibleUpgrades === false) ? params.type + '1' : params.type + params.data.level;
        return '<div data-type="' + params.type + '" data-level="' + params.data.level + '" ' +
                'style="background:transparent url(' + zupolis.ASSETS_URL + 'images/buildings/' + image + '.png) no-repeat;left:' + params.data.position.x + 'px;top:' + params.data.position.y + 'px" ' +
                'title=\'<span class="buildinginfo">' + params.data.name + '</span> ' + description + '\' ' +
                'id="building-' + params.data.handle + '"' +
                'class="tips slots building"></div>';
    },
    
    resourceStorageEl: function (resource, amount) {
        return '<div class="storage-item item-' + resource + '">' +
                '<span class="title">' + zupolis.RESOURCES[resource].name + '</span>' +
                '<img src="' + zupolis.ASSETS_URL + 'images/resources/' + resource + '.png" />' +
                '<span class="amount">' + amount + '</amount>' +
                '</div>';
    },
    
    tabs: function (data) {
        var out = '<div class="tabs">' +
                '<ul>';
        for (var i = 0; i < data.length; i++) {
            out += '<li><a href="#tab-' + data[i].toLowerCase() + '">' + data[i] + '</a></li>';
        }
        out += '</ul>';
        for (var i = 0; i < data.length; i++) {
            out += '<div id="tab-' + data[i].toLowerCase() + '">' +
                    '</div>';
        }
        out += '</div>';
        return out;
    },
    
    materialsPanel: function (materials) {
        var out = '';
        if (typeof materials !== 'undefined') {
            out += '<dt>' + zupolis.l('Uses') + '</dt>';
            for (var item in materials) {
                out += '<dd>' + materials[item] + zupolis.ui.resourceSmallImg(item) + '</dd>';
            }
        }
        return out;
    },
    
    productionPanel: function (materials) {
        var out = '';
        if (typeof materials !== 'undefined') {
            out += '<dt>' + zupolis.l('Produces') + '</dt>';
            for (var item in materials) {
                out += '<dd>' + materials[item] + zupolis.ui.resourceSmallImg(item) + '</dd>';
            }
        }
        return out;
    },
    
    requiresPanel: function (requires) {
        var out = '';
        if (typeof requires.buildings !== 'undefined') {
            out += '<dt>' + zupolis.l('Requires') + '</dt>';
            var b = zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(requires.buildings)];
            out += '<dd>' + b.name + '</span>';
        }
        return out;
    },
    
    taxPanel: function (tax) {
        var out = '';
        if (typeof tax !== 'undefined') {
            out += '<dt>' + zupolis.l('Tax') + '</dt>';
            out += '<dd>' + tax + zupolis.ui.resourceSmallImg('coins') + '</dd>';
        }
        return out;
    },
    
    storagePanel: function (storage) {
        var out = '';
        if (typeof storage !== 'undefined') {
            out += '<dt>' + zupolis.l('Storage') + '</dt>';
            out += '<dd>' + storage + '<img alt="Storage space" class="tips" title="' + zupolis.l('Storage Space') + '" src="' + zupolis.ASSETS_URL + 'images/resources/storage_small.png" /></dd>';
        }
        return out;
    },
    
    resourceSmallImg: function (resource) {
        return '<img alt="' + zupolis.RESOURCES[resource].name + '" class="tips" title="' + zupolis.RESOURCES[resource].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + resource + '_small.png" />';
    }
};