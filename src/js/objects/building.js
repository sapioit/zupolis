'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Main Zupolis building object.
 * 
 * @param {type} params
 * @class {zupolis.building}
 * @returns {zupolis.__constructor}
 */
zupolis.building = function(params) {
    
    /**
     * The level of this building.
     * 
     * @type {Number}
     * @private
     */
    this.level = 1;
    
    /**
     * Pointer to the city this building is located in.
     * 
     * @type {zupolis.city}
     * @private
     */
    this.city = null;
    
    /**
     * The name of this building.
     * 
     * @type {String}
     * @private
     */
    this.name = null;
    
    /**
     * The type of this building.
     * 
     * @type {String}
     * @private
     */
    this.type = null;
    
    /**
     * Check if this building producing goods.
     * 
     * @type {Boolean}
     * @private
     */
    this.working = true;
    
    /**
     * Check if this is a production building.
     * 
     * @type {Boolean}
     * @private
     */
    this.isProduction = false;
    
    /**
     * Check if this is a municipal building.
     * 
     * @type {Boolean}
     * @private
     */
    this.isMunicipal = false;
    
    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.building}
     * @param {Object} params
     */
    this.__constructor = function(params) {
        var self = this;
        this.city = params.city;
        this.type = params.type;
        this.name = params.data.name;
        this.isProduction = (typeof params.data.isProduction !== 'undefined' && params.data.isProduction === true) ? true : false;
        this.isMunicipal = (typeof params.data.isMunicipal !== 'undefined' && params.data.isMunicipal === true) ? true : false;
        this.level = (typeof params.data.level !== 'undefined') ? params.data.level : 1;
        params.data.level = this.level;
        if (params.hidden !== true) {
            $('section.game').append(zupolis.ui.buildingElement(params)).on('click', '#building-' + params.data.handle, function() {
                new zupolis.panelBuilding({
                    core: self.getCore(),
                    header: params.data.name,
                    data: params.data
                });
            });
        }
        var building = this.getBuildingData();
        switch (this.type) {
            case 'marketplace':
            case 'warehouse':
                this.getCity().storage = this.getCity().storage + building.storage;
                break;
        }
        return this;
    };
    
    /**
     * Upgrade this building.
     * 
     * @public
     * @returns {Boolean}
     */
    this.upgrade = function() {
        var building = this.getBuildingData();
        if (this.level < building.upgrades) {
            ++this.level;
            return true;
        }
        return false;
    };
    
    /**
     * Downgrade this building.
     * 
     * @public
     * @returns {Boolean}
     */
    this.downgrade = function() {
        if (this.level > 1) {
            --this.level;
            return true;
        }
        return false;
    };
    
    /**
     * Check if this building is a production building (its production can be
     * started and stopped).
     * 
     * @public
     * @returns {Boolean}
     */
    this.isProductionBuilding = function() {
        return this.isProduction;
    };
    
    /**
     * Check if this building's production is started or stopped.
     * 
     * @public
     * @returns {Boolean}
     */
    this.isProducing = function() {
        return this.working;
    };
    
    /**
     * Start this building's production
     * 
     * @public
     * @returns {Boolean}
     */
    this.startProduction = function() {
        if (this.isProductionBuilding()) {
            this.getCore().notify(this.getName() + '`s production started.');
            this.working = true;
            return true;
        }
        else {
            return false;
        }
    };
    
    /**
     * Stop this building's production
     * 
     * @public
     * @returns {Boolean}
     */
    this.stopProduction = function() {
        if (this.isProductionBuilding()) {
            this.getCore().notify(this.getName() + '`s production stopped.');
            this.working = false;
            return true;
        }
        else {
            return false;
        }
    };
    
    /**
     * Demolish this building and remove it from the DOM.
     * 
     * @TODO
     * @public
     * @returns {zupolis.building}
     */
    this.demolish = function() {
        $('section.game .building[data=' + this.getType() + ']').remove();
        return this;
    };
    
    /**
     * Check if the city has the required materials to create this building.
     * 
     * @public
     * @param {Array|String} mats
     * @returns {Boolean}
     */
    this.hasMaterials = function(mats) {
        var building = this.getBuildingData();
        var res = this.getCityResources();
        var mat = building.materials;
        if (typeof mats === 'object') {
            for (var i = 0; i < mats.length; i++) {
                if (mats[i] !== 'coins') {
                    if (res[mats[i]].storage - mat[mats[i]] < 0) {
                        this.getCore().log(this.getName() + ' doesn`t have enough ' + mats[i] + '.', true);
                        return false;
                    }
                }
            }
        }
        else {
            if (res[mats].storage - mat[mats] < 0) {
                this.getCore().log(this.getName() + ' doesn`t have enough ' + mats + '.', true);
                return false;
            }
        }
        return true;
    };
    
    /**
     * Use the materials required for this building's production.
     * 
     * @public
     * @param {String|Array} material
     * @returns {zupolis.building}
     */
    this.useMaterial = function(material) {
        var building = this.getBuildingData();
        //var res = this.getCityResources();
        var mat = building.materials;
        if (typeof material === 'object') {
            for (var i = 0; i < material.length; i++) {
                this.getCity().removeResource(material[i], mat[material[i]]);
                //res[material[i]].storage = res[material[i]].storage - mat[material[i]];
                this.getCore().log(this.getName() + ' used ' + mat[material[i]] + ' ' + material[i] + '.');
            }
        }
        else {
            this.getCity().removeResource(material, mat[material]);
            //res[material].storage = res[material].storage - mat[material];
            this.getCore().log(this.getName() + ' used ' + mat[material] + ' ' + material + '.');
        }
        return this;
    };
    
    /**
     * Get building data from the main configuration array.
     * 
     * @public
     * @returns {Object}
     */
    this.getBuildingData = function() {
        return zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(this.type)];
    };
    
    /**
     * Get building data.
     * 
     * @public
     * @returns {Object}
     */
    this.getData = function() {
        return this.data;
    };
    
    /**
     * Get the city resources object
     * 
     * @public
     * @returns {Object}
     */
    this.getCityResources = function() {
        return this.getCity().getResources();
    };
    
    /**
     * Produce the materials.
     * 
     * @public
     * @param {String|Array} material
     * @returns {zupolis.building}
     */
    this.produceMaterial = function(material) {
        var building = this.getBuildingData();
        var prd = building.production;
        if (typeof material === 'object') {
            for (var i = 0; i < material.length; i++) {
                if (!this.isProducing()) {
                    this.getCore().log(this.getName() + ' production is stopped.');
                    return this;
                }
                var amount = prd[material[i]] * this.getLevel();
                if (this.getCity().hasStorageSpaceFor(amount)) {
                    this.getCity().addToStorage(material[i], amount);
                    if (typeof building.chance !== 'undefined') {
                        for (var item in building.chance) {
                            var rnd = Math.random();
                            if (rnd < building.chance[item]) {
                                this.getCore().log(this.getName() + ' procced extra ' + zupolis.RESOURCES[item].name + '.');
                                this.getCity().addToStorage(item, 1);
                            }
                        }
                    }
                    this.getCore().log(this.getName() + ' produced ' + amount + ' ' + material[i] + '.');
                }
            }

        }
        else {
            var amount = prd[material] * this.getLevel();
            if (this.getCity().hasStorageSpaceFor(amount)) {
                if (!this.isProducing()) {
                    this.getCore().log(this.getName() + ' production is stopped.');
                    return this;
                }
                this.getCity().addToStorage(material, amount);
                if (typeof building.chance !== 'undefined') {
                    for (var item in building.chance) {
                        var rnd = Math.random();
                        if (rnd < building.chance[item]) {
                            this.getCore().log(this.getName() + ' procced extra ' + zupolis.RESOURCES[item].name + '.');
                            this.getCity().addToStorage(item, 1);
                        }
                    }
                }
                this.getCore().log(this.getName() + ' produced ' + amount + ' ' + material + '.');
            }
        }
        return this;
    };
    
    /**
     * Process the materials and use the required ones.
     * 
     * @public
     * @returns {zupolis.building}
     * @param {String|Array} matsProduction
     * @param {String|Array} matsUse
     */
    this.processMats = function(matsProduction, matsUse) {
        if (typeof matsUse !== 'undefined') {
            if (this.hasMaterials(matsUse)) {
                this.useMaterial(matsUse);
                this.produceMaterial(matsProduction);
            }
        }
        else {
            this.produceMaterial(matsProduction);
        }
        return this;
    };
    
    /**
     * Raise the fame of the city this building is located in.
     * 
     * @public
     * @returns {Number}
     */
    this.adjustCityFame = function() {
        var building = this.getBuildingData();
        var prd = building.production;
        var amount = prd.fame * this.getLevel();
        this.getCity().incFameAmount(amount);
        this.getCore().log(this.getName() + ' raised city fame with ' + amount + '.');
        return this.getCity().getFame().amount;
    };
    
    /**
     * Raise the fame of the city this building is located in by converting
     * coins into fame.
     * 
     * @public
     * @returns {Object}
     */
    this.adjustCityFameForCoins = function() {
        var building = this.getBuildingData();
        var mat = building.materials;
        var prd = building.production;
        if (this.getCity().hasCoins(mat.coins)) {
            var amount = prd.fame * this.getLevel();
            this.getCity().incFameAmount(amount);
            this.getCity().decCoinsAmount(mat.coins);
            this.getCore().log(this.getName() + ' raised city fame with ' + amount + ' at the cost of ' + mat.coins + ' coins.');
        }
        return {
            fame: this.getCity().getFame().amount,
            coins: this.getCity().getCoins().amount
        };
    };
    
    /**
     * Calculate if the house has the required food and processes the tax.
     * 
     * @public
     * @returns {zupolis.building}
     */
    this.processTax = function() {
        var _m = [];
        var building = this.getBuildingData();
        var mat = building.materials;
        for (var item in mat) {
            _m.push(item);
        }
        if (_m.length > 0) {
            if (this.hasMaterials(_m)) {
                this.useMaterial(_m);
                var amount = building.tax * this.getLevel();
                this.getCity().incCoinsAmount(amount);
                this.getCore().log(this.getName() + ' gave ' + amount + ' coins via tax.');
            }
        }
        return this;
    };
    
    /**
     * Check if this building has the required additional buildings for production.
     * 
     * @public
     * @returns {Boolean}
     */
    this.hasRequirements = function() {
        var good = true;
        var building = this.getBuildingData();
        if (typeof building.requires.buildings !== 'undefined') {
            var required = building.requires.buildings;
            if (typeof required === 'object') {
                for (var i = 0; i < required.length; i++) {
                    if (!this.getCity().isBuildingBuilt(required[i])) {
                        good = false;
                        var req = zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(required[i])];
                        this.getCore().log(this.getName() + ' doesn`t have the required buildings: ' + req.name + '.', true);
                    }
                }
            }
            else {
                if (!this.getCity().isBuildingBuilt(required)) {
                    good = false;
                    var req = zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(required)];
                    this.getCore().log(this.getName() + ' doesn`t have the required buildings: ' + req.name + '.', true);
                }
            }
        }
        return good;
    };
    
    /**
     * Internal function for further processing of the production chain.
     * 
     * @private
     * @returns {zupolis.building}
     */
    this._process = function() {
        var _p = [];
        var _m = [];
        var building = this.getBuildingData();
        var mat = building.materials;
        for (var item in mat) {
            _m.push(item);
        }
        if (building.isHousing === true) {
            if (_m.length > 0) {
                if (this.hasMaterials(_m)) {
                    this.useMaterial(_m);
                    var amount = building.tax * this.getLevel();
                    this.getCity().incCoinsAmount(amount);
                    this.getCore().log(this.getName() + ' gave ' + amount + ' coins via tax.');
                }
            }
        }
        else {
            if (this.isProducing()) {
                var prd = building.production;
                for (var item in prd) {
                    _p.push(item);
                }
                if (this.hasRequirements()) {
                    if (_m.length > 0) {
                        if (this.hasMaterials(_m)) {
                            this.useMaterial(_m);
                            this.produceMaterial(_p);
                        }
                    }
                    else {
                        this.produceMaterial(_p);
                    }
                }
            }
        }
        return this;
    };
    
    /**
     * Check if this building is the marketplace.
     * 
     * @public
     * @returns {Boolean}
     */
    this.isMarketplace = function() {
        if (this.getType() === 'marketplace') {
            return true;
        }
        return false;
    };
    
    /**
     * Main threading method for the building, this does the actual processing each turn.
     * 
     * @public
     * @returns {zupolis.building}
     */
    this.process = function() {
        var building = this.getBuildingData();
        var res = this.getCityResources();
        var prd = building.production;
        var mat = building.materials;
        switch (this.getType()) {
            /* STORAGE */
            case 'marketplace':
                this.adjustCityFame();
                break;
            case 'warehouse':
                break;
                /* MILITARY */
            case 'camp':
                break;
            case 'castle':
                break;
                /* MUNICIPAL */
            case 'church':
                this.adjustCityFameForCoins();
                break;
            case 'monastery':
                this.adjustCityFameForCoins();
                break;
            case 'tavern':
                this.adjustCityFameForCoins();
                break;
                /* ALL OTHER */
            default:
                this._process();
                break;
        }
        return this;
    };
    
    /**
     * Get the city this building is located into
     * 
     * @public
     * @returns {zupolis.city}
     */
    this.getCity = function() {
        return this.city;
    };
    
    /**
     * Get a pointer to the game core
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.getCore = function() {
        return this.getCity().getCore();
    };
    
    /**
     * Get the name of this building
     * 
     * @public
     * @returns {String}
     */
    this.getName = function() {
        return this.name;
    };
    
    /**
     * Get the level of this building
     * 
     * @public
     * @returns {Number}
     */
    this.getLevel = function() {
        return this.level;
    };
    
    /**
     * Get the type of this building
     * 
     * @public
     * @returns {String}
     */
    this.getType = function() {
        return this.type;
    };
    
    // Fire up the constructor
    return this.__constructor(params);
};