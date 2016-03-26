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
 * Main Zupolis core game object.
 * 
 * @class {zupolis.game}
 * @returns {zupolis.__constructor}
 */
zupolis.game = function () {

    /**
     * List of all the cities in the game.
     * 
     * @type {Array}
     * @private
     */
    this.cities = [];

    //this.worldmap = false;

    /**
     * Pointer to the audio subsystem component.
     * 
     * @private
     * @type {Object}
     */
    this.music = null;

    /**
     * Time day.
     * 
     * @type {Number}
     * @private
     */
    this.day = 1;

    /**
     * Time year.
     * 
     * @type {Number}
     * @private
     */
    this.year = 1;

    /**
     * Time month.
     * 
     * @type {Number}
     * @private
     */
    this.month = 1;

    /**
     * Time day of month 1-30.
     * 
     * @type {Number}
     * @private
     */
    this.dayOfMonth = 1;

    /**
     * Black Market data.
     * 
     * @public
     * @type {Object}
     */
    this.blackMarket = {};

    /**
     * Pointer to an instance of the game API object.
     * 
     * @type {zupolis.api}
     * @private
     */
    this.api = null;

    /**
     * Pointer to an instance of the game Jailer object.
     * 
     * @type {zupolis.jailer}
     * @private
     */
    this.jailer = null;

    /**
     * Game settings
     * 
     * @type {Object}
     * @private
     */
    this.settings = {};

    /**
     * Object constructor.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this.__constructor = function () {
        var clicked = false;
        var clickY, clickX;
        var self = this;
        this.jailer = new zupolis.jailer({
            core: this
        });
        this.setupAudio();
        $('.game').on({
            mousemove: function (e) {
                clicked && updateScrollPos(e);
            },
            mousedown: function (e) {
                clicked = true;
                clickY = e.pageY;
                clickX = e.pageX;
                $('html').css('cursor', '-moz-grab');
            },
            mouseup: function () {
                clicked = false;
                $('html').css('cursor', 'auto');
            }
        });
        var updateScrollPos = function (e) {
            $(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
            $(window).scrollLeft($(window).scrollLeft() + (clickX - e.pageX));
        };
        this._setupStartUI();
        this._setupToolbar();
        if (localStorage.getItem('zupolis.data') !== null) {
            this.startGame();
        }
        $('.toolbar').on('click', '.do-options', function () {
            new zupolis.panelWindow({
                core: self,
                id: 'options',
                header: 'Game Options',
                type: 'window'
            });
            return false;
        }).on('click', '.do-worldmap', function () {
            new zupolis.panelWorld({
                core: self
            });
            return false;
        }).on('click', '.do-trades', function () {
            new zupolis.panelTrades({
                core: self
            });
            return false;
        }).on('click', '.do-rankings', function () {
            new zupolis.panelRankings({
                core: self
            });
            return false;
        }).on('click', '.do-advisor', function () {
            new zupolis.panelAdvisor({
                core: self
            });
            return false;
        }).on('click', '.do-storage', function () {
            new zupolis.panelStorage({
                core: self
            });
            return false;
        }).on('click', '.do-build', function () {
            new zupolis.panelBuildings({
                core: self
            });
            return false;
        });
        $('.console').on('click', '.down', function () {
            $('.console .contents').scrollTo('+=97px', 500);
        }).on('click', '.up', function () {
            $('.console .contents').scrollTo('-=97px', 500);
        });
        this.api = new zupolis.api({
            core: this
        });
        return this;
    };

    /**
     * Return a pointer to the API object.
     * 
     * @returns {zupolis.api}
     * @public;
     */
    this.getAPI = function() {
        return this.api;
    };
    
    /**
     * Return a pointer to the Jailer object.
     * 
     * @public
     * @returns {zupolis.jailer}
     */
    this.getJailer = function() {
        return this.jailer;
    };
    
    /**
     * Add the specified resource amount and the total price to the
     * Black Market goods list.
     * 
     * @public
     * @param {String} resource
     * @param {Number} amount
     * @param {Number} price
     * @returns {Object}
     */
    this.addBlackMarket = function (resource, amount, price) {
        this.blackMarket[resource] = {
            resource: resource,
            amount: amount,
            price: price
        };
        return this.blackMarket;
    };

    /**
     * Set game storage data.
     * 
     * @param {String} key
     * @param {Mixed} value
     * @public
     * @returns {zupolis.game}
     */
    this.setStorageData = function (key, value) {
        localStorage.setItem('zupolis.' + key, value);
        return this;
    };

    /**
     * Retrieve game storage data.
     * 
     * @param {String} key
     * @public
     * @returns {Mixed}
     */
    this.getStorageData = function (key) {
        return localStorage.getItem('zupolis.' + key);
    };

    /**
     * Set game settings.
     * 
     * @param {String} key
     * @param {Mixed} value
     * @public
     * @returns {zupolis.game}
     */
    this.setSettings = function (key, value) {
        this.settings[key] = value;
        return this;
    };

    /**
     * Retrieve game settings.
     * 
     * @param {String} key
     * @public
     * @returns {zupolis.game.settings}
     */
    this.getSettings = function (key) {
        return this.settings[key];
    };

    /**
     * Reset the Black Market goods.
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.resetBlackMarket = function () {
        var total = 0;
        for (var item in this.blackMarket) {
            this.getCity().incCoinsAmount(this.blackMarket[item].price);
            total += this.blackMarket[item].price;
        }
        this.blackMarket = {};
        this.refreshUI();
        $('#tab-blackmarket > .contents > table > tbody').empty();
        if (total > 0) {
            this.notify(this.getCity().getName() + ' ' + zupolis.l('received') + ' ' + total + ' ' + zupolis.l('coins from the Black Market for selling goods.'), zupolis.l('Black Market'));
        }
        return this;
    };

    /**
     * Return the Black Market goods list.
     * 
     * @public
     * @returns {Object}
     */
    this.getBlackMarket = function () {
        return this.blackMarket;
    };

    /**
     * Set the Black Market goods list to the specified value.
     * 
     * @public
     * @param {Object} value
     * @returns {zupolis.game}
     */
    this.setBlackMarket = function (value) {
        if (typeof value !== 'undefined') {
            this.blackMarket = value;
        }
        else {
            this.blackMarket = {};
        }
        return this;
    };

    /**
     * Setup the start screen UI.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this._setupStartUI = function () {
        var self = this;
        var avatar = 1;
        for (var i = 1; i < zupolis.CLIMATE_TYPES.length; i++) {
            $('.start .climate').append('<option value="' + zupolis['CLIMATE_TYPE_' + zupolis.CLIMATE_TYPES[i].toUpperCase()] + '">' + zupolis.CLIMATE_TYPES[i].capitalize() + '</option>');
        }
        for (var i = 1; i < zupolis.NATION_TYPES.length; i++) {
            $('.start .nation').append('<option value="' + zupolis['NATION_TYPE_' + zupolis.NATION_TYPES[i].toUpperCase()] + '">' + zupolis.NATION_TYPES[i].capitalize() + '</option>');
        }
        for (var i = 1; i <= zupolis.AVATARS; i++) {
            $('.start .avatar-select').append('<img src="' + zupolis.ASSETS_URL + 'images/avatars/avatar' + i + '.png" />');
        }
        $('.start').on('click', '.do-start', function () {
            var name = $('.start .name').val();
            var cityname = $('.start .cityname').val();
            var nation = $('.start .nation').val();
            var climate = $('.start .climate').val();
            if (name === '') {
                self.error('Enter your ruler name, for example <strong>Ramses</strong>.', 'Error', true);
                return false;
            }
            if (cityname === '') {
                self.error('Enter your city name, for example <strong>Alexandria</strong>.', 'Error', true);
                return false;
            }
            self.startGame(name, cityname, nation, climate, avatar);
            return false;
        }).on('click', '.down', function () {
            if (avatar < zupolis.AVATARS) {
                avatar = avatar + 1;
            }
            $('.start .avatar-select').scrollTo('+=64px', 500);
        }).on('click', '.up', function () {
            if (avatar > 1) {
                avatar = avatar - 1;
            }
            $('.start .avatar-select').scrollTo('-=64px', 500);
        });
        return this;
    };

    /**
     * Start the game.
     * 
     * @returns {zupolis.game}
     * @public
     * @param {String} name
     * @param {String} cityname
     * @param {Number} nation
     * @param {Number} climate
     * @param {Number} avatar
     */
    this.startGame = function (name, cityname, nation, climate, avatar) {
        var self = this;
        var data = null;
        if (localStorage.getItem('zupolis.data') !== null) {
            data = this._loadMainCity();
        }
        else {
            this._setupMainCity(name, cityname, nation, climate, avatar);
        }
        this.setupNeighbours(data);
        this.save();
        if (localStorage.getItem('zupolis.data') !== null) {
            //this._doDaily();
        }
        $('section.start').remove();
        $('header .cityname').html(this.getCity().getName());
        $('header .cityavatar').css({
            'background-image': 'url(' + zupolis.ASSETS_URL + 'images/avatars/avatar' + this.getCity().getAvatar() + '.png)'
        });
        this.refreshUI();
        setInterval(function () {
            self._doDaily();
        }, 12000);
        $('.tips').tipsy({
            gravity: $.fn.tipsy.autoNS,
            html: true
        });
        return this;
    };

    /**
     * Set the current game date.
     * 
     * @public
     * @param {Object} data
     * @returns {zupolis.game}
     */
    this.setDateTime = function (data) {
        this.day = data.day;
        this.month = data.month;
        this.year = data.year;
        this.dayOfMonth = data.dayOfMonth;
        return this;
    };

    /**
     * Setup the audio part of the game.
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.setupAudio = function () {
        this.music = $('#music').get(0);
        this.music.volume = 0.2;
        if (zupolis.AUTOSTART_MUSIC === true) {
            this.music.play();
        }
        return this;
    };

    /**
     * Get a pointer to the player's city.
     * 
     * @public
     * @param {String} name
     * @returns {zupolis.city}
     */
    this.getCity = function (name) {
        if (typeof name !== 'undefined' && typeof name === 'string') {
            var cities = this.getCities();
            for (var i = 0; i < cities.length; i++) {
                var city = cities[i];
                if (city.getName() === name) {
                    return city;
                }
            }
        }
        else {
            return this.cities[0];
        }
        return false;
    };

    /**
     * Load the main city data from the browser localstorage.
     * 
     * @private
     * @returns {Object}
     */
    this._loadMainCity = function () {
        var data = JSON.parse(window.atob(localStorage.getItem('zupolis.data')));
        var myCity = new zupolis.city({
            name: data.name,
            data: {
                nationality: data.nationality,
                ruler: data.ruler,
                climate: data.climate,
                personality: zupolis.PERSONALITY_TYPE_BALANCED,
                avatar: data.avatar,
                level: data.level
            },
            core: this
        });
        myCity.importData(data);
        this.cities.push(myCity);
        this.getCity()._createBuildings(data.buildings);
        return data;
    };

    /**
     * Setup the main city.
     * 
     * @private
     * @param {String} name
     * @param {String} cityname
     * @param {Number} nation
     * @param {Number} climate
     * @param {Number} avatar
     * @returns {zupolis.game}
     */
    this._setupMainCity = function (name, cityname, nation, climate, avatar) {
        var myCity = new zupolis.city({
            name: cityname,
            data: {
                nationality: nation,
                ruler: name,
                climate: climate,
                personality: zupolis.PERSONALITY_TYPE_BALANCED,
                avatar: avatar
            },
            core: this
        });
        this.cities.push(myCity);
        this.getCity()._createBuildings(zupolis.BUILDINGS_START);
        return this;
    };

    /**
     * Get building data from the main configuration array.
     * 
     * @public
     * @param {String|Number} handle
     * @returns {Object}
     */
    this.getBuildingConfigData = function (handle) {
        if (typeof handle === 'string') {
            return zupolis.BUILDINGS[zupolis.BUILDINGS.findIndexM(handle)];
        }
        else if (typeof handle === 'number') {
            for (var i = 0; i < zupolis.BUILDINGS.length; i++) {
                if (zupolis.BUILDINGS[i].handle === handle) {
                    return zupolis.BUILDINGS[i];
                }
            }
        }
        else {
            return false;
        }
    };

    /**
     * Method that gets called each 'day'.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this._doDaily = function () {
        this.day++;
        this.log('day ' + this.dayOfMonth + ' month ' + this.month + ' year ' + this.year);
        var buildings = this.getCity().getBuildings();
        for (var i = 0; i < buildings.length; i++) {
            if (typeof buildings[i] !== 'undefined') {
                buildings[i].process();
            }
        }
        var ev = zupolis.EVENTS[getRandom(0, zupolis.EVENTS.length - 1)];
        ev.core = this;
        new zupolis.event(ev);
        this.calculateStorage();
        this.refreshUI();
        this.dayOfMonth++;
        if (this.dayOfMonth > 30) {
            this._doMonthly();
        }
        if (this.day >= 360) {
            this._doYearly();
            this.day = 1;
            this.month = 1;
        }
        this.save();
        return this;
    };

    /**
     * Save the game data.
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.save = function () {
        this.getCity().exportData(true);
        return this;
    };

    /**
     * Method that gets called each 'month'.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this._doMonthly = function () {
        this.dayOfMonth = 1;
        this.month++;
        this.resetBlackMarket();
        return this;
    };

    /**
     * Method that gets called each 'year'.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this._doYearly = function () {
        var cities = this.getCities();
        for (var i = 1; i < cities.length; i++) {
            cities[i].resetTrades();
            this.getCity().lowerInfluence(cities[i].getName(), zupolis.YEARLY_INFLUENCE_LOSS);
        }
        this.getCity().releaseMercenaries();
        this.year++;
        return this;
    };

    /**
     * Log data to the console.
     * 
     * @public
     * @param {String} message
     * @param {Boolean} error
     * @returns {zupolis.game}
     */
    this.log = function (message, error) {
        if (typeof message !== 'undefined') {
            $('.ui .console .contents').prepend('<div' + ((typeof error !== 'undefined' && error === true) ? ' class="error"' : '') + '>' + '<span>' + zupolis.utils.getNow() + '</span> - ' + message + '</div>');
        }
        else {
            $('.ui .console .contents').prepend('<div class="separator"></div>');
        }
        return this;
    };

    /**
     * Log data to the browser console.
     * 
     * @param {String} message
     * @param {Boolean} error
     * @public
     * @returns {zupolis.game}
     */
    this.consoleLog = function (message, error) {
        if (zupolis.DEBUG === true) {
            console.log((typeof error === true ? 'APP error: ' : 'APP message: ') + message);
        }
        return this;
    };

    /**
     * Return the game date in a more manageable form.
     * 
     * @public
     * @returns {String}
     */
    this.getDate = function () {
        return 'day ' + this.dayOfMonth + ' month ' + this.month + ' year ' + this.year;
    };

    /**
     * Perform a normal notification in the game.
     * 
     * @public
     * @param {String} message
     * @param {String} title
     * @param {Number} timeout
     * @returns {zupolis.game}
     */
    this.notify = function (message, title, timeout) {
        this._notify({
            title: (typeof title !== 'undefined') ? title : 'Message',
            content: message,
            timeout: typeof timeout !== 'undefined' ? timeout : 15000
        });
        this.log(message);
        return this;
    };

    /**
     * Internal function for performing an UI notification.
     * 
     * @param {type} settings
     * @returns {zupolis.game}
     * @private
     */
    this._notify = function (settings) {
        var container, notty, hide, image, right, left, inner;
        settings = $.extend({
            title: undefined,
            content: undefined,
            timeout: 15000,
            img: zupolis.ASSETS_URL + 'images/ui/icon1.png',
            showTime: true,
            error: false,
            other: false
        }, settings);
        container = $(".notifications");
        if (!container.length) {
            container = $("<div>", {
                'class': "notifications"
            }).appendTo(document.body);
        }
        notty = $("<div>");
        notty.addClass("notty");
        hide = $("<div>", {
            click: function () {
                $(this).parent().delay(300).queue(function () {
                    $(this).clearQueue();
                    $(this).remove();
                });
            },
            touchstart: function () {
                $(this).parent().delay(300).queue(function () {
                    $(this).clearQueue();
                    $(this).remove();
                });
            }
        });
        hide.addClass("hide");
        if (settings.error === true) {
            notty.addClass('error');
            settings.img = zupolis.ASSETS_URL + 'images/ui/icon2.png';
        }
        if (settings.other === true) {
            notty.addClass('other');
            settings.img = zupolis.ASSETS_URL + 'images/ui/city.png';
        }
        image = $("<div>", {
            style: "background: url('" + settings.img + "')"
        });
        image.addClass("img");
        left = $("<div class='left'>");
        right = $("<div class='right'>");
        var htmlTitle = "<h2>" + settings.title + "</h2>";
        var htmlContent = settings.content;
        inner = $("<div>", {
            html: htmlTitle + htmlContent
        });
        inner.addClass("inner");
        inner.appendTo(right);
        image.appendTo(left);
        left.appendTo(notty);
        right.appendTo(notty);
        hide.appendTo(notty);
        function timeSince(time) {
            var time_formats = [[2, "One second", "1 second from now"], [60, "seconds", 1], [120, "One minute", "1 minute from now"], [3600, "minutes", 60], [7200, "One hour", "1 hour from now"], [86400, "hours", 3600], [172800, "One day", "tomorrow"], [604800, "days", 86400], [1209600, "One week", "next week"], [2419200, "weeks", 604800], [4838400, "One month", "next month"], [29030400, "months", 2419200], [58060800, "One year", "next year"], [2903040000, "years", 29030400], [5806080000, "One century", "next century"], [58060800000, "centuries", 2903040000]];
            var seconds = (new Date - time) / 1000;
            var list_choice = 1;
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                list_choice = 1;
            }
            var i = 0, format;
            while (format = time_formats[i++]) {
                if (seconds < format[0]) {
                    if (typeof format[2] === "string") {
                        return format[list_choice];
                    }
                    else {
                        return Math.floor(seconds / format[2]) + " " + format[1];
                    }
                }
            }
            return time;
        }
        var timestamp = Number(new Date());
        var timeHTML = $("<div>", {
            html: "<strong>" + timeSince(timestamp) + "</strong> ago"
        });
        timeHTML.addClass("time").attr("title", timestamp);
        timeHTML.appendTo(right);
        setInterval(function () {
            $(".time").each(function () {
                var timing = $(this).attr("title");
                $(this).html("<strong>" + timeSince(timing) + "</strong> ago");
            });
        }, 4000);
        notty.hover(function () {
            hide.show();
        }, function () {
            hide.hide();
        });
        notty.prependTo(container);
        notty.show();
        if (settings.timeout) {
            setTimeout(function () {
                notty.delay(300).queue(function () {
                    $(this).clearQueue();
                    $(this).remove();
                });
            }, settings.timeout);
        }
        return this;
    };

    /**
     * Perform an error notification in the game.
     * 
     * @public
     * @param {String} message
     * @param {String} title
     * @param {Boolean} noConsole
     * @returns {zupolis.game}
     */
    this.error = function (message, title, noConsole) {
        this._notify({
            title: (typeof title !== 'undefined') ? title : 'Error',
            error: true,
            content: message
        });
        if (typeof noConsole === 'undefined' || noConsole === false) {
            this.log(message, true);
        }
        return this;
    };

    /**
     * Calculate and return the total and free storage space in the main city.
     * 
     * @public
     * @returns {Object}
     */
    this.calculateStorage = function () {
        var storage = this.getCity().getStorageSpace();
        if (storage.occupied >= storage.all) {
            this.error('You ran out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'No storage space');
        }
        else if ((storage.all - storage.occupied) < 100) {
            this.error('You will soon run out of storage space and all goods produced will be lost. Upgrade your warehouse or marketplace.', 'Storage nearly full');
        }
        return storage;
    };

    /**
     * Refresh all the UI information after a property change.
     * 
     * @public
     * @returns {zupolis.game}
     */
    this.refreshUI = function () {
        var city = this.getCity();
        var storageSpace = city.getStorageSpace();
        var needed = zupolis.LEVELS[city.getLevel()];
        $('.citylevel').html(city.getLevel());
        $('.cityprestige').html(city.getPrestige());
        for (var i = 0; i < zupolis.TOOLBAR_RESOURCES.length; i++) {
            var resource = zupolis.TOOLBAR_RESOURCES[i];
            var el = $('.top-panel .' + resource);
            if (typeof city.resources[resource] !== 'undefined') {
                el.attr('title', city.resources[resource].storage + ' ' + city.resources[resource].name);
            }
        }
        if (city.getFameAmount() >= needed) {
            city.levelUp();
        }
        $('header .cityfame > span').css({
            width: (city.getFameAmount() * 100) / needed + '%'
        });
        if ($('#panel-storage').length) {
            for (var resource in zupolis.RESOURCES) {
                if (resource !== 'fame') {
                    $('#panel-storage div.item-' + resource + ' span.amount').html(city.resources[resource].storage);
                }
            }
        }
        $('.citydate').empty().append(this.getDate());
        $('.citystorage').html(storageSpace.occupied);
        $('.top-panel > span').tipsy({
            gravity: 'n'
        });
        return this;
    };

    /**
     * Get the list of all the cities in game.
     * 
     * @public
     * @returns {Array}
     */
    this.getCities = function () {
        return this.cities;
    };

    /**
     * Create all the other cities in the world.
     * 
     * @public
     * @param {Object} data
     * @returns {zupolis.game}
     */
    this.setupNeighbours = function (data) {
        var newCity = null;
        for (var item in zupolis.CITIES) {
            newCity = new zupolis.city({
                name: item,
                data: zupolis.CITIES[item],
                core: this
            });
            //city._build(zupolis['CITY_BUILDINGS_' + zupolis.CLIMATE_TYPES[zupolis.CITIES[item].climate].toUpperCase()], true);
            newCity._createBuildings(zupolis.BUILDINGS_ALL, true);
            newCity.setupArmy(true);
            newCity.setupNavy(true);
            if (data !== null) {
                this.getCity().influence[item] = data.influence[item];
                newCity.trades = data.trades[item];
            }
            else {
                this.getCity().influence[item] = 50;
            }
            this.cities.push(newCity);
        }
        return this;
    };

    /**
     * Get the list of imports and exports from all the world cities (except main).
     * 
     * @private
     * @returns {Object}
     */
    this._getNeighboursTrades = function () {
        var data = {};
        var cities = this.getCities();
        for (var i = 1; i < cities.length; i++) {
            data[cities[i].getName()] = cities[i].getTrades();
        }
        return data;
    };

    /**
     * Setup the top bar with the resources.
     * 
     * @private
     * @returns {zupolis.game}
     */
    this._setupToolbar = function () {
        var _t = '';
        for (var i = 0; i < zupolis.TOOLBAR_RESOURCES.length; i++) {
            _t += '<span class="' + zupolis.TOOLBAR_RESOURCES[i] + '"></span>';
        }
        $('.top-panel').empty().append(_t);
        return this;
    };

    /**
     * Get the version of the game.
     * 
     * @public
     * @returns {String}
     */
    this.getVersion = function() {
        return zupolis.VERSION;
    };
    
    // Fire up the constructor
    return this.__constructor();
};

$(document).ready(function () {
    new zupolis.game();
});