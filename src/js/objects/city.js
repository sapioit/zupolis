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
 * Main Zupolis city object.
 * 
 * @param {type} params
 * @class {zupolis.city}
 * @returns {zupolis.__constructor}
 */
zupolis.city = function(params) {
    
    /**
     * The name of this city.
     * 
     * @private
     * @type {String}
     */
    this.name = null;
    
    /**
     * The name of the city ruler.
     * 
     * @private
     * @type {String}
     */
    this.ruler = null;
    
    /**
     * Pointer to the Zupolis game core.
     * 
     * @private
     * @type {zupolis.game}
     */
    this.core = null;
    
    /**
     * List of the buildings in this city.
     * 
     * @private
     * @type {Array}
     */
    this.buildings = [];
    
    this.buildingsList = [];
    
    /**
     * Storage space available in this city.
     * 
     * @private
     * @type {Number}
     */
    this.storage = 0;
    
    /**
     * Total prestige of the city.
     * 
     * @private
     * @type {Number}
     */
    this.prestige = 0;
    
    /**
     * The personality of the city ruler. It affects the relations with the
     * other cities of the world.
     * 
     * @private
     * @type {String}
     */
    this.personality = null;
    
    /**
     * The nationality of the city. It affects the relations with the
     * other cities of the world.
     * 
     * @private
     * @type {String}
     */
    this.nationality = null;
    
    /**
     * The climate of the zone the city resides in. It affects the type of
     * the buildings you can construct.
     * 
     * @private
     * @type {String}
     */
    this.climate = null;
    
    /**
     * Soldiers headquartered in this city.
     * 
     * @private
     * @type {Number}
     */
    this.army = [];
    
    /**
     * Ships built in this city.
     * 
     * @private
     * @type {Number}
     */
    this.navy = [];
    
    /**
     * Mercenary armies available for this city.
     * 
     * @private
     * @type {Number}
     */
    this.mercenary = [];
    
    /**
     * The resources of this city.
     * 
     * @private
     * @type {Object}
     */
    this.resources = {};
    
    this.data = null;
    
    /**
     * The level of the city.
     * 
     * @private
     * @type {Number}
     */
    this.level = 1;
    
    /**
     * List of the imports and exports of this city.
     * 
     * @private
     * @type {Object}
     */
    this.trades = null;
    
    /**
     * The avatar of the ruler of this city.
     * 
     * @type {Number}
     * @private
     */
    this.avatar = null;
    
    this.influence = {};
    
    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.city}
     * @param {Object} params
     */
    this.__constructor = function(params) {
        this.core = params.core;
        this.name = params.name;
        this.data = params.data;
        this.level = (typeof params.data.level !== 'undefined') ? params.data.level : 1;
        this.resources = zupolis.RESOURCES;
        this.resources.fame = (typeof params.level !== 'undefined') ? {
            name: 'Fame',
            handle: 'fame',
            total: zupolis.LEVELS[params.data.level],
            amount: 1
        } : zupolis.RESOURCES['fame'];
        if (typeof params.data.coins !== 'undefined') {
            this.resources.coins.storage = params.data.coins;
        }
        this.trades = (typeof params.data.trades !== 'undefined') ? params.data.trades : null;
        this.prestige = (typeof params.data.prestige !== 'undefined') ? params.data.prestige : 0;
        this.personality = (typeof params.data.personality !== 'undefined') ? params.data.personality : zupolis.PERSONALITY_TYPE_BALANCED;
        this.nationality = (typeof params.data.nationality !== 'undefined') ? params.data.nationality : zupolis.NATION_TYPE_ROMAN;
        this.climate = (typeof params.data.climate !== 'undefined') ? params.data.climate : zupolis.CLIMATE_TYPE_TEMPERATE;
        this.ruler = (typeof params.data.ruler !== 'undefined') ? params.data.ruler : 0;
        this.avatar = (typeof params.data.avatar !== 'undefined') ? params.data.avatar : 1;
        return this;
    };
    
    /**
     * Buy the specified goods from a city.
     * 
     * @public
     * @param {Object|String} city
     * @param {String} resource
     * @param {Number} amount
     * @returns {Object|Boolean}
     */
    this.buyFromCity = function(city, resource, amount) {
        var _city;
        if (typeof city === 'string') {
            _city = this.getCore().getCity(city);
            if (city === false) {
                this.getCore().error(city + ' does not exist.');
                return false;
            }
        }
        else {
            _city = city;
        }
        var trades = _city.getTrades();
        if (trades === null) {
            this.getCore().error(city + ' does not trade any goods.');
            return false;
        }
        if (typeof trades.exports === 'undefined') {
            this.getCore().error(city + ' does not export any goods.');
            return false;
        }
        for (var item in trades.exports) {
            if (item === resource) {
                if (typeof amount === 'undefined') {
                    amount = trades.exports[item];
                }
                var discount = (zupolis.RESOURCES[item].price * zupolis.TRADES_ADDITION) / 100;
                var price = zupolis.utils.calcPricePlusDiscount(amount, item, discount);//Math.round(amount * zupolis.RESOURCES[item].price + discount);
                if (!this.hasStorageSpaceFor(amount)) {
                    return false;
                }
                if (this.decCoinsAmount(price) === false) {
                    return false;
                }
                this.addToStorage(item, amount);
                this.removeFromExports(_city, item, amount);
                this.raiseInfluence(city, 2);
                this.raisePrestige();
                this.incFameAmount(50);
                this.getCore().refreshUI();
                this.getCore().notify(this.getName() + ' bought ' + amount + ' ' + zupolis.RESOURCES[item].name + ' from ' + city + ' for ' + (zupolis.RESOURCES[item].price + discount) + ' coins each, for a total of ' + price + ' coins.', 'Transaction done');
                return {
                    buyer: this.getName(),
                    amount: amount,
                    goods: zupolis.RESOURCES[item].name,
                    seller: city,
                    price: Math.round(zupolis.RESOURCES[item].price + discount),
                    totalPrice: price
                };
            }
        }
        this.getCore().error(city + ' does not export the requested goods.');
        return false;
    };
    
    /**
     * Remove a specified amount of a resource from the storage of this city.
     * 
     * @public
     * @param {String} item
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.removeResource = function(item, amount) {
        var res = this.getResources();
        if (!this.hasResources(item, amount)) {
            return false;
        }
        res[item].storage = res[item].storage - amount;
        return true;
    };
    
    /*
     this.removeFromStorage = function(item, amount) {
     var res = this.getResources();
     res[item].storage = res[item].storage - amount;
     return true;
     };
     */
    
    /**
     * Add a specified amount of a resource to the storage of this city.
     * 
     * @public
     * @param {String} item
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.addToStorage = function(item, amount) {
        var res = this.getResources();
        res[item].storage = res[item].storage + amount;
        return true;
    };
    
    /**
     * Check if the city has the required coins to create this building.
     * 
     * @public
     * @param {Number} coins
     * @returns {Boolean}
     */
    this.hasCoins = function(coins) {
        if (this.getCoinsAmount() - coins < 0) {
            this.getCore().error(this.getName() + ' doesn`t have enough ' + zupolis.RESOURCES.coins.name + '.');
            return false;
        }
        return true;
    };
    
    /**
     * Check if this city has the specified goods in storage.
     * 
     * @public
     * @param {String} resource
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.hasResources = function(resource, amount) {
        var res = this.getResources();
        if ((res[resource].storage - amount) < 0) {
            this.getCore().error(this.getName() + ' does not have enough ' + zupolis.RESOURCES[resource].name + '.');
            return false;
        }
        return true;
    };
    
    /**
     * Perform a trades reset (resets all amounts of resources available
     * for trade to full.
     * 
     * @public
     * @returns {Boolean}
     */
    this.resetTrades = function() {
        this.trades = zupolis.CITIES[this.getName()].trades;
        return true;
    };
    
    /**
     * List the specified goods onto the Black Market.
     * 
     * @public
     * @param {String} resource
     * @param {Number} amount
     * @returns {Object|Boolean}
     */
    this.listBlackMarket = function(resource, amount) {
        if (this.removeResource(resource, amount)) {
            var discount = (zupolis.RESOURCES[resource].price * zupolis.BLACK_MARKET_DISCOUNT) / 100;
            var price = zupolis.utils.calcPriceMinusDiscount(amount, resource, discount);
            this.getCore().addBlackMarket(resource, amount, price);
            this.getCore().refreshUI();
            this.getCore().notify(this.getName() + ' placed ' + amount + ' ' + zupolis.RESOURCES[resource].name + ' on the Black Market and will receive ' + price + ' coins next month.', 'Goods listed');
            return {
                seller: this.getName(),
                amount: amount,
                goods: zupolis.RESOURCES[resource].name,
                price: price,
                discount: discount
            };
        }
        return false;
    };
    
    /**
     * Sell the specified goods to a city.
     * 
     * @public
     * @param {Object|String} city
     * @param {String} resource
     * @param {Number} amount
     * @returns {Object|Boolean}
     */
    this.sellToCity = function(city, resource, amount) {
        var _city;
        if (typeof city === 'string') {
            _city = this.getCore().getCity(city);
            if (city === false) {
                this.getCore().error(city + ' does not exist.');
                return false;
            }
        }
        else {
            _city = city;
        }
        var trades = _city.getTrades();
        if (trades === null) {
            this.getCore().error(city + ' does not trade any goods.');
            return false;
        }
        if (typeof trades.imports === 'undefined') {
            this.getCore().error(city + ' does not import any goods.');
            return false;
        }
        for (var item in trades.imports) {
            if (item === resource) {
                if (typeof amount === 'undefined') {
                    amount = trades.imports[item];
                }
                var discount = (zupolis.RESOURCES[item].price * zupolis.TRADES_DISCOUNT) / 100;
                var price = zupolis.utils.calcPricePlusDiscount(amount, item, discount);//Math.round(amount * zupolis.RESOURCES[item].price - discount);
                /*
                 if (!this.hasCoins(price)) {
                 return false;
                 }
                 if (!this.hasStorageSpaceFor(amount)) {
                 return false;
                 }
                 */
                if (!this.removeResource(item, amount)) {
                    return false;
                }
                this.incCoinsAmount(price);
                this.removeFromImports(_city, item, amount);
                this.raiseInfluence(city, 1);
                this.raisePrestige();
                this.incFameAmount(50);
                this.getCore().refreshUI();
                this.getCore().notify(this.getName() + ' sold ' + amount + ' ' + zupolis.RESOURCES[item].name + ' to ' + city + ' for ' + (zupolis.RESOURCES[item].price - discount) + ' coins each, for a total of ' + price + ' coins.', 'Transaction done');
                return {
                    seller: this.getName(),
                    amount: amount,
                    goods: zupolis.RESOURCES[item].name,
                    buyer: city,
                    price: Math.round(zupolis.RESOURCES[item].price - discount),
                    totalPrice: price
                };
            }
        }
        this.getCore().error(city + ' does not import the specified goods.');
        return false;
    };
    
    /**
     * Remove a specified amount of a resource from the trade exports of a city.
     * 
     * @public
     * @param {zupolis.city} city
     * @param {String} item
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.removeFromExports = function(city, item, amount) {
        city.trades.exports[item] = city.trades.exports[item] - amount;
        return true;
    };
    
    /**
     * Remove a specified amount of a resource from the trade imports of a city.
     * 
     * @public
     * @param {zupolis.city} city
     * @param {String} item
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.removeFromImports = function(city, item, amount) {
        city.trades.imports[item] = city.trades.imports[item] - amount;
        return true;
    };
    
    /**
     * Export the game data of this city.
     * 
     * @public
     * @param {Boolean} toLocalStorage
     * @returns {Object}
     */
    this.exportData = function(toLocalStorage) {
        var data = {
            name: this.getName(),
            ruler: this.getRuler(),
            level: this.getLevel(),
            climate: this.getClimate().id,
            nationality: this.getNationality().id,
            avatar: this.getAvatar(),
            prestige: this.getPrestige(),
            influence: this.getInfluence(),
            army: this.getArmyTotal(),
            navy: this.getNavyTotal(),
            mercenary: this.getMercenary(),
            resources: this.getResources(),
            trades: this.getCore()._getNeighboursTrades(),
            buildings: this.buildingsList,
            blackMarket: this.getCore().getBlackMarket(),
            dateTime: {
                day: this.getCore().day,
                month: this.getCore().month,
                year: this.getCore().year,
                dayOfMonth: this.getCore().dayOfMonth
            }
        };
        if (toLocalStorage === true) {
            localStorage.setItem('zupolis.data', window.btoa(JSON.stringify(data)));
        }
        return data;
    };
    
    /**
     * Import the game data to this city.
     * 
     * @public
     * @param {Object} data
     * @returns {zupolis.city}
     */
    this.importData = function(data) {
        this.setName(data.name);
        this.setRuler(data.ruler);
        this.setLevel(data.level);
        this.setAvatar(data.avatar);
        this.setNationality(data.nationality);
        this.setClimate(data.climate);
        this.setPrestige(data.prestige);
        this.setupArmy(true, data.army);
        this.setupNavy(true, data.navy);
        this.setMercenary(data.mercenary);
        this.setResources(data.resources);
        this.getCore().setDateTime(data.dateTime);
        this.getCore().setBlackMarket(data.blackMarket);
        return this;
    };
    
    /**
     * Get the list of all the buildings in this city.
     * 
     * @public
     * @returns {Array}
     */
    this.getBuildings = function() {
        return this.buildings;
    };
    
    /**
     * Get the name of this city.
     * 
     * @public
     * @returns {String}
     */
    this.getName = function() {
        return this.name;
    };
    
    /**
     * Set the name of this city.
     * 
     * @public
     * @param {String} value
     * @returns {zupolis.city}
     */
    this.setName = function(value) {
        this.name = value;
        return this;
    };
    
    /**
     * Return a pointer to the Zupolis game core.
     * 
     * @public
     * @returns {zupolis.core}
     */
    this.getCore = function() {
        return this.core;
    };
    
    /**
     * Raise the level of this city.
     * 
     * @public
     * @returns {zupolis.city}
     */
    this.levelUp = function() {
        this.level++;
        this.resources.fame.total = this.resources.fame.total + this.resources.fame.amount;
        this.resources.fame.amount = 1;
        $('.citylevel').html(this.getLevel());
        this.getCore().notify('The city of ' + this.getName() + ' is now level ' + this.getLevel() + '.');
        return this;
    };
    
    /**
     * Rename this city.
     * 
     * @public
     * @param {String} value
     * @returns {zupolis.city}
     */
    this.rename = function(value) {
        this.name = value;
        return this;
    };
    
    /**
     * Check if the specified building is already built.
     * 
     * @public
     * @param {String} handle
     * @returns {Boolean}
     */
    this.isBuildingBuilt = function(handle) {
        var buildings = this.getBuildings();
        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].type === handle) {
                return true;
            }
        }
        return false;
    };
    
    /**
     * Check if the city has a specific storage space.
     * 
     * @public
     * @param {Number} quantity
     * @returns {Boolean}
     */
    this.hasStorageSpaceFor = function(quantity) {
        var storage = this.getStorageSpace();
        if (!this.hasStorageSpace()) {
            return false;
        }
        if ((storage.occupied + quantity) > storage.all) {
            this.getCore().error('There is no storage space in your city to accomodate the new goods.');
            return false;
        }
        return true;
    };
    
    /**
     * Check if this city has enough storage space.
     * 
     * @public
     * @returns {Boolean}
     */
    this.hasStorageSpace = function() {
        var storage = this.getStorageSpace();
        if (storage.occupied >= storage.all) {
            this.getCore().error('There is no storage space in your city.');
            return false;
        }
        return true;
    };
    
    /**
     * Get the storage space of this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getStorageSpace = function() {
        var storage = 0;
        for (var item in this.getResources()) {
            if (item !== 'coins' && item !== 'fame') {
                storage += this.getResources()[item].storage;
            }
        }
        return {
            occupied: storage,
            all: this.storage
        };
    };
    
    /**
     * Internal function for building the specified buildings, bypassing
     * the requirements.
     * 
     * @public
     * @param {String|Object} bType
     * @param {Boolean} hidden
     * @returns {zupolis.building|Boolean}
     */
    this._createBuildings = function(bType, hidden) {
        hidden = (typeof hidden !== 'undefined') && hidden === true ? true : false;
        if (typeof bType === 'object') {
            for (var i = 0; i < bType.length; i++) {
                var _b = zupolis.BUILDINGS.findIndexM(bType[i]);
                if (_b !== false) {
                    var _c = zupolis.BUILDINGS[_b];
                    var _building = new zupolis.building({
                        city: this,
                        type: bType[i],
                        data: _c,
                        hidden: hidden
                    });
                    this.buildings.push(_building);
                    this.buildingsList.push(bType[i]);
                }
            }
        }
        else {
            var _b = zupolis.BUILDINGS.findIndexM(bType);
            if (_b !== false) {
                var _c = zupolis.BUILDINGS[_b];
                var _building = new zupolis.building({
                    city: this,
                    type: bType,
                    data: _c,
                    hidden: hidden
                });
                this.buildings.push(_building);
                this.buildingsList.push(bType);
            }
        }
        return false;
    };
    
    /**
     * Build the specified building.
     * 
     * @public
     * @param {String} bType
     * @returns {zupolis.building|Boolean}
     */
    this.build = function(bType) {
        var _b = zupolis.BUILDINGS.findIndexM(bType);
        if (_b !== false) {
            var _c = zupolis.BUILDINGS[_b];
            if ((typeof _c.requires.cityLevel !== 'undefined') && (this.level < _c.requires.cityLevel)) {
                this.getCore().error('Your city level is too low to construct this building.');
                return false;
            }
            if ((this.resources.coins.storage - _c.cost.coins) < 0) {
                this.getCore().error('You don`t have enough coins to construct this building.');
                return false;
            }
            else {
                this.resources.coins.storage = this.resources.coins.storage - _c.cost.coins;
            }
            for (var item in _c.cost) {
                if (item !== 'coins') {
                    if ((this.getResources()[item].storage - _c.cost[item]) < 0) {
                        this.getCore().error('You don`t have enough ' + item + ' to construct this building.');
                        return false;
                    }
                    else {
                        this.getResources()[item].storage = this.getResources()[item].storage - _c.cost[item];
                    }
                }
            }
            var _building = new zupolis.building({
                city: this,
                type: bType,
                data: _c
            });
            this.buildings.push(_building);
            this.buildingsList.push(bType);
            this.getCore().refreshUI();
            this.getCore().save();
            this.getCore().notify('New building constructed: ' + _building.getName());
            $('.tips').tipsy({
                gravity: $.fn.tipsy.autoNS,
                html: true
            });
            return _building;
        }
        return false;
    };
    
    /**
     * Get the rank of this city
     * 
     * @public
     * @returns {Number}
     */
    this.getRank = function() {
        var rank = (this.getLevel() * this.getPrestige() * this.getArmyTotal().total) / 100;
        return rank;
    };
    
    /**
     * Return a pointer to the specified building in this city by the specified
     * handle.
     * 
     * @public
     * @param {String} handle
     * @returns {zupolis.building|Boolean}
     */
    this.getBuildingByHandle = function(handle) {
        var buildings = this.getBuildings();
        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].getType() === handle) {
                return buildings[i];
            }
        }
        return false;
    };
    
    /**
     * Demolish a city building
     * 
     * @public
     * @TODO
     * @param {Number} id
     * @returns {zupolis.city}
     */
    this.demolish = function(id) {
        if (typeof id === 'number') {
            this.buildings.splice(id, 1);
        }
        else if (typeof id === 'string') {

        }
        else {

        }
        return this;
    };
    
    /**
     * Get the coins this city has. This is the coins object.
     * 
     * @public
     * @returns {Object}
     */
    this.getCoins = function() {
        return this.resources.coins;
    };
    
    /**
     * Get the number of coins this city has.
     * 
     * @public
     * @returns {Number}
     */
    this.getCoinsAmount = function() {
        return this.getCoins().storage;
    };
    
    /**
     * Increase this city's coins by the specified amount.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.incCoinsAmount = function(value) {
        return this.setCoinsAmount(this.getCoinsAmount() + value);
    };
    
    /**
     * Decrease this city's coins by the specified amount.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.decCoinsAmount = function(value) {
        if (!this.hasCoins(value)) {
            return false;
        }
        this.setCoinsAmount(this.getCoinsAmount() - value);
        return true;
    };
    
    /**
     * Set this city's coins to the specified value.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.setCoinsAmount = function(value) {
        this.getCoins().storage = value;
        return value;
    };
    
    /**
     * Return the value of this city's prestige.
     * 
     * @public
     * @returns {Number}
     */
    this.getPrestige = function() {
        return this.prestige;
    };
    
    /**
     * Get the fame this city has. This is the fame object.
     * 
     * @public
     * @returns {Object}
     */
    this.getFame = function() {
        return this.resources.fame;
    };
    
    /**
     * Set the fame of the city.
     * 
     * @public
     * @param {Object} value
     * @returns {zupolis.city}
     */
    this.setFame = function(value) {
        this.resources.fame = value;
        return this;
    };
    
    /**
     * Set the coins of the city.
     * 
     * @public
     * @param {Object} value
     * @returns {zupolis.city}
     */
    this.setCoins = function(value) {
        this.resources.coins = value;
        return this;
    };
    
    /**
     * Get the number of fame this city has.
     * 
     * @public
     * @returns {Number}
     */
    this.getFameAmount = function() {
        return this.getFame().amount;
    };
    
    /**
     * Increase this city's fame by the specified amount.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.incFameAmount = function(value) {
        return this.setFameAmount(this.getFameAmount() + value);
    };
    
    /**
     * Decrease this city's fame by the specified amount.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.decFameAmount = function(value) {
        return this.setFameAmount(this.getFameAmount() - value);
    };
    
    /**
     * Set this city's fame to the specified value.
     * 
     * @public
     * @param {Number} value
     * @returns {Number}
     */
    this.setFameAmount = function(value) {
        this.getFame().amount = value;
        return value;
    };
    
    /**
     * Get the total number of soldiers available in this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getArmy = function() {
        return this.army;
    };
    
    /**
     * Get the total number of ships available in this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getNavy = function() {
        return this.navy;
    };
    
    /**
     * Get the total number of mercenaries available for this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getMercenary = function() {
        return this.mercenary;
    };
    
    /**
     * Get the navy of this city in an object format.
     * 
     * @public
     * @returns {Object}
     */
    this.getNavyTotal = function() {
        var total = 0;
        var totalNavy = {
            'Corsair': 0,
            'Caravel': 0,
            'Warship': 0
        };
        for (var i = 0; i < this.navy.length; i++) {
            var ship = this.navy[i].getName();
            for (var item in totalNavy) {
                if (ship === item) {
                    totalNavy[item]++;
                    total++;
                }
            }
        }
        return {
            total: total,
            navy: totalNavy
        };
    };
    
    /**
     * Get the army of this city in an object format.
     * 
     * @public
     * @returns {Object}
     */
    this.getArmyTotal = function() {
        var total = 0;
        var totalArmy = {
            'Militia': 0,
            'Axeman': 0,
            'Bowman': 0,
            'Pikeman': 0,
            'Crossbowman': 0,
            'Knight': 0
        };
        for (var i = 0; i < this.army.length; i++) {
            var soldier = this.army[i].getName();
            for (var item in totalArmy) {
                if (soldier === item) {
                    totalArmy[item]++;
                    total++;
                }
            }
        }
        return {
            total: total,
            army: totalArmy
        };
    };
    
    /**
     * Get the mercenaries of this city in an object format.
     * 
     * @public
     * @returns {Object}
     */
    this.getMercenaryTotal = function() {
        var total = 0;
        var totalArmy = {
            'Militia': 0,
            'Axeman': 0,
            'Bowman': 0,
            'Pikeman': 0,
            'Crossbowman': 0,
            'Knight': 0
        };
        for (var i = 0; i < this.mercenary.length; i++) {
            var soldier = this.mercenary[i].getName();
            for (var item in totalArmy) {
                if (soldier === item) {
                    totalArmy[item]++;
                    total++;
                }
            }
        }
        return {
            total: total,
            mercenary: totalArmy
        };
    };
    
    /**
     * Remove a specific amount of a resource from this city's storage.
     * 
     * @public
     * @param {String} resource
     * @param {Number} amount
     * @returns {Boolean}
     */
    this.removeResource = function(resource, amount) {
        var res = this.getResources();
        if (!this.hasResources(resource, amount)) {
            return false;
        }
        res[resource].storage = res[resource].storage - amount;
        return true;
    };
    
    /**
     * Remove resources from this city's storage.
     * 
     * @public
     * @param {Object} resources
     * @returns {Boolean}
     */
    this.removeResources = function(resources) {
        var res = this.getResources();
        for (var resource in resources) {
            if (!this.hasResources(resource, resources[resource])) {
                return false;
            }
        }
        for (var resource in resources) {
            res[resource].storage = res[resource].storage - resources[resource];
        }
        return true;
    };
    
    /**
     * Check if this mercenary army has already been recruited.
     * 
     * @public
     * @param {String} handle
     * @returns {Boolean}
     */
    this.isMercenaryRecruited = function(handle) {
        for (var i = 0; i < this.mercenary.length; i++) {
            if (this.mercenary[i].handle === handle) {
                return true;
            }
        }
        return false;
    };
    
    /**
     * Ask the City Advisor for tips.
     * 
     * @public
     * @returns {Array}
     */
    this.callAdvisor = function() {
        var advices = [];
        if (this.army.length === 0) {
            advices.push('You have no army, this is an open invitation for attack.');
        }
        if (this.army.length < 10 && this.army.length > 0) {
            advices.push('You have a small army, try to recruit some more soldiers.');
        }
        if (this.navy.length === 0) {
            advices.push('You have no navy, this is an open invitation for attack.');
        }
        if (this.army.length < 3 && this.army.length > 0) {
            advices.push('You have a small navy, try to construct some more ships.');
        }
        var storage = this.getStorageSpace();
        if (storage.occupied >= storage.all) {
            advices.push('You have no storage space to store your new goods and they will be lost. Sell some goods or build a warehouse.');
        }
        else if ((storage.all - storage.occupied) < 100) {
            advices.push('You will soon run out of storage space and all goods produced will be lost. Sell some goods or build a warehouse.');
        }
        if (this.resources.coins.storage < 1000) {
            advices.push('You seem to be losing coins fast, sell some goods or upgrade your houses to get better taxes.');
        }
        if (this.resources.wood.storage < 100 || this.resources.stones.storage < 100) {
            advices.push('You are lacking construction materials, buy some stones and/or wood off the World Trade Market.');
        }
        if (this.resources.coins.storage > 100000) {
            advices.push('You have lots of coins, why not invest some in goods?');
        }
        for (var item in this.resources) {
            if (item !== 'coins' && item !== 'fame') {
                if (this.resources[item].storage > 1000) {
                    advices.push('You seem to have a surplus of ' + zupolis.RESOURCES[item].name + '. You can sell some and get coins instead.');
                }
            }
        }
        return advices;
    };
    
    /**
     * Recruit a soldier for the city's army.
     * 
     * @public
     * @param {String} name
     * @returns {Boolean}
     */
    this.recruitMercenaryArmy = function(name) {
        for (var i = 0; i < zupolis.MERCENARIES.length; i++) {
            if (name === zupolis.MERCENARIES[i].handle) {
                var price = zupolis.MERCENARIES[i].cost;
                if (this.decCoinsAmount(price) === false) {
                    return false;
                }
                var army = {
                    id: i,
                    handle: name,
                    army: []
                };
                for (var item in zupolis.MERCENARIES[i].army) {
                    var soldier = zupolis.SOLDIER_TYPES[item];
                    var _soldier = new zupolis.soldier({
                        name: item,
                        data: soldier
                    });
                    army.army.push(_soldier);
                }
                this.mercenary.push(army);
                this.getCore().notify('The mercenaries of the ' + zupolis.MERCENARIES[i].name + ' are now available for skirmish missions for the duration of one year.', 'Mercenaries recruited.');
                this.getCore().refreshUI();
                this.getCore().save();
                return true;
            }
        }
        return false;
    };
    
    /**
     * Construct a ship for the city's navy.
     * 
     * @public
     * @param {String} shipName
     * @returns {Boolean}
     */
    this.recruitShip = function(shipName) {
        for (var item in zupolis.SHIP_TYPES) {
            if (shipName === item) {
                var ship = zupolis.SHIP_TYPES[item];
                if (!this.removeResources(ship.cost)) {
                    return false;
                }
                var _ship = new zupolis.ship({
                    name: item,
                    data: ship
                });
                this.navy.push(_ship);
                this.getCore().refreshUI();
                this.getCore().notify('A new ' + shipName + ' ship has been constructed.', 'New ship');
                this.getCore().save();
                return true;
            }
        }
        return false;
    };
    
    /**
     * Recruit a soldier for the city's army.
     * 
     * @public
     * @param {String} soldierName
     * @returns {Boolean}
     */
    this.recruitSoldier = function(soldierName) {
        for (var item in zupolis.SOLDIER_TYPES) {
            if (soldierName === item) {
                var soldier = zupolis.SOLDIER_TYPES[item];
                if (!this.removeResources(soldier.cost)) {
                    return false;
                }
                var _soldier = new zupolis.soldier({
                    name: item,
                    data: soldier
                });
                this.army.push(_soldier);
                this.getCore().refreshUI();
                this.getCore().save();
                return true;
            }
        }
        return false;
    };
    
    /**
     * Internal function for recruiting a ship for the city's navy.
     * 
     * @public
     * @param {String} shipName
     * @returns {zupolis.city}
     */
    this._recruitShip = function(shipName) {
        for (var item in zupolis.SHIP_TYPES) {
            if (shipName === item) {
                var ship = zupolis.SHIP_TYPES[item];
                var _ship = new zupolis.ship({
                    name: item,
                    data: ship
                });
                this.navy.push(_ship);
            }
        }
        return this;
    };
    
    /**
     * Internal function for recruiting a soldier for the city's army.
     * 
     * @public
     * @param {String} soldierName
     * @returns {zupolis.city}
     */
    this._recruitSoldier = function(soldierName) {
        for (var item in zupolis.SOLDIER_TYPES) {
            if (soldierName === item) {
                var soldier = zupolis.SOLDIER_TYPES[item];
                var _soldier = new zupolis.soldier({
                    name: item,
                    data: soldier
                });
                this.army.push(_soldier);
            }
        }
        return this;
    };
    
    /**
     * Get the navy size of this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getNavySize = function() {
        return this.getNavy().length;
    };
    
    /**
     * Get the army size of this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getArmySize = function() {
        return this.getArmy().length;
    };
    
    /**
     * Disband a ship from the city's navy.
     * 
     * @public
     * @param {String} shipName
     * @returns {Boolean}
     */
    this.disbandShip = function(shipName) {
        var navy = this.getNavy();
        for (var i = 0; i < navy.length; i++) {
            var ship = navy[i];
            if (ship.getName() === shipName) {
                delete navy.soldier[i];
                return true;
            }
        }
        return false;
    };
    
    /**
     * Disband a soldier from the city's army.
     * 
     * @public
     * @param {String} soldierName
     * @returns {Boolean}
     */
    this.disbandSoldier = function(soldierName) {
        var army = this.getArmy();
        for (var i = 0; i < army.length; i++) {
            var soldier = army[i];
            if (soldier.getName() === soldierName) {
                delete army.soldier[i];
                return true;
            }
        }
        return false;
    };
    
    /**
     * Set the mercenaries of the city.
     * 
     * @public
     * @param {Number} value
     * @returns {zupolis.city}
     */
    this.setMercenary = function(value) {
        this.mercenary = value;
        return this;
    };
    
    /**
     * Set the navy of the city.
     * 
     * @public
     * @param {Number} value
     * @returns {zupolis.city}
     */
    this.setNavy = function(value) {
        this.navy = value;
        return this;
    };
    
    /**
     * Set the soldiers of the city.
     * 
     * @public
     * @param {Number} value
     * @returns {zupolis.city}
     */
    this.setArmy = function(value) {
        this.army = value;
        return this;
    };
    
    /**
     * Get the resources available in this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getResources = function() {
        return this.resources;
    };
    
    /**
     * Set the resources of the city.
     * 
     * @public
     * @param {Object} value
     * @returns {zupolis.city}
     */
    this.setResources = function(value) {
        this.resources = value;
        return this;
    };
    
    /**
     * Return the ruler name of this city.
     * 
     * @public
     * @returns {String}
     */
    this.getRuler = function() {
        return this.ruler;
    };
    
    /**
     * Set the ruler name of the city.
     * 
     * @public
     * @param {String} value
     * @returns {zupolis.city}
     */
    this.setRuler = function(value) {
        this.ruler = value;
        return this;
    };
    
    /**
     * Set the level of the city.
     * 
     * @public
     * @param {Number} value
     * @returns {zupolis.city}
     */
    this.setLevel = function(value) {
        this.level = value;
        return this;
    };
    
    /**
     * Return the level of this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getLevel = function() {
        return this.level;
    };
    
    /**
     * Get the imports and exports of this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getTrades = function() {
        return this.trades;
    };
    
    /**
     * Set the imports and exports of this city.
     * 
     * @public
     * @param {Object} value
     * @returns {zupolis.city}
     */
    this.setTrades = function(value) {
        this.trades = value;
        return this;
    };
    
    /**
     * Return the personality of the ruler of this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getPersonality = function() {
        return {
            id: this.personality,
            name: zupolis.PERSONALITY_TYPES[this.personality]
        };
    };
    
    /**
     * Release all the mercenary armies.
     * 
     * @public
     * @returns {zupolis.city}
     */
    this.releaseMercenaries = function() {
        this.mercenary = [];
        this.getCore().notify('At the end of the year, mercenaries from your city have been released.');
        return this;
    };
    
    /**
     * Setup the navy of this city.
     * 
     * @public
     * @param {Boolean} hidden
     * @param {Object} data
     * @returns {zupolis.city}
     */
    this.setupNavy = function(hidden, data) {
        if (typeof data === 'undefined') {
            var navy = this.data.navy;
            for (var ship in navy) {
                for (var i = 0; i < navy[ship]; i++) {
                    if (hidden === true) {
                        this._recruitShip(ship);
                    }
                    else {
                        this.recruitShip(ship);
                    }
                }
            }
        }
        else {
            var navy = data.navy;
            for (var ship in navy) {
                for (var i = 0; i < navy[ship]; i++) {
                    if (hidden === true) {
                        this._recruitShip(ship);
                    }
                    else {
                        this.recruitShip(ship);
                    }
                }
            }
        }
        return this;
    };
    
    /**
     * Setup the army of this city.
     * 
     * @public
     * @param {Boolean} hidden
     * @param {Object} data
     * @returns {zupolis.city}
     */
    this.setupArmy = function(hidden, data) {
        if (typeof data === 'undefined') {
            var army = this.data.army;
            for (var soldier in army) {
                for (var i = 0; i < army[soldier]; i++) {
                    if (hidden === true) {
                        this._recruitSoldier(soldier);
                    }
                    else {
                        this.recruitSoldier(soldier);
                    }
                }
            }
        }
        else {
            var army = data.army;
            for (var soldier in army) {
                for (var i = 0; i < army[soldier]; i++) {
                    if (hidden === true) {
                        this._recruitSoldier(soldier);
                    }
                    else {
                        this.recruitSoldier(soldier);
                    }
                }
            }
        }
        return this;
    };
    
    /**
     * Return the climate of the area of this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getClimate = function() {
        return {
            id: this.climate,
            name: zupolis.CLIMATE_TYPES[this.climate]
        };
    };
    
    /**
     * Return the nationality of this city.
     * 
     * @public
     * @returns {Object}
     */
    this.getNationality = function() {
        return {
            id: this.nationality,
            name: zupolis.NATION_TYPES[this.nationality]
        };
    };
    
    /**
     * Raise the prestige of this city by the specified amount.
     * 
     * @public
     * @param {Number} amount
     * @returns {Number}
     */
    this.raisePrestige = function(amount) {
        if (typeof amount !== 'undefined') {
            this.prestige += amount;
        }
        else {
            ++this.prestige;
        }
        $('.cityprestige').html(this.getPrestige());
        this.getCore().notify('The prestige of your city raised.');
        return this.prestige;
    };
    
    /**
     * Lower the prestige of this city by the specified amount.
     * 
     * @public
     * @param {Number} amount
     * @returns {Number}
     */
    this.lowerPrestige = function(amount) {
        if (typeof amount !== 'undefined') {
            if ((this.prestige - amount) >= 0) {
                this.prestige -= amount;
                this.getCore().notify('The prestige of your city lowered.');
            }
        }
        else {
            if ((this.prestige - 1) >= 0) {
                --this.prestige;
                this.getCore().notify('The prestige of your city lowered.');
            }
        }
        $('.cityprestige').html(this.getPrestige());
        return this.prestige;
    };
    
    /**
     * Reset the prestige of this city to 0.
     * 
     * @returns {zupolis.city}
     * @public
     */
    this.resetPrestige = function() {
        this.prestige = 0;
        $('.cityprestige').html(this.getPrestige());
        return this;
    };
    
    /**
     * Set the prestige of this city.
     * 
     * @public
     * @returns {zupolis.city}
     * @param {Number} value
     */
    this.setPrestige = function(value) {
        this.prestige = value;
        $('.cityprestige').html(this.getPrestige());
        return this;
    };
    
    /**
     * Get the avatar of the ruler of this city.
     * 
     * @public
     * @returns {Number}
     */
    this.getAvatar = function() {
        return this.avatar;
    };
    
    /**
     * Set the avatar of the ruler of this city.
     * 
     * @public
     * @returns {zupolis.city}
     * @param {Number} value
     */
    this.setAvatar = function(value) {
        this.avatar = value;
        return this;
    };
    
    /**
     * Decrease the influence of this city.
     * 
     * @public
     * @param {String} city
     * @param {Number} value
     * @returns {Number}
     */
    this.lowerInfluence = function(city, value) {
        if (this.influence[city] - value >= 0) {
            this.influence[city] = this.influence[city] - value;
        }
        return this.influence[city];
    };
    
    /**
     * Increase the influence of this city.
     * 
     * @public
     * @param {String}} city
     * @param {Number} value
     * @returns {Number}
     */
    this.raiseInfluence = function(city, value) {
        if (this.influence[city] + value <= 100) {
            this.influence[city] = this.influence[city] + value;
        }
        return this.influence[city];
    };
    
    /**
     * Return all the influence of this city with all the other cities.
     * 
     * @public
     * @returns {Object}
     */
    this.getInfluence = function() {
        return this.influence;
    };
    
    /**
     * Returns the influenceof this city with a specific city.
     * 
     * @public
     * @param {String} city
     * @returns {Number}
     */
    this.getInfluenceWithCity = function(city) {
        return this.influence[city];
    };
    
    /**
     * Set the influence of this city.
     * 
     * @public
     * @returns {zupolis.city}
     * @param {Object} value
     */
    this.setInfluence = function(value) {
        this.influence = value;
        return this;
    };
    
    /**
     * Set the climate of this city.
     * 
     * @public
     * @returns {zupolis.city}
     * @param {Number} value
     */
    this.setClimate = function(value) {
        this.climate = value;
        return this;
    };
    
    /**
     * Set the nationality of this city.
     * 
     * @public
     * @returns {zupolis.city}
     * @param {Number} value
     */
    this.setNationality = function(value) {
        this.nationality = value;
        return this;
    };
    
    // Fire up the constructor
    return this.__constructor(params);
};