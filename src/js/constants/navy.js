'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * List of ship types, their attributes and cost.
 * 
 * @type {Object}
 * @constant
 */
zupolis.SHIP_TYPES = {
    'Corsair': {
        id: zupolis.SHIP_TYPE_CORSAIR,
        attack: 5,
        defense: 5,
        cost: {
            coins: 1000,
            wood: 200,
            leather: 50,
            iron: 50,
            bread: 50,
            meat: 50,
            wine: 20,
            clothes: 50,
            ropes: 10,
            cannons: 5
        }
    },
    'Caravel': {
        id: zupolis.SHIP_TYPE_CARAVEL,
        attack: 10,
        defense: 10,
        cost: {
            coins: 3000,
            wood: 400,
            leather: 60,
            iron: 80,
            bread: 60,
            meat: 60,
            wine: 30,
            clothes: 60,
            ropes: 30,
            cannons: 20,
            weapons: 10
        }
    },
    'Warship': {
        id: zupolis.SHIP_TYPE_WARSHIP,
        attack: 35,
        defense: 30,
        cost: {
            coins: 10000,
            wood: 1000,
            leather: 200,
            iron: 500,
            bread: 200,
            meat: 200,
            wine: 200,
            clothes: 200,
            ropes: 100,
            cannons: 50,
            weapons: 20,
            carpets: 10
        }
    }
};

/**
 * Corsair ship.
 * 
 * @constant
 * @type {Number}
 */
zupolis.SHIP_TYPE_CORSAIR = 0;

/**
 * Caravel ship.
 * 
 * @constant
 * @type {Number}
 */
zupolis.SHIP_TYPE_CARAVEL = 1;

/**
 * Warship ship.
 * 
 * @constant
 * @type {Number}
 */
zupolis.SHIP_TYPE_WARSHIP = 2;
