document.addEventListener("DOMContentLoaded", function () {
    
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1000;
    canvas.height = 500;
    const aiScore = document.querySelector('.ai');
    const humanScore = document.querySelector('.human');
    let pointsAi= 0;
    let pointsHuman = 0;
    
    const cw = canvas.width;
    const ch = canvas.height;
    
    const ballSize = 20;
    let ballX = cw / 2 - ballSize/2;
    let ballY = ch / 2 - ballSize/2;
    
    const paddleHeight = 100; 
    const paddleWidth = 20;
    
    const playerX = 70;
    const aiX = 910;
    
    let playerY = 200;
    let aiY = 200;
    
    const lineWidth = 6;
    const lineHeight = 14;
    
    let ballSpeedX = 2;
    let ballSpeedY = 2;
        
    function player() {
        
        ctx.fillStyle='#50f442';
        ctx.fillRect(playerX , playerY, paddleWidth,paddleHeight); 
        
    }
    
    function aiPlayer() {
        ctx.fillStyle='blue';
        ctx.fillRect(aiX , aiY, paddleWidth,paddleHeight);
    }
    function aiPosition() {
        const middlePaddel = aiY+paddleHeight/2;
        const middleBall = ballY + ballSize/2;
        if (ballX > 500) {
            if ( middlePaddel - middleBall > 200 ) {
                aiY -= 12;
            } 
            else if ( middlePaddel - middleBall > 50 ) {
                aiY -= 5;
            }
            else if ( middlePaddel - middleBall < -200 ) {
                aiY += 12;
            }
            else if ( middlePaddel - middleBall < -50 ) {
                aiY += 5;
            }
        }
        else if (ballX <=500 && ballX && ballX > 150) {
            if ( middlePaddel - middleBall > 100 ) {
                aiY-= 3;
            }
            else if ( middlePaddel - middleBall < -100) {
                aiY+= 3;
            }
        }
    }
    function ball() {    
        ctx.fillStyle='white';
        ctx.fillRect(ballX , ballY, ballSize,ballSize);
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        if ( ballX < playerX-60) {
            ballX = cw / 2 - ballSize/2;
            ballY = ch / 2 - ballSize/2;
            ballSpeedX = -ballSpeedX;
            ++pointsAi;
            aiScore.innerHTML=pointsAi;
            ballSpeedX = 2;
            ballSpeedY = 2;
        }
        else if ( ballX > aiX+60) {
            ballSpeedX = -ballSpeedX;
            ballX = cw / 2 - ballSize/2;
            ballY = ch / 2 - ballSize/2;
            
            ++pointsHuman;
            humanScore.innerHTML=pointsHuman;
            ballSpeedX = 2;
            ballSpeedY = 2;
        }
        else if ( ballY <= 0 || ballY+ballSize >= ch ) {
            ballSpeedY = -ballSpeedY;
            speed();
        }
        
        else if ( ballX <= 0 || ballX+ballSize >= cw  ) {
            ballSpeedX = -ballSpeedX;
            speed();
        }
        else if ( ballX < playerX+paddleWidth && ballX > playerX && playerY+paddleHeight > ballY && playerY < ballY+ballSize) {
            ballSpeedX = -ballSpeedX;
            speedUp();
        }
        else if ( ballX+ballSize > aiX && ballX+ballSize < aiX+paddleWidth && aiY+paddleHeight > ballY && aiY < ballY+ballSize) {
            ballSpeedX = -ballSpeedX;
            speedUp();
        }
    }
    
    const topCanvas = canvas.offsetTop;
    const leftCanvas = canvas.offsetLeft;
    canvas.addEventListener('mousemove',function (e) {
        playerY = e.clientY - topCanvas - paddleHeight/2;
        if (playerY >= ch - paddleHeight) {
            playerY = ch - paddleHeight;
        }
        if ( playerY <=0 ) {
            playerY = 0;
            
        }
        
    });
    function table() {
        //table
        ctx.fillStyle='black';
        ctx.fillRect(0 , 0, cw, ch);
        
        //center line
        for (let linePosition = 10; linePosition < ch; linePosition+=30) {
            ctx.fillStyle='grey';
           ctx.fillRect(cw/2-lineWidth/2,linePosition,lineWidth,lineHeight);
        }
        
    }
    function speed() {
        if (ballSpeedX > 0 && ballSpeedX < 18) {
            ballSpeedX+=0.5;
            
        }
        if (ballSpeedX < 0 && ballSpeedX > -18) {
            ballSpeedX-=0.5;
            
        }
    }
    function speedUp() {
        if (ballSpeedX > 0 && ballSpeedX < 18) {
            ballSpeedX+=0.5;
            ballSpeedY-=2;
        }
        if (ballSpeedX < 0 && ballSpeedX > -18) {
            ballSpeedX-=0.5;
            ballSpeedY+=2;
        }
    }
    function speedDown() {
        
        if (ballSpeedX < 0.2 && ballSpeedX < 18) {
            ballSpeedX+=0.5;
           
        }
        if (ballSpeedX > -0.2 && ballSpeedX > -18) {
            ballSpeedX-= 0.5;
            
        }
    }
    
    
    
    function game() {
        table()
        ball()
        aiPlayer()
        aiPosition()
        player()
    }
        
    setInterval(game,20);
    
    
    
});

