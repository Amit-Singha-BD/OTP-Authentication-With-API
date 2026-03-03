// ==============================================
// প্রধান ইনিশিয়ালাইজেশন ফাংশন
// ==============================================

// DOM কন্টেন্ট লোড হলে সব ফাংশন ইনিশিয়ালাইজ করুন
document.addEventListener('DOMContentLoaded', function() {
    // বুটস্ট্রাপ কম্পোনেন্টস ইনিশিয়ালাইজ করুন
    initializeBootstrapComponents();
    
    // কাস্টম ফাংশনালিটি ইনিশিয়ালাইজ করুন
    initializeCustomFeatures();
    
    // অ্যানিমেশন ইনিশিয়ালাইজ করুন
    initializeAnimations();
    
    // স্লাইডার ইনিশিয়ালাইজ করুন
    const sliderInitialized = bangladeshGovSlider.init();
    
    if (sliderInitialized) {
        console.log("স্লাইডার সফলভাবে ইনিশিয়ালাইজ হয়েছে");
    } else {
        console.log("স্লাইডার এলিমেন্ট খুঁজে পাওয়া যায়নি");
    }
    
    console.log('বাংলাদেশ সরকারী ওয়েবসাইট লোড হয়েছে - Bootstrap 5');
});


// ==============================================
// স্লাইডার ফাংশনালিটি (কনফ্লিক্ট এড়ানোর জন্য নামস্পেস)
// ==============================================

const bangladeshGovSlider = (function() {
    // প্রাইভেট ভেরিয়েবল এবং ফাংশন
    let track, prevBtn, nextBtn, cardWidth;
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // স্লাইডার ইনিশিয়ালাইজেশন ফাংশন
    function initSlider() {
        track = document.querySelector('.services-track');
        if (!track) return false;
        
        prevBtn = document.querySelector('.nav-btn.prev');
        nextBtn = document.querySelector('.nav-btn.next');
        cardWidth = document.querySelector('.service-item').offsetWidth + 20; // কার্ড প্রস্থ + গ্যাপ
        
        // পরবর্তী/পূর্ববর্তী বাটন ফাংশনালিটি
        if (prevBtn) {
            prevBtn.addEventListener('click', handlePrevClick);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', handleNextClick);
        }
        
        // মাউস ড্র্যাগ ফাংশনালিটি
        track.addEventListener('mousedown', handleMouseDown);
        track.addEventListener('mouseleave', handleMouseLeave);
        track.addEventListener('mouseup', handleMouseUp);
        track.addEventListener('mousemove', handleMouseMove);
        
        // মোবাইল ডিভাইসের জন্য টাচ ফাংশনালিটি
        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchend', handleTouchEnd);
        track.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        return true;
    }
    
    // ইভেন্ট হ্যান্ডলার ফাংশনসমূহ
    function handlePrevClick() {
        track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    }
    
    function handleNextClick() {
        track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
    
    function handleMouseDown(e) {
        isDown = true;
        track.classList.add('grabbing');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    }
    
    function handleMouseLeave() {
        isDown = false;
        track.classList.remove('grabbing');
    }
    
    function handleMouseUp() {
        isDown = false;
        track.classList.remove('grabbing');
    }
    
    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; // স্ক্রোল স্পীড মাল্টিপ্লায়ার
        track.scrollLeft = scrollLeft - walk;
    }
    
    function handleTouchStart(e) {
        isDown = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    }
    
    function handleTouchEnd() {
        isDown = false;
    }
    
    function handleTouchMove(e) {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    }
    
    // পাবলিক মেথড
    return {
        // স্লাইডার শুরু করার ফাংশন
        init: function() {
            return initSlider();
        },
        
        // স্লাইডার বন্ধ করার ফাংশন (প্রয়োজনে)
        destroy: function() {
            if (prevBtn) {
                prevBtn.removeEventListener('click', handlePrevClick);
            }
            
            if (nextBtn) {
                nextBtn.removeEventListener('click', handleNextClick);
            }
            
            if (track) {
                track.removeEventListener('mousedown', handleMouseDown);
                track.removeEventListener('mouseleave', handleMouseLeave);
                track.removeEventListener('mouseup', handleMouseUp);
                track.removeEventListener('mousemove', handleMouseMove);
                track.removeEventListener('touchstart', handleTouchStart);
                track.removeEventListener('touchend', handleTouchEnd);
                track.removeEventListener('touchmove', handleTouchMove);
            }
        }
    };
})();


// ==============================================
// বুটস্ট্রাপ কম্পোনেন্টস ইনিশিয়ালাইজেশন
// ==============================================

function initializeBootstrapComponents() {
    // সব টুলটিপস ইনিশিয়ালাইজ করুন
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // সব পপওভারস ইনিশিয়ালাইজ করুন
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // সব কলাপ্স এলিমেন্ট ইনিশিয়ালাইজ করুন
    const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
    collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl, {
            toggle: false
        });
    });
    
    // হিরো ক্যারousel ইনিশিয়ালাইজ করুন
    const heroCarousel = document.querySelector('#blogCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000, // ৫ সেকেন্ড
            wrap: true,
            keyboard: true,
            pause: 'hover'
        });
        
        // কাস্টম ক্যারousel ইভেন্ট যোগ করুন
        heroCarousel.addEventListener('slide.bs.carousel', function (event) {
            console.log('ক্যারousel স্লাইডে যাচ্ছে:', event.to);
        });
        
        heroCarousel.addEventListener('slid.bs.carousel', function (event) {
            console.log('ক্যারousel স্লাইডে এসেছে:', event.to);
        });
    }
}


// ==============================================
// নেভিগেশন এবং স্ক্রোলিং সম্পর্কিত ফাংশন
// ==============================================

function initializeCustomFeatures() {
    const navbar = document.getElementById('mainNavbar');
    const mobileBreakpoint = 992; // বুটস্ট্রাপের lg ব্রেকপয়েন্ট
    let lastScrollTop = 0;
    
    // এনহ্যান্সড নেভিগেশন স্ক্রোল ইফেক্ট - শুধুমাত্র ডেস্কটপের জন্য
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        

        
        // শুধুমাত্র ডেস্কটপে hide/show behavior প্রয়োগ করুন
        if (window.innerWidth >= mobileBreakpoint) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // নিচে স্ক্রোল - navbar লুকান
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // উপরে স্ক্রোল - navbar দেখান
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        } else {
            // মোবাইল - navbar সর্বদা দৃশ্যমান রাখুন
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    // স্ক্রোল ইভেন্ট লিসেনার সেট আপ করুন
    window.addEventListener('scroll', handleScroll);
    
    // এনহ্যান্সড নেভিগেশন অ্যাক্টিভ স্টেট
    function initNavigationActiveState() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        // ক্লিক করলে অ্যাক্টিভ সেট করুন
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // স্ক্রোল পজিশনের উপর ভিত্তি করে অ্যাক্টিভ সেট করুন
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // নেভিগেশন লিঙ্কের জন্য স্মুথ স্ক্রোলিং
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // শুধুমাত্র অভ্যন্তরীণ অ্যাঙ্কর লিঙ্কের জন্য ডিফল্ট প্রতিরোধ করুন
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // স্ক্রোলিং ছাড়াই URL হ্যাশ আপডেট করুন
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            }
            // বাহ্যিক পৃষ্ঠা লিঙ্কের জন্য ডিফল্ট বিহেভিয়ার কাজ করতে দিন
        });
    });
    
    // ফাংশনগুলি ইনিশিয়ালাইজ করুন
    initNavigationActiveState();


    // ==============================================
    // কার্ড এবং UI ইফেক্ট সম্পর্কিত ফাংশন
    // ==============================================

    // সার্ভিস কার্ড হোভার ইফেক্ট
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // নিউজ কার্ড হোভার ইফেক্ট
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
        });
    });


    // ==============================================
    // বাটন এবং ইন্টারঅ্যাকশন সম্পর্কিত ফাংশন
    // ==============================================

    // ভাষা নির্বাচনকারী ফাংশনালিটি
    const languageSelector = document.querySelector('.form-select');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            showNotification('ভাষা পরিবর্তন করা হয়েছে', 'success');
            
            // এখানে সাধারণত ভাষা পরিবর্তন লজিক ইমপ্লিমেন্ট করা হয়
            console.log('ভাষা পরিবর্তন হয়েছে:', selectedLanguage);
        });
    }

    // বুটস্ট্রাপ লোডিং স্টেট সহ বাটন ক্লিক হ্যান্ডলার
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                const originalText = this.innerHTML;
                
                // লোডিং স্টেট যোগ করুন
                this.classList.add('loading');
                this.disabled = true;
                
                // লোডিং সিমুলেট করুন
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    this.innerHTML = originalText;
                    
                    // বাটন টাইপের উপর ভিত্তি করে উপযুক্ত নোটিফিকেশন দেখান
                    if (this.textContent.includes('লগইন')) {
                        showNotification('লগইন পেইজে যাচ্ছে...', 'info');
                    } else if (this.textContent.includes('অ্যাপ ডাউনলোড')) {
                        showNotification('অ্যাপ ডাউনলোড শুরু হচ্ছে...', 'info');
                    } else if (this.textContent.includes('সেবা গ্রহণ করুন')) {
                        showNotification('সেবা পেইজে যাচ্ছে...', 'info');
                    } else if (this.textContent.includes('আরও জানুন')) {
                        showNotification('আরও তথ্য দেখানো হচ্ছে...', 'info');
                    }
                }, 2000);
            }
        });
    });

    // সার্ভিস লিঙ্ক ক্লিক হ্যান্ডলার
    const serviceLinks = document.querySelectorAll('.btn-link.text-primary');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.card').querySelector('.card-title').textContent;
            showNotification(`${serviceName} সেবার পেইজে যাচ্ছে...`, 'info');
        });
    });

    // অনুসন্ধান ফাংশনালিটি
    const searchLinks = document.querySelectorAll('a[href="#"]');
    searchLinks.forEach(link => {
        if (link.textContent.includes('অনুসন্ধান')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const searchTerm = prompt('কি খুঁজছেন?');
                if (searchTerm) {
                    showNotification(`"${searchTerm}" এর জন্য অনুসন্ধান করা হচ্ছে...`, 'info');
                }
            });
        }
    });

    // সোশ্যাল মিডিয়া লিঙ্ক
    const socialLinks = document.querySelectorAll('.btn-outline-light.rounded-circle');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                           this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                           this.querySelector('i').className.includes('youtube') ? 'YouTube' : 'Instagram';
            showNotification(`${platform} পেইজে যাচ্ছে...`, 'info');
        });
    });
}


// ==============================================
// অ্যানিমেশন এবং ভিজুয়াল ইফেক্ট ফাংশন
// ==============================================

function initializeAnimations() {
    
    // স্ক্রোল করার সময় অ্যানিমেশন ক্লাস যোগ করুন
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // অ্যানিমেশনের জন্য এলিমেন্টগুলি পর্যবেক্ষণ করুন
    const animateElements = document.querySelectorAll('.service-card, .news-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));

    // হিরো সেকশনের জন্য প্যারালাক্স ইফেক্ট
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}


// ==============================================
// নোটিফিকেশন সিস্টেম
// ==============================================

// এনহ্যান্সড নোটিফিকেশন সিস্টেম
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const bgColor = type === 'success' ? '#198754' : 
                   type === 'error' ? '#dc3545' : 
                   type === 'warning' ? '#ffc107' : '#006a4e';
    
    notification.innerHTML = `
        <div class="notification-content" style="background: ${bgColor}; color: white;">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // স্টাইলিংয়ের জন্য বুটস্ট্রাপ ক্লাস যোগ করুন
    notification.classList.add('alert', `alert-${type === 'info' ? 'primary' : type}`, 'alert-dismissible', 'fade', 'show');
    
    document.body.appendChild(notification);
    
    // অ্যানিমেট ইন
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // ক্লোজ বাটন ফাংশনালিটি
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // ৫ সেকেন্ড পর স্বয়ংক্রিয়ভাবে সরান
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}


// ==============================================
// ইউটিলিটি এবং হেল্পার ফাংশন
// ==============================================

// ডিবাউন্স ইউটিলিটি ফাংশন
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// উইন্ডো রিসাইজ হ্যান্ডেল করুন
window.addEventListener('resize', debounce(function() {
    // প্রয়োজনে কম্পোনেন্টগুলি পুনরায় ইনিশিয়ালাইজ করুন
    console.log('উইন্ডো রিসাইজ হয়েছে');
}, 250));

// পৃষ্ঠা দৃশ্যমানতা পরিবর্তন হ্যান্ডেল করুন
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('পৃষ্ঠা লুকানো হয়েছে');
    } else {
        console.log('পৃষ্ঠা দৃশ্যমান হয়েছে');
    }
});

// কীবোর্ড নেভিগেশন সাপোর্ট যোগ করুন
document.addEventListener('keydown', function(e) {
    // নোটিফিকেশন বন্ধ করতে Escape কী
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
});


// ==============================================
// পারফরম্যান্স এবং PWA সম্পর্কিত ফাংশন
// ==============================================

// পারফরম্যান্স মনিটরিং
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('পৃষ্ঠা লোড সময়:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// সার্ভিস ওয়ার্কার রেজিস্ট্রেশন (PWA ফিচারের জন্য)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker রেজিস্ট্রেশন সফল হয়েছে');
            })
            .catch(function(err) {
                console.log('ServiceWorker রেজিস্ট্রেশন ব্যর্থ হয়েছে');
            });
    });
}


// ==============================================
// নোটিশ এবং ফিল্টারিং ফাংশনালিটি
// ==============================================

// নোটিশ ফিল্টারিং ফাংশনালিটি
function initNoticeFiltering() {
    const searchInput = document.getElementById('searchNotice');
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterNotices);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterNotices);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterNotices);
    }
}

// নোটিশ ফিল্টার করার জন্য গ্লোবাল ফাংশন
function filterNotices() {
    const searchTerm = document.getElementById('searchNotice')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || '';
    const selectedYear = document.getElementById('yearFilter')?.value || '';
    
    const noticeCards = document.querySelectorAll('.notice-card');
    
    noticeCards.forEach(card => {
        const title = card.querySelector('h5')?.textContent.toLowerCase() || '';
        const content = card.querySelector('p')?.textContent.toLowerCase() || '';
        const category = card.getAttribute('data-category') || '';
        const year = card.getAttribute('data-year') || '';
        
        const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
        const matchesCategory = !selectedCategory || category === selectedCategory;
        const matchesYear = !selectedYear || year === selectedYear;
        
        if (matchesSearch && matchesCategory && matchesYear) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // নোটিশ সংখ্যা আপডেট করুন
    updateNoticeCount();
    
    // নোটিফিকেশন দেখান
    const visibleNotices = document.querySelectorAll('.notice-card[style*="display: block"]').length;
    showNotification(`${visibleNotices}টি নোটিশ পাওয়া গেছে`, 'info');
}

// নোটিশ সংখ্যা আপডেট করুন
function updateNoticeCount() {
    const visibleNotices = document.querySelectorAll('.notice-card[style*="display: block"]').length;
    const totalNotices = document.querySelectorAll('.notice-card').length;
    
    // পরিসংখ্যান আপডেট করুন যদি তারা বিদ্যমান থাকে
    const totalNoticeElement = document.querySelector('.card-body h4');
    if (totalNoticeElement) {
        totalNoticeElement.textContent = visibleNotices;
    }
    
    // প্রয়োজন হলে "কোন ফলাফল নেই" বার্তা দেখান
    const noResultsElement = document.getElementById('noResults');
    if (visibleNotices === 0) {
        if (!noResultsElement) {
            const noResults = document.createElement('div');
            noResults.id = 'noResults';
            noResults.className = 'text-center py-5';
            noResults.innerHTML = `
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">কোন নোটিশ পাওয়া যায়নি</h5>
                <p class="text-muted">অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন</p>
            `;
            document.querySelector('.col-lg-8').appendChild(noResults);
        }
    } else {
        if (noResultsElement) {
            noResultsElement.remove();
        }
    }
}



// ==============================================
// ক্যাপচা ফাংশনালিটি
// ==============================================

// Simple Math CAPTCHA
  let correctAnswer = null;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateCaptcha() {
    const a = randInt(3, 19);
    const b = randInt(2, 18);
    const ops = ['+', '-'];
    const op = ops[randInt(0, ops.length - 1)];

    let display = `${a} ${op} ${b} = ?`;
    correctAnswer = op === '+' ? (a + b) : (a - b);

    document.getElementById('captchaText').textContent = display;
    document.getElementById('captchaInput').value = '';
  }

  function showMsg(type, text) {
    const box = document.getElementById('msg');
    box.className = `alert alert-${type}`;
    box.textContent = text;
    box.classList.remove('d-none');
  }

  // Init
  generateCaptcha();

  document.getElementById('refreshBtn').addEventListener('click', () => {
    generateCaptcha();
    showMsg('info', 'নতুন ক্যাপচা তৈরি হয়েছে।');
    setTimeout(() => document.getElementById('msg').classList.add('d-none'), 1500);
  });

  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const val = parseInt(document.getElementById('captchaInput').value, 10);
    if (Number.isNaN(val)) {
      showMsg('warning', 'দয়া করে ক্যাপচা উত্তর লিখুন।');
      return;
    }

    if (val === correctAnswer) {
      showMsg('success', 'CAPTCHA সফল! ফর্ম সাবমিট হয়েছে (ডেমো)।');
      // এখানে আসল সাবমিট/এজাক্স কল করবেন।
      generateCaptcha(); // নতুন ক্যাপচা
      e.target.reset();
    } else {
      showMsg('danger', 'CAPTCHA ভুল হয়েছে, আবার চেষ্টা করুন।');
      generateCaptcha();
    }
  });