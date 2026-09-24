(function () {
const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        // mouse position
        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height/160) * (canvas.width/160)
        }

        window.addEventListener('mousemove',
            function(event) {
                mouse.x = event.x;
                mouse.y = event.y;
            }
        );

        // particles
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.offsetX = 0;
                this.offsetY = 0;
                this.inertiaX = 0;
                this.inertiaY = 0;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            // drawing particles
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
            update(delta) {
                this.x += this.directionX * delta;
                this.y += this.directionY * delta;

                if (this.x > canvas.width || this.x < 0 ) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                if (mouse.x !== null && mouse.x !== undefined) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.hypot(dx, dy);
                    const influenceRadius = mouse.radius + this.size;

                    if (distance < influenceRadius && distance > 0) {
                        const force = (1 - distance / influenceRadius) * 0.22;
                        this.inertiaX += (dx / distance) * force * delta;
                        this.inertiaY += (dy / distance) * force * delta;
                    }
                }

                const previousOffsetX = this.offsetX;
                const previousOffsetY = this.offsetY;
                // A soft spring returns cursor-displaced particles to their drift path.
                this.inertiaX -= this.offsetX * 0.01 * delta;
                this.inertiaY -= this.offsetY * 0.01 * delta;
                const damping = Math.pow(0.92, delta);
                this.inertiaX *= damping;
                this.inertiaY *= damping;
                this.offsetX += this.inertiaX * delta;
                this.offsetY += this.inertiaY * delta;

                this.x += this.offsetX - previousOffsetX;
                this.y += this.offsetY - previousOffsetY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 5) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.8) - 0.4;
                let directionY = (Math.random() * 0.8) - 0.4;
                let color = 'white';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect(){
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance/20000);
                        ctx.strokeStyle = 'rgba(178, 224, 170,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        let lastFrameTime = 0;
        function animate(timestamp) {
            requestAnimationFrame(animate);
            const delta = lastFrameTime
                ? Math.min((timestamp - lastFrameTime) / (1000 / 60), 2)
                : 1;
            lastFrameTime = timestamp;
            ctx.clearRect(0,0,innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(delta);
            }
            connect();
        }

        window.addEventListener('resize',
            function(){
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                mouse.radius = ((canvas.height/160) * (canvas.height/160));
                init();
            }
        );

        window.addEventListener('mouseout',
            function(){
                mouse.x = undefined;
                mouse.y = undefined;
            }
        )

        init();
        animate();
})();
