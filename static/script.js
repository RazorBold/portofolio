// ==================== Scroll Progress Bar ====================
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #0099ff 0%, #00d4ff 100%);
        z-index: 2000;
        box-shadow: 0 0 20px rgba(0, 153, 255, 0.6);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ==================== Floating Particles ====================
function createFloatingParticles() {
    const container = document.querySelector('.projects') || document.body;
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${particle.style.width};
            background: ${Math.random() > 0.5 ? '#0099ff' : '#00d4ff'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: floatParticle ${Math.random() * 15 + 10}s infinite ease-in-out;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

// Add floating particle animation to style
if (!document.querySelector('style[data-particles]')) {
    const particleStyle = document.createElement('style');
    particleStyle.setAttribute('data-particles', 'true');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: ${Math.random() * 0.5 + 0.1};
            }
            25% {
                transform: translateY(-30px) translateX(20px) scale(1.1);
            }
            50% {
                transform: translateY(-60px) translateX(-20px) scale(0.9);
                opacity: ${Math.random() * 0.3};
            }
            75% {
                transform: translateY(-30px) translateX(-40px) scale(1.1);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}
function loadGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Images to load from personal folder
    const imageFiles = [
        'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg',
        'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg'
    ];

    galleryItems.forEach((item, index) => {
        const imagePath = `/static/images/personal/${imageFiles[index]}`;
        
        // Try to load image
        const img = new Image();
        img.onload = function() {
            // If image exists, use it
            const placeholder = item.querySelector('.gallery-placeholder');
            placeholder.innerHTML = `<img src="${imagePath}" alt="Photo ${index + 1}">`;
        };
        img.onerror = function() {
            // If image doesn't exist, keep placeholder
            console.log(`Image not found: ${imagePath}`);
        };
        img.src = imagePath;
    });
}

// ==================== 3D Canvas Setup - Robot Mode ====================
function init3D() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

    // Camera position
    camera.position.z = 6;

    // ==================== Create Robot Figure ====================
    const robot = new THREE.Group();
    
    // Robot body (chest)
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x0099ff,
        emissive: 0x0066ff,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    robot.add(body);

    // Robot head
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x00a8ff,
        shininess: 120
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    head.castShadow = true;
    robot.add(head);

    // Robot eyes (left)
    const eyeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.15);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0066,
        emissive: 0xff0066,
        shininess: 150
    });
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.set(-0.2, 1.4, 0.45);
    eyeLeft.castShadow = true;
    robot.add(eyeLeft);

    // Robot eyes (right)
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeRight.position.set(0.2, 1.4, 0.45);
    eyeRight.castShadow = true;
    robot.add(eyeRight);

    // Robot left arm
    const armGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const armMaterial = new THREE.MeshPhongMaterial({
        color: 0x9d4edd,
        emissive: 0x7b2cbf,
        shininess: 100
    });
    const armLeft = new THREE.Mesh(armGeometry, armMaterial);
    armLeft.position.set(-0.8, 0.3, 0);
    armLeft.castShadow = true;
    robot.add(armLeft);

    // Robot right arm
    const armRight = new THREE.Mesh(armGeometry, armMaterial);
    armRight.position.set(0.8, 0.3, 0);
    armRight.castShadow = true;
    robot.add(armRight);

    // Robot left leg
    const legGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const legMaterial = new THREE.MeshPhongMaterial({
        color: 0x00f5ff,
        emissive: 0x00d4ff,
        shininess: 100
    });
    const legLeft = new THREE.Mesh(legGeometry, legMaterial);
    legLeft.position.set(-0.3, -1.2, 0);
    legLeft.castShadow = true;
    robot.add(legLeft);

    // Robot right leg
    const legRight = new THREE.Mesh(legGeometry, legMaterial);
    legRight.position.set(0.3, -1.2, 0);
    legRight.castShadow = true;
    robot.add(legRight);

    // Add wireframe overlay untuk futuristic look
    const wireframeGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        linewidth: 2
    });
    const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(wireframeGeometry),
        wireframeMaterial
    );
    body.add(wireframe);

    // Add glow effect to eyes
    const eyeGlowGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.3);
    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0066,
        transparent: true,
        opacity: 0.3
    });
    const eyeGlowLeft = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    eyeGlowLeft.position.copy(eyeLeft.position);
    eyeGlowLeft.scale.set(1.5, 1.5, 1.5);
    robot.add(eyeGlowLeft);

    const eyeGlowRight = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    eyeGlowRight.position.copy(eyeRight.position);
    eyeGlowRight.scale.set(1.5, 1.5, 1.5);
    robot.add(eyeGlowRight);

    scene.add(robot);

    // ==================== Lighting ====================
    // Main light - Blue
    const light1 = new THREE.PointLight(0x0099ff, 1.5, 100);
    light1.position.set(5, 5, 5);
    light1.castShadow = true;
    scene.add(light1);

    // Secondary light - Cyan
    const light2 = new THREE.PointLight(0x00d4ff, 1, 100);
    light2.position.set(-5, 5, 5);
    light2.castShadow = true;
    scene.add(light2);

    // Accent light - Pink
    const light3 = new THREE.PointLight(0xff0066, 0.8, 80);
    light3.position.set(0, 3, -5);
    light3.castShadow = true;
    scene.add(light3);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // ==================== Floating particles around robot ====================
    const particleGroup = new THREE.Group();
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? 0x0099ff : 0x00d4ff,
            emissive: Math.random() > 0.5 ? 0x0066ff : 0x00a8ff,
            shininess: 100
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random position around robot
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 3 + Math.random() * 1;
        particle.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 3,
            Math.sin(angle) * radius
        );
        
        particle.userData = {
            angle: angle,
            radius: radius,
            speed: Math.random() * 0.02 + 0.01,
            verticalSpeed: (Math.random() - 0.5) * 0.02
        };
        
        particleGroup.add(particle);
    }
    
    scene.add(particleGroup);

    // ==================== Animation loop ====================
    function animate() {
        requestAnimationFrame(animate);
        
        // Robot rotation and movement
        robot.rotation.y += 0.005;
        
        // Robot body breathing effect
        body.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        
        // Arms movement
        armLeft.rotation.z = Math.sin(Date.now() * 0.003) * 0.5;
        armRight.rotation.z = -Math.sin(Date.now() * 0.003) * 0.5;
        
        // Legs movement
        legLeft.rotation.x = Math.sin(Date.now() * 0.003) * 0.3;
        legRight.rotation.x = -Math.sin(Date.now() * 0.003) * 0.3;
        
        // Eyes glow pulse
        eyeGlowLeft.material.opacity = 0.2 + Math.sin(Date.now() * 0.005) * 0.1;
        eyeGlowRight.material.opacity = 0.2 + Math.sin(Date.now() * 0.005) * 0.1;
        
        // Particles orbit around robot
        particleGroup.children.forEach((particle, index) => {
            const userData = particle.userData;
            userData.angle += userData.speed;
            
            particle.position.x = Math.cos(userData.angle) * userData.radius;
            particle.position.y += userData.verticalSpeed;
            particle.position.z = Math.sin(userData.angle) * userData.radius;
            
            // Reset vertical position if too high or low
            if (particle.position.y > 3) particle.position.y = -3;
            if (particle.position.y < -3) particle.position.y = 3;
            
            particle.rotation.x += 0.02;
            particle.rotation.y += 0.02;
        });

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

// ==================== Project Card Interaction ====================
function setupProjectCardInteraction() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent);
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: glowPulse 0.6s ease-out forwards;
            `;
            card.appendChild(glow);
            
            setTimeout(() => glow.remove(), 600);
        });
    });
}

// ==================== Mouse Follower ====================
function setupMouseFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 153, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none;
        box-shadow: 0 0 20px rgba(0, 153, 255, 0.4);
    `;
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.display = 'block';

        // Smooth follow
        followerX += (mouseX - followerX) * 0.3;
        followerY += (mouseY - followerY) * 0.3;

        follower.style.left = (followerX - 10) + 'px';
        follower.style.top = (followerY - 10) + 'px';
    });

    document.addEventListener('mouseleave', () => {
        follower.style.display = 'none';
    });
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
    loadGalleryImages();
    createScrollProgressBar();
    createFloatingParticles();
    setupProjectCardInteraction();
    setupMouseFollower();
    setupParallaxScroll();
    animateOnScroll();
});

// ==================== Parallax Scroll ====================
function setupParallaxScroll() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const distance = scrollPosition - elementPosition;
            
            element.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

// ==================== Animate on Scroll ====================
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-category, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// Handle resize for responsive
window.addEventListener('resize', () => {
    // Reinitialize 3D if needed
    const canvas = document.getElementById('canvas3d');
    if (canvas && canvas.parentElement.offsetWidth === 0) {
        init3D();
    }
});
