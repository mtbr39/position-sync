// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.database();

var playerIdList = [];

//入力内容を更新した時
var changeSyncPosition = function (playerID, x, y) {
    ref = db.ref("/game/all/player");
    ref.child(playerID).update({
        sync_player: {
            x: x,
            y: y,
        },
    });
};

var setSyncPlayer = function (_sync_player) {
    ref = db.ref("/game/all/player");
    newPlayerRef = ref.push({ sync_player: _sync_player });
    return newPlayerRef.key;
};

var deleteSyncPlayer = function (_playerID) {
    ref = db.ref("/game/all/player");
    ref.child(_playerID).remove();
};

var GetOtherPlayer = function () {
    ref = db.ref("/game/all/player");
    var queryRef = ref.orderByKey();
    queryRef.once("value", function (querySnapshot) {
        querySnapshot.forEach(function (playerSnapshot) {
            console.log(
                "The dinosaur just shorter than the stegasaurus is " +
                    dinoSnapshot.key
            );

            // Returning true means that we will only loop through the forEach() one time
            return true;
        });
    });
};

ref = db.ref("/game/all/player");
ref.on("child_added", function (snapshot) {
    playerIdList.push(snapshot.key);
    addOtherPlayer(snapshot.key);
    ref.child(snapshot.key).on("value", onPlayerValue); //game/all/playerのsnapshot.keyの変更時に実行する関数を登録
    console.log("Add!", playerIdList);
});
ref.on("child_removed", function (snapshot) {
    playerIdList.splice(playerIdList.indexOf(snapshot.key), 1);
    ref.child(snapshot.key).off();
    console.log("Delete!", playerIdList);
});

var onPlayerValue = function (snapshot) {
    otherPlayers.forEach(function (otherPlayer) {
        if (otherPlayer.playerID == snapshot.key) {
            otherPlayer.x = snapshot.val().sync_player.x;
            otherPlayer.y = snapshot.val().sync_player.y;
        }
    });
};

//https://www.gstatic.com/firebasejs/7.15.1/firebase-database.js

ref = db.ref("/tree1/child1");
ref.child(childID).update(
    //追加したいJSONデータ
    {
        key1: { keyA: 1, keyB: 4 },
    }
);

ref = db.ref("/tree1/child1");
ref.on("child_added", function (snapshot) {
    //子要素が変更されたときの処理
});
