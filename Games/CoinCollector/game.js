// define variables
var game , player , platforms , badges , items;
var cursors , jumpButton;
var scoreLabel, livesLabel , levelLabel ;
var winningMessage , restartMessage;
var lives = 0, currentScore = 0 , level = 0;
var won = false , end = true , badgeCreated = false;

//Config Array
var config = {
  'imagesPath' : 'Images/',
  'initialLives' : 2,
  'preload' : {
    'images' : [
      { 'key' : 'background' , 'name' : 'Full Moon - background.png' },
      { 'key' : 'platform' , 'name' : 'platform_1.png' },
      { 'key' : 'platform2' , 'name' : 'platform_2.png' },
      { 'key' : 'platform3' , 'name' : 'platform_3.png' }
    ],
    'spritesheets' : [
      { 'key' : 'chalkers' , 'name' : 'chalkers.png' , 'width' : 48 , 'height' : 62  },
      { 'key' : 'mikethefrog' , 'name' : 'mikethefrog.png' , 'width' : 32 , 'height' : 32  },
      { 'key' : 'skeleton' , 'name' : 'skeleton.png' , 'width' : 32 , 'height' : 32  },
      { 'key' : 'coin' , 'name' : 'coin.png' , 'width' : 36 , 'height' : 44  },
      { 'key' : 'badge' , 'name' : 'badge.png' , 'width' : 42 , 'height' : 54  },
      { 'key' : 'badge_2' , 'name' : 'badge_2.png' , 'width' : 42 , 'height' : 54  },
      { 'key' : 'badge_3' , 'name' : 'badge_3.png' , 'width' : 42 , 'height' : 54  },
      { 'key' : 'star' , 'name' : 'star.png' , 'width' : 32 , 'height' : 32  },
      { 'key' : 'poison' , 'name' : 'poison.png' , 'width' : 32 , 'height' : 32  }
    ]
  },
  'levels' : [
              { //LEVEL 1
                'targetScore' : 100 ,
                'player' : { 'key' : 'skeleton' , 'X' : 50 , 'Y' : 600 , 'gravity' : 500 },
                'badge' : { 'type' : 'badge' , 'X' : 750, 'Y' : 400 },
                'interaction' : [
                  { 'key' : 'coin' , 'point' : 10 , 'live' : 0  },
                  { 'key' : 'star' , 'point' : 20 , 'live' : 1 },
                  { 'key' : 'poison' , 'point' : -10 , 'live' : -1 },
                  { 'key' : 'badge' , 'point' : 100 , 'live' : 1 }
                ],
                'items' : [
                  { 'type' : 'coin' , 'X' : 375 , 'Y' : 300 },
                  { 'type' : 'coin' , 'X' : 750 , 'Y' : 30 },
                  { 'type' : 'coin' , 'X' : 75 , 'Y' : 30 },
                  { 'type' : 'coin' , 'X' : 640 , 'Y' : 450 },
                  { 'type' : 'coin' , 'X' : 50 , 'Y' : 200 },
                  { 'type' : 'coin' , 'X' : 175 , 'Y' : 300 },
                  { 'type' : 'coin' , 'X' : 500 , 'Y' : 100 },
                  { 'type' : 'coin' , 'X' : 720 , 'Y' : 150 },
                  { 'type' : 'coin' , 'X' : 70 , 'Y' : 400 },
                  { 'type' : 'coin' , 'X' : 290 , 'Y' : 500 },
                  { 'type' : 'star' , 'X' : 125 , 'Y' : 50 },
                  { 'type' : 'poison' , 'X' : 370 , 'Y' : 500 },
                  { 'type' : 'poison' , 'X' : 100 , 'Y' : 380 }
                ],
                'platforms' : [
                  { 'type' : 'platform' , 'X' : 450 , 'Y' : 450 },
                  { 'type' : 'platform' , 'X' : 550 , 'Y' : 350 },
                  { 'type' : 'platform' , 'X' : 550 , 'Y' : 100 },
                  { 'type' : 'platform2' , 'X' : 50 , 'Y' : 150 },
                  { 'type' : 'platform2' , 'X' : 200 , 'Y' : 250 },
                  { 'type' : 'platform2' , 'X' : 50 , 'Y' : 350 }
                ]
              },
              { //LEVEL 2
                'targetScore' : 400,
                'player' : { 'key' : 'mikethefrog' , 'X' : 750 , 'Y' : 600 , 'gravity' : 400 },
                'badge' : { 'type' : 'badge_2' , 'X' : 450, 'Y' : 450 },
                'interaction' : [
                  { 'key' : 'coin' , 'point' : 20 , 'live' : 0  },
                  { 'key' : 'star' , 'point' : 40 , 'live' : 1 },
                  { 'key' : 'poison' , 'point' : -20 , 'live' : -1 },
                  { 'key' : 'badge_2' , 'point' : 200 , 'live' : 1 }
                ],
                'items' : [
                  { 'type' : 'coin' , 'X' : 360 , 'Y' : 550 },
                  { 'type' : 'coin' , 'X' : 750 , 'Y' : 50 },
                  { 'type' : 'coin' , 'X' : 550 , 'Y' : 0 },
                  { 'type' : 'coin' , 'X' : 750 , 'Y' : 230 },
                  { 'type' : 'coin' , 'X' : 250 , 'Y' : 0 },
                  { 'type' : 'coin' , 'X' : 0 , 'Y' : 330 },
                  { 'type' : 'coin' , 'X' : 0 , 'Y' : 550 },
                  { 'type' : 'coin' , 'X' : 0 , 'Y' : 250 },
                  { 'type' : 'coin' , 'X' : 360 , 'Y' : 450 },
                  { 'type' : 'coin' , 'X' : 360 , 'Y' : 200 },
                  { 'type' : 'coin' , 'X' : 500 , 'Y' : 450 },
                  { 'type' : 'star' , 'X' : 450 , 'Y' : 300 },
                  { 'type' : 'star' , 'X' : 50 , 'Y' : 80 },
                  { 'type' : 'poison' , 'X' : 370 , 'Y' : 500 },
                  { 'type' : 'poison' , 'X' : 50 , 'Y' : 530 },
                  { 'type' : 'poison' , 'X' : 700 , 'Y' : 50 },
                  { 'type' : 'poison' , 'X' : 700 , 'Y' : 150 },
                  { 'type' : 'poison' , 'X' : 280 , 'Y' : 50 },
                  { 'type' : 'poison' , 'X' : 650 , 'Y' : 500 },
                  { 'type' : 'poison' , 'X' : 100 , 'Y' : 375 }
                ],
                'platforms' : [
                  { 'type' : 'platform' , 'X' : 400 , 'Y' : 400 },
                  { 'type' : 'platform3' , 'X' : 400 , 'Y' : 400 },
                  { 'type' : 'platform' , 'X' : 400 , 'Y' : 200 },
                  { 'type' : 'platform' , 'X' : 600 , 'Y' : 200 },
                  { 'type' : 'platform3' , 'X' : 600 , 'Y' : -50 },
                  { 'type' : 'platform3' , 'X' : 250 , 'Y' : 110 },
                  { 'type' : 'platform' , 'X' : 0 , 'Y' : 300 },
                  { 'type' : 'platform' , 'X' : 0 , 'Y' : 500 },
                  { 'type' : 'platform3' , 'X' : 250 , 'Y' : 250 },
                  { 'type' : 'platform3' , 'X' : 250 , 'Y' : 420 }
                ]
              },
              { //LEVEL 3
                'targetScore' : 1000,
                'player' : { 'key' : 'chalkers' , 'X' : 0 , 'Y' : 570 , 'gravity' : 200 },
                'badge' : { 'type' : 'badge_3' , 'X' : 400, 'Y' : 350 },
                'interaction' : [
                  { 'key' : 'coin' , 'point' : 30 , 'live' : 0  },
                  { 'key' : 'star' , 'point' : 60 , 'live' : 1 },
                  { 'key' : 'poison' , 'point' : -50 , 'live' : -1 },
                  { 'key' : 'badge_3' , 'point' : 500 , 'live' : 1 }
                ],
                'items' : [
                  { 'type' : 'coin' , 'X' : 0 , 'Y' : 290 },
                  { 'type' : 'coin' , 'X' : 0 , 'Y' : 200 },
                  { 'type' : 'coin' , 'X' : 50 , 'Y' : 150 },
                  { 'type' : 'coin' , 'X' : 80 , 'Y' : 125 },
                  { 'type' : 'coin' , 'X' : 25 , 'Y' : 175 },
                  { 'type' : 'coin' , 'X' : 250 , 'Y' : 0 },
                  { 'type' : 'coin' , 'X' : 550 , 'Y' : 200 },
                  { 'type' : 'coin' , 'X' : 500 , 'Y' : 200 },
                  { 'type' : 'coin' , 'X' : 750 , 'Y' : 350 },
                  { 'type' : 'coin' , 'X' : 700 , 'Y' : 375 },
                  { 'type' : 'coin' , 'X' : 600 , 'Y' : 350 },
                  { 'type' : 'coin' , 'X' : 650 , 'Y' : 375 },
                  { 'type' : 'coin' , 'X' : 550 , 'Y' : 325 },
                  { 'type' : 'star' , 'X' : 500 , 'Y' : 570 },
                  { 'type' : 'star' , 'X' : 0 , 'Y' : 60 },
                  { 'type' : 'star' , 'X' : 750 , 'Y' : 200 },
                  { 'type' : 'poison' , 'X' : 0 , 'Y' : 350 },
                  { 'type' : 'poison' , 'X' : 0 , 'Y' : 120 },
                  { 'type' : 'poison' , 'X' : 250 , 'Y' : 70 },
                  { 'type' : 'poison' , 'X' : 500 , 'Y' : 80 },
                  { 'type' : 'poison' , 'X' : 350 , 'Y' : 80 },
                  { 'type' : 'poison' , 'X' : 150 , 'Y' : 200 },
                  { 'type' : 'poison' , 'X' : 600 , 'Y' : 200 },
                  { 'type' : 'poison' , 'X' : 700 , 'Y' : 200 },
                  { 'type' : 'poison' , 'X' : 600 , 'Y' : 300 },
                  { 'type' : 'poison' , 'X' : 700 , 'Y' : 300 }
                ],
                'platforms' : [
                  { 'type' : 'platform' , 'X' : 0 , 'Y' : 90 },
                  { 'type' : 'platform2' , 'X' : 0 , 'Y' : 570 },
                  { 'type' : 'platform2' , 'X' : 150 , 'Y' : 570 },
                  { 'type' : 'platform2' , 'X' : 300 , 'Y' : 570 },
                  { 'type' : 'platform2' , 'X' : 550 , 'Y' : 570 },
                  { 'type' : 'platform2' , 'X' : 700 , 'Y' : 570 },
                  { 'type' : 'platform3' , 'X' : 450 , 'Y' : 350 },
                  { 'type' : 'platform3' , 'X' : 450 , 'Y' : 90 },
                  { 'type' : 'platform' , 'X' : 450 , 'Y' : 250 },
                  { 'type' : 'platform' , 'X' : 700 , 'Y' : 250 },
                  { 'type' : 'platform' , 'X' : 0 , 'Y' : 250 },
                  { 'type' : 'platform' , 'X' : 200 , 'Y' : 250 },
                  { 'type' : 'platform3' , 'X' : 400 , 'Y' : 90 }
                ]
              }
            ]
};

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  config.levels[level].items.forEach( item => createItem( item.X , item.Y , item.type ) );
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  config.levels[level].platforms.forEach( platform => platforms.create( platform.X , platform.Y , platform.type ) );
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create( config.levels[level].badge.X , config.levels[level].badge.Y , config.levels[level].badge.type );
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
  badgeCreated = true;
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  addInteraction(item);
  if (currentScore >= config.levels[level].targetScore && !badgeCreated ){
    createBadge();
  } 
  if( lives == 0 ){
    winningMessage.text = "YOU LOSE!!!";
    game.world.bringToTop(winningMessage);
    end = true;
    items.removeAll();
  }
}

//Function to generate initial values
function restartGame(){
  //Determine current level
  if( won && ( level +1 ) < config.levels.length ){
    level++;
  }else{
    lives = config.initialLives;
    currentScore = 0;
    level = 0;
  }
  removePreviousElements();

  //Player creation
  player = game.add.sprite( config.levels[level].player.X , config.levels[level].player.Y ,  config.levels[level].player.key );
  player.animations.add('walk');
  player.anchor.setTo(0.5, 1);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = config.levels[level].player.gravity;
  player.body.x = config.levels[level].player.X;
  player.body.y = config.levels[level].player.Y;

  //Initial level values
  winningMessage.text = restartMessage.text = "";
  levelLabel.text =  "LEVEL : " + ( level + 1 );
  badgeCreated = won = end = false;
  addItems();
  addPlatforms();
}

function removePreviousElements(){
  if( player != undefined ){
    player.body = null;
    player.kill();
    player.destroy();
    player = undefined;
  }
  if( items != undefined ){
    items.removeAll();
    items.destroy();
    items = undefined;
  }
  if( platforms != undefined ){
    platforms.removeAll();
    platforms.destroy();
    platforms = undefined;
  }
}

//Determine current score and lives
function addInteraction( I_object ){
  Interaction_type = config.levels[level].interaction.find( function( element ){ return element.key === I_object.key } );
  I_object.kill();
  currentScore += Interaction_type.point;
  lives += Interaction_type.live;
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  addInteraction(badge);
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {

    //load images from config
    config.preload.images.forEach( img => game.load.image( img.key , config.imagesPath + img.name ) );

    //Load spritesheets
    config.preload.spritesheets.forEach( spritesheet => game.load.spritesheet( spritesheet.key , config.imagesPath + spritesheet.name , spritesheet.width , spritesheet.height ) );
  }

  // initial game set up
  function create() {
    //Background load
    game.add.tileSprite(0, 0, 800 , 600, 'background');

    //Keys
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Labels
    scoreLabel = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    livesLabel = game.add.text(650, 16, "LIVES: " + lives, { font: "bold 24px Arial", fill: "white" });
    levelLabel = game.add.text(16, 35, "LEVEL : " + ( level + 1 ) , { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
    restartMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    restartMessage.anchor.setTo(0.5, 2);
    
  }

  // while the game is running
  function update() {
    scoreLabel.text = "SCORE: " + currentScore;
    livesLabel.text = "LIVES: " + lives;

    if( !end ){

      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.overlap(player, items, itemHandler);
      game.physics.arcade.overlap(player, badges, badgeHandler);
      player.body.velocity.x = 0;

      // is the left cursor key presssed?
      if (cursors.left.isDown) {
        player.animations.play('walk', 10, true);
        player.body.velocity.x = -300;
        player.scale.x = - 1;
      }
      // is the right cursor key pressed?
      else if (cursors.right.isDown) {
        player.animations.play('walk', 10, true);
        player.body.velocity.x = 300;
        player.scale.x = 1;
      }
      // player doesn't move
      else {
        player.animations.stop();
      }
      
      //is the up cursosr key pressed?
      if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)){
        player.body.velocity.y = -400;
      }

      // when the player win the game
      if (won) {
        if( ( level +1 ) === config.levels.length )
          winningMessage.text = "YOU WIN!!!";
        else
          winningMessage.text = "STAGE CLEAR!";
        game.world.bringToTop(winningMessage);
        items.removeAll();
        end = true;
      }
    }else{
      if( restartMessage.text === "" ){
        if( won && ( level +1 ) < config.levels.length )
          restartMessage.text = "Press Space Key To Next Stage";
        else
          restartMessage.text = "Press Space Key To Start";
        game.world.bringToTop(restartMessage);
      }
      if( jumpButton.isDown ) restartGame();
    }
  }

  function render() {  }
};