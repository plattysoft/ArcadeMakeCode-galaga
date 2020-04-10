namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    isFiring = false
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isFiring)) {
        isFiring = true
        projectile = sprites.createProjectileFromSprite(img`
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
. . . 7 7 . . . 
`, mySprite, 0, -100)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite.destroy(effects.spray, 500)
})
let movement = 0
let projectile: Sprite = null
let mySprite2: Sprite = null
let isFiring = false
let mySprite: Sprite = null
mySprite = sprites.create(img`
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c b . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . c 4 . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . e 4 . . . . . . . 
. . . . . . e e 5 2 . . . . . . 
. . . . . . e 4 5 2 . . . . . . 
. . . . . c c c 2 2 2 . . . . . 
. . . . e e 4 4 4 5 2 2 . . . . 
. . e f f f c c 2 2 f f 2 2 . . 
. e e e e 2 2 4 4 4 4 5 4 2 2 . 
e e e e e e 2 2 4 4 4 5 4 4 2 2 
e e e e e e 2 2 4 4 4 4 5 4 2 2 
`, SpriteKind.Player)
mySprite.setPosition(80, 112)
let xMov = 1
let timesMoved = 0
controller.moveSprite(mySprite, 100, 0)
isFiring = false
let sprite_list = sprites.allOfKind(SpriteKind.Enemy)
for (let row = 0; row <= 3; row++) {
    for (let index = 0; index <= 7; index++) {
        mySprite2 = sprites.create(img`
. . . . . . f f f f . . . . . . 
. . . . f f 1 1 1 1 f f . . . . 
. . . f b 1 1 1 1 1 1 b f . . . 
. . . f 1 1 1 1 1 1 1 1 f . . . 
. . f d 1 1 1 1 1 1 1 1 d f . . 
. . f d 1 1 1 1 1 1 1 1 d f . . 
. . f d d d 1 1 1 1 d d d f . . 
. . f b d b f d d f b d b f . . 
. . f c d c f 1 1 f c d c f . . 
. . . f b 1 1 1 1 1 1 b f . . . 
. . f f f c d b 1 b d f f f f . 
f c 1 1 1 c b f b f c 1 1 1 c f 
f 1 b 1 b 1 f f f f 1 b 1 b 1 f 
f b f b f f f f f f b f b f b f 
. . . . . f f f f f f . . . . . 
. . . . . . . f f f . . . . . . 
`, SpriteKind.Enemy)
        mySprite2.setPosition(index * 18 + 10, row * 18 + 10)
        sprite_list.push(mySprite2)
    }
}
game.onUpdate(function () {
    effects.starField.startScreenEffect()
    if (timesMoved == 5) {
        xMov = 0 - xMov
        timesMoved = 0
    }
    for (let value of sprite_list) {
        if (movement == 0) {
            value.x += xMov
            value.y += -1
        } else if (movement == 1) {
            value.x += xMov
        } else if (movement == 2) {
            value.x += xMov
            value.y += 1
        }
    }
    if (movement >= 3) {
        movement = -20
        timesMoved += 1
    } else {
        movement = movement + 1
    }
})
