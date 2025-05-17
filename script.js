// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    darkModeToggle.innerHTML = newTheme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Add scroll-based animation for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = '0 2px 5px var(--shadow-color)';
    } else {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Social Media Links
const socialLinks = {
    github: 'https://github.com/sahilsable', // Your GitHub username
    linkedin: 'https://www.linkedin.com/in/sahil-sable', // Your LinkedIn profile URL
    twitter: 'https://twitter.com/sahilsable', // Your Twitter username
    portfolio: window.location.href // Use current page URL for sharing
};

// Update social media links
document.querySelectorAll('.social-icon').forEach(icon => {
    const platform = icon.querySelector('i').classList[1].split('-')[1];
    if (socialLinks[platform]) {
        icon.href = socialLinks[platform];
        icon.target = '_blank';
    }
});

// Function to share portfolio on LinkedIn
function sharePortfolioOnLinkedIn() {
    const portfolioUrl = encodeURIComponent(socialLinks.portfolio);
    const title = encodeURIComponent("Sahil Sable's Portfolio");
    const summary = encodeURIComponent("Check out my portfolio showcasing my web development projects and skills!");
    const source = encodeURIComponent("Portfolio Website");
    
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${portfolioUrl}&title=${title}&summary=${summary}&source=${source}`;
    
    // Open LinkedIn sharing dialog in a new window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        linkedInShareUrl,
        'LinkedIn Share',
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0`
    );
}

// Add LinkedIn share button
const linkedinShareBtn = document.createElement('button');
linkedinShareBtn.className = 'btn primary linkedin-share-btn';
linkedinShareBtn.innerHTML = '<i class="fab fa-linkedin"></i> Share on LinkedIn';
linkedinShareBtn.onclick = sharePortfolioOnLinkedIn;

// Add the share button to the hero section
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    const ctaButtons = heroContent.querySelector('.cta-buttons');
    if (ctaButtons) {
        ctaButtons.appendChild(linkedinShareBtn);
    }
}

// Function to show status messages
function showStatus(message, type = 'info') {
    const statusDiv = document.createElement('div');
    statusDiv.className = `upload-status ${type}`;
    statusDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        statusDiv.remove();
    }, 3000);
}

// Resume Upload Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const uploadResumeBtn = document.getElementById('uploadResumeBtn');
    const resumePlaceholder = document.getElementById('resumePlaceholder');
    const resumeFile = document.getElementById('resumeFile');
    const resumeViewer = document.getElementById('resumeViewer');
    const downloadResume = document.getElementById('downloadResume');
    const removeResume = document.getElementById('removeResume');

    console.log('Elements:', {
        uploadResumeBtn,
        resumePlaceholder,
        resumeFile,
        resumeViewer,
        downloadResume,
        removeResume
    });

    if (!uploadResumeBtn) {
        console.error('Upload resume button not found!');
                return;
            }

    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx';
    fileInput.style.display = 'none';

    // Add file input to the document
    document.body.appendChild(fileInput);

    // Handle resume upload button click
    uploadResumeBtn.addEventListener('click', (e) => {
        console.log('Upload button clicked');
            e.preventDefault();
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        console.log('File selected');
        const file = e.target.files[0];
        if (file) {
            console.log('File details:', {
                name: file.name,
                type: file.type,
                size: file.size
            });

            // Check file type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document');
                return;
            }
            
            // Create object URL for the file
            const fileURL = URL.createObjectURL(file);
            console.log('File URL created:', fileURL);

            // Update UI
            if (resumePlaceholder) resumePlaceholder.style.display = 'none';
            if (resumeFile) resumeFile.style.display = 'block';
            if (resumeViewer) resumeViewer.src = fileURL;
            if (downloadResume) {
                downloadResume.href = fileURL;
                downloadResume.download = file.name;
            }

            // Store file in localStorage
            const reader = new FileReader();
            reader.onload = (e) => {
                localStorage.setItem('resume', e.target.result);
                localStorage.setItem('resumeName', file.name);
                console.log('File stored in localStorage');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle resume removal
    if (removeResume) {
        removeResume.addEventListener('click', () => {
            console.log('Remove button clicked');
            // Clear localStorage
            localStorage.removeItem('resume');
            localStorage.removeItem('resumeName');

            // Update UI
            if (resumePlaceholder) resumePlaceholder.style.display = 'block';
            if (resumeFile) resumeFile.style.display = 'none';
            if (resumeViewer) resumeViewer.src = '';
            if (downloadResume) downloadResume.href = '#';
            fileInput.value = '';
        });
    }

    // Check for existing resume on page load
    const savedResume = localStorage.getItem('resume');
    const savedResumeName = localStorage.getItem('resumeName');

    if (savedResume) {
        console.log('Found saved resume');
        if (resumePlaceholder) resumePlaceholder.style.display = 'none';
        if (resumeFile) resumeFile.style.display = 'block';
        if (resumeViewer) resumeViewer.src = savedResume;
        if (downloadResume) {
            downloadResume.href = savedResume;
            downloadResume.download = savedResumeName;
        }
    }
}); 