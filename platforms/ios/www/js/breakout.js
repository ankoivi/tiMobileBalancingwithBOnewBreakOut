var breakout = {};

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
var imgW, imgH;
// function preload() {

//     game.load.atlas('breakout', 'assets/breakout.png', 'assets/breakout.json');
//     game.load.image('starfield', 'assets/samk2.jpg');
//     var img = new Image();
//     img.onload = function() {
//       imgW = this.width;
//       imgH = this.height;
//     };
//     img.src = 'assets/samk2.jpg';
//     // var background = this.game.add.image(0, 0, "lightBlueBackground");
//     // background.anchor.setTo(0.5, 0.5);

// }

// var ball;
// var paddle;
// var bricks;
var level = 0;

var ballOnPaddle = true;

// var lives = 3;
var score = 0;

// var scoreText;
// var livesText;
// var introText;

// var s;

/*function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false;

    game.stage.backgroundColor = "#ffffff";
    var element = $('canvas')[0];
    var x = $(element).width();
    var y = $(element).height();
    x = (x/2)-(imgW/2);
    y = (y/2)-(imgH/1.3);
    console.log(x,y);
    s = game.add.sprite(x, y, 'starfield');
    s.alpha = 0.2;

    

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    bricksFake = game.add.group();
    bricksFake.enableBody = true;
    bricksFake.physicsBodyType = Phaser.Physics.ARCADE;


    var breakoutLevels = [
        {
            level: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        },
        {
            level: [
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4]
            ]
        }
    ];
    // console.log(breakoutLevels[0].level);



    var brick;
    for (var i = 0; i < breakoutLevels[level].level.length; i++) {
        var row = breakoutLevels[level].level[i];
        for (var j = 0; j < row.length; j++) {
            if (row[j] === 0) {
                brick = bricksFake.create(80 + (x * 32), 80 + (y * 17), 'breakout', 'brick_1_1.png', true);
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            } else {
                brick = bricks.create(80 + (j * 32), 80 + (i * 17), 'breakout', 'brick_' + row[j] + '_1.png');
                brick.body.bounce.set(1);
                brick.body.immovable = true;
            }
            console.log(this.frame);
            
        }
    }

    // for (var y = 0; y < 4; y++)
    // {
    //     for (var x = 0; x < 20; x++)
    //     {
    //         brick = bricks.create(80 + (x * 32), 80 + (y * 17), 'breakout', 'brick_' + (y+1) + '_1.png');
    //         brick.body.bounce.set(1);
    //         brick.body.immovable = true;
    //     }
    // }

    paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    paddle.anchor.setTo(0.5, 0.5);
    // paddle.width = 100;
    if (level === 0) {
        paddle.width = 92;
    } else if (level == 1) {
        paddle.width = 70;
    } else {
        paddle.width = 48;
    }

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    ball.events.onOutOfBounds.add(ballLost, this);

    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#000000", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#000000", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#000000", align: "center" });
    introText.anchor.setTo(0.5, 0.5);

    game.input.onDown.add(releaseBall, this);

}

function update () {

    //  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    paddle.x = game.input.x;

    if (paddle.x < 24)
    {
        paddle.x = 24;
    }
    else if (paddle.x > game.width - 24)
    {
        paddle.x = game.width - 24;
    }

    if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }

}

function releaseBall () {

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        if (level === 0) {
            ball.body.velocity.y = -100;
        } else if (level == 1) {
            ball.body.velocity.y = -200;
        } else {
            ball.body.velocity.y = -300;
        }
        ball.body.velocity.x = -75;
        ball.animations.play('spin');
        introText.visible = false;
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x + 16, paddle.y - 16);
        
        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (_ball, _brick) {

    _brick.kill();

    score += 10;

    scoreText.text = 'score: ' + score;

    //  Are they any bricks left?
    if (bricks.countLiving() === 0)
    {
        level += 1;
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        //  And bring the bricks back from the dead :)
        bricks.callAll('revive');
        game.destroy();
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
    }

}

function ballHitPaddle (_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-5 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (5 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}*/
breakout.level0 = function (game) {
    
    this.s = null;
    this.bricks = null;
    this.bricksFake = null;
    this.breakoutLevels = null;
    this.paddle = null;
    this.ball = null;
    this.scoreText = null;
    this.livesText = null;
    this.introText = null;
    this.lives = 3;

};

breakout.level0.prototype = {
    preload: function() {
        this.game.load.atlas('breakout', 'assets/breakout.png', 'assets/breakout.json');
        this.game.load.image('starfield', 'assets/samk2.jpg');
        var img = new Image();
        img.onload = function() {
          imgW = this.width;
          imgH = this.height;
        };
        img.src = 'assets/samk2.jpg';
    },

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // this.goFullScreen();
        //  We check bounds collisions against all walls other than the bottom one
        this.game.physics.arcade.checkCollision.down = false;

        this.game.stage.backgroundColor = "#ffffff";
        var element = $('canvas')[0];
        var x = $(element).width();
        var y = $(element).height();
        x = (x/2)-(imgW/2);
        y = (y/2)-(imgH/1.3);
        console.log(x,y);
        this.s = this.game.add.sprite(x, y, 'starfield');
        this.s.alpha = 0.2;

        

        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;
        this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

        this.bricksFake = this.game.add.group();
        this.bricksFake.enableBody = true;
        this.bricksFake.physicsBodyType = Phaser.Physics.ARCADE;


        this.breakoutLevels = [
            {
                /* For xperia */
                level: [
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
                    [0, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 2, 0, 0, 4, 1, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 0]
                ]
            },
            {
                level: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            {
                level: [
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4]
                ]
            }
        ];
        // console.log(breakoutLevels[0].level);



        var brick;
        for (var i = 0; i < this.breakoutLevels[level].level.length; i++) {
            var row = this.breakoutLevels[level].level[i];
            for (var j = 0; j < row.length; j++) {
                if (row[j] === 0) {
                    brick = this.bricksFake.create(20 + (x * 32), 80 + (y * 17), 'breakout', 'brick_1_1.png', true);
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                } else {
                    brick = this.bricks.create(20 + (j * 32), 80 + (i * 17), 'breakout', 'brick_' + row[j] + '_1.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
                console.log(this.frame);
                
            }
        }

        // for (var y = 0; y < 4; y++)
        // {
        //     for (var x = 0; x < 20; x++)
        //     {
        //         brick = bricks.create(80 + (x * 32), 80 + (y * 17), 'breakout', 'brick_' + (y+1) + '_1.png');
        //         brick.body.bounce.set(1);
        //         brick.body.immovable = true;
        //     }
        // }

        this.paddle = this.game.add.sprite(game.world.centerX, 700, 'breakout', 'paddle_big.png');
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.width = 96;
        // paddle.width = 100;
        // if (level === 0) {
            // this.paddle.width = 48;
        // } else if (level == 1) {
        //     this.paddle.width = 70;
        // } else {
        //     this.paddle.width = 48;
        // }

        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);

        this.paddle.body.collideWorldBounds = true;
        this.paddle.body.bounce.set(1);
        this.paddle.body.immovable = true;

        this.ball = this.game.add.sprite(game.world.centerX, this.paddle.y - 16, 'breakout', 'ball_1.png');
        this.ball.anchor.set(0.5);
        this.ball.checkWorldBounds = true;

        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);

        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.set(1);

        this.ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

        this.ball.events.onOutOfBounds.add(this.ballLost, this);

        this.scoreText = this.game.add.text(32, 740, 'score: 0', { font: "20px Arial", fill: "#000000", align: "left" });
        this.livesText = this.game.add.text(880, 740, 'lives: 3', { font: "20px Arial", fill: "#000000", align: "left" });
        this.introText = this.game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#000000", align: "center" });
        this.introText.anchor.setTo(0.5, 0.5);

        this.game.input.onDown.add(this.releaseBall, this);
    },

    // function to scale up the game to full screen
    goFullScreen: function(){
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize(true);
    },

    update: function() {

        //  Fun, but a little sea-sick inducing :) Uncomment if you like!
        // s.tilePosition.x += (game.input.speed.x / 2);
        // setting gyroscope update frequency
        // gyro.frequency = 1000;
        /* For xperia */
        var position = app.aX;
        position = this.paddle.x + position;
        this.paddle.x = position;
        
        /* for desktop */
        // this.paddle.x = this.game.input.x;
        // console.log(this.paddle.x);

        if (this.paddle.x < 24)
        {
            this.paddle.x = 24;
        }
        else if (this.paddle.x > this.game.width - 24)
        {
            this.paddle.x = this.game.width - 24;
        }

        if (ballOnPaddle)
        {
            this.ball.body.x = this.paddle.x;
        }
        else
        {
            this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
            this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
        }

    },

    releaseBall: function() {

        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            this.ball.body.velocity.y = -100;
            // if (level === 0) {
            //     this.ball.body.velocity.y = -100;
            // } else if (level == 1) {
            //     this.ball.body.velocity.y = -200;
            // } else {
                // this.ball.body.velocity.y = -300;
            // }
            this.ball.body.velocity.x = -75;
            this.ball.animations.play('spin');
            this.introText.visible = false;
        }

    },

    ballLost: function() {

        this.lives--;
        this.livesText.text = 'lives: ' + this.lives;

        if (this.lives === 0)
        {
            this.gameOver();
        }
        else
        {
            ballOnPaddle = true;

            this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);
            
            this.ball.animations.stop();
        }

    },

    gameOver: function() {

        this.ball.body.velocity.setTo(0, 0);
        
        this.introText.text = 'Game Over!';
        this.introText.visible = true;

        setTimeout(function() {
            window.location.reload();
        }, 3000);

    },

    ballHitBrick: function(_ball, _brick) {

        _brick.kill();

        score += 10;
        if (score > 200) {
            this.ball.body.velocity.y -= -20;
        } else if (score > 150) {
            this.ball.body.velocity.y -= -20;
        }  else if (score > 100) {
            this.ball.body.velocity.y -= -20;
        } else if (score > 50) {
            this.ball.body.velocity.y -= -20;
        }
        this.scoreText.text = 'score: ' + score;

        //  Are they any bricks left?
        if (this.bricks.countLiving() === 0)
        {
            level += 1;
            //  New level starts
            score += 1000;
            this.scoreText.text = 'score: ' + score;
            this.introText.text = '- Next Level -';

            //  Let's move the ball back to the paddle
            ballOnPaddle = true;
            this.ball.body.velocity.set(0);
            this.ball.x = this.paddle.x + 16;
            this.ball.y = this.paddle.y - 16;
            this.ball.animations.stop();

            //  And bring the bricks back from the dead :)
            // this.bricks.callAll('revive');
// game.state.start('level1');
window.location.reload();
            
            // game.destroy();
            // game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
        }

    },

    ballHitPaddle: function(_ball, _paddle) {

        var diff = 0;

        if (_ball.x < _paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = _paddle.x - _ball.x;
            _ball.body.velocity.x = (-5 * diff);
        }
        else if (_ball.x > _paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = _ball.x -_paddle.x;
            _ball.body.velocity.x = (5 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            _ball.body.velocity.x = 2 + Math.random() * 8;
        }

    }
};
breakout.level1 = function (game) {
    
    this.s = null;
    this.bricks = null;
    this.bricksFake = null;
    this.breakoutLevels = null;
    this.paddle = null;
    this.ball = null;
    this.scoreText = null;
    this.livesText = null;
    this.introText = null;
    this.lives = 3;

};

breakout.level1.prototype = {
    preload: function() {
        this.game.load.atlas('breakout', 'assets/breakout.png', 'assets/breakout.json');
        this.game.load.image('starfield', 'assets/samk2.jpg');
        var img = new Image();
        img.onload = function() {
          imgW = this.width;
          imgH = this.height;
        };
        img.src = 'assets/samk2.jpg';
    },

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  We check bounds collisions against all walls other than the bottom one
        this.game.physics.arcade.checkCollision.down = false;

        this.game.stage.backgroundColor = "#ffffff";
        var element = $('canvas')[0];
        var x = $(element).width();
        var y = $(element).height();
        x = (x/2)-(imgW/2);
        y = (y/2)-(imgH/1.3);
        console.log(x,y);
        this.s = this.game.add.sprite(x, y, 'starfield');
        this.s.alpha = 0.2;

        

        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;
        this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

        this.bricksFake = this.game.add.group();
        this.bricksFake.enableBody = true;
        this.bricksFake.physicsBodyType = Phaser.Physics.ARCADE;


        this.breakoutLevels = [
            {
                level: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            {
                level: [
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4],
                    [1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4]
                ]
            }
        ];
        // console.log(breakoutLevels[0].level);



        var brick;
        for (var i = 0; i < this.breakoutLevels[level].level.length; i++) {
            var row = this.breakoutLevels[level].level[i];
            for (var j = 0; j < row.length; j++) {
                if (row[j] === 0) {
                    brick = this.bricksFake.create(80 + (x * 32), 80 + (y * 17), 'breakout', 'brick_1_1.png', true);
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                } else {
                    brick = this.bricks.create(80 + (j * 32), 80 + (i * 17), 'breakout', 'brick_' + row[j] + '_1.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
                console.log(this.frame);
                
            }
        }

        // for (var y = 0; y < 4; y++)
        // {
        //     for (var x = 0; x < 20; x++)
        //     {
        //         brick = bricks.create(80 + (x * 32), 80 + (y * 17), 'breakout', 'brick_' + (y+1) + '_1.png');
        //         brick.body.bounce.set(1);
        //         brick.body.immovable = true;
        //     }
        // }

        this.paddle = this.game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
        this.paddle.anchor.setTo(0.5, 0.5);
        // paddle.width = 100;
        if (level === 0) {
            this.paddle.width = 92;
        } else if (level == 1) {
            this.paddle.width = 70;
        } else {
            this.paddle.width = 48;
        }

        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);

        this.paddle.body.collideWorldBounds = true;
        this.paddle.body.bounce.set(1);
        this.paddle.body.immovable = true;

        this.ball = this.game.add.sprite(game.world.centerX, this.paddle.y - 16, 'breakout', 'ball_1.png');
        this.ball.anchor.set(0.5);
        this.ball.checkWorldBounds = true;

        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);

        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.set(1);

        this.ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

        this.ball.events.onOutOfBounds.add(this.ballLost, this);

        this.scoreText = this.game.add.text(32, 550, 'score: '+score, { font: "20px Arial", fill: "#000000", align: "left" });
        this.livesText = this.game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#000000", align: "left" });
        this.introText = this.game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#000000", align: "center" });
        this.introText.anchor.setTo(0.5, 0.5);

        this.game.input.onDown.add(this.releaseBall, this);
    },
    update: function() {

        //  Fun, but a little sea-sick inducing :) Uncomment if you like!
        // s.tilePosition.x += (game.input.speed.x / 2);

        this.paddle.x = this.game.input.x;

        if (this.paddle.x < 24)
        {
            this.paddle.x = 24;
        }
        else if (this.paddle.x > this.game.width - 24)
        {
            this.paddle.x = this.game.width - 24;
        }

        if (ballOnPaddle)
        {
            this.ball.body.x = this.paddle.x;
        }
        else
        {
            this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
            this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
        }

    },

    releaseBall: function() {

        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            if (level === 0) {
                this.ball.body.velocity.y = -100;
            } else if (level == 1) {
                this.ball.body.velocity.y = -200;
            } else {
                this.ball.body.velocity.y = -300;
            }
            this.ball.body.velocity.x = -75;
            this.ball.animations.play('spin');
            this.introText.visible = false;
        }

    },

    ballLost: function() {

        this.lives--;
        this.livesText.text = 'lives: ' + this.lives;

        if (this.lives === 0)
        {
            this.gameOver();
        }
        else
        {
            ballOnPaddle = true;

            this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);
            
            this.ball.animations.stop();
        }

    },

    gameOver: function() {

        this.ball.body.velocity.setTo(0, 0);
        
        this.introText.text = 'Game Over!';
        this.introText.visible = true;

    },

    ballHitBrick: function(_ball, _brick) {

        _brick.kill();

        score += 10;

        this.scoreText.text = 'score: ' + score;

        //  Are they any bricks left?
        if (this.bricks.countLiving() === 0)
        {
            level += 1;
            //  New level starts
            score += 1000;
            this.scoreText.text = 'score: ' + score;
            this.introText.text = '- Next Level -';

            //  Let's move the ball back to the paddle
            ballOnPaddle = true;
            this.ball.body.velocity.set(0);
            this.ball.x = this.paddle.x + 16;
            this.ball.y = this.paddle.y - 16;
            this.ball.animations.stop();

            //  And bring the bricks back from the dead :)
            this.bricks.callAll('revive');
            // game.destroy();
            // game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
        }

    },

    ballHitPaddle: function(_ball, _paddle) {

        var diff = 0;

        if (_ball.x < _paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = _paddle.x - _ball.x;
            _ball.body.velocity.x = (-5 * diff);
        }
        else if (_ball.x > _paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = _ball.x -_paddle.x;
            _ball.body.velocity.x = (5 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            _ball.body.velocity.x = 2 + Math.random() * 8;
        }

    }
};

/*breakout.level2.prototype = {

    create: function () {

        this.game.stage.backgroundColor = '#004a80';

        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physics.p2.restitution = 0.5;

        this.contra = this.add.sprite(500, 300, 'contra2');
        this.block = this.add.sprite(100, 500, 'block');
        this.tetris1 = this.add.sprite(200, 150, 'tetrisblock1');

        this.physics.p2.enable([ this.contra, this.block, this.tetris1 ], false);

        this.contra.body.clearShapes();
        this.contra.body.loadPolygon('physicsData', 'contra2');

        this.tetris1.body.clearShapes();
        this.tetris1.body.loadPolygon('physicsData', 'tetrisblock1');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.block.body.onBeginContact.add(this.blockHit, this);

    },

    blockHit: function (body, shapeA, shapeB, equation) {

        //  We hit the wall, not a sprite
        if (body === null) { return; }

        if (body.sprite.key === 'contra2')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateA, this);
        }
        else if (body.sprite.key === 'tetrisblock1')
        {
           this.changeTimer = this.game.time.events.add(3000, this.gotoStateB, this);
        }

    },

    gotoStateA: function () {

        this.state.start('StateA');

    },

    gotoStateB: function () {

        this.state.start('StateB');

    },

    update: function () {

        this.block.body.setZeroVelocity();

        if (this.cursors.left.isDown)
        {
            this.block.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown)
        {
            this.block.body.moveRight(200);
        }

        if (this.cursors.up.isDown)
        {
            this.block.body.moveUp(200);
        }
        else if (this.cursors.down.isDown)
        {
            this.block.body.moveDown(200);
        }

    },

    render: function () {

        if (this.changeTimer)
        {
            this.game.debug.text('Changing in: ' + game.time.events.duration, 32, 32);
        }
        else
        {
            this.game.debug.text(this.result, 32, 32);
        }

        this.game.debug.text("State C", 32, 560);

    }

};*/


// var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');
// var game = new Phaser.Game(360, 640, Phaser.AUTO, 'gameContainer');
// // var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });

// game.state.add('level0', breakout.level0);
// game.state.add('level1', breakout.level1);
// // game.state.add('level2', breakout.level2);

// game.state.start('level0');
