class Snow {
  constructor() {
    this.snowflakes = []
    this.snowflakeCount = 200
  }

  createSnowflake() {
    return new (random([
      Snowflake,
      Snowflake2,
      Snowflake3
    ]))
  }

  setup() {
    for(let i = 0; i < this.snowflakeCount; i++) {
      let snowflake = this.createSnowflake();
      snowflake
        .move(random(-width/2, width/2),random(-height/2, height/2))
        .size(random(1,100))
        .color(color(random(70, 100),random(70, 160),random(60, 230),random(100,200)))

      while(!this.add(snowflake)){
        snowflake
          .move(random(-width/2, width/2),random(-height/2, height/2))
          .size(random(1,100))
      }
    }
  }

  add(newSnowflake) {
    if( this.snowflakes.every(snowflake=>!snowflake.isCollision(newSnowflake))) {
      this.snowflakes.push(newSnowflake)
      return true
    } else {
      return false
    }
  }

  draw() {
    for(let snowflake of this.snowflakes) {
      snowflake.draw()
    }
  }
}


class Snowflake {
  constructor() {
    this.x = 0
    this.y = 0
    this.mainColor = color(20, 20, 155, 100)
    this.radius = 100
  }

  move(x,y) {
    this.x = x
    this.y = y
    return this
  }

  size(s) {
    this.radius = s/2
    return this
  }

  color(c) {
    this.mainColor = c
    return this
  }

  distance(otherSnow) {
    return sqrt(pow(this.x - otherSnow.x, 2) + pow(this.y - otherSnow.y, 2))
  }

  isCollision(otherSnow) {
    return this.distance(otherSnow) < (otherSnow.radius + this.radius)
  }

  piece() {
    const radius = this.radius
    const branchCount = 5
    const branchAngle = PI/4
    strokeWeight(1 + radius/50);
    line(0, 0, 0, radius )

    push()
    for(let i = 0; i < branchCount; i++) {
      translate(0, radius/branchCount)
      push()
      rotate(branchAngle)
      line(0, 0, 0, radius/branchCount)
      pop()

      push()
      rotate(-branchAngle)
      line(0, 0, 0, radius/branchCount)
      pop()
    }
    pop()
  }

  draw() {
    push()
    stroke(this.mainColor)
    translate(width / 2, height / 2)
    translate(this.x, this.y)
    for (let i = 0; i < 6; ++i) {
      rotate(PI / 3)
      this.piece()
    }
    pop()
  }
}

class Snowflake2 extends Snowflake {

  piece() {
    const radius = this.radius
    const lineSize1 = radius * 3 /6
    const lineSize2 = radius / 6
    const vexSize = radius * 2 /6
    strokeWeight(1 + radius / 50)
    stroke(this.mainColor)
    noFill()
    line(0, 0, 0, lineSize1)

    push()
    translate(0, radius / 6)
    rotate(PI / 3)
    line(0, 0, 0, radius / 5)
    rotate( -2 * PI / 3)
    line(0, 0, 0, radius / 5)
    pop()

    push()
    translate(0, radius * 2 / 6)
    rotate(PI / 3)
    line(0, 0, 0, radius / 2)
    rotate( -2 * PI / 3)
    line(0, 0, 0, radius / 2)
    pop()

    push()
    translate(0, lineSize1)
    beginShape()
    vertex(0, 0)
    vertex(-vexSize/4,vexSize/2)
    vertex(0,vexSize)
    vertex(vexSize/4,vexSize/2)
    endShape(CLOSE)
    translate(0,vexSize)
    line(0, 0, 0, lineSize2)
    pop()
  }
}

class Snowflake3 extends Snowflake {

  piece() {
    const radius = this.radius
    strokeWeight(1+radius/200)
    stroke(this.mainColor)
    let color2 = color(this.mainColor)
    color2.alpha = color2.alpha/2
    fill(color2)
    beginShape()
    vertex(0,0)
    vertex(sin(-PI/6) * radius * 2/4, cos(-PI/6)*radius*2/4)
    vertex(sin(-PI/10) * radius * 1.2/4, cos(-PI/10) * radius*1.2/4)
    vertex(0,radius*3/4)
    vertex(0,0)
    vertex(0,radius*3/4)
    vertex(sin(PI/10)*radius*1.2/4, cos(PI/10)*radius*1.2/4)
    vertex(sin(PI/6)*radius*2/4, cos(PI/6) * radius*2/4)
    endShape()

    beginShape()
    vertex(0,radius*3/4)
    vertex(radius/16, radius*7/8)
    vertex(0,radius)
    vertex(-radius/16, radius*7/8)
    endShape(CLOSE)
  }
}

let snow = new Snow()

function setup() {
  createCanvas(windowWidth, windowHeight, SVG)
  background(10, 20, 30)
  blendMode(ADD)
  snow.setup()
  noLoop()
}

function  draw() {
  clear();
  background(7,12,56);
  snow.draw()
  // save("mySVG.svg");
  // print("saved svg");
  // noLoop();
}