document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling (Event Delegation) ---
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        mainHeader.addEventListener('click', function(e) {
            const target = e.target;
            if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    try {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        console.error("Error during smooth scrolling:", error);
                        // Fallback:  Just jump to the element
                        targetElement.scrollIntoView();
                    }
                }
            }
        });
    }

    // ---  Current Year ---
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    // --- Name Hover Effect ---
    const Name = document.querySelector('.names');
    if (Name) {
        Name.addEventListener('mouseenter', () => {
            Name.style.color = 'navy';
            Name.style.transition = 'color 0.3s ease';
        });

        Name.addEventListener('mouseleave', () => {
            Name.style.color = '';
        });
    }

    // --- Logo Click ---
    const Logo = document.querySelector('.logo');
    if (Logo) {
        Logo.style.cursor = 'pointer';
        Logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    // script.js
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.style.top = "-80px"; // Hide header
  } else {
    // Scrolling up
    header.style.top = "0"; // Show header
  }
  lastScrollY = window.scrollY;
});

    
});