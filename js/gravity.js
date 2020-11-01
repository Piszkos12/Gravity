// ECMAScript 5

//////////////////////////
// Gravity Object Class //
//////////////////////////

function GravityObject(x, y, vx, vy, mass, title, color) {
    this.title = title;
    this.color = color;
    this.mass = mass;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.domElement = document.createElement("div");
    this.domElement.style = "position: fixed; border-radius:50%; height:" + mass + "px; width:" + mass + "px; background-color:" + color + "; left:" + x + "px; top:" + y + "px; transform: translate(-50%, -50%)";
    this.domElement.id = title;
    document.body.appendChild(this.domElement);
}

GravityObject.prototype.step = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.domElement.style.left = Math.round(this.x) + "px";
    this.domElement.style.top = Math.round(this.y) + "px";
}

//////////////////////////
// Gravity Scene Class //
//////////////////////////

function GravityScene() {
    this.objects = [];
    this.step = 0;

    this.stepTimer = setInterval(this.stepHandler.bind(this), 2);
}

GravityScene.prototype.add = function(x, y, vx, vy, mass, title, color) {
    this.objects.push(new GravityObject(x, y, vx, vy, mass, title, color));
}

GravityScene.prototype.stepHandler = function() {
    this.step++;

    // Calculatenew vectors;
    for (var i = 0; i < this.objects.length; i++) {
        for (var j = 0; j < this.objects.length; j++) {
            if (this.objects[i] != this.objects[j])
                this.calculateGravity(this.objects[i], this.objects[j]);
        }
    }

    // Do next step
    for (var i = this.objects.length - 1; i >= 0; i--) this.objects[i].step();
}

GravityScene.prototype.calculateGravity = function(a, b) {
    // Get b distance from a
    var distance = Math.sqrt(Math.pow(Math.abs(b.x - a.x), 2) + Math.pow(Math.abs(b.y - a.y), 2));

    // Get b direction from a
    var angle = Math.atan2((b.y - a.y), (b.x - a.x));

    // Get b gravity force for a
    var gravity = (a.mass * b.mass) / Math.pow(distance, 2) * (b.mass / a.mass);

    // Calculate the gravitational acceleration vector
    a.vx += (Math.cos(angle) * gravity);
    a.vy += (Math.sin(angle) * gravity);
}