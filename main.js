const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 }, debug: false },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let player, cursors, coins, scoreText, score = 0;

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('skeleton', 'assets/skeleton.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    this.add.image(400, 300, 'background');

    player = this.physics.add.sprite(100, 450, 'skeleton');
    player.setCollideWorldBounds(true);

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: 150, y: 0, stepX: 100 },
    });

    coins.children.iterate((coin) => {
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff',
    });

    this.physics.add.collider(player, coins, collectCoin, null, this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
