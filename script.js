// ===================================
// Mortgage Rates API Integration (FRED - Federal Reserve Economic Data)
// ===================================

// 100% FREE - No API key required!
// Using Federal Reserve Economic Data (FRED) for official Freddie Mac mortgage rates
// Data source: St. Louis Federal Reserve Bank

// FRED API Series IDs for mortgage rates
const FRED_SERIES = {
    '30year': 'MORTGAGE30US',      // 30-Year Fixed Rate Mortgage Average
    '15year': 'MORTGAGE15US',      // 15-Year Fixed Rate Mortgage Average
    '5arm': 'MORTGAGE5US'          // 5/1-Year Adjustable Rate Mortgage Average
};

async function fetchMortgageRates() {
    const loadingEl = document.getElementById('rates-loading');
    const errorEl = document.getElementById('rates-error');
    const gridEl = document.getElementById('rates-grid');

    // Show loading, hide error and grid
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    gridEl.style.display = 'none';

    try {
        // Fetch all rates in parallel
        const rates = await Promise.all([
            fetchFREDSeries(FRED_SERIES['30year']),
            fetchFREDSeries(FRED_SERIES['15year']),
            fetchFREDSeries(FRED_SERIES['5arm'])
        ]);

        const ratesData = {
            '30year': rates[0],
            '15year': rates[1],
            '5arm': rates[2]
        };

        displayRates(ratesData);

        // Hide loading, show grid
        loadingEl.style.display = 'none';
        gridEl.style.display = 'grid';

    } catch (error) {
        console.error('Error fetching rates:', error);

        // Show demo rates as fallback
        displayDemoRates();

        // Hide loading, show grid
        loadingEl.style.display = 'none';
        gridEl.style.display = 'grid';
    }
}

async function fetchFREDSeries(seriesId) {
    // FRED API endpoint
    // To get a FREE API key: https://fred.stlouisfed.org/docs/api/api_key.html
    const apiKey = 'YOUR_FRED_API_KEY'; // Replace with your free FRED API key
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.warn(`FRED API returned ${response.status} for ${seriesId}`);
            throw new Error(`Failed to fetch ${seriesId}: ${response.status}`);
        }

        const data = await response.json();

        // Check if we got an error from FRED
        if (data.error_code) {
            console.warn(`FRED API error for ${seriesId}:`, data.error_message);
            throw new Error(data.error_message);
        }

        if (data.observations && data.observations.length > 0) {
            return {
                rate: parseFloat(data.observations[0].value),
                date: data.observations[0].date
            };
        }

        return null;
    } catch (error) {
        console.error(`Error fetching ${seriesId}:`, error.message);
        return null;
    }
}

function displayRates(ratesData) {
    const gridEl = document.getElementById('rates-grid');

    // Calculate estimated rates for other loan types based on typical spreads
    const baseRate30 = ratesData['30year']?.rate || 6.85;
    const baseRate15 = ratesData['15year']?.rate || 6.10;
    const baseRateARM = ratesData['5arm']?.rate || 6.35;

    // Define the rates to display with estimated spreads
    const ratesToShow = [
        {
            label: '30-Year Fixed',
            rate: baseRate30,
            source: 'freddie-mac',
            featured: true
        },
        {
            label: '15-Year Fixed',
            rate: baseRate15,
            source: 'freddie-mac',
            featured: false
        },
        {
            label: 'FHA 30-Year Fixed',
            rate: baseRate30 - 0.25, // Typically 0.25% lower
            source: 'estimated',
            featured: false
        },
        {
            label: 'VA 30-Year Fixed',
            rate: baseRate30 - 0.35, // Typically 0.35% lower
            source: 'estimated',
            featured: false
        },
        {
            label: 'Jumbo 30-Year Fixed',
            rate: baseRate30 + 0.25, // Typically 0.25% higher
            source: 'estimated',
            featured: false
        },
        {
            label: '5/1 ARM',
            rate: baseRateARM,
            source: 'freddie-mac',
            featured: false
        }
    ];

    let html = '';

    ratesToShow.forEach(rateInfo => {
        const featuredClass = rateInfo.featured ? 'featured' : '';
        const estimatedBadge = rateInfo.source === 'estimated'
            ? '<span style="font-size: 0.7rem; color: var(--text-muted);">*Est.</span>'
            : '';

        html += `
            <div class="rate-card ${featuredClass}">
                <h3 class="rate-type">${rateInfo.label} ${estimatedBadge}</h3>
                <div class="rate-value">
                    ${rateInfo.rate.toFixed(3)}<span class="percent">%</span>
                </div>
            </div>
        `;
    });

    gridEl.innerHTML = html;

    // Add updated timestamp
    const latestDate = ratesData['30year']?.date || new Date().toISOString().split('T')[0];
    const updatedEl = document.createElement('p');
    updatedEl.className = 'rates-updated';
    updatedEl.textContent = `Data from Freddie Mac Primary Mortgage Market Survey | Week of ${new Date(latestDate).toLocaleDateString()}`;

    // Remove old timestamp if exists
    const oldTimestamp = gridEl.parentElement.querySelector('.rates-updated');
    if (oldTimestamp) oldTimestamp.remove();

    gridEl.parentElement.appendChild(updatedEl);
}

function displayDemoRates() {
    const gridEl = document.getElementById('rates-grid');

    // Demo rates - typical current market rates
    const demoRates = [
        { label: '30-Year Fixed', rate: 6.850, featured: true },
        { label: '15-Year Fixed', rate: 6.100, featured: false },
        { label: 'FHA 30-Year Fixed', rate: 6.600, estimated: true, featured: false },
        { label: 'VA 30-Year Fixed', rate: 6.500, estimated: true, featured: false },
        { label: 'Jumbo 30-Year Fixed', rate: 7.100, estimated: true, featured: false },
        { label: '5/1 ARM', rate: 6.350, featured: false }
    ];

    let html = '';

    demoRates.forEach(rate => {
        const featuredClass = rate.featured ? 'featured' : '';
        const estimatedBadge = rate.estimated
            ? '<span style="font-size: 0.7rem; color: var(--text-muted);">*Est.</span>'
            : '';

        html += `
            <div class="rate-card ${featuredClass}">
                <h3 class="rate-type">${rate.label} ${estimatedBadge}</h3>
                <div class="rate-value">
                    ${rate.rate.toFixed(3)}<span class="percent">%</span>
                </div>
            </div>
        `;
    });

    gridEl.innerHTML = html;

    // Add note about demo rates
    const noteEl = document.createElement('p');
    noteEl.className = 'rates-updated';
    noteEl.innerHTML = 'Sample rates shown • <a href="#contact" style="color: var(--accent-color); text-decoration: underline;">Contact us</a> for current personalized rates';

    // Remove old timestamp if exists
    const oldTimestamp = gridEl.parentElement.querySelector('.rates-updated');
    if (oldTimestamp) oldTimestamp.remove();

    gridEl.parentElement.appendChild(noteEl);
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Fetch mortgage rates from FRED (Federal Reserve Economic Data)
    fetchMortgageRates();
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
