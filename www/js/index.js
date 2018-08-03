/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var button = {
    service: "FFE0",
    data: "FFE1", // Bit 2: side key, Bit 1- right key, Bit 0 –left key
};
var fLastGyroAngleX = 0;
var fLastGyroAngleY = 0;
var fLastGyroAngleZ = 0;
var fgxA = [], fgyA = [], fgzA = [];
var fgxM, fgyM, fgzM = null;
var temperature = {
    service: "F000AA00-0451-4000-B000-000000000000",
    data:  "F000AA01-0451-4000-B000-000000000000",
    configuration: "F000AA02-0451-4000-B000-000000000000"
};
var filterAngle;
var dt=0.02;

// http://processors.wiki.ti.com/index.php/SensorTag_User_Guide#Accelerometer_2
var accelerometer = {
    // service: "F000AA00-0451-4000-B000-000000000000",
    // data: "F000AA01-0451-4000-B000-000000000000", // read/notify 3 bytes X : Y : Z
    // configuration: "F000AA02-0451-4000-B000-000000000000", // read/write 1 byte
    // period: "F000AA03-0451-4000-B000-000000000000" // read/write 1 byte Period = [Input*10]ms
    service: "F000AA80-0451-4000-B000-000000000000",
    data: "F000AA81-0451-4000-B000-000000000000", // read/notify 3 bytes X : Y : Z
    configuration: "F000AA82-0451-4000-B000-000000000000", // read/write 1 byte
    period: "F000AA83-0451-4000-B000-000000000000" // read/write 1 byte Period = [Input*10]ms
};

function intFromBytes( x ){
    var val = 0;
    for (var i = 0; i < x.length; ++i) {
        val += x[i];
        if (i < x.length-1) {
            val = val << 8;
        }
    }
    return val;
}

function getInt64Bytes( x ){
    var bytes = [];
    var i = 8;
    do {
    bytes[--i] = x & (255);
    x = x>>8;
    } while ( i );
    return bytes;
}
var app = {
    breakouthtml: '<!-- Top Bar --><div class="game-notifications clearfix"><div class="instr">Score : 0</div><ul class="life"><li class="heart"></li><li class="heart"></li><li class="heart"></li></ul></div><!-- Game Container --><div class="container"><canvas id="breakout-game" height="430" width="460"></canvas></div><div class="container"><div class="instr-footer"><small>Use left and right keys to move paddle.<br>Press spacebar to start game.    </small><button onclick="startButtonPressed()">Play game</button></div><button onclick="window.location.reload()">Game is stuck</button></div><!-- Modal for game over --><div class="modal-overlay"></div><div class="modal-box"><h3>Game Over</h3><p class="modal-message">Congratulations, you\'ve beaten the game.</p><a href="#" class="btn-play-again">Back to main screen</a></div><!-- Load Jquery 1.11.3 --><script src="js/jquery.js"></script>',
    buildHtml: false,
    up: false,
    right: false,
    right2: false,
    down: false,
    left: false,
    left2: false,
    device: null,
    ios: false,
    android: false,
    gameIsOver: false,
    players: [],
    enemies: [],
    counter: 0,
    json: {},
    charCount: 0,
    charItem: 0,
    goblinCount: 0,
    goblinItem: 1,
    enemiesCount: 1,
    mapToUse: 'map',
    moveToNextLevel: false,
    aX: 0,
    countdownTimer: null,
    logging: 0,
    enemies_counter: -1,
    mapNro: 0,
    clear_top_list_date: 0,
    use_top_list: true,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        detailPage.hidden = true;
        detailPage_cvsm.hidden = true;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        refreshButton.addEventListener('touchstart', this.refreshDeviceList, false);
        disconnectButton.addEventListener('touchstart', this.disconnect, false);
        leader_board.addEventListener('touchstart', this.clear_top_list, false);
        disconnectButton_cvsm.addEventListener('touchstart', this.disconnect, false);
        document.getElementById('mazeLogo').addEventListener('touchstart', this.startGame, false);
        // document.getElementById('boLogo').addEventListener('touchstart', this.startBreakout, false);
        document.getElementById('catvsmouse').addEventListener('touchstart', this.catvsmouse, false);
        //deviceList.addEventListener('touchstart', this.connect, false); // assume not scrolling
    },
    clear_top_list: function() {
        var temp_date = Date.now();
        console.log(temp_date - app.clear_top_list_date);
        if (temp_date - app.clear_top_list_date < 250) {
            var r = confirm("Clear top list?");
            if (r == true) {
                // txt = "You pressed OK!";
                localStorage.removeItem("catvsmouse_data");
            } else {
                // txt = "You pressed Cancel!";
            }
            app.top_lists();
        }
        app.clear_top_list_date = temp_date;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var typeofDevice = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if (typeofDevice == "iPad" || typeofDevice == "iPhone") {
            app.ios = true;
        } else {
            app.android = true;
        }
        console.log('deviceready');
        app.refreshDeviceList();
        if (localStorage.getItem('charItem') !== null) {
            app.charItem = eval(localStorage.getItem('charItem'));
        }
        if (localStorage.getItem('goblinItem') !== null) {
            app.goblinItem = eval(localStorage.getItem('goblinItem'));
        }
        if (localStorage.getItem('enemies') !== null) {
            app.enemiesCount = localStorage.getItem('enemies');
        }
        // TODO character selection and speed + opposite
        // 0 - 26 x24px
        for (var i = 0; i < 27; i++) {
            if (i === 0 || i == 12 || i == 13 || i == 19 || i == 20 || i == 23 || i == 24 || i == 25) {
                app.players.push(i);
                $('#characters').append('<div id="'+i+'" onclick="app.handlePlayer('+i+')" class="character char_'+i+'" style="width: 30px; height: 30px; background: url(./img/sf2-characters.png) 0 -'+i*24+'px; margin: 5px; display: inline-block;"></div>');
            } else if (i == 2 || i == 6 || i == 7 || i == 8) {
                console.log('something else');
            } else {
                app.enemies.push(i);
                $('#opposition').append('<div id="'+i+'" onclick="app.handleEnemy('+i+')" class="character char_'+i+'" style="width: 30px; height: 30px; background: url(./img/sf2-characters.png) 0 -'+i*24+'px; margin: 5px; display: inline-block;"></div>');
            }
        }
        setTimeout(function() {
            $('.char_'+app.charItem).css({'border': '3px solid red'});
            $('.char_'+app.goblinItem).css({'border': '3px solid blue'});
            $('#enemiesCounter').val(app.enemiesCount);
            // var e = document.getElementById("enemiesCounter");
            // e.options[e.selectedIndex].value = app.enemiesCount;
        }, 700);
        if (sessionStorage.getItem('key') !== null) {
            app.connect(sessionStorage.getItem('key'));
        }
        if (app.use_top_list) {
            app.top_lists();
        }
        // setTimeout(function() {
        //     $.getScript("js/main.js", function(){
        //         console.log("Script loaded but not necessarily executed.");
        //     });
        // }, 100);
    },
    handlePlayer: function(id) {
        $('.char_'+app.charItem).css({'border': '3px solid white'});//'3px solid rgb(4, 183, 4)'});
        // for (var i = 0; i < app.players.length; i++) {
        //     $('#'+app.players[i]).css({'border': '3px solid rgb(4, 183, 4);'});
        // }
        $('.char_'+id).css({'border': '3px solid red'});
        app.charItem = id;
        localStorage.setItem('charItem', id);
    },
    handleEnemy: function(id) {
        $('.char_'+app.goblinItem).css({'border': '3px solid white'});//'3px solid rgb(4, 183, 4)'});
        // for (var i = 0; i < app.enemiesCount.length; i++) {
        //     $('#'+app.enemiesCount[i]).css({'border': '3px solid rgb(4, 183, 4);'});
        // }
        $('.char_'+id).css({'border': '3px solid blue'});
        app.goblinItem = id;
        localStorage.setItem('goblinItem', id);
    },
    enemyCount: function(count) {
        localStorage.setItem("enemies", count)
    },
    refreshDeviceList: function() {
        console.log('refreshDeviceList');
        deviceList.innerHTML = ''; // empties the list
        // scan for all devices
        ble.scan([], 5, app.onDiscoverDevice, app.onError);
    },
    onDiscoverDevice: function(device) {
        console.log('onDiscoverDevice');
        console.log(device);
        // we're not limiting scanning by services, so filter
        // the list for devices with "Sensor" in the name
        if (device.name.match(/sensor/i)) {

            var listItem = document.createElement('div'),
                // html = '<b>' + device.name + '</b><br/>' +
                //     'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                //     device.id +'&nbsp;|&nbsp;<button id="'+device.id+'" onclick="app.connect(\''+device.id+'\');">Connect</button>';
                html = '<button id="'+device.id+'" onclick="app.connect(\''+device.id+'\');">Connect to '+device.name+'</button>';
            listItem.setAttribute("id", device.id);
            listItem.dataset.deviceId = device.id;  // TODO
            listItem.innerHTML = html;
            deviceList.appendChild(listItem);

        }
    },
    connect: function(e) {
        console.log(e);
        // console.log(e.parentElement.dataset.deviceId);
        var deviceId = e;//'C4:BE:84:71:26:81';
        app.device = deviceId;
        $('#'+app.device+' button').css('background', 'green');
        var onConnect = function() {

                ble.startNotification(deviceId, button.service, button.data, app.onButtonData, app.onError);
                // subscribing for incoming data
                ble.startNotification(deviceId, accelerometer.service, accelerometer.data, app.onAccelerometerData, app.onError);
                ble.startNotification(deviceId, temperature.service, temperature.data, app.onTemperatureData, app.onError);
                // turn accelerometer on
                var configData = new Uint16Array(1);
                configData[0] = 0x7F;
                // configData[0] = 0xFF;

                // Accelerometer speed
                var configDataSpeed = new Uint8Array(1);
                configDataSpeed[0] = 0x0A;

                // turn temperature on
                var configDataTemp = new Uint8Array(1);
                configDataTemp[0] = 0x0001;
                
                // ble.write(deviceId, accelerometer.service, accelerometer.configuration, configData.buffer,
                //     function() { console.log("Started accelerometer."); },app.onError);
                if (app.android) {
                    ble.writeWithoutResponse(deviceId, accelerometer.service, accelerometer.period, configDataSpeed.buffer, function(e) { console.log("Set accelerometer speed. " + e); },app.onError);
                    ble.writeWithoutResponse(deviceId, accelerometer.service, accelerometer.configuration, configData.buffer, function(e) { console.log("Started accelerometer. " + e); },app.onError);
                    ble.writeWithoutResponse(deviceId, temperature.service, temperature.configuration, configDataTemp.buffer, function(e) { console.log("Started temperature. " + e); },app.onError);
                } else if (app.ios) {
                    ble.write(deviceId, accelerometer.service, accelerometer.period, configDataSpeed.buffer, function(e) { console.log("Set accelerometer speed. " + e); },app.onError);
                    ble.write(deviceId, accelerometer.service, accelerometer.configuration, configData.buffer, function(e) { console.log("Started accelerometer. " + e); },app.onError);
                    ble.write(deviceId, temperature.service, temperature.configuration, configDataTemp.buffer, function(e) { console.log("Started temperature. " + e); },app.onError);
                }
                    
                // ble.startNotification(deviceId, accelerometer.service, accelerometer.configuration, app.onAccelerometerData, app.onError);

                // ble.writeWithoutResponse(deviceId, temperature.service, temperature.configuration, configDataTemp.buffer, function(e) { console.log("Started temperature. " + e); },app.onError);
                
                disconnectButton.dataset.deviceId = deviceId;
                app.showDeviceList();
                // app.showDetailPage();
                // if (!app.buildHtml) {
                //     // After connection open level
                    
                //     requirejs.config({
                //         baseUrl: 'js'
                //     });
                //     requirejs(['main']);
                //     // setTimeout(function() {
                //         app.buildHtml = true;
                //     // }, 2000);
                // }
            };

        ble.connect(deviceId, onConnect, app.onError);
    },
    onButtonData: function(data) {
        console.log(data);
        var message;
        var a = new Uint8Array(data);
        switch(a[0]) { // should really check the bits in case bit 3 is set too
        case 0:
            message = "No buttons are pressed";
            break;
        case 1:
            message = "Right button is pressed";
            break;
        case 2:
            message = "Left button is pressed";
            break;
        case 3:
            message = "Both buttons are pressed";
            break;
        default:
            message = "Error";
        }

        buttonState.innerHTML = message;
    },
    onTemperatureData: function(data) {

        var a = new Uint16Array(data);
        var temperatureFinal = a[1]/128;
        
        temperatureData.innerHTML = temperatureFinal.toFixed(2)+'°C';
    },
    ab2str: function(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
    onAccelerometerData: function(data) {
        // console.log(data);
        // console.log(app.ab2str(data));
        var view   = new Int16Array(data);
        // ACC
        var fx = (view[3] * 1.0) / (32768/8);
        var fy = (view[4] * 1.0) / (32768/8);
        var fz = (view[5] * 1.0) / (32768/8);
        // app.aX = fx*14*(-1);
        app.aX = fx*5*(-1);
        if(setting.gameState == true) {
            if (parseFloat(app.aX.toFixed(1)) >= 0.2) {
                // left
                app.right2 = false;
                app.left2 = true;
                setting.paddleMoveLeft = true;
                setting.paddleMoveLeft = false;
                // player.doMove(-0.1, 0);
            } else if (parseFloat(app.aX.toFixed(1)) <= -0.2) {
                // right
                app.right2 = true;
                app.left2 = false;
                setting.paddleMoveRight = true;
                setting.paddleMoveRight = false;
                // player.doMove(0.1, 0);
            } else {
                app.right2 = false;
                app.left2 = false;
                setting.paddleMoveLeft = false;
                setting.paddleMoveRight = false;
            }
        }

        // GYRO
        // var fgx = (view[0] * 1.0) / (65536/500);
        // var fgy = (view[1] * 1.0) / (65536/500);
        // var fgz = (view[2] * 1.0) / (65536/500);

        // MAG
        // var fmx = (view[6]);
        // var fmy = (view[7]);
        // var fmz = (view[8]);
        /*
        fy+ == up
        fy- == down
        fx+ == left
        fx- == right
        with value between 0.2 - 0.3
            'UP': [38,87],
            'DOWN': [40,83],
            'LEFT': [37,65],
            'RIGHT': [39,68],
         */
        // console.log(fx.toFixed(1)+' - '+fy.toFixed(1));
        if (app.buildHtml) {
            if (fx.toFixed(1) >= 0.1) {
                // left
                app.right = false;
                app.left = true;
                // setting.paddleMoveLeft = true;
                // setting.paddleMoveLeft = false;
                // player.doMove(-0.1, 0);
            } else if (fx.toFixed(1) <= -0.1) {
                // right
                app.right = true;
                app.left = false;
                // setting.paddleMoveRight = true;
                // setting.paddleMoveRight = false;
                // player.doMove(0.1, 0);
            } else {
                app.right = false;
                app.left = false;
                // setting.paddleMoveLeft = false;
                // setting.paddleMoveRight = false;
            }
            if (fy.toFixed(1) >= 0.1) {
                // up
                app.down = false;
                app.up = true;
                // player.doMove(0, -0.1);
            } else if (fy.toFixed(1) <= -0.1) {
                // down
                app.down = true;
                app.up = false;
                // player.doMove(0, 0.1);
            } else {
                app.down = false;
                app.up = false;
            }
        }
        message = "X: " + fx.toFixed(1) + "<br/>" +
                  "Y: " + fy.toFixed(1) + "<br/>" +
                  "Z: " + fz.toFixed(1);// + "<br/>" +
                  // "GX: " + fgx.toFixed(1) + "<br/>" +
                  // "GY: " + fgy.toFixed(1) + "<br/>" +
                  // "GZ: " + fgz.toFixed(1) + "<br/>" +
                  // "MX: " + fmx.toFixed(1) + "<br/>" +
                  // "MY: " + fmy.toFixed(1) + "<br/>" +
                  // "MZ: " + fmz.toFixed(1);

        accelerometerData.innerHTML = message;

    },
    disconnect: function(event) {
        // var deviceId = event.target.dataset.deviceId;
        var deviceId = app.device;//'C4:BE:84:71:26:81';
        ble.disconnect(deviceId, app.showMainPage, app.onError);
        window.location.reload();
    },
    nextLevel: function() {
        sessionStorage.setItem("app.mapToUse", app.mapToUse);
        // var deviceId = event.target.dataset.deviceId;
        var deviceId = app.device;//'C4:BE:84:71:26:81';
        ble.disconnect(deviceId, app.showMainPage, app.onError);
        window.location.reload();
    },
    showMainPage: function() {
        mainPage.hidden = false;
        detailPage.hidden = true;
        detailPage_cvsm.hidden = true;
    },
    showDeviceList: function() {
        deviceList.hidden = true;
        refreshButton.hidden = true;
    },
    showDetailPage: function() {
        mainPage.hidden = true;
        detailPage.hidden = false;
        detailPage_cvsm.hidden = true;
    },
    showDetailPage_cvsm: function() {
        mainPage.hidden = true;
        detailPage.hidden = true;
        detailPage_cvsm.hidden = false;
    },
    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    },
    startGame: function() {
        var e = document.getElementById("enemiesCounter");
        var val = e.options[e.selectedIndex].value;
        app.enemyCount(val);

        $('.app').css('display', 'none');
        app.showDetailPage();
        sessionStorage.setItem('key', app.device);
        if (!app.buildHtml) {
            // After connection open level
            
            requirejs.config({
                baseUrl: 'js'
            });
            requirejs(['main']);
            // setTimeout(function() {
                app.buildHtml = true;
            // }, 2000);
        }
    },
    startBreakout: function() {
        $('body').append('<div id="gameContainer">'+app.breakouthtml+'</div>');
        $('.app').css('display', 'none');
        sessionStorage.setItem('key', app.device);
        canvas = $('#breakout-game')[0];
        context = canvas.getContext("2d");

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        initBricks();
        init();
        gameStart = setInterval( init , setting.frameSpeed);
        $('.instr-footer small').text('');
        // app.startPhaser();
        // window.location.href="breakout.html";
    },
    catvsmouse: function() {
        // var e = document.getElementById("enemiesCounter");
        // var val = e.options[e.selectedIndex].value;
        // app.enemyCount(val);
        // requirejs.undef('js/catvsmouse/lib/DependencyLoader');
        // requirejs.undef('js/catvsmouse/BackgroundRenderer');
        // requirejs.undef('js/catvsmouse/CharacterRenderer');
        // requirejs.undef('js/catvsmouse/CollisionMap');
        // requirejs.undef('js/catvsmouse/Agent');
        // requirejs.undef('js/catvsmouse/Mob');
        // requirejs.undef('js/catvsmouse/Tileset');
        $('.app').css('display', 'none');
        var pp = $('#player_cvsm').text();
        $('#player_cvsm').empty();
        pp = parseInt(localStorage.getItem("points") ,10);
        if (isNaN(pp)) {
            pp = 0;
        }
        $('#player_cvsm').append(pp);
        app.showDetailPage_cvsm();
        sessionStorage.setItem('key', app.device);
        if (!app.buildHtml) {
            // After connection open level
            
            requirejs.config({
                // urlArgs: "bust=" + (new Date()).getTime(),
                baseUrl: 'js/catvsmouse'
            });
            requirejs(['main']);
            // setTimeout(function() {
                app.buildHtml = true;
            // }, 2000);
        }
    },
    startPhaser: function() {
        game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');
        // var game = new Phaser.Game(360, 640, Phaser.AUTO, 'gameContainer');
        // var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });

        game.state.add('level0', breakout.level0);
        game.state.add('level1', breakout.level1);
        // game.state.add('level2', breakout.level2);

        game.state.start('level0');

    },
    handle_save: function() {
        var points = document.getElementById("player_points").innerHTML;
        document.getElementById("player_points").innerHTML = "";
        var name = document.getElementById("player_name").value;
        document.getElementById("player_name").value = "";
        app.save_cvsm_data(points, name);
    },
    save_cvsm_data: function(points, name) {
        if (localStorage.getItem('catvsmouse_data') !== null) {
            var b={"name": name, "points": points};
            var top_list = JSON.parse(localStorage.getItem('catvsmouse_data'));
            // var top_list = localStorage.getItem('catvsmouse_data');
            top_list.push(b);
            // top_list[top_list.length]=b;
            localStorage.setItem('catvsmouse_data', JSON.stringify(top_list));
        } else {
            var a=[], b={"name": name, "points": points};
            a.push(b);
            localStorage.setItem('catvsmouse_data', JSON.stringify(a));
        }
        app.disconnect();
    },
    top_lists: function() {
        if (localStorage.getItem('catvsmouse_data') !== null) {
            document.getElementById("cat_vs_mouse_top").innerHTML = "";
            var table = "<h3>Cat vs Mouse top list</h3><table>";
            var top_list = JSON.parse(localStorage.getItem('catvsmouse_data'));
            // var top_list = localStorage.getItem('catvsmouse_data');
            top_list.sort(function(a, b) {
                return parseFloat(b.points) - parseFloat(a.points);
            });
            for (var i = 0; i < top_list.length; i++) {
                if (i<10) {
                    console.log(JSON.stringify(top_list[i]));
                    table += "<tr><td><b>"+top_list[i].name+"</b></td><td><i>"+top_list[i].points+"</i></td></tr>";
                }
            }
            table += "</table>";
            document.getElementById("cat_vs_mouse_top").innerHTML = table;
        } else {
            document.getElementById("cat_vs_mouse_top").innerHTML = "";
        }
    }
};




