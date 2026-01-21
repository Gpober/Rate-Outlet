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

The website features real-time mortgage rates powered by **h.api**.

### Setting Up Live Rates

1. **Sign up for h.api**
   - Visit https://hapi.so
   - Create a free account
   - Get your API key

2. **Configure the API Key**
   - Open `script.js`
   - Find line 7: `const HAPI_API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

3. **How It Works**
   - Displays real-time rates for all 50 US states
   - Users can select their state from the dropdown
   - Shows 6 popular loan types:
     - 30-Year Fixed (featured)
     - 15-Year Fixed
     - FHA 30-Year Fixed
     - VA 30-Year Fixed
     - Jumbo 30-Year Fixed
     - 5/1 ARM
   - Auto-updates when state is changed

4. **Demo Mode**
   - If no API key is configured, demo rates are shown
   - Replace with your API key to show live rates

### Supported Rate Types

The integration fetches and displays:
- Conforming fixed rates (30-year, 20-year, 15-year, 10-year)
- FHA rates
- VA rates
- Jumbo rates
- ARM rates (5-year, 7-year)

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
