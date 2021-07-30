class GraphicsObject extends PIXI.Graphics {
    constructor(x = 0, y = 0, w = 100, h = 100, color = 0xffffff) {
        super();
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;

        this.beginFill(color);
        this.drawRect(0, 0, w, h);
        this.endFill();
    }
}

class MoveObject extends GraphicsObject {
    constructor(x = 0, y = 0, w = 100, h = 100, color = 0xffffff) {
        super(x, y, w, h, color);
        this.vx = 0;
        this.vy = 0;
        this.destination = null;
        this.speed = 5;
        app.ticker.add((delta) => this.update());
    }

    goto_destination() {
        const gap = 3;
        let cx = this.x + this.width / 2.0;
        let cy = this.y + this.height / 2.0;
        if (cx - gap < this.destination.x && this.destination.x < cx + gap) {
            if (
                cy - gap < this.destination.y &&
                this.destination.y < cy + gap
            ) {
                this.vx = 0;
                this.vy = 0;
                return;
            }
        }
        let angle = Math.atan2(
            this.destination.y - cy,
            this.destination.x - cx
        );
        this.vx = this.speed * Math.cos(angle);
        this.vy = this.speed * Math.sin(angle);
    }

    update() {
        this.goto_destination();
        this.x += this.vx;
        this.y += this.vy;
    }
}

class OtherPlayer extends GraphicsObject {
    constructor(playerID) {
        super();
        this.playerID = playerID;
    }
}
