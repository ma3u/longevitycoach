// Presentation Application JavaScript
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 19;
        this.slides = document.querySelectorAll('.slide');
        this.isMenuOpen = false;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMenu();
        this.setupKeyboardNavigation();
        this.setupInteractiveElements();
        this.createCharts();
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Initialize first slide
        this.slides[0].classList.add('active');
        
        console.log('Longevity AI Coach Presentation initialized successfully!');
    }

    setupNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.previousSlide();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextSlide();
        });

        // Update total slides counter
        document.getElementById('totalSlides').textContent = this.totalSlides;
    }

    setupMenu() {
        const menuBtn = document.getElementById('menuBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const closeMenuBtn = document.getElementById('closeMenu');
        const menuItems = document.querySelectorAll('.menu-item');

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeMenu();
        });
        
        // Close menu when clicking outside
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                this.closeMenu();
            }
        });

        // Menu item navigation
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const slideNumber = parseInt(item.dataset.slide);
                if (slideNumber && slideNumber >= 1 && slideNumber <= this.totalSlides) {
                    this.goToSlide(slideNumber);
                    this.closeMenu();
                }
            });
            
            // Keyboard support for menu items
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const slideNumber = parseInt(item.dataset.slide);
                    if (slideNumber && slideNumber >= 1 && slideNumber <= this.totalSlides) {
                        this.goToSlide(slideNumber);
                        this.closeMenu();
                    }
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Prevent navigation during transitions or when menu is open and specific keys are pressed
            if (this.isTransitioning) return;
            
            // Handle different key combinations
            switch(e.key) {
                case 'ArrowRight':
                case 'PageDown':
                    e.preventDefault();
                    if (!this.isMenuOpen) {
                        this.nextSlide();
                    }
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    if (!this.isMenuOpen) {
                        this.previousSlide();
                    }
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    if (!this.isMenuOpen) {
                        if (e.shiftKey) {
                            this.previousSlide();
                        } else {
                            this.nextSlide();
                        }
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (this.isMenuOpen) {
                        this.closeMenu();
                    }
                    break;
                case 'm':
                case 'M':
                    if (!e.ctrlKey && !e.altKey) {
                        e.preventDefault();
                        this.toggleMenu();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    if (!this.isMenuOpen) {
                        this.goToSlide(1);
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    if (!this.isMenuOpen) {
                        this.goToSlide(this.totalSlides);
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    // Allow default behavior for scrolling within slides
                    break;
                default:
                    // Check for number keys (1-9)
                    if (e.key >= '1' && e.key <= '9' && !this.isMenuOpen) {
                        const slideNum = parseInt(e.key);
                        if (slideNum <= this.totalSlides) {
                            e.preventDefault();
                            this.goToSlide(slideNum);
                        }
                    }
                    break;
            }
        });

        // Prevent default behavior for some keys when presentation is focused
        document.addEventListener('keypress', (e) => {
            if (['ArrowRight', 'ArrowLeft', ' ', 'PageDown', 'PageUp'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    setupInteractiveElements() {
        // Journey phase interactions
        const journeyPhases = document.querySelectorAll('.journey-phase');
        journeyPhases.forEach(phase => {
            phase.addEventListener('click', () => {
                this.highlightPhase(phase);
            });
            
            phase.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.highlightPhase(phase);
                }
            });
            
            // Make focusable
            if (!phase.hasAttribute('tabindex')) {
                phase.setAttribute('tabindex', '0');
            }
        });

        // Agent card interactions
        const agentCards = document.querySelectorAll('.agent-card');
        agentCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showAgentDetails(card);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showAgentDetails(card);
                }
            });
            
            // Make focusable
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
        });

        // MCP layer interactions
        const mcpLayers = document.querySelectorAll('.mcp-layer');
        mcpLayers.forEach(layer => {
            layer.addEventListener('mouseenter', () => {
                layer.style.transform = 'scale(1.02)';
                layer.style.transition = 'transform 0.2s ease';
            });
            
            layer.addEventListener('mouseleave', () => {
                layer.style.transform = 'scale(1)';
            });
        });

        // Contact button interaction
        const contactBtn = document.querySelector('.contact-cta .btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showContactModal();
            });
        }

        // Add hover effects for all interactive cards
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            '.summary-card, .problem-item, .feature-item, .model-card, ' +
            '.role-card, .competitor, .risk-item, .metric-item'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (!this.style.transform.includes('translateY')) {
                    this.style.transform = 'translateY(-2px)';
                    this.style.transition = 'transform 0.2s ease';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.style.transform === 'translateY(-2px)') {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }

    createCharts() {
        // Add loading delay to ensure proper rendering
        setTimeout(() => {
            this.createMarketChart();
            this.createRevenueChart();
        }, 500);
    }

    createMarketChart() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        const marketData = {
            labels: ['2023', '2025', '2027', '2029', '2031', '2033', '2035'],
            datasets: [
                {
                    label: 'Longevity Market (€B)',
                    data: [19.29, 25.2, 32.8, 42.6, 55.4, 72.1, 63.0],
                    backgroundColor: '#DC2626',
                    borderColor: '#DC2626',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#DC2626',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Digital Health Coaching (€B)',
                    data: [10.91, 14.2, 18.5, 24.1, 31.4, 40.9, 35.38],
                    backgroundColor: '#EF4444',
                    borderColor: '#EF4444',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#EF4444',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }
            ]
        };

        new Chart(ctx, {
            type: 'line',
            data: marketData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Market Growth Projections',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Market Size (€ Billions)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    createRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        const revenueData = {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                {
                    label: 'Revenue (€K)',
                    data: [34.8, 351, 850, 1800, 3200],
                    backgroundColor: '#DC2626',
                    borderColor: '#DC2626',
                    borderWidth: 2
                },
                {
                    label: 'Costs (€K)',
                    data: [66.6, 180, 340, 720, 1280],
                    backgroundColor: '#EF4444',
                    borderColor: '#EF4444',
                    borderWidth: 2
                }
            ]
        };

        new Chart(ctx, {
            type: 'bar',
            data: revenueData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenue vs Costs Projection',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (€ Thousands)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides && !this.isTransitioning) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1 && !this.isTransitioning) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || slideNumber === this.currentSlide || this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;

        // Remove active class from current slide
        const currentSlideEl = this.slides[this.currentSlide - 1];
        currentSlideEl.classList.remove('active');
        
        // Add prev class for animation if going backwards
        if (slideNumber < this.currentSlide) {
            currentSlideEl.classList.add('prev');
        }

        // Update current slide
        const previousSlide = this.currentSlide;
        this.currentSlide = slideNumber;

        // Add active class to new slide
        const newSlideEl = this.slides[this.currentSlide - 1];
        newSlideEl.classList.remove('prev');
        newSlideEl.classList.add('active');

        // Clean up other slides
        this.slides.forEach((slide, index) => {
            if (index !== this.currentSlide - 1) {
                slide.classList.remove('active', 'prev');
            }
        });

        // Update UI
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Trigger slide-specific actions
        setTimeout(() => {
            this.onSlideChange(slideNumber);
            this.isTransitioning = false;
        }, 100);

        // Reset transition state after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    updateSlideCounter() {
        const currentSlideEl = document.getElementById('currentSlide');
        if (currentSlideEl) {
            currentSlideEl.textContent = this.currentSlide;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && nextBtn) {
            prevBtn.disabled = this.currentSlide === 1;
            nextBtn.disabled = this.currentSlide === this.totalSlides;

            // Update button text
            if (this.currentSlide === this.totalSlides) {
                nextBtn.textContent = 'End';
            } else {
                nextBtn.textContent = 'Next →';
            }

            if (this.currentSlide === 1) {
                prevBtn.textContent = 'Start';
            } else {
                prevBtn.textContent = '← Previous';
            }

            // Update button styles for disabled state
            prevBtn.style.opacity = this.currentSlide === 1 ? '0.5' : '1';
            nextBtn.style.opacity = this.currentSlide === this.totalSlides ? '0.5' : '1';
        }
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const menuOverlay = document.getElementById('menuOverlay');
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            this.isMenuOpen = true;
            
            // Focus the first menu item for accessibility
            const firstMenuItem = menuOverlay.querySelector('.menu-item');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
            
            // Highlight current slide in menu
            this.highlightCurrentSlideInMenu();
        }
    }

    closeMenu() {
        const menuOverlay = document.getElementById('menuOverlay');
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            this.isMenuOpen = false;
            
            // Return focus to menu button
            const menuBtn = document.getElementById('menuBtn');
            if (menuBtn) {
                menuBtn.focus();
            }
        }
    }

    highlightCurrentSlideInMenu() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            const slideNum = parseInt(item.dataset.slide);
            if (slideNum === this.currentSlide) {
                item.style.background = '#DC2626';
                item.style.color = 'white';
                item.style.borderColor = '#DC2626';
            } else {
                item.style.background = '';
                item.style.color = '';
                item.style.borderColor = '';
            }
        });
    }

    onSlideChange(slideNumber) {
        // Slide-specific behaviors with error handling
        try {
            switch(slideNumber) {
                case 3: // Market Opportunity
                    this.animateMarketStats();
                    break;
                case 6: // User Journey
                    this.animateUserJourney();
                    break;
                case 7: // AI Agents
                    this.animateAgentCards();
                    break;
                case 11: // Revenue Projections
                    this.animateRevenueMetrics();
                    break;
            }
        } catch (error) {
            console.warn(`Animation error on slide ${slideNumber}:`, error);
        }
    }

    animateMarketStats() {
        const stats = document.querySelectorAll('.market-stat');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';
                stat.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    animateUserJourney() {
        const phases = document.querySelectorAll('.journey-phase');
        phases.forEach((phase, index) => {
            setTimeout(() => {
                phase.style.opacity = '0';
                phase.style.transform = 'scale(0.8)';
                phase.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    phase.style.opacity = '1';
                    phase.style.transform = 'scale(1)';
                }, 50);
            }, index * 150);
        });
    }

    animateAgentCards() {
        const cards = document.querySelectorAll('.agent-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 120);
        });
    }

    animateRevenueMetrics() {
        const metrics = document.querySelectorAll('.metric');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                const value = metric.querySelector('.metric-value');
                if (value) {
                    value.style.color = '#DC2626';
                    value.style.fontWeight = 'bold';
                    value.style.transform = 'scale(1.1)';
                    value.style.transition = 'all 0.3s ease';
                    
                    setTimeout(() => {
                        value.style.transform = 'scale(1)';
                    }, 300);
                }
            }, index * 100);
        });
    }

    highlightPhase(phase) {
        // Remove highlight from all phases
        const allPhases = document.querySelectorAll('.journey-phase');
        allPhases.forEach(p => {
            p.style.borderColor = '';
            p.style.transform = '';
            p.style.boxShadow = '';
        });

        // Highlight selected phase
        phase.style.borderColor = '#DC2626';
        phase.style.transform = 'translateY(-5px)';
        phase.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.2)';
        phase.style.transition = 'all 0.3s ease';

        // Add focus for accessibility
        phase.focus();

        // Log interaction
        const phaseData = phase.dataset.phase;
        console.log(`Selected phase: ${phaseData}`);
    }

    showAgentDetails(card) {
        const agentType = card.dataset.agent;
        
        // Remove highlight from all cards
        const allCards = document.querySelectorAll('.agent-card');
        allCards.forEach(c => {
            c.style.borderColor = '';
            c.style.transform = '';
            c.style.boxShadow = '';
        });

        // Highlight selected card
        card.style.borderColor = '#DC2626';
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.2)';
        card.style.transition = 'all 0.4s ease';

        // Add focus for accessibility
        card.focus();

        console.log(`Selected agent: ${agentType}`);
    }

    showContactModal() {
        // Enhanced contact modal with better UX
        const message = `Thank you for your interest in Longevity AI Coach!\n\n` +
                       `📧 Email: hello@longevityaicoach.com\n` +
                       `🌐 Website: www.longevityaicoach.com\n` +
                       `💼 LinkedIn: /company/longevity-ai-coach\n\n` +
                       `Investment Opportunity: €200,000 seed round\n` +
                       `Expected ROI: Break-even in 23 months\n\n` +
                       `We'd love to schedule a meeting to discuss this opportunity!`;
        
        alert(message);
    }

    // Method to handle window resize
    handleResize() {
        // Update chart dimensions if needed
        try {
            if (window.Chart && Chart.instances) {
                Chart.instances.forEach((instance) => {
                    if (instance && typeof instance.resize === 'function') {
                        instance.resize();
                    }
                });
            }
        } catch (error) {
            console.warn('Chart resize error:', error);
        }
    }

    // Utility method to format numbers
    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Method to get current slide info
    getCurrentSlideInfo() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            percentage: Math.round((this.currentSlide / this.totalSlides) * 100)
        };
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.presentationApp = new PresentationApp();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.presentationApp) {
            window.presentationApp.handleResize();
        }
    });
    
    // Add button ripple effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(r => r.remove());
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading indicators for charts
    const chartContainers = document.querySelectorAll('.market-chart-container, .revenue-chart-container');
    chartContainers.forEach(container => {
        container.style.position = 'relative';
        
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #DC2626;
            font-weight: bold;
            font-size: 14px;
            z-index: 10;
        `;
        loader.textContent = 'Loading chart...';
        loader.className = 'chart-loader';
        container.appendChild(loader);
        
        // Remove loader after charts are created
        setTimeout(() => {
            const loaders = container.querySelectorAll('.chart-loader');
            loaders.forEach(l => {
                if (l.parentNode) {
                    l.remove();
                }
            });
        }, 2000);
    });

    // Add accessibility improvements
    document.addEventListener('focus', (e) => {
        if (e.target.matches('.journey-phase, .agent-card, .menu-item')) {
            e.target.style.outline = '2px solid #DC2626';
            e.target.style.outlineOffset = '2px';
        }
    }, true);

    document.addEventListener('blur', (e) => {
        if (e.target.matches('.journey-phase, .agent-card, .menu-item')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    }, true);

    // Prevent default scroll behavior in some cases
    document.addEventListener('wheel', (e) => {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            const slideContent = activeSlide.querySelector('.slide-content');
            if (slideContent) {
                const isScrollable = slideContent.scrollHeight > slideContent.clientHeight;
                if (!isScrollable) {
                    // Only prevent if the slide content doesn't need scrolling
                    e.preventDefault();
                }
            }
        }
    }, { passive: false });
    
    // Add performance monitoring
    const perfObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.duration > 100) {
                console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
            }
        });
    });
    
    if ('PerformanceObserver' in window) {
        try {
            perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
        } catch (e) {
            console.warn('Performance monitoring not available');
        }
    }
});

// Add CSS for ripple effect and loading states
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Loading states */
    .chart-loader {
        background: rgba(255, 255, 255, 0.9);
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid #DC2626;
    }
    
    /* Focus improvements */
    .journey-phase:focus,
    .agent-card:focus,
    .menu-item:focus {
        outline: 2px solid #DC2626 !important;
        outline-offset: 2px !important;
    }
    
    /* Disabled button states */
    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }
    
    /* Transition improvements */
    .slide {
        will-change: transform, opacity;
    }
    
    /* Performance optimizations */
    .agent-card,
    .journey-phase,
    .summary-card {
        will-change: transform;
    }
`;
document.head.appendChild(style);