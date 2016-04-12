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
zupolis.event = function (params) {

    /**
     * Reference to the core object.
     * 
     * @type {zupolis.game}
     */
    this.core = null;

    this.name = null;

    this.handle = null;

    this.chance = 0;

    this.effect = null;
    
    this.description = null;

    this.data = null;

    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.event}
     * @param {Object} params
     */
    this.__constructor = function (params) {
        this.core = params.core;
        this.name = params.name;
        this.handle = params.handle;
        this.chance = params.chance;
        this.description = params.description;
        this.data = params.data;
        this.effect = params.effect;
        this.process();
        return this;
    };

    /**
     * Process the event data.
     * 
     * @public
     * @returns {Boolean}
     */
    this.process = function () {
        var random = Math.random().toFixed(4);
        if (random < this.chance) {
            this._process();
            return true;
        }
        return false;
    };

    this.notify = function() {
        this.core._notify({
            title: 'Event occured: ' + this.name,
            content: this.description.replace(/CITY/g, this.data.city).replace(/AMOUNT/g, this.data.amount),
            timeout: false,
            other: true
        });
    };
    
    /**
     * Internal function for processing the event data.
     * 
     * @private
     * @returns {zupolis.event}
     */
    this._process = function () {
        this.notify();
        switch (this.effect) {
            case zupolis.EVENT_EFFECT_LOSE_COINS:
                this.core.getCity().decCoinsAmount(this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_GAIN_COINS:
                this.core.getCity().incCoinsAmount(this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_RAISE_INFLUENCE:
                this.core.getCity().raiseInfluence(this.core.getCity(this.data.city), this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_LOWER_INFLUENCE:
                this.core.getCity().lowerInfluence(this.core.getCity(this.data.city), this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_GAIN_FAME:
                this.core.getCity().incFameAmount(this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_LOSE_FAME:
                this.core.getCity().decFameAmount(this.data.amount);
                break;
            case zupolis.EVENT_EFFECT_DESTROY_BUILDING:
                break;
        }
        return this;
    };

    // Fire up the constructor
    return this.__constructor(params);
};