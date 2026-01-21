// ===================================
// Mortgage Rates API Integration (h.api)
// ===================================

// You need to sign up at https://hapi.so to get your free API key
// Replace 'YOUR_API_KEY_HERE' with your actual API key
const HAPI_API_KEY = 'YOUR_API_KEY_HERE';

async function fetchMortgageRates(state = 'CA') {
    const loadingEl = document.getElementById('rates-loading');
    const errorEl = document.getElementById('rates-error');
    const gridEl = document.getElementById('rates-grid');

    // Show loading, hide error and grid
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    gridEl.style.display = 'none';

    try {
        const response = await fetch(`https://api.hapi.so/rates?state=${state}`, {
            method: 'GET',
            headers: {
                'x-api-key': HAPI_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch rates');
        }

        const data = await response.json();
        displayRates(data);

        // Hide loading, show grid
        loadingEl.style.display = 'none';
        gridEl.style.display = 'grid';

    } catch (error) {
        console.error('Error fetching rates:', error);

        // Hide loading, show error
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';

        // If API key is not set, show demo rates
        if (HAPI_API_KEY === 'YOUR_API_KEY_HERE') {
            displayDemoRates();
            gridEl.style.display = 'grid';
            errorEl.style.display = 'none';
        }
    }
}

function displayRates(data) {
    const gridEl = document.getElementById('rates-grid');

    // Define the rates to display
    const ratesToShow = [
        { key: 'conforming30YearFixed', label: '30-Year Fixed', featured: true },
        { key: 'conforming15YearFixed', label: '15-Year Fixed', featured: false },
        { key: 'fha30YearFixed', label: 'FHA 30-Year Fixed', featured: false },
        { key: 'va30YearFixed', label: 'VA 30-Year Fixed', featured: false },
        { key: 'jumbo30YearFixed', label: 'Jumbo 30-Year Fixed', featured: false },
        { key: 'arm5Year', label: '5/1 ARM', featured: false }
    ];

    let html = '';

    ratesToShow.forEach(rateInfo => {
        const rateData = data[rateInfo.key];
        if (rateData && rateData.rate) {
            const featuredClass = rateInfo.featured ? 'featured' : '';
            html += `
                <div class="rate-card ${featuredClass}">
                    <h3 class="rate-type">${rateInfo.label}</h3>
                    <div class="rate-value">
                        ${rateData.rate.toFixed(3)}<span class="percent">%</span>
                    </div>
                    ${rateData.apr ? `<p class="rate-apr">APR: ${rateData.apr.toFixed(3)}%</p>` : ''}
                    ${rateData.points !== undefined ? `<p class="rate-points">${rateData.points} points</p>` : ''}
                </div>
            `;
        }
    });

    gridEl.innerHTML = html;

    // Add updated timestamp if available
    if (data.timestamp) {
        const date = new Date(data.timestamp);
        const updatedEl = document.createElement('p');
        updatedEl.className = 'rates-updated';
        updatedEl.textContent = `Last updated: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        gridEl.parentElement.appendChild(updatedEl);
    }
}

function displayDemoRates() {
    const gridEl = document.getElementById('rates-grid');

    // Demo rates for display when API key is not configured
    const demoRates = [
        { label: '30-Year Fixed', rate: 6.875, apr: 6.925, featured: true },
        { label: '15-Year Fixed', rate: 6.125, apr: 6.175, featured: false },
        { label: 'FHA 30-Year Fixed', rate: 6.625, apr: 6.675, featured: false },
        { label: 'VA 30-Year Fixed', rate: 6.500, apr: 6.550, featured: false },
        { label: 'Jumbo 30-Year Fixed', rate: 7.125, apr: 7.175, featured: false },
        { label: '5/1 ARM', rate: 6.375, apr: 6.875, featured: false }
    ];

    let html = '';

    demoRates.forEach(rate => {
        const featuredClass = rate.featured ? 'featured' : '';
        html += `
            <div class="rate-card ${featuredClass}">
                <h3 class="rate-type">${rate.label}</h3>
                <div class="rate-value">
                    ${rate.rate.toFixed(3)}<span class="percent">%</span>
                </div>
                <p class="rate-apr">APR: ${rate.apr.toFixed(3)}%</p>
            </div>
        `;
    });

    html += `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-light); font-size: 0.9rem; margin-top: 1rem;">
        <strong>Demo rates shown.</strong> Configure your h.api key in script.js for live rates.
    </p>`;

    gridEl.innerHTML = html;
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Fetch initial rates
    fetchMortgageRates('CA');

    // Add event listener for state selector
    const stateSelect = document.getElementById('state-select');
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            fetchMortgageRates(this.value);
        });
    }
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// Header Scroll Effect
// ===================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('#header');

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, feature cards, and contact cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Active Navigation Link
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
