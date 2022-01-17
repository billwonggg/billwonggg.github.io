const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = null;

// let mouse = {
//     x: null,
//     y: null,
//     radius: (canvas.height / 80) * (canvas.width / 80)
// }

// window.addEventListener('mousemove',
//     function (event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//     }
// );

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
        ctx.fillStyle = 'rgb(215,215,215)';
        ctx.fill();
    }

    update() {
        // check position of particle
        if (this.x > canvas.width || this.x < 0) 
            this.dirX = -this.dirX;
        
        if (this.y > canvas.height || this.y < 0)
            this.dirY = -this.dirY;
        
        // // collision detection
        // let distX = mouse.x - this.x;
        // let distY = mouse.y - this.y;
        // let distance = Math.sqrt(distX * distX + distY * distY);
        // if (distance < mouse.radius + this.size) {
        //     if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        //         this.x += 7;
        //     }
        //     if (mouse.x > this.x && this.x > this.size * 10) {
        //         this.x -= 7;
        //     }
        //     if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        //         this.y += 7;
        //     }
        //     if (mouse.y > this.y && this.y > this.size * 10) {
        //         this.y -= 7;
        //     }
        // }
        // update position
        this.x += this.dirX;
        this.y += this.dirY;

        this.draw();
    }
}

const addParticle = (pArr) => {
    let size = (Math.random() * 5) + 10;
    let x = Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2;
    let y = Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2;
    let dirX = Math.random() * 3 - 0.8;
    let dirY = Math.random() * 3 - 0.8;
    let color = 'rgb(215,215,215)';
    
    pArr.push(new Particle(x, y, dirX, dirY, size, color));
}

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
}

const connect = () => {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) 
                + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);

            if (distance < canvas.width * canvas.height) {
                opacity = 1 - (distance / 150000);
                ctx.strokeStyle = 'rgba(215,215,215,' + opacity + ')';
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();               
            }
        }
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// resize event
window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // mouse.radius = (canvas.height / 80) * (canvas.height / 80);
        init();
    }
)

// // mouse out event
// window.addEventListener('mouseout',
//     function() {
//         mouse.x = undefined;
//         mouse.y = undefined;
//     }
// )

init();
animate();

