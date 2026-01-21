# The Rate Outlet - Modern Mortgage Website

A clean, modern, and elegant single-page website for The Rate Outlet mortgage company.

## 🎨 Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Fully Responsive**: Looks great on desktop, tablet, and mobile devices
- **Single Page Layout**: Simple navigation with smooth scrolling between sections
- **Fast Loading**: Optimized CSS and minimal JavaScript
- **SEO Friendly**: Proper meta tags and semantic HTML

## 📁 File Structure

```
Rate-Outlet/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## 🚀 Quick Start

1. Open `index.html` in any modern web browser
2. For deployment, upload all files to your web hosting service

## 🎯 Sections

1. **Hero Section** - Eye-catching introduction with call-to-action
2. **Services** - Three core offerings (Home Purchase, Refinancing, Pre-Approval)
3. **Why Choose Us** - Key statistics and value propositions
4. **Contact** - Phone, email, and office hours
5. **Footer** - Copyright and NMLS information

## 📊 Live Mortgage Rates Integration

The website features **100% FREE** real-time mortgage rates powered by **FRED** (Federal Reserve Economic Data).

### About FRED API

- **Completely FREE** - No cost, ever!
- **Official Data** - Direct from Freddie Mac's Primary Mortgage Market Survey
- **Updated Weekly** - Every Thursday at noon ET
- **Trusted Source** - Federal Reserve Bank of St. Louis

### Setting Up Live Rates (Optional)

The website works immediately with default FRED access. For higher API limits:

1. **Get a Free FRED API Key** (Optional)
   - Visit https://fred.stlouisfed.org/docs/api/api_key.html
   - Request a free API key (no credit card required)
   - Copy your API key

2. **Configure the API Key**
   - Open `script.js`
   - Find line: `api_key=YOUR_FRED_API_KEY`
   - Replace `YOUR_FRED_API_KEY` with your actual key

3. **How It Works**
   - Fetches official Freddie Mac national average rates
   - Updates automatically every week
   - Shows 6 popular loan types:
     - 30-Year Fixed (Freddie Mac data) ⭐
     - 15-Year Fixed (Freddie Mac data)
     - FHA 30-Year Fixed (estimated)
     - VA 30-Year Fixed (estimated)
     - Jumbo 30-Year Fixed (estimated)
     - 5/1 ARM (Freddie Mac data)

### Data Sources

**Direct from FRED:**
- 30-Year Fixed: `MORTGAGE30US`
- 15-Year Fixed: `MORTGAGE15US`
- 5/1 ARM: `MORTGAGE5US`

**Estimated Rates:**
- FHA, VA, and Jumbo rates are calculated using typical market spreads from the 30-year fixed rate

## 🛠️ Customization

### Update Contact Information

Edit these sections in `index.html`:

- **Phone**: Line 102 - Update `(800) 555-1234` and `tel:+18005551234`
- **Email**: Line 107 - Update `info@therateoutlet.com`
- **Office Hours**: Line 112 - Update hours as needed
- **NMLS Number**: Line 122 - Update `NMLS #123456`

### Update Statistics

Edit the "Why Choose Us" section (lines 73-94) in `index.html`:

- Years of experience
- Total loans funded
- Client satisfaction rating
- Support availability

### Color Scheme

To change colors, edit the CSS variables in `styles.css` (lines 14-22):

```css
--primary-color: #1a3a52;      /* Dark blue */
--secondary-color: #2c5f7f;    /* Medium blue */
--accent-color: #d4a574;       /* Gold */
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All assets are self-contained (no external dependencies)
- SVG icons are inline for better performance
- Smooth scrolling works on all modern browsers
- Optimized for Core Web Vitals

## 📞 Support

For questions or issues, please contact your development team.

---

© 2026 The Rate Outlet. All rights reserved.
