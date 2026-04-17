// Projects Data - Core data source for mapping
const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-featured e-commerce website with shopping cart, payment integration, and admin dashboard.',
        category: 'E-commerce',
        difficulty: 'Advanced',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        icon: '🛒'
    },
    {
        id: 2,
        title: 'Real-time Chat App',
        description: 'Messaging application with real-time socket.io support, user authentication, and file sharing.',
        category: 'Web App',
        difficulty: 'Advanced',
        tech: ['Vue.js', 'Socket.io', 'Firebase', 'JavaScript'],
        icon: '💬'
    },
    {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Interactive weather forecast app with location search, weather maps, and detailed analytics.',
        category: 'Dashboard',
        difficulty: 'Intermediate',
        tech: ['React', 'OpenWeatherMap API', 'Chart.js'],
        icon: '🌤️'
    },
    {
        id: 4,
        title: 'Task Management System',
        description: 'Collaborative task management tool with real-time updates, priorities, and team collaboration features.',
        category: 'Web App',
        difficulty: 'Intermediate',
        tech: ['Angular', 'TypeScript', 'Firebase'],
        icon: '✅'
    },
    {
        id: 5,
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with account management, transfers, and transaction history.',
        category: 'Mobile',
        difficulty: 'Advanced',
        tech: ['React Native', 'Redux', 'Node.js'],
        icon: '🏦'
    },
    {
        id: 6,
        title: 'Blog Platform',
        description: 'Full-featured blogging platform with markdown support, comments, and social sharing.',
        category: 'Web App',
        difficulty: 'Intermediate',
        tech: ['Next.js', 'PostgreSQL', 'Prisma'],
        icon: '📝'
    },
    {
        id: 7,
        title: 'Analytics Dashboard',
        description: 'Data visualization dashboard with real-time analytics, charts, and KPI tracking.',
        category: 'Dashboard',
        difficulty: 'Advanced',
        tech: ['Vue.js', 'D3.js', 'Python'],
        icon: '📊'
    },
    {
        id: 8,
        title: 'Social Media Clone',
        description: 'Social networking platform with profiles, followers, feed, and messaging functionality.',
        category: 'Web App',
        difficulty: 'Advanced',
        tech: ['MERN Stack', 'JWT Auth', 'WebSockets'],
        icon: '👥'
    },
    {
        id: 9,
        title: 'Fitness Tracker',
        description: 'Mobile app for tracking workouts, calories, and fitness goals with personalized recommendations.',
        category: 'Mobile',
        difficulty: 'Intermediate',
        tech: ['Flutter', 'Firebase', 'Dart'],
        icon: '💪'
    },
    {
        id: 10,
        title: 'Music Streaming Service',
        description: 'Audio streaming platform with playlist management, search, and offline download support.',
        category: 'Web App',
        difficulty: 'Advanced',
        tech: ['React', 'Express.js', 'MongoDB'],
        icon: '🎵'
    },
    {
        id: 11,
        title: 'Portfolio Generator',
        description: 'Tool for creating beautiful personal portfolios with customizable templates and themes.',
        category: 'Web App',
        difficulty: 'Intermediate',
        tech: ['Vue.js', 'Tailwind CSS', 'Node.js'],
        icon: '🎨'
    },
    {
        id: 12,
        title: 'Inventory Management',
        description: 'Business inventory system with stock tracking, supplier management, and automated alerts.',
        category: 'Dashboard',
        difficulty: 'Intermediate',
        tech: ['React', 'MySQL', 'Express.js'],
        icon: '📦'
    },
    {
        id: 13,
        title: 'Video Conferencing App',
        description: 'Real-time video conferencing with screen sharing, chat, and recording capabilities.',
        category: 'Web App',
        difficulty: 'Advanced',
        tech: ['WebRTC', 'Node.js', 'React'],
        icon: '📹'
    },
    {
        id: 14,
        title: 'Todo List App',
        description: 'Simple yet powerful task manager with local storage and responsive design.',
        category: 'Web App',
        difficulty: 'Beginner',
        tech: ['HTML', 'CSS', 'JavaScript'],
        icon: '📋'
    },
    {
        id: 15,
        title: 'Hotel Booking System',
        description: 'Full-stack hotel reservation platform with availability checking and payment processing.',
        category: 'E-commerce',
        difficulty: 'Advanced',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        icon: '🏨'
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const resetBtn = document.getElementById('resetBtn');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');

// State Management
let filteredProjects = [...projectsData];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(filteredProjects);
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    filteredProjects = projectsData.filter(project => {
        const matchTitle = project.title.toLowerCase().includes(searchTerm);
        const matchDescription = project.description.toLowerCase().includes(searchTerm);
        const matchTech = project.tech.some(t => t.toLowerCase().includes(searchTerm));
        
        return matchTitle || matchDescription || matchTech;
    });

    applyFilters();
}

// Apply Filters
function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedDifficulty = difficultyFilter.value;

    filteredProjects = projectsData.filter(project => {
        const categoryMatch = !selectedCategory || project.category === selectedCategory;
        const difficultyMatch = !selectedDifficulty || project.difficulty === selectedDifficulty;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchMatch = !searchTerm || 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tech.some(t => t.toLowerCase().includes(searchTerm));

        return categoryMatch && difficultyMatch && searchMatch;
    });

    renderProjects(filteredProjects);
}

// Reset Filters
function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    difficultyFilter.value = '';
    filteredProjects = [...projectsData];
    renderProjects(filteredProjects);
}

// Render Projects Grid
function renderProjects(projects) {
    projectsGrid.innerHTML = '';

    if (projects.length === 0) {
        emptyState.style.display = 'flex';
        resultCount.textContent = '0';
        return;
    }

    emptyState.style.display = 'none';
    resultCount.textContent = projects.length;

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
        
        // Add staggered animation
        setTimeout(() => {
            projectCard.style.animation = `fadeIn 0.6s ease-out ${index * 0.05}s both`;
        }, 0);
    });
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const difficultyClass = `difficulty-${project.difficulty.toLowerCase()}`;
    const techTagsHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    card.innerHTML = `
        <div class="project-image">
            ${project.icon}
        </div>
        <div class="project-content">
            <span class="project-category">${project.category}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="tech-tags">
                ${techTagsHTML}
            </div>
            
            <div class="project-meta">
                <span class="project-difficulty ${difficultyClass}">${project.difficulty}</span>
                <span class="project-tech">${project.tech.length} technologies</span>
            </div>
            
            <div class="project-actions">
                <button class="btn btn-primary" onclick="viewProject(${project.id})">View Details</button>
                <button class="btn btn-secondary" onclick="shareProject(${project.id})">Share</button>
            </div>
        </div>
    `;

    return card;
}

// Action Handlers
function viewProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    alert(
        `Project: ${project.title}\n\n` +
        `Description: ${project.description}\n\n` +
        `Technologies: ${project.tech.join(', ')}\n\n` +
        `Difficulty: ${project.difficulty}\n` +
        `Category: ${project.category}`
    );
}

function shareProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    const shareText = `Check out this amazing project: "${project.title}" - ${project.description}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Project details copied to clipboard!');
    }).catch(() => {
        alert('Share text: ' + shareText);
    });
}

// Add Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for quick search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});
