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
 * Main Zupolis trades panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelTrades = function (params) {

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
    this.id = 'trades';

    /**
     * Localized title of the panel.
     * 
     * @type {String}
     */
    this.title = zupolis.l('World Market Trades');

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
        var el = '#panel-' + this.id;
        var self = this;
        if (zupolis.ui.panelExists(el)) {
            this.destroy();
        }
        this.core.consoleLog('creating panel with id `' + this.id + '`');
        var city = this.core.getCity();
        var _t = '';
        $('.ui').append(zupolis.ui.genericPanelTemplate.replace(/{id}/g, this.id).replace(/{title}/g, this.title));
        _t += zupolis.ui.tabs([zupolis.l('Imports'), zupolis.l('Exports'), zupolis.l('Mercenaries'), zupolis.l('BlackMarket')]);
        $(el + ' .contents').append(_t);
        $(el + ' #tab-imports').append('<p>' + zupolis.l('Below is a list of goods that the other cities in the world are looking to buy. The goods replenish yearly, so plan accordingly.') + '</p><div class="contents"></div>');
        $(el + ' #tab-exports').append('<p>' + zupolis.l('Below is a list of goods that the other cities in the world are looking to sell. The goods replenish yearly, so plan accordingly.') + '</p><div class="contents"></div>');
        $(el + ' #tab-mercenaries').append('<p>' + zupolis.l('Below is a list of mercenary armies that are looking for hire. Mercenaries are available only for raiding and conquest missions, they do not join your city so they will not participate in defense.') + '</p><div class="contents"></div>');
        $(el + ' #tab-blackmarket').append('<p>' + zupolis.l('The Black Market is a way to dump your excess materials when you`re in need of emptying your warehouses, but expect a steep price drop (you get ') + (100 - zupolis.BLACK_MARKET_DISCOUNT) + zupolis.l('% of the actual price). The goods will be taken immediately from your warehouses but you will receive the coins next month. Also, you get no prestige from Black Market trades.') + '</p><div class="contents"></div>');
        this._refreshImports();
        this._refreshExports();
        this._refreshMercenaries();
        this._buildBlackMarket();
        $(el).on('click', '.buy:not(.disabled)', function () {
            var handle = $(this).data('city');
            var resource = $(this).data('resource');
            if (city.buyFromCity(handle, resource) !== false) {
                self._refreshExports();
            }
            $('.tipsy').remove();
            return false;
        }).on('click', '.sell:not(.disabled)', function () {
            var handle = $(this).data('city');
            var resource = $(this).data('resource');
            if (city.sellToCity(handle, resource) !== false) {
                self._refreshImports();
            }
            $('.tipsy').remove();
            return false;
        }).on('click', '.bmarket', function () {
            var resource = $('.bm-materials').val();
            var amount = $('.bm-quantity').val();
            if (resource !== '0') {
                city.listBlackMarket(resource, amount);
                self._refreshBlackMarket();
                $('.bm-quantity').val('');
            }
            $('.tipsy').remove();
            return false;
        }).on('click', '.recruit:not(.disabled)', function () {
            var handle = $(this).data('handle');
            if (city.recruitMercenaryArmy(handle) !== false) {
                self._refreshMercenaries();
            }
            $('.tipsy').remove();
            return false;
        }).on('click', '.view-army:not(.disabled)', function () {
            var army = $(this).data('id');
            var armyData = zupolis.MERCENARIES[army];
            new zupolis.panelArmy({
                core: self.core,
                data: armyData
            });
            $('.tipsy').remove();
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

    /**
     * Internal function for building the Black Market panel.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._buildBlackMarket = function () {
        var cities = this.core.getCities();
        var out = '<table class="normal">';
        out += '<thead>' +
                '<tr>' +
                '<td><select class="bm-materials"></select></td>' +
                '<td><input type="text" class="bm-quantity" /></td>' +
                '<td><a title="' + zupolis.l('List goods on Black Market') + '" class="tips bmarket" href="#">' + zupolis.l('list') + '</a></td>' +
                '</tr>' +
                '</thead>';
        out += '<tbody>' +
                '</tbody>' +
                '</table>';
        $('#tab-blackmarket > .contents').empty().append(out);
        this._refreshBMMaterials();
        this._refreshBlackMarket();
        return this;
    };

    /**
     * Internal function for refreshing the Black Market panel.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._refreshBlackMarket = function () {
        var out = '';
        var bm = this.core.getBlackMarket();
        for (var item in bm) {
            out += '<tr>' +
                    '<td>' + zupolis.l('Amount') + ': ' + bm[item].amount + zupolis.ui.resourceSmallImg(item) + '</td>' +
                    '<td>' + zupolis.l('Total price') + ': ' + bm[item].price + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                    '<td>&nbsp;</td>' +
                    '</tr>';
        }
        $('#tab-blackmarket > .contents > table > tbody').empty().append(out);
        return this;
    };

    /**
     * Internal function for refreshing the Black Market resources dropbox.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._refreshBMMaterials = function () {
        var out = '<option value="0">-- ' + zupolis.l('select') + ' --</option>';
        var city = this.core.getCity();
        var resources = city.getResources();
        for (var item in resources) {
            if (item !== 'fame' && item !== 'coins') {
                out += '<option value="' + item + '"> ' + zupolis.RESOURCES[item].name + '</option>';
            }
        }
        $('.bm-materials').empty().append(out);
        return this;
    };

    /**
     * Internal function for refreshing the Imports panel.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._refreshImports = function () {
        var cities = this.core.getCities();
        var out = '<table class="normal">';
        for (var z = 0; z < cities.length; z++) {
            var trades = cities[z].getTrades();
            if (trades !== null) {
                var imports = trades.imports;
                for (var item in imports) {
                    var discount = (zupolis.RESOURCES[item].price * zupolis.TRADES_DISCOUNT) / 100;
                    out += '<tr>' +
                            '<td>' + cities[z].getName() + '</td>' +
                            '<td>' + zupolis.ui.resourceSmallImg(item) + '</td>' +
                            '<td>' + imports[item] + '</td>' +
                            '<td>' + Math.round(zupolis.RESOURCES[item].price - discount) + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                            '<td>' + Math.round((zupolis.RESOURCES[item].price - discount) * imports[item]) + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                            '<td><a title="' + zupolis.l('Sell those goods') + '" data-resource="' + item + '" data-city="' + cities[z].getName() + '" class="tips sell' + (imports[item] === 0 ? ' disabled' : '') + '" href="#">' + zupolis.l('sell') + '</a></td>' +
                            '</tr>';
                }
            }
        }
        out += '</table>';
        $('#tab-imports > .contents').empty().append(out);
        return this;
    };

    /**
     * Internal function for refreshing the Mercenaries panel.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._refreshMercenaries = function () {
        var out = '<table class="mercenaries">';
        for (var i = 0; i < zupolis.MERCENARIES.length; i++) {
            out += '<tr>' +
                    '<td class="icon"><img src="' + zupolis.ASSETS_URL + 'images/armies/' + zupolis.MERCENARIES[i].icon + '.png" /></td>' +
                    '<td><p class="title">' + zupolis.MERCENARIES[i].name + '</p><p class="description">' + zupolis.MERCENARIES[i].description + '</p></td>' +
                    '<td>' + zupolis.MERCENARIES[i].cost + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                    '<td><a title="' + zupolis.l('View info on this mercenary army') + '" data-id="' + i + '" class="tips view-army" href="#">view</a> ' +
                    zupolis.ui.panelBtn('recruit', zupolis.l('Recruit this mercenary army'), zupolis.MERCENARIES[i].handle, 'recruit', this.core.getCity().isMercenaryRecruited(zupolis.MERCENARIES[i].handle)) +
                    '</tr>';
        }
        out += '</table>';
        $('#tab-mercenaries > .contents').empty().append(out);
        return this;
    };

    /**
     * Internal function for refreshing the Exports panel.
     * 
     * @returns {zupolis.panelTrades}
     * @private
     */
    this._refreshExports = function () {
        var cities = this.core.getCities();
        var out = '<table class="normal">';
        for (var z = 0; z < cities.length; z++) {
            var trades = cities[z].getTrades();
            if (trades !== null) {
                var exports = trades.exports;
                for (var item in exports) {
                    var discount = (zupolis.RESOURCES[item].price * zupolis.TRADES_ADDITION) / 100;
                    out += '<tr>' +
                            '<td>' + cities[z].getName() + '</td>' +
                            '<td>' + zupolis.ui.resourceSmallImg(item) + '</td>' +
                            '<td>' + exports[item] + '</td>' +
                            '<td>' + Math.round(zupolis.RESOURCES[item].price + discount) + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                            '<td>' + Math.round((zupolis.RESOURCES[item].price + discount) * exports[item]) + zupolis.ui.resourceSmallImg('coins') + '</td>' +
                            '<td><a title="' + zupolis.l('Buy those goods') + '" data-resource="' + item + '" data-city="' + cities[z].getName() + '" class="tips buy' + (exports[item] === 0 ? ' disabled' : '') + '" href="#">' + zupolis.l('buy') + '</a></td>' +
                            '</tr>';
                }
            }
        }
        out += '</table>';
        $('#tab-exports > .contents').empty().append(out);
        return this;
    };

    // Fire up the constructor
    return this.__constructor(params);
};