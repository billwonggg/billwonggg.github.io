/* 
    Script for background animation on the first page
*/

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = null;

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
  }

  // draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgb(215,215,215)";
    ctx.fill();
  }

  update() {
    // check position of particle
    if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;

    if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;

    // update position
    this.x += this.dirX;
    this.y += this.dirY;

    this.draw();
  }
}

const addParticle = (pArr) => {
  let size = Math.random() * 2 + 8;
  let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
  let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
  // horizontal speed between 0.6 and 1.2
  let dirX = Math.random() * (1.2 - 0.6) + 0.6;
  // vertical speed between 0.3 and 0.7
  let dirY = Math.random() * (0.7 - 0.3) + 0.3;
  let color = "rgb(215,215,215)";

  pArr.push(new Particle(x, y, dirX, dirY, size, color));
};

const init = () => {
  let numParticles = (canvas.height * canvas.width) / 90000 + 3;
  if (particlesArray != null) {
    let diff = Math.ceil(numParticles - particlesArray.length);
    while (diff != 0 && particlesArray.length > 0) {
      if (diff > 0) {
        addParticle(particlesArray);
        diff--;
      } else {
        particlesArray.pop();
        diff++;
      }
    }
  } else {
    // first time
    particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
      addParticle(particlesArray);
    }
  }
};

const connect = () => {
  let opacity = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);

      if (distance < canvas.width * canvas.height) {
        opacity = 1 - distance / 90000;
        ctx.strokeStyle = "rgba(215,215,215," + opacity + ")";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
};

// resize event
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  // mouse.radius = (canvas.height / 80) * (canvas.height / 80);
  init();
});

init();
animate();
