'use strict';

if (typeof zupolis === 'undefined')
    var zupolis = {};

/**
 * Buildings native to the tropical climate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.BUILDINGS_TROPICAL = [

    /* Municipal */
    'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'camp', 'castle', 'shipyard', 'embassy',

    /* Housing */
    'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7', 'house8', 'house9',

    /* Food Production */
    'mill', 'bakery', 'butcher',

    /* Mines */
    'coppermine', 'ironmine', 'saltmine',

    /* Smelters */
    'goldsmelter', 'coppersmelter', 'ironsmelter',

    /* Industry */
    'lumberjack', 'stone', 'trapper', 'tannery', 'furrier', 'armory', 'coffeeroaster', 'quartzfactory', 'winery', 'saltworks',
    'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill', 'perfumery', 'weaver',

    /* Farms */
    'almondsfarm', 'almondsfield', 'cattlefarm', 'cattlefield', 'coffeefarm', 'coffeefield', 'grainfarm', 'grainfield',
    'grapesfarm', 'grapesfield', 'hempfarm', 'hempfield', 'pigfarm', 'pigfield', 'sugarfarm', 'sugarfield', 'indigofarm'
];

/**
 * Buildings native to the polar climate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.CITY_BUILDINGS_POLAR = [

    /* Municipal */
    'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'camp', 'castle', 'shipyard', 'embassy',

    /* Housing */
    'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',

    /* Food Production */
    'mill', 'bakery', 'butcher',

    /* Mines */
    'coppermine', 'goldmine', 'ironmine',

    /* Smelters */
    'goldsmelter', 'coppersmelter', 'ironsmelter',

    /* Industry */
    'lumberjack', 'stone', 'trapper', 'tannery', 'furrier', 'armory', 'coffeeroaster', 'quartzfactory', 'winery', 'saltworks',
    'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill', 'perfumery', 'weaver'
];

/**
 * Buildings native to the arid climate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.CITY_BUILDINGS_ARID = [

    /* Municipal */
    'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'camp', 'castle', 'shipyard', 'embassy',

    /* Housing */
    'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',

    /* Food Production */
    'mill', 'bakery', 'butcher',

    /* Mines */
    'coppermine', 'goldmine', 'ironmine', 'saltmine',

    /* Smelters */
    'goldsmelter', 'coppersmelter', 'ironsmelter',

    /* Industry */
    'lumberjack', 'stone', 'trapper', 'tannery', 'furrier', 'armory', 'coffeeroaster', 'quartzfactory', 'winery', 'saltworks',
    'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill', 'perfumery', 'weaver',

    /* Farms */
    'cattlefarm', 'cattlefield', 'pigfarm', 'pigfield'
];

/**
 * Buildings native to the continental climate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.CITY_BUILDINGS_CONTINENTAL = [

    /* Municipal */
    'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'camp', 'castle', 'shipyard', 'embassy',

    /* Housing */
    'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7', 'house8', 'house9',

    /* Food Production */
    'mill', 'bakery', 'butcher',

    /* Mines */
    'coppermine', 'goldmine', 'ironmine', 'saltmine',

    /* Smelters */
    'goldsmelter', 'coppersmelter', 'ironsmelter',

    /* Industry */
    'lumberjack', 'stone', 'trapper', 'tannery', 'furrier', 'armory', 'coffeeroaster', 'quartzfactory', 'winery', 'saltworks',
    'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill', 'perfumery', 'weaver',

    /* Farms */
    'cattlefarm', 'cattlefield', 'ciderfarm', 'ciderfield', 'grainfarm', 'grainfield', 'grapesfarm', 'grapesfield',
    'hempfarm', 'hempfield', 'pigfarm', 'pigfield', 'silkfarm', 'silkfield', 'rosenursery'
];

/**
 * Buildings native to the temperate climate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.CITY_BUILDINGS_TEMPERATE = [

    /* Municipal */
    'marketplace', 'warehouse', 'tradingpost', 'church', 'monastery', 'camp', 'castle', 'shipyard', 'embassy',

    /* Housing */
    'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7', 'house8', 'house9',

    /* Food Production */
    'mill', 'bakery', 'butcher',

    /* Mines */
    'coppermine', 'goldmine', 'ironmine', 'saltmine',

    /* Smelters */
    'goldsmelter', 'coppersmelter', 'ironsmelter',

    /* Industry */
    'lumberjack', 'stone', 'trapper', 'tannery', 'furrier', 'armory', 'coffeeroaster', 'quartzfactory', 'winery', 'saltworks',
    'charcoalburnerhut', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'sugarmill', 'perfumery', 'weaver',

    /* Farms */
    'cattlefarm', 'cattlefield', 'ciderfarm', 'ciderfield', 'grainfarm', 'grainfield', 'grapesfarm', 'grapesfield',
    'hempfarm', 'hempfield', 'pigfarm', 'pigfield', 'indigofarm'
];

/**
 * Minimal buildings for a city to operate.
 * 
 * @constant
 * @type {Array}
 */
zupolis.BUILDINGS_START = [
    'marketplace',
    'lumberjack',
    'stone',
    'house1',
    'house2'
];

/**
 * All the buildings for a city.
 * 
 * @constant
 * @type {Array}
 */
zupolis.BUILDINGS_ALL = [
    'marketplace', 'lumberjack', 'camp', 'warehouse', 'mill', 'castle', 'stone', 'ironmine', 'trapper', 'almondsfarm', 'almondsfield',
    'shipyard', 'pigfarm', 'cattlefarm', 'pigfield', 'cattlefield', 'house1', 'house2', 'house3', 'house4', 'house5', 'house6', 'house7',
    'house8', 'house9', 'church', 'bakery', 'butcher', 'grainfarm', 'grainfield', 'ironsmelter', 'tannery', 'furrier', 'saltmine',
    'coppermine', 'goldmine', 'goldsmelter', 'coppersmelter', 'armory', 'coffeefarm', 'coffeefield', 'hempfarm', 'hempfield', 'sugarfarm',
    'sugarfield', 'silkfarm', 'silkfield', 'coffeeroaster', 'quartzfactory', 'grapesfarm', 'grapesfield', 'winery', 'saltworks',
    'charcoalburnerhut', 'monastery', 'opticiansworkshop', 'papermill', 'printingpress', 'redsmithsworkshop', 'ropeyard', 'glassworks',
    'apiary', 'barrelcooperage', 'brewery', 'candlemakersworkshop', 'indigofarm', 'ciderfarm', 'ciderfield', 'sugarmill', 'rosenursery',
    'perfumery', 'tradingpost', 'weaver', 'embassy'
];

/**
 * Buildings' categories.
 * 
 * @constant
 * @type {Object}
 */
zupolis.BUILDINGS_CATEGORIES = {
    'Municipal': [
        'church',
        'embassy',
        'marketplace',
        'monastery',
        'shipyard',
        'tradingpost',
        'warehouse'
    ],
    'Housing': [
        'house1',
        'house2',
        'house3',
        'house4',
        'house5',
        'house6',
        'house7',
        'house8',
        'house9'
    ],
    'Food': [
        'bakery',
        'butcher',
        'mill'
    ],
    'Mines': [
        'coppermine',
        'goldmine',
        'ironmine',
        'saltmine'
    ],
    'Farms': [
        'almondsfarm',
        'almondsfield',
        'cattlefarm',
        'cattlefield',
        'ciderfarm',
        'ciderfield',
        'coffeefarm',
        'coffeefield',
        'grainfarm',
        'grainfield',
        'grapesfarm',
        'grapesfield',
        'hempfarm',
        'hempfield',
        'indigofarm',
        'pigfarm',
        'pigfield',
        'silkfarm',
        'silkfield',
        'sugarfarm',
        'sugarfield'
    ],
    'Industry': [
        'apiary',
        'armory',
        'barrelcooperage',
        'brewery',
        'candlemakersworkshop',
        'charcoalburnerhut',
        'coffeeroaster',
        'coppersmelter',
        'furrier',
        'glassworks',
        'goldsmelter',
        'ironsmelter',
        'lumberjack',
        'opticiansworkshop',
        'papermill',
        'perfumery',
        'printingpress',
        'quartzfactory',
        'redsmithsworkshop',
        'ropeyard',
        'rosenursery',
        'saltworks',
        'stone',
        'sugarmill',
        'trapper',
        'tannery',
        'weaver',
        'winery'
    ],
    'Military': [
        'camp',
        'castle'
    ]
};

/**
 * List of all Zupolis buildings.
 * 
 * @constant
 * @type {Array}
 */
zupolis.BUILDINGS = [{
        name: 'Marketplace',
        handle: 'marketplace',
        description: 'The marketplace is the main building of your city and provides a place ' +
            'for the inhabitants of your settlement to gather. It cannot be demolished.',
        storage: 100000,
        upgrades: 4,
        visibleUpgrades: true,
        production: {
            fame: 10
        },
        cost: {
            coins: 100000
        },
        position: {
            x: 709,
            y: 515
        },
        requires: {
            cityLevel: 1
        }
    }, {
        name: 'Warehouse',
        handle: 'warehouse',
        description: 'The warehouse is a trade building that provides market carts that pick up ' +
            'goods from production buildings. A warehouse also adds extra storage space for the ' +
            'materials in your city.',
        storage: 100000,
        upgrades: 3,
        visibleUpgrades: true,
        position: {
            x: 1162,
            y: 365
        },
        cost: {
            coins: 5000,
            wood: 50,
            stones: 50
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Church',
        handle: 'church',
        description: 'A church provides a massive fame boost to your settlement by using coins and ' +
            'converting them to fame.',
        isMunicipal: true,
        isProduction: true,
        production: {
            fame: 50
        },
        materials: {
            coins: 50
        },
        visibleUpgrades: true,
        position: {
            x: 560,
            y: 428
        },
        upgrades: 3,
        cost: {
            coins: 10000,
            wood: 10,
            stones: 10
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Trading Post',
        handle: 'tradingpost',
        description: 'The Trading Post allows you to trade resources with other cities.',
        isMunicipal: true,
        position: {
            x: 1740,
            y: 330
        },
        upgrades: 3,
        cost: {
            coins: 3000,
            wood: 40,
            stones: 40
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Embassy',
        handle: 'embassy',
        description: 'An Embassy is required to propose pacts, declare war, send goods to other ' +
            'cities.',
        isMunicipal: true,
        production: {
            fame: 20
        },
        materials: {
            coins: 20
        },
        position: {
            x: 680,
            y: 400
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 100,
            stones: 100
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Monastery',
        handle: 'monastery',
        description: 'Monastery provides fame for your city in exchange for coins.',
        isMunicipal: true,
        isProduction: true,
        production: {
            fame: 20
        },
        materials: {
            coins: 20
        },
        position: {
            x: 680,
            y: 400
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 100,
            stones: 100
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Shipyard',
        handle: 'shipyard',
        description: 'The shipyard helps you expand your settlement overseas by providing you ' +
            'with ships and an ultra-small chance to gather pearls.',
        isProduction: true,
        position: {
            x: 1746,
            y: 552
        },
        upgrades: 3,
        chance: {
            pearls: 0.05
        },
        cost: {
            coins: 10000,
            wood: 100,
            stones: 100
        },
        production: {
            fish: 4
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Military Camp',
        handle: 'camp',
        description: 'The military camp is your main base of defense and attack until you can ' +
            'develop a Castle.',
        upgrades: 3,
        position: {
            x: 1461,
            y: 153
        },
        cost: {
            coins: 5000,
            wood: 200,
            stones: 160
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Castle',
        handle: 'castle',
        description: 'The castle is your main base of operations. It provides your city with ' +
            'soldiers and some extra fame.',
        isProduction: true,
        production: {
            fame: 100
        },
        upgrades: 2,
        visibleUpgrades: true,
        position: {
            x: 982,
            y: 77
        },
        materials: {
            coins: 20
        },
        cost: {
            coins: 200000,
            wood: 500,
            stones: 500
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Lumberjack',
        handle: 'lumberjack',
        description: 'A lumberjack provides you with wood which you can use for creating additional ' +
            'buildings or sell.',
        isProduction: true,
        production: {
            wood: 3
        },
        upgrades: 3,
        position: {
            x: 129,
            y: 755
        },
        cost: {
            coins: 2000,
            stones: 20
        },
        requires: {
            cityLevel: 1
        }
    }, {
        name: 'Stone Quarry',
        handle: 'stone',
        description: 'Stone quarries produce stone blocks that are the basis of any buildings you ' +
            'wish to construct.',
        isProduction: true,
        production: {
            stones: 1,
            clay: 1
        },
        position: {
            x: 469,
            y: 243
        },
        upgrades: 3,
        cost: {
            coins: 2000,
            wood: 20
        },
        requires: {
            cityLevel: 1
        }
    }, {
        name: 'Gold Mine',
        handle: 'goldmine',
        description: 'The gold mine extracts gold ores from the mountains you own (provided you ' +
            'own some).',
        isProduction: true,
        production: {
            goldores: 4,
            clay: 1
        },
        position: {
            x: 342,
            y: 253
        },
        upgrades: 3,
        chance: {
            gems: 0.01
        },
        cost: {
            coins: 3000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Iron Mine',
        handle: 'ironmine',
        description: 'The iron mine extracts iron ores from the mountains you own (provided you own ' +
            'some).',
        isProduction: true,
        production: {
            ironores: 4,
            clay: 1
        },
        position: {
            x: 640,
            y: 182
        },
        upgrades: 3,
        chance: {
            gems: 0.01
        },
        cost: {
            coins: 2000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Salt Mine',
        handle: 'saltmine',
        description: 'A salt mine extracts brine that can be processed further into salt in a Salt ' +
            'Works.',
        isProduction: true,
        production: {
            brine: 1,
            clay: 1
        },
        position: {
            x: 172,
            y: 258
        },
        upgrades: 3,
        cost: {
            coins: 1000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Copper Mine',
        handle: 'coppermine',
        description: 'The copper mine extracts copper from the mountains you own (provided you own ' +
            'some).',
        isProduction: true,
        production: {
            copper: 4,
            clay: 1
        },
        position: {
            x: 732,
            y: 133
        },
        upgrades: 3,
        chance: {
            gems: 0.01
        },
        cost: {
            coins: 2000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 5
        }
    }, {
        name: 'Salt Works',
        handle: 'saltworks',
        description: 'Salt Works requires coal and brine, and it produces salt. Salt is used for ' +
            'leather jerkins by the tannery, meat by the butcher`s shop and fur coats by the ' +
            'furrier`s workshop.',
        isProduction: true,
        production: {
            salt: 4
        },
        materials: {
            coal: 2,
            brine: 2
        },
        position: {
            x: 1234,
            y: 418
        },
        upgrades: 3,
        cost: {
            coins: 3000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Mill',
        handle: 'mill',
        description: 'The Mill produces flour from the wheat cultivated by your farm(s).',
        isProduction: true,
        production: {
            flour: 4
        },
        materials: {
            wheat: 2
        },
        position: {
            x: 1234,
            y: 418
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Bakery',
        handle: 'bakery',
        description: 'The Bakery creates bread from flour, thus providing your settlers with basic ' +
            'food.',
        isProduction: true,
        production: {
            bread: 5
        },
        materials: {
            flour: 3
        },
        position: {
            x: 1003,
            y: 223
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 30,
            stones: 30
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Armory',
        handle: 'armory',
        description: 'The Armory is a major building that produces weapons. If you want to conquer ' +
            'others, you will need one.',
        isProduction: true,
        production: {
            weapons: 1
        },
        materials: {
            iron: 2,
            leather: 1,
            brass: 1
        },
        position: {
            x: 863,
            y: 131
        },
        upgrades: 3,
        cost: {
            coins: 6000,
            wood: 100,
            stones: 100
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Butcher',
        handle: 'butcher',
        description: 'The butcher slaughters cattle for meat, providing food that is more ' +
            'nutritious. Hides will be processed at the Tannery.',
        isProduction: true,
        production: {
            meat: 4,
            hides: 2
        },
        materials: {
            cattle: 1,
            salt: 1
        },
        position: {
            x: 1082,
            y: 297
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 40,
            stones: 40
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Iron smelter',
        handle: 'ironsmelter',
        description: 'The iron smelter (or foundry) smelts iron ores into iron bars using coal, ' +
            'ready to be transformed into weapons.',
        isProduction: true,
        production: {
            iron: 4
        },
        materials: {
            ironores: 4,
            coal: 1
        },
        position: {
            x: 153,
            y: 381
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 40,
            stones: 50
        },
        requires: {
            cityLevel: 4
        }
    }, {
        name: 'Copper smelter',
        handle: 'coppersmelter',
        description: 'The copper smelter smelts copper into brass using coal.',
        isProduction: true,
        production: {
            brass: 1
        },
        materials: {
            copper: 4,
            coal: 1
        },
        position: {
            x: 483,
            y: 327
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 50,
            stones: 50
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Gold smelter',
        handle: 'goldsmelter',
        description: 'The gold smelter transforms gold ores into gold bars using coal.',
        isProduction: true,
        production: {
            gold: 1
        },
        materials: {
            goldores: 4,
            coal: 1
        },
        position: {
            x: 628,
            y: 292
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 55,
            stones: 55
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Trapper`s Lodge',
        handle: 'trapper',
        description: 'The trapper captures wild animals and uses the furs from them.',
        isProduction: true,
        production: {
            furs: 4
        },
        position: {
            x: 1238,
            y: 131
        },
        upgrades: 3,
        cost: {
            coins: 2000,
            wood: 40,
            stones: 40
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Furrier`s Workshop',
        handle: 'furrier',
        description: 'The furrier uses furs from the Trapper`s Lodge mixed with salt and processes ' +
            'them into fur coats that will help your settlers during the cold winters.',
        isProduction: true,
        production: {
            furcoats: 1
        },
        materials: {
            furs: 2,
            salt: 2
        },
        position: {
            x: 1355,
            y: 496
        },
        upgrades: 3,
        cost: {
            coins: 3000,
            wood: 30,
            stones: 40
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Weaver`s Hut',
        handle: 'weaver',
        description: 'The weaver uses hemp to produce linen clothes.',
        isProduction: true,
        production: {
            clothes: 1
        },
        materials: {
            hemp: 4
        },
        position: {
            x: 1355,
            y: 496
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 40,
            stones: 40
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Tannery',
        handle: 'tannery',
        description: 'The tannery produces leather clothes from animal hides.',
        isProduction: true,
        production: {
            leather: 2
        },
        materials: {
            hides: 2,
            salt: 1
        },
        upgrades: 3,
        position: {
            x: 1490,
            y: 552
        },
        cost: {
            coins: 3000,
            wood: 35,
            stones: 40
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Coffee roaster',
        handle: 'coffeeroaster',
        description: 'The coffee roaster uses the coffee beans from your Coffee Farm and processes ' +
            'them into coffee.',
        isProduction: true,
        production: {
            coffee: 1
        },
        materials: {
            coffeebeans: 4
        },
        position: {
            x: 905,
            y: 292
        },
        upgrades: 3,
        cost: {
            coins: 7000,
            wood: 80,
            stones: 60
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Sugar Mill',
        handle: 'sugarmill',
        description: 'The Sugar Mill creates sugar from sugar cane.',
        isProduction: true,
        production: {
            sugar: 1
        },
        materials: {
            sugarcane: 4
        },
        position: {
            x: 1260,
            y: 740
        },
        upgrades: 3,
        cost: {
            coins: 7000,
            wood: 80,
            stones: 60
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Winery',
        handle: 'winery',
        description: 'The Winery uses the grapes from your Grapes Farm and processes them into wine.',
        isProduction: true,
        production: {
            wine: 1
        },
        materials: {
            grapes: 4,
            barrels: 1
        },
        position: {
            x: 1020,
            y: 380
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 50,
            stones: 40
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Optician`s Shop',
        handle: 'opticiansworkshop',
        description: 'The optician uses brass and quartz to create glasses for your settlers.',
        isProduction: true,
        production: {
            glasses: 1
        },
        materials: {
            brass: 2,
            quartz: 2
        },
        position: {
            x: 1160,
            y: 820
        },
        upgrades: 3,
        cost: {
            coins: 8100,
            wood: 70,
            stones: 70
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Paper Mill',
        handle: 'papermill',
        description: 'The Paper Mill uses wood to produce paper, which is used along with indigo to ' +
            'produce books at the Printing House.',
        isProduction: true,
        production: {
            paper: 2
        },
        materials: {
            wood: 1
        },
        position: {
            x: 1600,
            y: 500
        },
        upgrades: 3,
        cost: {
            coins: 8300,
            wood: 60,
            stones: 50
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Printing Press',
        handle: 'printingpress',
        description: 'The printing press produces books using paper and indigo.',
        isProduction: true,
        production: {
            books: 1
        },
        materials: {
            paper: 8,
            indigo: 1
        },
        position: {
            x: 1260,
            y: 900
        },
        upgrades: 3,
        cost: {
            coins: 8400,
            wood: 100,
            stones: 100
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Perfumery',
        handle: 'perfumery',
        description: 'The Perfumery processes the rose oil into perfume to satisfy the needs of ' +
            'your settlers.',
        isProduction: true,
        production: {
            perfume: 1
        },
        materials: {
            roses: 8
        },
        position: {
            x: 920,
            y: 660
        },
        upgrades: 3,
        cost: {
            coins: 8200,
            wood: 80,
            stones: 40
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Redsmith`s Workshop',
        handle: 'redsmithsworkshop',
        description: 'The Redsmith`s Workshop processes brass and candles into candlesticks.',
        isProduction: true,
        production: {
            candlesticks: 1
        },
        materials: {
            brass: 3,
            candles: 2
        },
        position: {
            x: 1020,
            y: 730
        },
        upgrades: 3,
        cost: {
            coins: 7500,
            wood: 70,
            stones: 50
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Ropeyard',
        handle: 'ropeyard',
        description: 'The ropeyard produces ropes that are needed for your city`s ships.',
        isProduction: true,
        production: {
            ropes: 1
        },
        materials: {
            hemp: 1
        },
        position: {
            x: 1700,
            y: 700
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 70,
            stones: 60
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Glassworks',
        handle: 'glassworks',
        description: 'The Glassworks processes quartz into glass.',
        isProduction: true,
        production: {
            glass: 1
        },
        materials: {
            quartz: 2
        },
        position: {
            x: 1380,
            y: 340
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 50,
            stones: 80
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Quartz factory',
        handle: 'quartzfactory',
        description: 'The quartz factory provides your city with quartz.',
        isProduction: true,
        production: {
            quartz: 3
        },
        position: {
            x: 349,
            y: 382
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 50,
            stones: 90
        },
        requires: {
            cityLevel: 8
        }
    }, {
        name: 'Apiary',
        handle: 'apiary',
        description: 'The apiary produces bees wax for use in candles.',
        isProduction: true,
        production: {
            wax: 3
        },
        position: {
            x: 1700,
            y: 340
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 50,
            stones: 40
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Barrel Cooperage',
        handle: 'barrelcooperage',
        description: 'The barrel cooperage creates barrels from wood and iron.',
        isProduction: true,
        production: {
            barrels: 2
        },
        materials: {
            wood: 3,
            iron: 1
        },
        position: {
            x: 1630,
            y: 800
        },
        upgrades: 3,
        cost: {
            coins: 4100,
            wood: 80,
            stones: 70
        },
        requires: {
            cityLevel: 9
        }
    }, {
        name: 'Brewery',
        handle: 'brewery',
        description: 'The Brewery brews beer from wheat. Beer is needed for bigger hourses or ships.',
        isProduction: true,
        production: {
            beer: 2
        },
        materials: {
            barrels: 1,
            wheat: 2
        },
        position: {
            x: 1020,
            y: 600
        },
        upgrades: 3,
        cost: {
            coins: 4200,
            wood: 60,
            stones: 70
        },
        requires: {
            cityLevel: 9
        }
    }, {
        name: 'Candlemaker`s Hut',
        handle: 'candlemakersworkshop',
        description: 'The Candlemaker Hut produces candles for your settlers` houses.',
        isProduction: true,
        production: {
            candles: 1
        },
        materials: {
            wax: 2,
            hemp: 1
        },
        position: {
            x: 770,
            y: 250
        },
        upgrades: 3,
        cost: {
            coins: 6400,
            wood: 80,
            stones: 60
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Charcoal Burner`s Hut',
        handle: 'charcoalburnerhut',
        description: 'The Charcoal Burner`s Hut burns wood into coal that is needed by all your ' +
            'smelters.',
        isProduction: true,
        production: {
            coal: 4
        },
        materials: {
            wood: 1
        },
        position: {
            x: 1480,
            y: 250
        },
        upgrades: 3,
        cost: {
            coins: 5000,
            wood: 50,
            stones: 50
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'House',
        handle: 'house1',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 5,
        cost: {
            wood: 10,
            coins: 1000
        },
        materials: {
            bread: 1
        },
        position: {
            x: 790,
            y: 340
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 1
        }
    }, {
        name: 'House',
        handle: 'house2',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 10,
        cost: {
            wood: 10,
            coins: 2000
        },
        materials: {
            bread: 1
        },
        position: {
            x: 849,
            y: 412
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 1
        }
    }, {
        name: 'House',
        handle: 'house3',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 15,
        cost: {
            wood: 10,
            stones: 20,
            coins: 3000
        },
        materials: {
            bread: 1,
            meat: 1
        },
        position: {
            x: 945,
            y: 480
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'House',
        handle: 'house4',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 20,
        cost: {
            wood: 10,
            stones: 20,
            coins: 4000
        },
        materials: {
            bread: 1,
            meat: 1
        },
        position: {
            x: 860,
            y: 552
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'House',
        handle: 'house5',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 25,
        cost: {
            wood: 25,
            stones: 35,
            coins: 5000
        },
        materials: {
            fish: 2,
            meat: 2,
            beer: 1
        },
        position: {
            x: 764,
            y: 613
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'House',
        handle: 'house6',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 30,
        cost: {
            wood: 30,
            stones: 45,
            coins: 6000
        },
        materials: {
            fish: 2,
            meat: 2,
            wine: 1
        },
        position: {
            x: 663,
            y: 659
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'House',
        handle: 'house7',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 35,
        cost: {
            wood: 40,
            stones: 80,
            coins: 7000
        },
        materials: {
            fish: 2,
            meat: 2,
            wine: 1,
            candlesticks: 1
        },
        position: {
            x: 579,
            y: 601
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'House',
        handle: 'house8',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 40,
        cost: {
            wood: 50,
            stones: 100,
            coins: 8000
        },
        materials: {
            fish: 2,
            meat: 2,
            wine: 1,
            candlesticks: 1,
            furcoats: 1
        },
        position: {
            x: 520,
            y: 530
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 25
        }
    }, {
        name: 'House',
        handle: 'house9',
        description: 'Houses provide coins through taxes and space for your settlers.',
        isHousing: true,
        tax: 45,
        cost: {
            wood: 100,
            stones: 200,
            coins: 10000
        },
        materials: {
            fish: 2,
            meat: 2,
            wine: 1,
            candlesticks: 1,
            furcoats: 1,
            perfume: 1
        },
        position: {
            x: 447,
            y: 463
        },
        upgrades: 5,
        visibleUpgrades: true,
        requires: {
            cityLevel: 30
        }
    }, {
        name: 'Cider Farm',
        handle: 'ciderfarm',
        description: 'The cider farm produces cider, a basic drink for your settlers',
        isProduction: true,
        production: {
            cider: 1,
            herbs: 1
        },
        position: {
            x: 1500,
            y: 882
        },
        upgrades: 3,
        cost: {
            coins: 4000,
            wood: 50,
            stones: 30
        },
        requires: {
            cityLevel: 4,
            buildings: 'ciderfield'
        }
    }, {
        name: 'Cider field',
        handle: 'ciderfield',
        description: 'A cider field is required for the cider farm to operate.',
        position: {
            x: 1400,
            y: 840
        },
        cost: {
            coins: 1000,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 4
        }
    }, {
        name: 'Almonds farm',
        handle: 'almondsfarm',
        isProduction: true,
        description: 'The Almonds Farm cultivates almonds for export.',
        production: {
            almonds: 1
        },
        upgrades: 3,
        position: {
            x: 280,
            y: 569
        },
        cost: {
            coins: 8000,
            wood: 30,
            stones: 30
        },
        requires: {
            cityLevel: 16,
            buildings: 'almondsfield'
        }
    }, {
        name: 'Almonds field',
        handle: 'almondsfield',
        description: 'An almonds field is required for the almonds farm to operate.',
        position: {
            x: 205,
            y: 636
        },
        cost: {
            coins: 1200,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Cattle Farm',
        handle: 'cattlefarm',
        description: 'A cattle farm grows cattle so your settlers can eat food that is more ' +
            'nutritious than bread.',
        isProduction: true,
        production: {
            cattle: 1,
            milk: 1
        },
        upgrades: 3,
        materials: {
            herbs: 2
        },
        position: {
            x: 905,
            y: 783
        },
        cost: {
            coins: 3000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 2,
            buildings: 'cattlefield'
        }
    }, {
        name: 'Cattle field',
        handle: 'cattlefield',
        description: 'A cattle field is required for the cattle farm to operate.',
        position: {
            x: 816,
            y: 838
        },
        cost: {
            coins: 800,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 2
        }
    }, {
        name: 'Pig Farm',
        handle: 'pigfarm',
        description: 'A pig farm grows pigs so your settlers can eat food that is more nutritious ' +
            'than bread.',
        isProduction: true,
        production: {
            meat: 1
        },
        upgrades: 3,
        materials: {
            herbs: 2
        },
        position: {
            x: 823,
            y: 712
        },
        cost: {
            coins: 3000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 3,
            buildings: 'pigfield'
        }
    }, {
        name: 'Pig field',
        handle: 'pigfield',
        description: 'A pig field is required for the pig farm to operate.',
        position: {
            x: 730,
            y: 770
        },
        cost: {
            coins: 800,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 3
        }
    }, {
        name: 'Grain farm',
        handle: 'grainfarm',
        description: 'A grain farm cultivates wheat that will be later transformed into bread, ' +
            'and your settlers will live happily ever after.',
        isProduction: true,
        production: {
            wheat: 3,
            herbs: 1
        },
        upgrades: 3,
        position: {
            x: 1027,
            y: 859
        },
        cost: {
            coins: 2000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 2,
            buildings: 'grainfield'
        }
    }, {
        name: 'Grain field',
        handle: 'grainfield',
        description: 'A grain field is required for the grain farm to operate.',
        position: {
            x: 1103,
            y: 915
        },
        cost: {
            coins: 500,
            wood: 10,
            clay: 5
        },
        requires: {
            cityLevel: 2
        }
    }, {
        name: 'Grapes farm',
        handle: 'grapesfarm',
        description: 'A grapes farm provides your city with grapes for wine.',
        isProduction: true,
        production: {
            grapes: 2,
            herbs: 1
        },
        upgrades: 3,
        position: {
            x: 1200,
            y: 600
        },
        cost: {
            coins: 4000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 10,
            buildings: 'grapesfield'
        }
    }, {
        name: 'Grapes field',
        handle: 'grapesfield',
        description: 'A grapes field is required for the grapes farm to operate.',
        position: {
            x: 1120,
            y: 670
        },
        cost: {
            coins: 1200,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 10
        }
    }, {
        name: 'Coffee farm',
        handle: 'coffeefarm',
        description: 'A coffee farm provides your city with coffee beans.',
        isProduction: true,
        production: {
            coffeebeans: 2,
            herbs: 1
        },
        upgrades: 3,
        position: {
            x: 244,
            y: 466
        },
        cost: {
            coins: 6000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 16,
            buildings: 'coffeefield'
        }
    }, {
        name: 'Coffee field',
        handle: 'coffeefield',
        description: 'A coffee field is required for the coffee farm to operate.',
        position: {
            x: 181,
            y: 532
        },
        cost: {
            coins: 2000,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Hemp farm',
        handle: 'hempfarm',
        description: 'A hemp farm provides your city with hemp.',
        isProduction: true,
        production: {
            hemp: 2,
            herbs: 1
        },
        upgrades: 3,
        position: {
            x: 347,
            y: 698
        },
        cost: {
            coins: 4000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 6,
            buildings: 'hempfield'
        }
    }, {
        name: 'Hemp field',
        handle: 'hempfield',
        description: 'A hemp field is required for the hemp farm to operate.',
        position: {
            x: 281,
            y: 758
        },
        cost: {
            coins: 1000,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 6
        }
    }, {
        name: 'Silk farm',
        handle: 'silkfarm',
        description: 'A silk farm provides your city with silk.',
        isProduction: true,
        production: {
            silk: 2
        },
        upgrades: 3,
        position: {
            x: 456,
            y: 745
        },
        cost: {
            coins: 8000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 20,
            buildings: 'silkfield'
        }
    }, {
        name: 'Silk field',
        handle: 'silkfield',
        description: 'A silk field is required for the silk farm to operate.',
        position: {
            x: 363,
            y: 819
        },
        cost: {
            coins: 1400,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Sugar farm',
        handle: 'sugarfarm',
        description: 'A sugar cane farm provides your city with sugar cane.',
        isProduction: true,
        production: {
            sugarcane: 2,
            herbs: 1
        },
        upgrades: 3,
        position: {
            x: 536,
            y: 804
        },
        cost: {
            coins: 10000,
            wood: 20,
            stones: 20
        },
        requires: {
            cityLevel: 20,
            buildings: 'sugarfield'
        }
    }, {
        name: 'Sugar field',
        handle: 'sugarfield',
        description: 'A sugar field is required for the sugar farm to operate.',
        position: {
            x: 449,
            y: 862
        },
        cost: {
            coins: 4000,
            wood: 10,
            clay: 10
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Indigo farm',
        handle: 'indigofarm',
        isProduction: true,
        description: 'The indigo farm produces indigo that can be used to create books.',
        production: {
            indigo: 1
        },
        upgrades: 3,
        position: {
            x: 260,
            y: 870
        },
        cost: {
            coins: 5000,
            wood: 30,
            stones: 30,
            clay: 30
        },
        requires: {
            cityLevel: 16
        }
    }, {
        name: 'Rose Nursery',
        handle: 'rosenursery',
        isProduction: true,
        description: 'The Rose Nursery produces rose oil which is needed to make perfume.',
        production: {
            roses: 1
        },
        upgrades: 3,
        position: {
            x: 440,
            y: 630
        },
        cost: {
            coins: 7000,
            wood: 50,
            stones: 50,
            clay: 50
        },
        requires: {
            cityLevel: 20
        }
    }, {
        name: 'Spice Farm',
        handle: 'spicefarm',
        isProduction: true,
        description: 'The Spice Farm is responsable for the production of spices.',
        production: {
            spices: 1
        },
        upgrades: 3,
        position: {
            x: 260,
            y: 870
        },
        cost: {
            coins: 10000,
            wood: 60,
            stones: 60,
            clay: 60
        },
        requires: {
            cityLevel: 20
        }
    }];