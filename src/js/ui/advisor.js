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
 * Main Zupolis city advisor panel object.
 * 
 * @param {type} params
 * @class {zupolis.panel}
 * @returns {zupolis.__constructor}
 */
zupolis.panelAdvisor = function (params) {

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
    this.id = 'advisor';

    /**
     * Localized title of the panel.
     * 
     * @type {String}
     */
    this.title = zupolis.l('Your City Advisor');

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
        $('.ui').append(zupolis.ui.genericPanelTemplate.replace(/{id}/g, this.id).replace(/{title}/g, this.title));
        var _t = '<div class="tabs">' +
                '<ul>' +
                '<li><a href="#tab-info">' + zupolis.l('Info') + '</a></li>' +
                '<li><a href="#tab-production">' + zupolis.l('Production') + '</a></li>' +
                '<li><a href="#tab-army">' + zupolis.l('Army') + '</a></li>' +
                '<li><a href="#tab-navy">' + zupolis.l('Navy') + '</a></li>' +
                '<li><a href="#tab-mercenary">' + zupolis.l('Mercenaries') + '</a></li>' +
                '<li><a href="#tab-diplomacy">' + zupolis.l('Diplomacy') + '</a></li>' +
                '</ul>' +
                '<div id="tab-info">' +
                '<img class="avatar" src="' + zupolis.ASSETS_URL + 'images/avatars/avatar' + city.getAvatar() + '.png" />' +
                '<dl>' +
                '<dt>' + zupolis.l('Current date') + '</dt><dd class="citydate">' + this.core.getDate() + '</dd>' +
                '<dt>' + zupolis.l('Ruler') + '</dt><dd>' + city.getRuler() + '</dd>' +
                '<dt>' + zupolis.l('Climate') + '</dt><dd>' + city.getClimate().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Personality') + '</dt><dd>' + city.getPersonality().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Nationality') + '</dt><dd>' + city.getNationality().name.capitalize() + '</dd>' +
                '<dt>' + zupolis.l('Level') + '</dt><dd class="citylevel">' + city.getLevel() + '</dd>' +
                '<dt>' + zupolis.l('Prestige') + '</dt><dd class="cityprestige">' + city.getPrestige() + '</dd>' +
                '</dl>';
        var advices = city.callAdvisor();
        if (advices.length > 0) {
            _t += '<p>' + zupolis.l('Your City Advisor recommends you to:') + '</p>' +
                    '<ul class="advices">';
            for (var z = 0; z < advices.length; z++) {
                _t += '<li>' + advices[z] + '</li>';
            }
            _t += '</ul>';
        }
        _t += '</div>' +
                '<div id="tab-production">' +
                '</div>' +
                '<div id="tab-army">';
        var canRecruitSoldiers = this.core.getCity().isBuildingBuilt('camp') || this.core.getCity().isBuildingBuilt('castle');
        if (canRecruitSoldiers !== true) {
            _t += '<p>' + zupolis.l('You will need to construct a Military Camp or Castle before being able to recruit soldiers in your city.') + '</p>';
        }
        _t += '<div class="army-list">' +
                '</div>' +
                '<div class="army-recruiter">';
        for (var item in zupolis.SOLDIER_TYPES) {
            _t += '<fieldset>' +
                    '<legend>' + item + '</legend>' +
                    '<div class="cost">' +
                    '<dl class="nomg">';
            for (var res in zupolis.SOLDIER_TYPES[item].cost) {
                _t += '<dt>' + zupolis.SOLDIER_TYPES[item].cost[res] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[res].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + res + '_small.png" /></dd>';
            }
            _t += '</dl>' +
                    '</div>' +
                    '<div class="info">' +
                    '<dl class="nomg">' +
                    '<dt>Attack</dt><dd>' + zupolis.SOLDIER_TYPES[item].attack + '</dd>' +
                    '<dt>Defense</dt><dd>' + zupolis.SOLDIER_TYPES[item].defense + '</dd>' +
                    '</dl>' +
                    '</div>' +
                    '<img data-handle="' + item + '" title="' + zupolis.l('Recruit') + ' ' + item + '" class="tips recruit-soldier" src="' + zupolis.ASSETS_URL + 'images/armies/' + item.toLowerCase() + '.png" />' +
                    '</fieldset>';
        }
        _t += '</div>' +
                '</div>' +
                '<div id="tab-navy">';
        var canBuildShips = this.core.getCity().isBuildingBuilt('shipyard');
        if (canBuildShips !== true) {
            _t += '<p>' + zupolis.l('You will need to construct a Shipyard before being able to construct ships in your city.') + '</p>';
        }
        _t += '<div class="navy-list">' +
                '</div>' +
                '<div class="navy-recruiter">';
        for (var item in zupolis.SHIP_TYPES) {
            _t += '<fieldset>' +
                    '<legend>' + item + '</legend>' +
                    '<div class="cost">' +
                    '<dl class="nomg">';
            for (var res in zupolis.SHIP_TYPES[item].cost) {
                _t += '<dt>' + zupolis.SHIP_TYPES[item].cost[res] + '</dt><dd><img class="tips" title="' + zupolis.RESOURCES[res].name + '" src="' + zupolis.ASSETS_URL + 'images/resources/' + res + '_small.png" /></dd>';
            }
            _t += '</dl>' +
                    '</div>' +
                    '<div class="info">' +
                    '<dl class="nomg">' +
                    '<dt>' + zupolis.l('Attack') + '</dt><dd>' + zupolis.SHIP_TYPES[item].attack + '</dd>' +
                    '<dt>' + zupolis.l('Defense') + '</dt><dd>' + zupolis.SHIP_TYPES[item].defense + '</dd>' +
                    '</dl>' +
                    '</div>' +
                    '<img data-handle="' + item + '" title="' + zupolis.l('Recruit') + ' ' + item + '" class="tips recruit-ship" src="' + zupolis.ASSETS_URL + 'images/armies/' + item.toLowerCase() + '.png" />' +
                    '</fieldset>';
        }
        _t += '</div>' +
                '</div>' +
                '<div id="tab-mercenary">' +
                '<p>' + zupolis.l('Mercenary armies are available to hire for a fixed price, they do not cost additional resources but they are only available for raiding and campaign missions, they do not participate in the defense of your city.') + '</p>' +
                '<p>' + zupolis.l('Also, keep in mind that once a mercenary army is hired, they are at your disposal until the end of the current year.') + '</p>' +
                '<div class="hired-mercenaries-list">';
        if (city.mercenary.length > 0) {
            _t += '<table class="normal">';
            for (var i = 0; i < city.mercenary.length; i++) {
                var armyData = zupolis.MERCENARIES[city.mercenary[i].id];
                _t += '<tr>' +
                        '<td class="icon"><img src="' + zupolis.ASSETS_URL + 'images/armies/' + armyData.icon + '.png" /></td>' +
                        '<td><p class="title">' + armyData.name + '</p><p class="description">' + armyData.description + '</p></td>' +
                        '<td class="large">' +
                        '<a title="' + zupolis.l('View info on this mercenary army.') + '" data-id="' + city.mercenary[i].id + '" class="tips view-merc" href="#">' + zupolis.l('view') + '</a> ' +
                        '<a title="' + zupolis.l('Send this mercenary army on a raiding mission. Depending on the success of the mission, they will return with coins and/or resources.') + '" data-id="' + i + '" class="tips raid-merc" href="#">' + zupolis.l('raid') + '</a> ' +
                        '<a title="' + zupolis.l('Send this mercenary arm on a campaign towards a city. Depending on the success of the mission, they will return with prisoniers (future soldiers for your army), coins and/or resources. Winning a campaign will grant you fame and prestige.') + '" data-id="' + i + '" class="tips campaign-merc" href="#">' + zupolis.l('campaign') + '</a> ' +
                        '<a title="' + zupolis.l('Disband this mercenary army? They will be available for hire later when you need them.') + '" data-id="' + i + '" class="tips disband-merc" href="#">' + zupolis.l('release') + '</a>' +
                        '</td>' +
                        '</tr>';

            }
            _t += '</table>';
        }
        else {
            _t += '<p>' + zupolis.l('You have no mercenary armies hired for your city. Go to the World Market Trades and hire one.') + '</p>';
        }
        _t += '</div>' +
                '</div>' +
                '<div id="tab-diplomacy">';
        var canDiplomacy = this.core.getCity().isBuildingBuilt('embassy');
        if (canDiplomacy !== true) {
            _t += '<p>' + zupolis.l('You will need to construct an Embassy before being able to propose treaties and pacts to other cities.') + '</p>';
        }
        var cities = this.core.getCities();
        _t += '<div class="cities-list">' +
                '<table class="normal">';
        for (var i = 1; i < cities.length; i++) {
            _t += '<tr>' +
                    '<td class="icon"><img src="' + zupolis.ASSETS_URL + 'images/avatars/avatar' + cities[i].getAvatar() + '.png" /></td>' +
                    '<td>' +
                    '<p class="title">' + cities[i].getName() + '</p>' +
                    '<p class="description">' + zupolis.l('Leader') + ': ' + cities[i].getRuler() + ' ' + zupolis.l('Personality') + ': ' + cities[i].getPersonality().name + '</p>';
            var influence = this.core.getCity().getInfluence();
            influence = influence[cities[i].getName()];
            var _e = '';
            if (influence < 20) {
                _e = ' vbad';
            }
            else if (influence >= 20 && influence < 50) {
                _e = ' bad';
            }
            else if (influence >= 50 && influence < 80) {
                _e = ' good';
            }
            else if (influence >= 80) {
                _e = ' vgood';
            }
            _t += '<div class="progress"><span style="width:' + influence + '%" class="bar' + _e + '"></span></div>';
            _t += '</td>' +
                    '<td class="large">' +
                    '<a data-name="' + cities[i].getName() + '" title="' + zupolis.l('View info about this city.') + '" class="tips view-city" href="#">' + zupolis.l('view') + '</a> ' +
                    '<a data-name="' + cities[i].getName() + '" title="' + zupolis.l('Propose a pact to this city`s ruler.') + '" class="tips pact" href="#">' + zupolis.l('pact') + '</a> ' +
                    '<a data-name="' + cities[i].getName() + '" title="' + zupolis.l('Send goods to this city.') + '" data-id="' + i + '" class="tips send-goods" href="#">' + zupolis.l('send goods') + '</a> ' +
                    '<a data-name="' + cities[i].getName() + '" title="' + zupolis.l('Declare war to this city.') + '" data-id="' + i + '" class="tips declare-war" href="#">' + zupolis.l('declare war') + '</a>' +
                    '</td>' +
                    '</tr>';

        }
        _t += '</table>' +
                '</div>' +
                '</div>' +
                '</div>';
        $(el + ' .contents').append(_t);
        this._refreshArmy();
        this._refreshNavy();
        $(el).on('click', '.pact', function () {
            if (canDiplomacy === true) {
                var city = $(this).data('name');
                var influence = self.core.getCity().getInfluenceWithCity(city);
                if (influence >= 50) {
                    if (self.core.getCity().proposePact(city) === true) {
                        //self.refreshNavy();
                    }
                    $('.tipsy').remove();

                }
                else {
                    self.core.error(zupolis.l('Your influence on') + ' ' + city + ' ' + zupolis.l('is too low to propose a pact.'));
                }
            }
            else {
                self.core.error(zupolis.l('You will need to construct an Embassy before being able to propose treaties and pacts to other cities.'));
            }
            return false;
        }).on('click', '.recruit-ship', function () {
            if (canBuildShips === true) {
                var ship = $(this).data('handle');
                if (self.core.getCity().recruitShip(ship) === true) {
                    self._refreshNavy();
                }
                $('.tipsy').remove();
            }
            else {
                self.core.error(zupolis.l('You will need to construct a Shipyard before being able to construct ships in your city.'));
            }
            return false;
        }).on('click', '.declare-war', function () {
            var name = $(this).data('name');
            var _city = self.core.getCity(name);
            new zupolis.panelDeclareWar({
                core: self.core,
                data: _city
            });
            return false;
        }).on('click', '.send-goods', function () {
            var name = $(this).data('name');
            var _city = self.core.getCity(name);
            new zupolis.panelSendGoods({
                core: self.core,
                data: _city
            });
            return false;
        }).on('click', '.view-city', function () {
            var name = $(this).data('name');
            var _city = self.core.getCity(name);
            new zupolis.panelCity({
                core: self.core,
                data: _city
            });
            return false;
        }).on('click', '.recruit-soldier', function () {
            if (canRecruitSoldiers === true) {
                var soldier = $(this).data('handle');
                if (self.core.getCity().recruitSoldier(soldier) === true) {
                    self._refreshArmy();
                }
                $('.tipsy').remove();
            }
            else {
                self.core.error(zupolis.l('You will need to construct a Military Camp or Castle before recruiting soldiers in your city.'));
            }
            return false;
        }).on('click', '.view-merc', function () {
            var _army = $(this).data('id');
            var data = zupolis.MERCENARIES[_army];
            new zupolis.panelArmy({
                core: self.core,
                data: data
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
     * Internal function for refreshing the Army tab.
     * 
     * @private
     * @returns {zupolis.panelAdvisor}
     */
    this._refreshArmy = function () {
        var city = this.core.getCity();
        var el = '#panel-' + this.id;
        var _t = '<fieldset>' +
                '<legend>' + zupolis.l('Current Army') + '</legend>' +
                zupolis.ui.armyList(city.getArmyTotal(), true) +
                '</fieldset>';
        $(el + ' .army-list').empty().append(_t);
        return this;
    };

    /**
     * Internal function for refreshing the Navy tab.
     * 
     * @private
     * @returns {zupolis.panelAdvisor}
     */
    this._refreshNavy = function () {
        var city = this.core.getCity();
        var el = '#panel-' + this.id;
        var _t = '<fieldset>' +
                '<legend>' + zupolis.l('Current Navy') + '</legend>' +
                zupolis.ui.navyList(city.getNavyTotal(), true) +
                '</fieldset>';
        $(el + ' .navy-list').empty().append(_t);
        return this;
    };

    // Fire up the constructor
    return this.__constructor(params);
};