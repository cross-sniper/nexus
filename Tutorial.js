function Tutor(showOnce, text, size, pos, color) {
    this.showOnce = showOnce;
    this.text = text;
    this.pos = {x:pos.x * 40, y:pos.y *40};
    this.size = size;
    this.color = color;
    this.hasChanged = false;
    this.draw = function () {
        if (this.showOnce && this.hasChanged) {
            return;
        }
        // Draw shadow behind the text
        const shadowOffset = 2; // Adjust the offset for the shadow as needed
        const shadowColor = DARKGRAY; // Define DARK_GRAY color or use an appropriate one
        raylib.DrawText(this.text, this.pos.x + shadowOffset, this.pos.y + shadowOffset, this.size, shadowColor);
        
        // Draw the text
        raylib.DrawText(this.text, this.pos.x, this.pos.y, this.size, this.color);
    };
}
const tutorials = {
    1: [
        new Tutor(false, "Simple maze game",40, { x:4, y: 0 }, RED),
        new Tutor(true, "Move to the green square to advance a level",20, { x: 10, y: 1 }, BLACK)
    ],
    2:[
        new Tutor(true, "The red square takes you back one level",20, { x: 1, y: 1 }, BLACK),
    ],
    3:[
        new Tutor(true, "There might be forks on the path, but they all lead you forward",20, { x: 20, y: 19 }, BLACK)
    ]
};

function renderTutorials(mapId) {
    if (!tutorials[mapId]) {
        return;
    }
    tutorials[mapId].forEach(function (tutor) {
        tutor.draw();
    });
}

function newState(mapId) {
    if (!tutorials[mapId]) {
        return;
    }
    tutorials[mapId].forEach(function (tutor) {
        tutor.hasChanged = true;
    });
}

