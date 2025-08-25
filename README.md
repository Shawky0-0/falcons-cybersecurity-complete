# Falcons CIC - Cybersecurity Student Activity Website

A modern, interactive, and animated web application for the Falcons cybersecurity student community at Canadian International College (CIC).

![Falcons Logo](assets/images/logo-full.png)

## 🚀 Features

### 🎯 Core Pages
- **Home** - Dynamic hero section with cyberpunk aesthetics and animated features
- **About** - Team information, mission, and organizational structure
- **Events** - Upcoming cybersecurity events and workshops
- **Blog** - Cybersecurity articles, tutorials, and news
- **Resources** - Learning materials, tools, and certifications
- **Join** - Interactive application form for new members
- **Game** - Cyber Defense Command - Interactive cybersecurity quiz game

### 🎮 Interactive Game
- **Cyber Defense Command** - A network defense simulation game
- Real-time threat detection and response challenges
- Cybersecurity knowledge quiz integration
- Leaderboard system with local storage
- Progressive difficulty levels
- Mobile-responsive game interface

### 🎨 Design & Animation
- **Cyberpunk Theme** - Blue and purple gradient color scheme
- **Particles.js Background** - Dynamic animated particle system
- **Anime.js Animations** - Smooth entrance and scroll-triggered animations
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Accessibility** - WCAG compliant with focus states and reduced motion support

### 🔧 Technical Features
- **Modern Web Stack** - HTML5, CSS3, JavaScript ES6+
- **Animation Libraries** - Anime.js for smooth animations
- **UI Framework** - TailwindCSS for responsive design
- **Performance Optimized** - Lazy loading and device-specific optimizations
- **Cross-Browser Compatible** - Works on all modern browsers

## 🛠️ Installation & Setup

### Local Development
1. Clone or download the project
2. Navigate to the project directory
3. Start a local server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js (if you have http-server installed)
npx http-server -p 8080

# Using PHP (if installed)
php -S localhost:8080
```

4. Open your browser and visit `http://localhost:8080`

### Deployment Options

#### GitHub Pages
1. Upload the entire project to a GitHub repository
2. Go to Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Your site will be available at `https://username.github.io/repository-name`

#### Netlify
1. Drag and drop the entire project folder to [Netlify](https://netlify.com)
2. Or connect your GitHub repository for automatic deployments
3. Your site will be live immediately with a generated URL

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the setup prompts

## 📁 Project Structure

```
falcons-cybersecurity/
├── index.html              # Home page
├── about.html              # About page with team info
├── events.html             # Events and workshops
├── blog.html               # Cybersecurity blog
├── resources.html          # Learning resources
├── join.html               # Membership application
├── game/
│   └── index.html          # Cyber Defense Command game
├── assets/
│   ├── css/
│   │   └── style.css       # Custom cyberpunk styling
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── animations.js   # Animation system
│   │   └── particles-config.js # Particle background
│   └── images/
│       ├── logo-new.png    # Original logo
│       ├── logo-full.png   # Full horizontal logo
│       ├── logo-mini.png   # Mini social media logo
│       └── founder-photo.jpg # Founder's photo
└── README.md               # This file
```

## 🎯 Game Instructions

### Cyber Defense Command
1. **Start Defense** - Begin monitoring your network
2. **Threat Detection** - Watch for red threat indicators on network nodes
3. **Response** - Click threatened nodes to answer security questions
4. **Secure Networks** - Correct answers secure nodes (green)
5. **Prevent Breaches** - Incorrect answers result in compromised nodes (red)
6. **Level Up** - Secure all nodes to advance to the next level
7. **Maintain Health** - Keep network security above 0%

#### Question Categories
- **Social Engineering** - Phishing, social attacks
- **Network Security** - Firewalls, protocols, ports
- **Web Security** - SQL injection, XSS, OWASP
- **Cryptography** - Encryption, hashing, certificates
- **Vulnerability Management** - Zero-days, patches
- **Authentication** - Multi-factor, biometrics
- **Penetration Testing** - Ethical hacking, tools

## 🎨 Customization

### Colors
The cyberpunk color scheme uses:
- **Primary Blue**: `#00f5ff` (Cyber Blue)
- **Primary Purple**: `#8a2be2` (Cyber Purple)
- **Dark Background**: `#0a0a0a` (Cyber Dark)
- **Secondary Gray**: `#1a1a1a` (Cyber Gray)

### Fonts
- **Headers**: Orbitron (Futuristic monospace)
- **Body Text**: Exo 2 (Clean sans-serif)

### Animations
All animations use Anime.js and can be customized in `assets/js/animations.js`:
- Hero entrance animations
- Scroll-triggered animations
- Hover effects
- Navigation animations
- Performance optimizations for mobile devices

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px  
- **Mobile**: 640px - 767px
- **Small Mobile**: Below 640px

### Mobile Optimizations
- Reduced particle effects for performance
- Touch-friendly navigation
- Optimized font sizes
- Simplified animations for low-end devices

## ♿ Accessibility Features

- **Keyboard Navigation** - Full tab navigation support
- **Focus Indicators** - Clear visual focus states
- **High Contrast** - Support for high contrast mode
- **Reduced Motion** - Respects user's motion preferences
- **Screen Reader** - Semantic HTML and ARIA labels
- **Color Contrast** - WCAG AA compliant color ratios

## 🚀 Performance Optimizations

- **Lazy Loading** - Images load only when needed
- **Hardware Detection** - Reduces animations on low-end devices
- **Mobile Optimizations** - Lighter particle effects on mobile
- **CDN Assets** - External libraries loaded from CDN
- **Minified Code** - Optimized for production

## 📊 Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions
- **Mobile Browsers** - iOS Safari, Chrome Mobile

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices
5. Submit a pull request

### Development Guidelines
- Follow mobile-first responsive design
- Maintain cyberpunk aesthetic
- Ensure accessibility compliance
- Test animations on low-end devices
- Update documentation for new features

## 📞 Contact & Support

- **Email**: falcons@cic-cairo.com
- **Organization**: Falcons CIC
- **Institution**: Canadian International College
- **Founded**: 2024

## 📄 License

This project is created for the Falcons cybersecurity student activity at Canadian International College. All rights reserved.

---

**Built with ❤️ by the Falcons team for the cybersecurity community at CIC**

*Soar high, secure the digital sky* 🦅🔒