// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Typed.js initialization
const typed = new Typed('#typed-text', {
    strings: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Projects data
const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with React and Node.js',
        image: 'images/project1.jpg',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: '#'
    },
    {
        title: 'Task Management App',
        description: 'A real-time task management application',
        image: 'images/project2.jpg',
        tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        link: '#'
    },
    {
        title: 'Weather Dashboard',
        description: 'Weather forecast app using OpenWeather API',
        image: 'images/project3.jpg',
        tags: ['JavaScript', 'API', 'CSS3'],
        link: '#'
    }
];

// Dynamically load projects
const projectsContainer = document.getElementById('projects-container');

projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card';
    projectElement.setAttribute('data-aos', 'fade-up');
    
    projectElement.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="btn primary" target="_blank">View Project</a>
        </div>
    `;
    
    projectsContainer.appendChild(projectElement);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // You can replace this with your actual form handling endpoint
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: 'd4c13cc0-e388-462f-8283-20a39b94c241', // Replace with your Web3Forms access key
                ...formData
            })
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Oops! Something went wrong. Please try again later.');
        console.error('Error:', error);
    }
});

// GitHub API Integration
async function fetchGitHubStats() {
    try {
        const username = 'Amanjha112113'; // Replace with your GitHub username
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        // Update GitHub stats in the about section
        const statsContainer = document.querySelector('.stats');
        if (statsContainer) {
            const reposStats = document.createElement('div');
            reposStats.className = 'stat-item';
            reposStats.setAttribute('data-aos', 'fade-up');
            reposStats.innerHTML = `
                <h3>${data.public_repos}</h3>
                <p>GitHub Repositories</p>
            `;
            statsContainer.appendChild(reposStats);
        }
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

// Call GitHub stats function
fetchGitHubStats();

// Weather API Integration for location
async function fetchWeather() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=coimbatore&appid=977ced67147166db10df13e53509ae09&units=metric');
        const data = await response.json();
        
        // Update location with weather info
        const locationElement = document.querySelector('.contact-info .contact-item:nth-child(2) p');
        if (locationElement) {
            locationElement.textContent = `${data.name}, ${data.sys.country} (${Math.round(data.main.temp)}°C)`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Call weather function
fetchWeather(); // Uncomment and add your OpenWeather API key to enable this feature
