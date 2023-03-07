var rocketImg, rocket
var meteorImg, meteor, meteorsGroup
var spaceImg, space
var gameState = "play"
var score

function preload() {
    rocketImg = loadImage("rocket.png")
    meteorImg = loadImage("meteor.png")
    spaceImg = loadImage("space_background.jpeg")
}

function setup() {
    createCanvas(600, 600)
    space = createSprite(0, 0, 600, 600)
    space.addImage(spaceImg)
    space.scale = 5
    rocket = createSprite(200, 200, 50, 50)
    rocket.scale = 0.05
    rocket.addImage("rocket", rocketImg)
    meteorsGroup = new Group()
    score = 0
    rocket.debug = true
}

function draw() {
    //background("white")
    if (gameState === "play") {
        score += Math.round(getFrameRate() / 60)
        space.velocityY = 1
        if (keyDown("LEFT_ARROW")) {
            rocket.x = rocket.x - 3
        }
        if (keyDown("RIGHT_ARROW")) {
            rocket.x = rocket.x + 3
        }
        if (keyDown("SPACE")) {
            rocket.velocityY = -5
        }
        rocket.velocityY += 0.8
        if (space.y > 400) {
            space.y = 300
        }
        spawnMeteors()
        if (meteorsGroup.isTouching(rocket) || rocket.y > 600) {
            rocket.destroy()
            gameState = "end"
        }
    }
    else if (gameState === "end") {
        fill("red")
        textSize(30)
        text("Game Over", 250, 250)
    }

    drawSprites()
    fill("white")
    text("Score: " + score, 375, 20)
}

function spawnMeteors() {
    if (frameCount % 240 === 0) {
        var meteor = createSprite(200, -50)
        meteor.scale = 0.05
        meteor.x = Math.round(random(120, 400))
        meteor.addImage(meteorImg)
        meteor.velocityY = 1
        meteor.lifetime = 800

        rocket.depth = meteor.depth
        rocket.depth += 1
        meteor.debug = true

        meteorsGroup.add(meteor)
    }
}