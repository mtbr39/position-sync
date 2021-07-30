var otherPlayers = [];

// pixi.jsのアプリケーションを作成
const app = new PIXI.Application();

// bodyにpixi.jsのview(ステージ)を追加する
document.body.appendChild(app.view);

//***クリックリスナー生成
const clicklistener = new GraphicsObject(
    0,
    0,
    app.view.width,
    app.view.height,
    0x444444
);
app.stage.addChild(clicklistener);
clicklistener.interactive = true;
//clicklistener.hitArea = rect;

const destination = new GraphicsObject(500, 100, 10, 10);
app.stage.addChild(destination);

clicklistener.on("click", function (event) {
    // console.log("click");
    const position = event.data.getLocalPosition(event.currentTarget);
    destination.x = position.x;
    destination.y = position.y;
});

let playerInfo = { x: -1, y: -1 };
playerID = setSyncPlayer(playerInfo);
console.log("main.js > playerID: ", playerID);

//***player生成
const player = new MoveObject(50, 50, 100, 100);
player.destination = destination;
app.stage.addChild(player);

app.ticker.add((delta) => mainUpdate());
var mainUpdate = function () {
    changeSyncPosition(playerID, player.x, player.y);
};

window.addEventListener("beforeunload", (event) => {
    deleteSyncPlayer(playerID);
});
