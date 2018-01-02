// 这是我们的玩家要躲避的敌人
var Enemy = function(y) {
    this.x=-10;
    this.y=y;
    this.speed=Math.random()*200+200;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
  this.x+=dt*this.speed;
  if(this.x>500){
    this.x=-10;
    this.y=400-Math.round((Math.random()+1)*2)*83;
  };
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
  this.x=x;
  this.y=y;
  this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(){
  if(this.x>400){
    this.x=400;
  };
  if(this.x<0){
    this.x=0;
  };
  if(this.y<-50){
    alert("YOU WIN!!");
    this.y=400;
  };
  if(this.y>400){
    this.y=400;
  };
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(move){
  switch (move) {
    case 'left': this.x-=100; break;
    case 'right': this.x+=100; break;
    case 'up': this.y-=83; break;
    case 'down': this.y+=83; break;
  };
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemieadsas 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies=[new Enemy(400-83*2),new Enemy(400-83*3),new Enemy(400-83*4),new Enemy()];
var player=new Player(200,400);
var checkCollisions=function(){
  for(i=0;i<allEnemies.length;i++){
    if(player.y===allEnemies[i].y&&Math.abs(allEnemies[i].x-player.x)<60){
        player.x=200;
        player.y=400;
    };
  };
};

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
