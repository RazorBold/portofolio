// ==================== 3D Canvas Setup ====================
function init3D() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Camera position
    camera.position.z = 5;

    // Create rotating cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x0099ff,
        emissive: 0x0066ff,
        wireframe: false,
        shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add edge lines
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00d4ff }));
    cube.add(line);

    // Lighting
    const light1 = new THREE.PointLight(0x0099ff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00d4ff, 0.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.008;
        cube.rotation.z += 0.003;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    animate();
}

// ==================== Mobile Menu ====================
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.flexDirection = 'column';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
            navMenu.style.gap = '1rem';
            navMenu.style.padding = '1rem';
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.style.display = 'none';
            });
        });
    }
}

// ==================== Smooth Scroll Navigation ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== Scroll Animation ====================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards and skill categories
    document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== Form Submission ====================
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                message: form.querySelector('textarea').value
            };

            try {
                const response = await fetch('http://localhost:5001/api/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            }
        });
    }
}

// ==================== Navbar Background on Scroll ====================
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.borderBottomColor = 'rgba(0, 153, 255, 0.3)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.borderBottomColor = 'rgba(0, 153, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// ==================== Particle Effect Background ====================
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#0099ff' : '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
        particle.style.pointerEvents = 'none';
        
        hero.appendChild(particle);
    }
}

// ==================== Float Animation ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-20px) translateX(20px); }
        50% { transform: translateY(-40px) translateX(-20px); }
        75% { transform: translateY(-20px) translateX(-40px); }
    }
`;
document.head.appendChild(style);

// ==================== Typing Effect ====================
function typeEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Start typing after page load
    setTimeout(type, 500);
}

// ==================== Initialize All ====================
document.addEventListener('DOMContentLoaded', () => {
    init3D();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupNavbarScroll();
    observeElements();
    createParticleEffect();
    typeEffect();
});

// Handle resize for responsive
window.addEventListener('resize', () => {
    // Reinitialize 3D if needed
    const canvas = document.getElementById('canvas3d');
    if (canvas && canvas.parentElement.offsetWidth === 0) {
        init3D();
    }
});
