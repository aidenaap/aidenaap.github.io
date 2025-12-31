# Portfolio Site - Image Placement Guide

This guide explains where to place your images for the redesigned portfolio site.

## Required Images

### 1. Logo Image
- **Filename**: `logo-placeholder.png`
- **Location**: Root directory (`/`)
- **Recommended Size**: 40px height (width auto-scales)
- **Format**: PNG with transparent background preferred
- **Usage**: Navigation bar logo

### 2. Hero GIF/Animation
- **Filename**: `hero-animation.gif`
- **Location**: Root directory (`/`)
- **Recommended Size**: 1920x1080px or larger
- **Format**: GIF, MP4 (as video), or static image
- **Usage**: Full-screen hero section background
- **Note**: This is the first thing visitors see - make it impactful!

### 3. Personal Photo
- **Filename**: `photo-personal.jpg`
- **Location**: Root directory (`/`)
- **Recommended Size**: 400x400px or larger (square aspect ratio)
- **Format**: JPG or PNG
- **Usage**: About Me section

### 4. Work Photos (2 per job - Optional but recommended)

**Elevare Web Solutions:**
- **Filenames**: `images/Elevare_logo.png`, `images/elevare-work-2.jpg`
- **Location**: `images/` directory
- **Recommended Size**: 600x400px or larger (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Usage**: Elevare Web Solutions experience section
- **Note**: First photo is already in place (logo), add second work photo

**Apex Imaging Services:**
- **Filenames**: `images/Apex_logo.png`, `images/apex-work-2.jpg`
- **Location**: `images/` directory
- **Recommended Size**: 600x400px or larger (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Usage**: Apex Imaging Services experience section
- **Note**: First photo is already in place (logo), add second work photo

**La Jolla Kayak:**
- **Filenames**: `images/lajolla-work-1.jpg`, `images/lajolla-work-2.jpg`
- **Location**: `images/` directory
- **Recommended Size**: 600x400px or larger (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Usage**: La Jolla Kayak experience section

### 5. Project Screenshots
- **Filename**: `project-stonkhub.jpg`
- **Location**: Root directory (`/`)
- **Recommended Size**: 800x600px or larger
- **Format**: JPG or PNG
- **Usage**: Portfolio carousel - StonkHub project

- **Filename**: `project-imagegpt.jpg`
- **Location**: Root directory (`/`)
- **Recommended Size**: 800x600px or larger
- **Format**: JPG or PNG
- **Usage**: Portfolio carousel - ImageGPT project

- **Filename**: `project-ipad.jpg`
- **Location**: Root directory (`/`)
- **Recommended Size**: 800x600px or larger
- **Format**: JPG or PNG
- **Usage**: Portfolio carousel - iPad Dashboard project

- **Filename**: `project-rpi.jpg`
- **Location**: Root directory (`/`)
- **Recommended Size**: 800x600px or larger
- **Format**: JPG or PNG
- **Usage**: Portfolio carousel - Raspberry Pi project

## Color Scheme

Your site uses the following colors:
- **#222831** - Dark background
- **#393E46** - Medium dark (cards, sections)
- **#948979** - Tan accent (highlights, borders)
- **#DFD0B8** - Cream (text, secondary accent)

When creating or editing images, these colors can help maintain visual consistency.

## Image Optimization Tips

1. **Compress images** before uploading to reduce load times
2. **Use WebP format** for better compression (optional)
3. **Optimize for web** - aim for under 500KB per image
4. **Test on mobile** - ensure images look good on all screen sizes

## Fallback Behavior

The site includes SVG placeholders for all images. If an image fails to load:
- The logo will show "AP" text instead
- Other images will show a gray placeholder with descriptive text

This ensures the site remains functional even without images.

## Features Overview

### 🎨 Design Features
- Dark modern theme with warm accents
- Smooth scroll-in animations
- Responsive design (mobile, tablet, desktop)
- Custom scrollbar styling

### 🔄 Interactive Features
- Auto-rotating portfolio carousel (pauses on hover)
- Full-screen modal pop-ups for Services and Blog
- Smooth scrolling navigation
- Hover effects and transitions throughout

### 📱 Sections
1. **Navigation** - Sticky navbar with logo and menu
2. **Hero** - Full viewport GIF/animation with overlay
3. **About Me** - Personal bio with photo and skills
4. **Experience** - Timeline-style professional history with photos
5. **Portfolio** - Carousel showcase of projects
6. **Services** - Modal pop-up with service offerings
7. **Blog** - Modal pop-up (ready for blog posts)
8. **Footer** - Contact links and information

## Next Steps

1. Add your images to the root directory with the filenames listed above
2. Test the site by opening `index.html` in a browser
3. Verify all animations and interactions work as expected
4. Customize content as needed

## Questions?

If you need to adjust image sizes, positions, or add new images, you can:
- Edit `styles.css` for styling adjustments
- Edit `index.html` for content changes
- Edit `script.js` for interaction changes
