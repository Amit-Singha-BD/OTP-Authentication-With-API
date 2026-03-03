// Admin Panel JS (Bootstrap 5)

document.addEventListener('DOMContentLoaded', function () {
    initializeSidebar();
    initializeSearchSidebar();
    initializeUserDropdown();
    initializeSidebarDropdowns();
    highlightActiveNav();
    wireUpActions();
});

function initializeSidebar() {
    const toggleBtn = document.querySelector('[data-toggle="sidebar"]');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                // Mobile: toggle sidebar open/close
                document.body.classList.toggle('sidebar-open');
                // Add smooth animation class
                const sidebar = document.querySelector('.admin-sidebar');
                if (sidebar) {
                    sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            } else {
                // Desktop: toggle sidebar collapsed/expanded
                document.body.classList.toggle('sidebar-collapsed');
                // Add smooth animation for content
                const content = document.querySelector('.admin-content');
                if (content) {
                    content.style.transition = 'padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            }
        });
    }

    // Close sidebar on route change (mobile)
    document.querySelectorAll('.sidebar-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                // Smooth close animation
                const sidebar = document.querySelector('.admin-sidebar');
                if (sidebar) {
                    sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                document.body.classList.remove('sidebar-open');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth < 992 && document.body.classList.contains('sidebar-open')) {
            const sidebar = document.querySelector('.admin-sidebar');
            const toggleBtn = document.querySelector('[data-toggle="sidebar"]');
            
            if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                // Smooth close animation
                sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                document.body.classList.remove('sidebar-open');
            }
        }
    });

    // Close sidebar on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            // Smooth transition when switching to desktop
            const sidebar = document.querySelector('.admin-sidebar');
            const content = document.querySelector('.admin-content');
            if (sidebar) {
                sidebar.style.transition = 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            if (content) {
                content.style.transition = 'padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            document.body.classList.remove('sidebar-open');
        } else {
            // Mobile view
            const sidebar = document.querySelector('.admin-sidebar');
            if (sidebar) {
                sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        }
    });

    // Add smooth hover effects for sidebar links
    document.querySelectorAll('.sidebar-link').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

function initializeSearchSidebar() {
    const searchToggleBtn = document.querySelector('[data-toggle="search-sidebar"]');
    const searchSidebar = document.querySelector('.search-sidebar');
    const searchOverlay = document.querySelector('.search-sidebar-overlay');
    const searchCloseBtn = document.querySelector('.search-close');
    const searchForm = document.querySelector('.search-form');

    if (searchToggleBtn && searchSidebar) {
        // Toggle search sidebar
        searchToggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleSearchSidebar();
        });

        // Close search sidebar
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function (e) {
                e.preventDefault();
                closeSearchSidebar();
            });
        }

        // Close on overlay click
        if (searchOverlay) {
            searchOverlay.addEventListener('click', function () {
                closeSearchSidebar();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchSidebar.classList.contains('active')) {
                closeSearchSidebar();
            }
        });

        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                handleSearchForm();
            });

            // Handle form reset
            searchForm.addEventListener('reset', function (e) {
                setTimeout(() => {
                    // Add reset animation
                    const formElements = searchForm.querySelectorAll('.form-control, .form-select');
                    formElements.forEach((element, index) => {
                        element.style.animation = 'none';
                        element.offsetHeight; // Trigger reflow
                        element.style.animation = `slideInUp 0.3s ease-out ${index * 0.05}s`;
                    });
                }, 100);
            });
        }

        // Add smooth animations for search form elements
        const formElements = searchForm?.querySelectorAll('.form-control, .form-select, .btn');
        if (formElements) {
            formElements.forEach(function (element) {
                element.addEventListener('mouseenter', function () {
                    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }
    }
}

function toggleSearchSidebar() {
    const searchSidebar = document.querySelector('.search-sidebar');
    const searchOverlay = document.querySelector('.search-sidebar-overlay');
    const mainSidebar = document.querySelector('.admin-sidebar');

    if (searchSidebar && searchOverlay) {
        if (searchSidebar.classList.contains('active')) {
            closeSearchSidebar();
        } else {
            openSearchSidebar();
        }
    }
}

function openSearchSidebar() {
    const searchSidebar = document.querySelector('.search-sidebar');
    const searchOverlay = document.querySelector('.search-sidebar-overlay');
    const mainSidebar = document.querySelector('.admin-sidebar');

    if (searchSidebar && searchOverlay) {
        // Close main sidebar on mobile when opening search sidebar
        if (window.innerWidth < 992) {
            document.body.classList.remove('sidebar-open');
        }

        // Add smooth animation
        searchSidebar.style.transition = 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        searchOverlay.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Open search sidebar
        searchSidebar.classList.add('active');
        searchOverlay.classList.add('active');

        // Add entrance animation for form elements
        const formElements = searchSidebar.querySelectorAll('.form-control, .form-select');
        formElements.forEach((element, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = `slideInUp 0.3s ease-out ${index * 0.1}s`;
        });

        // Focus on first input
        const firstInput = searchSidebar.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 300);
        }
    }
}

function closeSearchSidebar() {
    const searchSidebar = document.querySelector('.search-sidebar');
    const searchOverlay = document.querySelector('.search-sidebar-overlay');

    if (searchSidebar && searchOverlay) {
        // Add smooth animation
        searchSidebar.style.transition = 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        searchOverlay.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Close search sidebar
        searchSidebar.classList.remove('active');
        searchOverlay.classList.remove('active');

        // Reset form after closing
        setTimeout(() => {
            const searchForm = document.querySelector('.search-form');
            if (searchForm) {
                searchForm.reset();
            }
        }, 300);
    }
}

function handleSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const formData = new FormData(searchForm);
        const searchData = {};

        // Collect form data
        for (let [key, value] of formData.entries()) {
            if (value) {
                searchData[key] = value;
            }
        }

        // Show loading state
        const submitBtn = searchForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>অনুসন্ধান হচ্ছে...';
        submitBtn.disabled = true;

        // Simulate search (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Close search sidebar
            closeSearchSidebar();

            // Show success message
            toast('অনুসন্ধান সম্পন্ন হয়েছে', 'success');

            // Here you would typically update the table with search results
            console.log('Search data:', searchData);
            
            // Example: Update table with filtered results
            // updateMemberTable(searchData);
        }, 1500);
    }
}

// function highlightActiveNav() {
//     const current = location.pathname.split('/').pop();
//     document.querySelectorAll('.sidebar-link').forEach(function (a) {
//         const href = a.getAttribute('href');
//         if (href && href.endsWith(current)) {
//             a.classList.add('active');
//         }
//     });
// }

function wireUpActions() {
    // Example: fake delete action
    document.body.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-action="delete"]');
        if (btn) {
            e.preventDefault();
            const row = btn.closest('tr');
            if (confirm('আপনি কি নিশ্চিত?')) {
                if (row) {
                    // Smooth fade out animation
                    row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        row.remove();
                    }, 300);
                }
                toast('সফলভাবে মুছে ফেলা হয়েছে', 'success');
            }
        }
    });

    // Fake form submission
    document.body.addEventListener('submit', function (e) {
        const form = e.target.closest('form[data-fake]');
        if (form) {
            e.preventDefault();
            const modalEl = form.closest('.modal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }
            toast('সংরক্ষণ সম্পন্ন', 'success');
        }
    });

    // Add smooth animations for buttons
    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Add smooth animations for cards
    document.querySelectorAll('.card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

function toast(message, type) {
    const bg = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-primary';
    const el = document.createElement('div');
    el.className = `position-fixed top-0 end-0 p-3`;
    el.style.zIndex = 1080;
    el.innerHTML = `
        <div class="toast text-white ${bg}" role="alert" data-bs-delay="1800">
            <div class="d-flex align-items-center">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;
    document.body.appendChild(el);
    const toastEl = el.querySelector('.toast');
    const t = new bootstrap.Toast(toastEl);
    toastEl.addEventListener('hidden.bs.toast', () => el.remove());
    t.show();
}

function initializeUserDropdown() {
    const userDropdownToggle = document.querySelector('[data-toggle="user-dropdown"]');
    const userDropdown = document.querySelector('.user-profile-dropdown');

    if (userDropdownToggle && userDropdown) {
        // Toggle dropdown
        userDropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleUserDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!userDropdown.contains(e.target)) {
                closeUserDropdown();
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && userDropdown.classList.contains('active')) {
                closeUserDropdown();
            }
        });

        // Add smooth animations for dropdown items
        const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function (item, index) {
            item.addEventListener('mouseenter', function () {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
}

function initializeSidebarDropdowns() {
    const dropdownToggles = document.querySelectorAll('.sidebar-dropdown-toggle');
    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.closest('.sidebar-dropdown');
            if (parent) {
                parent.classList.toggle('open');
            }
        });
    });
}

function toggleUserDropdown() {
    const userDropdown = document.querySelector('.user-profile-dropdown');
    if (userDropdown) {
        if (userDropdown.classList.contains('active')) {
            closeUserDropdown();
        } else {
            openUserDropdown();
        }
    }
}

function openUserDropdown() {
    const userDropdown = document.querySelector('.user-profile-dropdown');
    if (userDropdown) {
        // Add smooth animation
        userDropdown.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        userDropdown.classList.add('active');
    }
}

function closeUserDropdown() {
    const userDropdown = document.querySelector('.user-profile-dropdown');
    if (userDropdown) {
        // Add smooth animation
        userDropdown.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        userDropdown.classList.remove('active');
    }
}

// Active/Inactive button functionality
const activeBtn = document.getElementById('activeBtn');
const inactiveBtn = document.getElementById('inactiveBtn');

if (activeBtn && inactiveBtn) {
    activeBtn.addEventListener('click', () => {
        activeBtn.classList.add('btn-success', 'active');
        activeBtn.classList.remove('btn-outline-success');
        inactiveBtn.classList.add('btn-outline-success');
        inactiveBtn.classList.remove('btn-success', 'active');
    });

    inactiveBtn.addEventListener('click', () => {
        inactiveBtn.classList.add('btn-success', 'active');
        inactiveBtn.classList.remove('btn-outline-success');
        activeBtn.classList.add('btn-outline-success');
        activeBtn.classList.remove('btn-success', 'active');
    });
}

//Image Preview Script
function previewImage(event) {
var reader = new FileReader();
reader.onload = function(){
    var output = document.getElementById('photoPreview');
    output.src = reader.result;
    output.classList.remove("d-none");
};
reader.readAsDataURL(event.target.files[0]);
}

function previewMemberPhoto(event) {
    const preview = document.getElementById('previewPhoto');
    preview.src = URL.createObjectURL(event.target.files[0]);
    preview.style.display = 'block';
}

// ৩ সেকেন্ড পরে alert hide হবে
setTimeout(() => {
    let alertBox = document.getElementById('alert-message');
    if (alertBox) {
        let bsAlert = new bootstrap.Alert(alertBox);
        bsAlert.close();
    }
}, 4000);


function previewFile(input) {
    let file = input.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('previewImage').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}