/* Engine.js
 */

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    
    div = document.getElementById("game_portion");
    div.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);

                  if(player.life === 50){
                     createMessage("Congratulation!", "#f3df00","Continue Playing!");
                   }
                   else if (player.life === 0) {
                      playerLifes.splice(0,1);
                      player.life = -1;
                   }
                   else if(player.life === -1){
                       createMessage("You Lost!", "red", "Play Again!");
                   }

            }

        function createMessage (message , color, content ){
          ctx.font = '30pt "VT323"';
          ctx.fillStyle = '#1f202b';
          ctx.fillRect(90, 200, 330, 150);
          ctx.fillStyle = color;
          ctx.fillText(message, 180, 250);
          ctx.font = '17pt "VT323"';
          ctx.fillStyle = 'white';
          ctx.fillText('Press "Enter" To '+ content, 105, 300);
        }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        enemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        ctx.font = '25pt "VT323"';
        ctx.fillStyle = '#f4ce00';
        ctx.fillRect(0, 0, 505, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("life chances:", 10, 30);
        ctx.fillText(player.life, 420, 30);


        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */

        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */


        enemies.forEach(function(enemy) {
            enemy.render();
        });

        playerLifes.forEach(function(player) {
            player.render();
        });


        coin.forEach(function(coin) {
            coin.render();
        });
        player.render();
        life.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/char-horn-girl.png',
        'images/Rock.png',
        'images/coin.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
