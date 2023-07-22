const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create particles
function createParticles() {
  particles = [];

  for (let i = 0; i < 200; i++) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      size: Math.random() * 3 + 1,
      color: 'white'
    };

    particles.push(particle);
  }
}

// Calculate distance between two particles
function calculateDistance(particle1, particle2) {
  const dx = particle1.x - particle2.x;
  const dy = particle1.y - particle2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Update particles and animate them
function updateParticles() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move and draw particles
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce particles off the edges of the canvas
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1;
    }

    // Draw particles
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw stroke lines to connect nearby particles
    particles.forEach(otherParticle => {
      if (particle !== otherParticle) {
        const distance = calculateDistance(particle, otherParticle);
        if (distance < 100) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    });
  });

  // Animation loop
  requestAnimationFrame(updateParticles);
}

// Create particles on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

// Initialize particles and start animation
createParticles();
updateParticles();


const hamburgEl= document.getElementById('openHamburg');
const openContainer = document.querySelector('.open-hamburg');
const closeIconHamburg = document.getElementById('close-icon');
const popupEl = document.getElementById('popup-menu');
const closeContainer = document.getElementById('close-hamburg');


hamburgEl.addEventListener('click', function(){
  popupEl.classList.toggle('show')
  closeContainer.classList.toggle('show-close');
  hamburgEl.classList.add('hide')
})

closeIconHamburg.addEventListener('click', function(){
  popupEl.classList.remove('show');
  hamburgEl.classList.remove('hide');
  closeContainer.classList.remove('show-close');
  closeIconHamburg.classList.add('hide')
})