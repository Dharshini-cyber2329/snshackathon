// Golden/Blue Neural Network Particle Effect
class NeuralNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'neurons-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        `;
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'golden' : 'blue'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle with golden or blue color
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            if (particle.color === 'golden') {
                this.ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
                this.ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
            } else {
                this.ctx.fillStyle = 'rgba(74, 159, 216, 0.6)';
                this.ctx.shadowColor = 'rgba(135, 206, 235, 0.5)';
            }
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    const opacity = (1 - distance / 120) * 0.4;
                    
                    // Mix golden and blue for connections
                    if (particle.color === 'golden' && other.color === 'golden') {
                        this.ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                    } else if (particle.color === 'blue' && other.color === 'blue') {
                        this.ctx.strokeStyle = `rgba(74, 159, 216, ${opacity})`;
                    } else {
                        this.ctx.strokeStyle = `rgba(135, 206, 235, ${opacity * 0.7})`;
                    }
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
            
            // Mouse interaction
            if (this.mouse.x != null && this.mouse.y != null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    const opacity = (1 - distance / this.mouse.radius) * 0.3;
                    this.ctx.strokeStyle = particle.color === 'golden' 
                        ? `rgba(255, 215, 0, ${opacity})` 
                        : `rgba(135, 206, 235, ${opacity})`;
                    this.ctx.lineWidth = 1.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize neural network
const neuralNetwork = new NeuralNetwork();

// AI Voice Welcome Message - Cute, Sweet, Cheerful Tone
function playWelcomeVoice() {
    try {
        // Check if speech synthesis is supported
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Create speech utterance with cute message
            const utterance = new SpeechSynthesisUtterance('Welcome to D T S C D Hackathon 2026! Let\'s innovate together!');
            
            // Configure voice settings for cute, sweet tone
            utterance.rate = 1.0;      // Normal speed for clarity
            utterance.pitch = 1.5;     // Higher pitch for cute voice
            utterance.volume = 0.9;    // Clear volume
            
            // Wait for voices to load, then select a cute female voice
            const setVoice = () => {
                const voices = speechSynthesis.getVoices();
                
                // Priority order for cute, sweet female voices
                const preferredVoices = [
                    'Google UK English Female',
                    'Samantha',
                    'Victoria',
                    'Microsoft Zira',
                    'Karen',
                    'Moira',
                    'Google US English Female',
                    'Microsoft Aria',
                    'Microsoft Emma',
                    'Tessa',
                    'Fiona',
                    'Amelie',
                    'Google हिन्दी', // Hindi female voice
                    'Microsoft Heera' // Hindi female voice
                ];
                
                // Try to find preferred voice
                let selectedVoice = null;
                for (const voiceName of preferredVoices) {
                    selectedVoice = voices.find(voice => voice.name.includes(voiceName));
                    if (selectedVoice) break;
                }
                
                // If no preferred voice, find any female voice
                if (!selectedVoice) {
                    selectedVoice = voices.find(voice => 
                        voice.name.toLowerCase().includes('female') ||
                        voice.name.toLowerCase().includes('woman') ||
                        voice.lang.includes('en') && !voice.name.toLowerCase().includes('male')
                    );
                }
                
                // Last resort: use first available voice
                if (!selectedVoice && voices.length > 0) {
                    selectedVoice = voices[0];
                }
                
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    console.log('Voice: Using ' + selectedVoice.name);
                }
                
                // Play the cute voice
                speechSynthesis.speak(utterance);
                console.log('Voice: Cute welcome message played');
                
                // Show visual feedback
                const robot = document.querySelector('.robot-assistant');
                if (robot) {
                    robot.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        robot.style.transform = '';
                    }, 300);
                }
            };
            
            // Ensure voices are loaded
            if (speechSynthesis.getVoices().length > 0) {
                setVoice();
            } else {
                speechSynthesis.onvoiceschanged = setVoice;
            }
            
            // Mobile-specific: Try to play after a short delay
            setTimeout(() => {
                if (speechSynthesis.speaking === false) {
                    setVoice();
                }
            }, 100);
            
        } else {
            console.log('Voice: Speech synthesis not supported on this device');
            // Show visual feedback even if voice doesn't work
            alert('👋 Welcome to DT-SCD Hackathon 2026! Let\'s innovate together!');
        }
    } catch (error) {
        console.log('Voice: Error - ' + error.message);
        // Fallback: show message
        alert('👋 Welcome to DT-SCD Hackathon 2026!');
    }
}

// Track if voice has been played
let voicePlayed = false;

// Function to attempt playing voice
function attemptPlayVoice() {
    if (!voicePlayed) {
        playWelcomeVoice();
        voicePlayed = true;
    }
}

// Try to play on page load (multiple attempts)
window.addEventListener('load', () => {
    // First attempt immediately
    setTimeout(attemptPlayVoice, 500);
    
    // Second attempt (backup)
    setTimeout(attemptPlayVoice, 1500);
    
    // Third attempt (final backup)
    setTimeout(attemptPlayVoice, 3000);
});

// Play on any user interaction (click, touch, keypress)
const playOnInteraction = () => {
    attemptPlayVoice();
};

document.addEventListener('click', playOnInteraction, { once: true });
document.addEventListener('touchstart', playOnInteraction, { once: true });
document.addEventListener('keydown', playOnInteraction, { once: true });

// Also try when page becomes visible (for tab switching)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !voicePlayed) {
        setTimeout(attemptPlayVoice, 300);
    }
});

// Reset voice played flag when page is about to unload (for reload)
window.addEventListener('beforeunload', () => {
    voicePlayed = false;
});

// Observe hero section for smoke effect replay
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const smokeContainers = entry.target.querySelectorAll('.smoke-container');
        if (entry.isIntersecting) {
            // Restart smoke animations when hero comes into view
            smokeContainers.forEach(container => {
                const smokes = container.querySelectorAll('.smoke');
                smokes.forEach(smoke => {
                    smoke.style.animation = 'none';
                    setTimeout(() => {
                        smoke.style.animation = '';
                    }, 10);
                });
            });
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Smooth scroll with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it's a stat
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target.querySelector('.stat-number'));
            }
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe stats
document.querySelectorAll('.stat').forEach(stat => {
    observer.observe(stat);
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (!target) return; // Skip if no target (like ₹8L+)
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Countdown Timer
function initCountdown() {
    const eventDate = new Date('February 14, 2026 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown on page load
initCountdown();

// View Venue Map button
document.querySelector('.venue-map')?.addEventListener('click', function() {
    window.open('https://www.google.com/maps/place/Dr.+SNS+Rajalakshmi+College+of+Arts+and+Science+-+Top+Arts+and+Science+Colleges+in+Tamil+Nadu+Rank+Wise+in+Coimbatore/@11.0816162,76.9492427,14z/data=!4m6!3m5!1s0x3ba8f7b81cc9d317:0x98c5ef7624418af0!8m2!3d11.0816132!4d76.9766075!16s%2Fg%2F1tfgh7vf?entry=tts', '_blank');
});

// Hero CTA interactions
document.querySelectorAll('.hero-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Scroll to timeline
        if (this.classList.contains('primary')) {
            document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 3D card tilt effect
document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Magnetic button effect
document.querySelectorAll('.hero-cta, .cta-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Cursor trail effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.addPoint(e.clientX, e.clientY));
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            
            if (point.life > 0) {
                const size = 5 * point.life;
                const gradient = this.ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
                gradient.addColorStop(0, `rgba(255, 215, 0, ${point.life * 0.6})`);
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        this.trail = this.trail.filter(point => point.life > 0);
        
        requestAnimationFrame(() => this.animate());
    }
}

const cursorTrail = new CursorTrail();

// Stagger animation for info boxes
const infoBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const boxes = entry.target.querySelectorAll('.info-box');
            boxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.info-grid').forEach(grid => {
    grid.querySelectorAll('.info-box').forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    infoBoxObserver.observe(grid);
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Animate SVG path on scroll
const svgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const path = entry.target.querySelector('.process-path');
            if (path) {
                path.style.animation = 'drawPath 2s ease forwards';
            }
        }
    });
}, { threshold: 0.5 });

const processSvg = document.querySelector('.process-svg');
if (processSvg) {
    svgObserver.observe(processSvg);
}

// Add glow effect on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll-glow', 'rgba(0, 245, 255, 0.1)');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.style.setProperty('--scroll-glow', 'transparent');
    }, 150);
});

// Performance optimization
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 100));

// Theme card particle effects
class CardParticles {
    constructor(card) {
        this.card = card;
        this.container = card.querySelector('.card-particles');
        this.particles = [];
        this.particleCount = 15;
        this.init();
        
        card.addEventListener('mouseenter', () => this.activate());
        card.addEventListener('mouseleave', () => this.deactivate());
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 215, 0, 0.4));
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
            `;
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random()
            });
        }
    }
    
    activate() {
        this.active = true;
        this.animate();
    }
    
    deactivate() {
        this.active = false;
    }
    
    animate() {
        if (!this.active) return;
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life += 0.02;
            
            if (p.x < 0 || p.x > 100) p.vx *= -1;
            if (p.y < 0 || p.y > 100) p.vy *= -1;
            
            const opacity = Math.sin(p.life) * 0.5 + 0.5;
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
            p.element.style.opacity = opacity * 0.8;
            p.element.style.transform = `scale(${opacity * 1.5})`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize card particles
document.querySelectorAll('.theme-card').forEach(card => {
    new CardParticles(card);
});

// Add 3D tilt effect to theme cards
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Enhanced 3D effect for prize cards
document.querySelectorAll('.prize-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// 3D effect for 3-day journey cards
document.querySelectorAll('.day-card').forEach(card => {
    const content = card.querySelector('.day-content');
    
    content.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    content.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Floating animation for prize icons
document.querySelectorAll('.prize-icon').forEach((icon, index) => {
    const delay = index * 0.3;
    icon.style.animation = `float 3s ease-in-out ${delay}s infinite`;
});

// Add floating keyframes dynamically
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatStyle);

console.log('%c🚀 IDEATHON 2026 ', 'background: linear-gradient(135deg, #903b3d, #c94f52); color: #fff; font-size: 20px; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #903b3d; font-size: 14px;');


// Robot click to speak
document.addEventListener('DOMContentLoaded', () => {
    const robot = document.querySelector('.robot-assistant');
    if (robot) {
        robot.style.cursor = 'pointer';
        
        // Handle both click and touch events for mobile
        const playVoiceHandler = () => {
            playWelcomeVoice();
            // Add click animation
            robot.style.animation = 'none';
            setTimeout(() => {
                robot.style.animation = 'robotFloat 3s ease-in-out infinite';
            }, 10);
        };
        
        robot.addEventListener('click', playVoiceHandler);
        robot.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent double-firing on mobile
            playVoiceHandler();
        });
        
        // Hide robot when scrolling away from hero section
        const heroSection = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollPosition = window.pageYOffset + window.innerHeight;
                
                // Hide robot when user scrolls past hero section
                if (window.pageYOffset > heroBottom - 200) {
                    robot.style.opacity = '0';
                    robot.style.pointerEvents = 'none';
                } else {
                    robot.style.opacity = '1';
                    robot.style.pointerEvents = 'auto';
                }
            }
        });
    }
});


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});
