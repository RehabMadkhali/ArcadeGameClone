var Creature = function(x, y, width, height, sprite) { //
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};


Creature.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};

var Life = function(x, y, width, height) {
    "use strict";
  Creature.call(this, x, y, width, height, 'images/Rock.png');

};

Life.prototype.render = function() {
    "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};


var Coin = function(width, height) {
    "use strict";
  var xPosition = Math.floor(Math.random() * 400);;
  var yPosition = Math.floor(Math.random() * 300 + 100);

  Creature.call(this, xPosition, yPosition, width, height, 'images/coin.png');

};

Coin.prototype.render = function() {
    "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};

Coin.prototype.randomize = function() {
    "use strict";
  this.x =  Math.floor(Math.random() * 400);;
  this.y = Math.floor(Math.random() * 300 + 100);
};

// Enemies our player must avoid
var Enemy = function(x, y, width, height) {
    Creature.call(this, x, y, width, height, 'images/char-horn-girl.png');
    this.speed = Math.floor(Math.random() * 300 + 100);
    this.sprite = 'images/char-horn-girl.png';
};

Enemy.prototype.update = function(dt) {
  if (this.x <= 500)
    this.x += this.speed * dt;
  else
    this.x = 0;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};

//by default player position 
var Player = function(x, y, width, height) {
  "use strict";
  Creature.call(this, x, y, width, height, 'images/char-boy.png');
  this.alive = true;
  this.win = false;
  this.lifeChances = 3;
  this.life = 10;
};

//for update the movemrnt of the player 
Player.prototype.update = function() {
  "use strict";
  var keyPressed = this.pressedKey;

  switch (keyPressed) {
    case 'up':
      if (this.y > 0) {
        this.y -= 50;
      }
      break;

    case 'down':
      if (this.y < 400) {
        this.y += 50;
      }
      break;

    case 'left':
      if (this.x > 0) {
        this.x -= 50;
      }
      break;

    case 'right':
      if (this.x < 400) {
        this.x += 50;
      }
      break;

    case 'enter':
      reseting();
      break;
    default:

  }

  // to stop looping through the same movement. we need it to move once.
  this.pressedKey = null;
  "use strict";
  // player reaches the water!
  if (this.y < 0) {
    this.win = true;
    this.life += 10;
    allowedKeys = {
      13: 'enter'
    };
    this.reset();
  }


  if (this.checkCollisions(coin[0])) {
    this.life += 10;
    coin[0].randomize();
  }


  var player = this;

  enemies.forEach(function(enemy) {
    if (player.checkCollisions(enemy)) {
      player.life -= 5;
      player.reset();
    }
  });

};

Player.prototype.checkCollisions = function(collidedObject) {
  "use strict";

  var playerBox = {x: this.x, y: this.y, width: 50, height: 40};
  var objectBox = {x: collidedObject.x, y: collidedObject.y, width: collidedObject.width/3 , height: collidedObject.height/3};

  if (playerBox.x < objectBox.x + objectBox.width &&
        playerBox.x + playerBox.width > objectBox.x &&
        playerBox.y < objectBox.y + objectBox.height &&
        playerBox.height + playerBox.y > objectBox.y) {
      return true;
    }

}


Player.prototype.checkCollisionss = function(collidedObject) {
  "use strict";
  if (this.x > collidedObject.x && this.x < collidedObject.x + this.width && this.y > collidedObject.y && this.y < collidedObject.y + this.height)
    return true;
}

Player.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};

Player.prototype.handleInput = function(e) {
  "use strict";
  this.pressedKey = e;
};


Player.prototype.reset = function() {
  "use strict";
  this.x = 200;
  this.y = 440;
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var reseting = function() {
  player.win = false;
  if (player.life < 0)
    player.life = 10;
  else
    player.life += 10;

  if (playerLifes.length <= 0) {
    playerLifes = createLifes();
  }

  allowedKeys = {
    13: 'enter',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
}

function createEnemies() {
  var enemies = [];
  var enemyXPosition = 60;

  for (var i = 0; i < 3; i++) {
    enemies.push(new Enemy(0, enemyXPosition, 120, 180));
    enemyXPosition += 80;
  }

  return enemies;
}


function createLifes() {
  var xPosition = 190;
  var playerLifes = [];

  for (var i = 0; i < player.lifeChances; i++) {
    playerLifes.push(new Player(xPosition, -35, 50, 100));
    xPosition += 50;
  }

  return playerLifes;
}

function createCoin() {

  var coin = [];
  coin.push(new Coin(50, 100));

  return coin;
}


function handleKeyUpListener(e) {
  allowedKeys = {
    13: 'enter',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
}



var player = new Player(200, 440, 99, 170);
var enemies = createEnemies();
var playerLifes = createLifes();
var coin = createCoin();
var life = new Life(460, 5, 40, 40);

document.addEventListener('keyup', function(e) {
  allowedKeys = {
    13: 'enter',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
