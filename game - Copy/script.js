window.addEventListener('load', function () {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;

    let enemies = [];
    let enemies2 = [];
    let enemies3 = [];
    let score = 0;
    let gameOver = false;
    let dem = 0;
    let item   = [];
    let gold =[];
    let uti =  true;
    let chuongluc =true;
    let audio = new Audio('Sergio%2527s%20Magic%20Dustbin.mp3');

    // su kien tu ban phim
    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Control' || e.key === 'a' || e.key === 'r' || e.key === 's' || e.key === 'q' || e.key === 'w' || e.key === 'd' || e.key === 'e' || e.key === 'y')  && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                // xu ly khi an enter tro choi bat dau lai
                else if (e.key === 'Enter' && gameOver){restartGane()}
                if (e.key === ' ') {
                    character1.shootTop();
                }
                // console.log(e.key, this.keys);
                if (e.key === 'u' && score >= 20){
                        switchCharacter();
                }
            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Control' || e.key === 'a' || e.key === 'r' || e.key === 's' || e.key === 'q' || e.key === 'w' || e.key === 'y' || e.key === 'e' || e.key === 'd') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
            });
        }}

    class Character {
        constructor(name, gameWidth, gameHeight, width, height, x, y, imageSrc, maxFrame, fps, speed, vy, weight, spriteX,spriteY) {
            this.name = name;
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.image = document.getElementById(imageSrc);
            this.frameX = 0;
            this.maxFrame = maxFrame;
            this.frameY = 0;
            this.fps = fps;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = speed;
            this.vy = vy;
            this.weight = weight;
            this.projectiles = [];
            this.spriteX = spriteX;
            this.spriteY = spriteY;
        }
        restart (){
            this.x = x;
            this.y = this.gameHeight - this.height;
            this.maxFame = maxFrame;
            this.frameY = 0;
        }
        // Phương thức vẽ
        draw(context, newWidth, newHeight, spriteX, spriteY, drawX, drawY, drawWidth, drawHeight) {
            context.drawImage(
                this.image,
                this.frameX * this.width + spriteX,
                this.frameY * this.height + spriteY,
                newWidth,
                newHeight,
                drawX,
                drawY,
                drawWidth,
                drawHeight
            );
        }
        // Phương thức cập nhật
        update(input,daltaTime,enemies,enemies2,item,gold,enemies3,down,aa,bb,cc,dame11,dame12,dame13,dame21,dame22,dame23,dame31,dame32,dame41,dame42,dame43) {
            // xu ly va cham1

            enemies.forEach(enemy =>{
                const dx = (enemy.x+ enemy.width/2)- (this.x + this.width/2);     // tính vị trí trung diêm cua vat theo x
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);  // tính vị trí trung diêm cua vat theo y
                const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                if (distance+110 < enemy.width/2 + this.width/2){                                // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                    if (enemy.frameY === 0 ) {
                        gameOver = true;
                        stopSound(audio);
                    }
                    }
            })
            enemies2.forEach(enemy2=>{
                const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width/2);
                const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height/2);
                const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if(distance2+100 < enemy2.width/2 + this.width/2){
                    if (enemy2.frameY === 0 ) {
                        gameOver = true;
                        stopSound(audio);
                    }
                }
            })
            enemies3.forEach(enemy3=>{
                const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width/2);
                const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height/2);
                const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                if(distance3+190 < enemy3.width/2 + this.width/2){
                    enemy3.frameY =1
                    if (enemy3.frameY === 1 && enemy3.frameX >= 3) {
                        gameOver = true;
                        stopSound(audio);
                    }
                }
            })
            item.forEach(itemm=>{
                const dxt = (itemm.x+ itemm.width/2) -(this.x + this.width/2);
                const dyt = (itemm.y + itemm.height/2) - (this.y + this.height/2);
                const distance2 =  Math.sqrt(dxt * dxt + dyt * dyt);
                if(distance2+150 < itemm.width/2 + this.width/2){
                    score += 20;
                    itemm.markedForDeletion = true;
                }
            })
            gold.forEach(goldd=>{
                const dxt = (goldd.x+ goldd.width/2) -(this.x + this.width/2);
                const dyt = (goldd.y + goldd.height/2) - (this.y + this.height/2);
                const distance2 =  Math.sqrt(dxt * dxt + dyt * dyt);
                if(distance2+150 < goldd.width/2 + this.width/2){
                    if (goldd.frameY === 0 )
                        score  += 5;
                    else score += 10;
                }
                goldd.markedForDeletion = true;
            })
            // sprite animation
            //play1
            if(this.frameTimer > this.frameInterval){                                   // kiểm tra xem đã đủ tg cập nhật khung hhinh chua
                if (this.frameX >= this.maxFame) this.frameX = 0;
                this.frameX++
                this.frameTimer = 0;
            } else {
                this.frameTimer += 10;
            }
            // controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            }
            else {
                this.speed = 0;
            }
            if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 32;
            }
            else if (input.keys.indexOf('ArrowDown') > -1) {
                this.maxFame = 7;
                this.frameY = 2;
                this.vy += 9
            }
            if (input.keys.indexOf('Control') > -1) {
                this.vy = 0.6
            }
// vertical movement
            // nhanvat
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.weight
                this.maxFame = 8;
                this.frameY = down
                this.frameTimer =1;
            } else {
                this.vy = 0;
                this.maxFame = 7;
                this.frameY = 0;
            }
            // xu ly va cham2
            function vacham2(xa1,xa2,xa3,aY1,aY2,aY3) {
                enemies.forEach(enemy =>{
                    const dx = (enemy.x+ enemy.width/2)- (this.x + this.width/2);     // tính vị trí trung diêm cua vat theo x
                    const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);  // tính vị trí trung diêm cua vat theo y
                    const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                    if (distance+xa1 < enemy.width/2 + this.width/2){                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                        enemy.frameY = aY1;
                    }
                })
                enemies2.forEach(enemy2=>{
                    const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width/2);
                    const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height/2);
                    const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if(distance2+xa2 < enemy2.width/2 + this.width/2){
                        enemy2.frameY = aY2;
                    }
                })
                enemies3.forEach(enemy3=>{
                    const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width/2);
                    const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height/2);
                    const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                    if(distance3+xa3 < enemy3.width/2 + this.width/2){
                        enemy3.frameY = aY3;
                    }
                })
            }
            if (input.keys.indexOf('a' ) > -1) {
                this.maxFame = 7;
                this.frameY = aa;
                enemies.forEach(enemy =>{
                    const dx = (enemy.x+ enemy.width/2)- (this.x + this.width/2);     // tính vị trí trung diêm cua vat theo x
                    const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);  // tính vị trí trung diêm cua vat theo y
                    const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                    if (distance+dame11 < enemy.width/2 + this.width/2){                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                        enemy.frameY = 1;
                    }
                })
                enemies2.forEach(enemy2=>{
                    const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width/2);
                    const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height/2);
                    const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if(distance2+dame12 < enemy2.width/2 + this.width/2){
                        enemy2.frameY = 1;
                    }
                })
                enemies3.forEach(enemy3=>{
                    const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width/2);
                    const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height/2);
                    const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                    if(distance3+dame13 < enemy3.width/2 + this.width/2){
                        enemy3.frameY = 4;
                    }
                })
            }
            if (input.keys.indexOf('s' ) > -1) {
                this.maxFame = 7;
              if ( score >= 10) { this.frameY = bb;
                // xu ly va cham
                enemies.forEach(enemy =>{
                    const dx = (enemy.x+ enemy.width/2)- (this.x + this.width/2);     // tính vị trí trung diêm cua vat theo x
                    const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);  // tính vị trí trung diêm cua vat theo y
                    const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                    if (distance+dame21 < enemy.width/2 + this.width/2){                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                        enemy.frameY = 1;
                    }
                })
                enemies2.forEach(enemy2=>{
                    const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width/2);
                    const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height/2);
                    const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if(distance2+dame22 < enemy2.width/2 + this.width/2){
                        enemy2.frameY = 1;
                    }
                })
                enemies3.forEach(enemy3=>{
                    const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width/2);
                    const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height/2);
                    const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                    if(distance3+dame23 < enemy3.width/2 + this.width/2){
                        enemy3.frameY = 4;
                    }
                })
                  }
            }
            if (input.keys.indexOf('d') > -1) {
                this.maxFame = 7;
               if (score >= 15) {
                   this.frameY = cc;
                   // xu ly va cham
                   enemies.forEach(enemy => {
                       const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);     // tính vị trí trung diêm cua vat theo x
                       const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);  // tính vị trí trung diêm cua vat theo y
                       const distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                       if (distance + dame31 < enemy.width / 2 + this.width / 2) {                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                           enemy.frameY = 1;
                       }
                   })
                   enemies3.forEach(enemy3 => {
                       const dx3 = (enemy3.x + enemy3.width / 2) - (this.x + this.width / 2);
                       const dy3 = (enemy3.y + enemy3.height / 2) - (this.y + this.height / 2);
                       const distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
                       if (distance3 + dame32 < enemy3.width / 2 + this.width / 2) {
                           enemy3.frameY = 4;
                       }
                   })
               }
            }
            if (input.keys.indexOf('w') > -1) {
                uti = false;
                // xu ly va cham
                enemies.forEach(enemy =>{
                    const dx = (enemy.x+ enemy.width/2)- (this.x + this.width/2);     // tính vị trí trung diêm cua vat theo x
                    const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);  // tính vị trí trung diêm cua vat theo y
                    const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                    if (distance + dame41 < enemy.width/2 + this.width/2){                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                        enemy.frameY = 1;
                        enemy.fps = 50;
                    }
                })
                enemies2.forEach(enemy2=>{
                    const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width/2);
                    const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height/2);
                    const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if(distance2 + dame42 < enemy2.width/2 + this.width/2){
                        enemy2.frameY = 1;

                    }
                })
                enemies3.forEach(enemy3=>{
                    const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width/2);
                    const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height/2);
                    const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                    if(distance3 + dame43 < enemy3.width/2 + this.width/2){
                        enemy3.frameY = 4;
                    }
                })
            }
            if (input.keys.indexOf('w') === -1 && this.frameX1 >= 53) {
                uti = true;
            }

            // xu ly bien mat
            enemies.forEach(enemy=>{
                if (enemy.frameY === 1 && enemy.frameX === 7  )
                {
                    score++;
                    enemy.markedForDeletion = true;
                }
            })
            enemies2.forEach(enemy2=>{
                if (enemy2.frameY === 1 && enemy2.frameX === 7  )
                {
                    score++;
                    enemy2.markedForDeletion = true;
                }
            })
            enemies3.forEach(enemy3=>{
                if (enemy3.frameY === 4 && enemy3.frameX === 7  )
                {
                    score++;
                    enemy3.markedForDeletion = true;
                }
            })
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        // Phương thức kiểm tra va chạm với mặt đất
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }}
    class Play2 {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width1 = 80;
            this.height1 = 80;
            this.x = 30;                                                      // vi tri cua doi tuong
            this.y = this.gameHeight - this.height1;                        // vi tri cua doi tuong
            this.image1 = document.getElementById('playerImage1');  //lay doi tuong
            this.frameX = 0;
            // this.frameY = 5;
            this.fps = 20;                                               // bien de dem khoang thơi gian da troi qua kể từ  lần cập nhật frame trước đo
            this.frameTimer = 0;                                          // dem tg giua cac khung hinh
            this.frameInterval = 1000 / this.fps;                           //  khoảng thời gian giữa hai khung hình liên tiếp
        }
        draw(context) {
            context.drawImage(this.image1, this.frameX * this.width1, this.frameY * this.height1, this.width1, this.height1 + 6, this.x-100, this.y - 790, this.width1 + 1000, this.height1 + 1000);  //gan doi tuong that vao doi tuong o trang.
        }
        update(input, daltaTime, enemies, enemies2) {

            if (this.frameTimer > this.frameInterval) {                                   // kiểm tra xem đã đủ tg cập nhật khung hhinh chua
                if (this.frameX >=13) {
                    this.frameX = 0}
                this.frameX++
                this.frameTimer = 0;} else {this.frameTimer += 20;}
            if (input.keys.indexOf('r') > -1){
                this.frameX = 0;
                score -= 20;
                this.x += 20
                this.frameY = 2
                // xu ly va cham
                enemies.forEach(enemy =>{
                    const dx = (enemy.x+ enemy.width/2)- (this.x + this.width1/2);     // tính vị trí trung diêm cua vat theo x
                    const dy = (enemy.y + enemy.height/2) - (this.y + this.height1/2);  // tính vị trí trung diêm cua vat theo y
                    const  distance = Math.sqrt(dx * dx + dy * dy);                  // xác dinh khoang cách giữa 2 vật theo cả y và x
                    if (distance-1300 < enemy.width/2 + this.width1/2){                          // so sanh neu khoảng cach giữa 2 trung diểm gần và chạm vào nhau thì gameover
                        enemy.framey = 1
                    }})
                enemies2.forEach(enemy2=>{
                    const dx2 = (enemy2.x+enemy2.width/2) -(this.x + this.width1/2);
                    const dy2 = (enemy2.y + enemy2.height/2) - (this.y + this.height1/2);
                    const distance2 =  Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if(distance2-1300 < enemy2.width/2 + this.width1/2){
                        enemy2.frameY = 1
                    }})
                enemies3.forEach(enemy3=>{
                    const dx3 = (enemy3.x+enemy3.width/2) -(this.x + this.width1/2);
                    const dy3 = (enemy3.y + enemy3.height/2) - (this.y + this.height1/2);
                    const distance3 =  Math.sqrt(dx3 * dx3 + dy3 * dy3);
                    if(distance3-1000 < enemy3.width/2 + this.width1/2){
                        enemy3.frameY = 4;

                    }})}
            if (input.keys.indexOf('r') <= -1 && this.frameX >=13) {
                this.frameY = 5
                this.x = -300
                this.frameX = 0;
            }}}
    class Player extends Character {
        constructor(gameWidth, gameHeight) {
            super("Player", gameWidth, gameHeight, 288, 128, 30, gameHeight - 128, 'playerImage', 7, 20, 0, 0, 1);
        }
        restart (){
            this.x = 30;
            this.y = this.gameHeight - this.height;
            this.maxFame = 8;
            this.frameY = 0;
this.projectiles = [];
        }
        draw(context) {
            const drawWidth = this.width + 990;
            const drawHeight = this.height - 800;
            const drawX = this.x - 490;
            const drawY = this.y + 90;
            const newWidth = this.width;
            const newHeight = this.height;
            super.draw(context, newWidth, newHeight, 0, 0, drawX, drawY, drawWidth, drawHeight);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        update(input, daltaTime, enemies, enemies2, item, gold, enemies3) {
            super.update(input, daltaTime, enemies, enemies2, item, gold, enemies3,3,1,2,4,0,0,200,-60,-60,60,-1000,-1000);
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
        shootTop(){
            this.projectiles.push(new Projectile(canvas.width, canvas.height,this.x + 180, this.y))
        }
}

    class Player3 extends Character {
        constructor(gameWidth, gameHeight) {
            super("Player3", gameWidth, gameHeight, 288, 128, 30, gameHeight - 128, 'playerImage2', 7, 10, 0, 0, 1, 0, 0);
            this.image1 = document.getElementById('playerImage2-1');
            this.maxFrame1 = 53;
            this.frameX1 = 0;
            this.frameTimer1 = 0;
        }
        restart (){
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.maxFame = 8;
            this.frameY = 0;

        }
        draw(context) {
            if (uti) {
                super.draw(context, this.width, this.height, 0, 0, this.x - 490, this.y + 90, this.width + 990, this.height - 800);
            } else {
                this.maxFame1 = 53;
                context.drawImage(
                    this.image1,
                    this.frameX1 * this.width,
                    this.frameY* this.height,
                    this.width,
                    this.height,
                    this.x - 490,
                    this.y + 90,
                    this.width + 990,
                    this.height - 800
                );
            }
        }  update(input, daltaTime, enemies, enemies2, item, gold, enemies3) {
            super.update(input, daltaTime, enemies, enemies2, item, gold, enemies3,1,3,4,5,0,0,200,-60,-60,60,-350,-350,-450,-400,-450);
            if(this.frameTimer1 > this.frameInterval){                                   // kiểm tra xem đã đủ tg cập nhật khung hhinh chua
                if (this.frameX1 >= this.maxFame1) this.frameX1 = 0;
                this.frameX1++
                this.frameTimer1 = 0;

            } else {
                this.frameTimer1 += 100;
            }
        }
    }


    let input = new InputHandler();
    const player1 = new Play2(canvas.width, canvas.height);

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.audio = document.getElementById('audio')
            this.x = 0;
            this.y = 0;
            this.width = 1500;
            this.height = 800;
            this.speed = 5;
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); // loop background
        }

        update() {
            this.x -= this.speed;
            if (this.x < -this.width) this.x = 0;
        }
        restart(){
            this.x = 0;
        }
    }

    // chưởng lực
    class Projectile {
        constructor(gameWidth, gameHeight, x, y) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 40;
            this.height = 32;
            this.x = x;                                                      // vi tri cua doi tuong
            this.y = y;                           // vi tri cua doi tuong
            this.image1 = document.getElementById('chuong-luc1');
            this.image2 = document.getElementById('chuong-luc1-1');
            this.frameX = 0;
            this.maxFame = 9;
            this.frameY = 0;
            this.fps = 20;                                               // bien de dem khoang thơi gian da troi qua kể từ  lần cập nhật frame trước đo
            this.frameTimer = 0;                                          // dem tg giua cac khung hinh
            this.frameInterval = 1000 / this.fps;                           //  khoảng thời gian giữa hai khung hình liên tiếp
            this.speed = 5;
            this.weight = 1
            // this.vy = 0;
            // this.weight = 1;                                                 // trrong luc

        }

        draw(context) {
            if (chuongluc) {
                context.drawImage(this.image1, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width + 50, this.height - 100)
            }
            else {
                context.drawImage(this.image2, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width + 100, this.height - 300)
            }
        }

        update() {
            // sprite animation
            this.x += this.speed;
            if (this.frameTimer > this.frameInterval) {                                   // kiểm tra xem đã đủ tg cập nhật khung hhinh chua
                if (this.frameX >= this.maxFame) this.frameX = 0;
                this.frameX++
                this.frameTimer = 0;

            } else {
                this.frameTimer += 10;
            }

        }}
    // quai vat 2
    class EnemyBase {
        constructor(gameWidth, gameHeight, width, height, imageId, maxFrame, fps, maxSpeed) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = width;
            this.height = height;
            this.image = document.getElementById(imageId);
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = maxFrame;
            this.fps = fps;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 0;
            this.maxSpeed = maxSpeed;
            this.markedForDeletion = false;
        }

        draw(context, offsetX = 0, offsetY = 0, drawWidth = this.width, drawHeight = this.height) {
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x + offsetX, this.y + offsetY, drawWidth, drawHeight);
        }

        update(daltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
                this.speed += 0.1;
            } else {
                this.frameTimer += daltaTime;
            }

            this.x -= this.speed;

            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
            }
        }
    }
    class Enemy extends EnemyBase {
        constructor(gameWidth, gameHeight) {
            super(gameWidth, gameHeight, 57, 60, 'enemyImage', 7, 7, 30);
        }

        draw(context) {
            super.draw(context, 0, -30, this.width +150, this.height -350);
        }
    }

    class Enemy2 extends EnemyBase {
        constructor(gameWidth, gameHeight) {
            super(gameWidth, gameHeight, 67, 62, 'enemyImage2', 7, 7, 0);
            this.y = Math.random() * 500;
        }

        draw(context) {
            super.draw(context, 0, 0, this.width +200, this.height - 400);
        }
    }

    class Enemy3 extends EnemyBase {
        constructor(gameWidth, gameHeight) {
            super(gameWidth, gameHeight, 140, 93, 'enemyImage3', 7, 20, 30);
        }

        draw(context) {
            super.draw(context, 0, +10, this.width + 250, this.height - 500);
        }
    }
    // item
    class Item extends EnemyBase {
        constructor(gameWidth, gameHeight) {
            super(gameWidth, gameHeight, 170, 200, 'item', null, 200, null);
            this.y = Math.random() * (600 - 200) + 200; // Specific y position for Item
        }

        draw(context) {
            super.draw(context, 0, 30, this.width - 100, this.height - 120);
            this.width*3
            this.height*3
        }
    }

    class Gold extends EnemyBase {
        constructor(gameWidth, gameHeight) {
            super(gameWidth, gameHeight, 80, 80, 'gold', 5, 50, 30);
            this.y = gameHeight - this.height - 100; // Specific y position for Gold
            this.frameY = parseInt(Math.random() * 2); // Specific frameY for Gold
        }

        draw(context) {
            super.draw(context, 0, -100, this.width, this.height + 30);
        }
    }

    function handleEnemies(daltaTime) {
        if (enemyTimer > enemyInterval + ramdomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            ramdomEnemyInterval = Math.random() * 100 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += 7;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(daltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function handleEnemies2(daltaTime) {
        if (enemy2Timer > enemyInterval + ramdomEnemyInterval) {
            enemies2.push(new Enemy2(canvas.width, canvas.height));
            ramdomEnemyInterval = Math.random() * 100 + 500;
            enemy2Timer = 0;
        } else {
            enemy2Timer += 10;
        }
        enemies2.forEach(enemy2 => {
            enemy2.draw(ctx);
            enemy2.update(daltaTime);
        });
        enemies2 = enemies2.filter(enemy2 => !enemy2.markedForDeletion);
    }

    function handleEnemies3(daltaTime) {
        if (enemy3Timer > enemyInterval + ramdomEnemyInterval) {
            enemies3.push(new Enemy3(canvas.width, canvas.height));
            ramdomEnemyInterval = Math.random() * 100 + 500;
            enemy3Timer = 0;
        } else {
            enemy3Timer += 1;
        }
        enemies3.forEach(enemy3 => {
            enemy3.draw(ctx);
            enemy3.update(daltaTime);
        });
        enemies3 = enemies3.filter(enemy3 => !enemy3.markedForDeletion);
    }
    function handItem(daltaTime) {
        if (itemTimer > enemyInterval + ramdomEnemyInterval) {
            item.push(new Item(canvas.width, canvas.height));
            ramdomEnemyInterval = Math.random() * 100 + 500;
            itemTimer = 0;
        } else {
            itemTimer += 0.5;
        }
        item.forEach(itemm => {
            itemm.draw(ctx);
            itemm.update(daltaTime);
        });
        item = item.filter(itemm => !itemm.markedForDeletion); // xu ly tao 1 ham moi va them doi tuong neu markedForDeletion true
    }
    function handGold(daltaTime) {
        if (goldTimer > enemyInterval + ramdomEnemyInterval) {
            gold.push(new Gold(canvas.width, canvas.height));
            ramdomEnemyInterval = Math.random() * 100 + 500;
            goldTimer = 0;
        } else {
            goldTimer += 1;
        }
        gold.forEach(goldd => {
            goldd.draw(ctx);
            goldd.update(daltaTime);
        });
        gold = gold.filter(goldd => !goldd.markedForDeletion); // xu ly tao 1 ham moi va them doi tuong neu markedForDeletion true
    }
    function displayStatusText(context) {
        // tao bong tao diem
        context.font = '40px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score:' + score,20,50);
        context.fillStyle = 'white';
        context.fillText('Score:' + score,22,52);
        if (gameOver){
            context.font = '90px Helvetica';
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('game over, try again!', canvas.width/2,200)
            context.fillStyle = 'black';
            context.fillText('game over, try again!', canvas.width/2 + 2,202)
        }
    }
    function restartGane (){
        currentCharacter.restart();
        background.restart();
        enemies = [];
        enemies2 = [];
        enemies3 =[];
        score = 0;
        gameOver = false;
        animate(0);
        gold = [];
        item = [];
    }
    function stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    const background = new Background(canvas.width, canvas.height);
    const  enemy2 = new Enemy2(canvas.width, canvas.height);

// doi nhan vat
    let currentCharacter;
    let character1 = new Player(canvas.width, canvas.height);
    let character3 = new Player3(canvas.width, canvas.height);
    currentCharacter = character1;
    function switchCharacter() {
        if (currentCharacter === character1) {
            currentCharacter = character3;
        } else {
            currentCharacter = character1;
        }
    }
let lastTime = 0;
let  enemyTimer = 0;
let  enemy2Timer = 0;
let  enemy3Timer = 0;
let  itemTimer = 0;
let  goldTimer = 0;
let enemyInterval = 2000;
let  ramdomEnemyInterval= 1500

    function animate(timeStamp) {
       const dalteTime =  timeStamp - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       lastTime =  timeStamp;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        currentCharacter.draw(ctx)
        currentCharacter.update(input, dalteTime,enemies,enemies2,item,gold,enemies3);
        player1.update(input,dalteTime, enemies, enemies2,enemies3);
        player1.draw(ctx);
        handleEnemies2(dalteTime);
        handleEnemies3(dalteTime);
        handleEnemies(dalteTime);
        handItem(dalteTime);
        handGold(dalteTime);
        displayStatusText(ctx)
            if(!gameOver)requestAnimationFrame(animate);
        }
    animate(0);
});











