document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link (starts with #) AND it's on the current page
            // Or if it's a link to index.html with a hash (e.g., index.html#diseño-general)
            if (href.startsWith('#') || (href.includes('index.html#') && window.location.pathname.endsWith('index.html'))) {
                e.preventDefault();
                const targetId = href.split('#')[1]; // Get the part after the hash
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                // Close dropdown on mobile after internal link click
                if (window.innerWidth <= 768 && this.closest('.dropdown-content')) {
                    this.closest('.dropdown-content').style.display = 'none';
                }
            } else if (href.includes('.html') && window.innerWidth <= 768) {
                // For external HTML links in dropdown on mobile, let the link navigate
                // but ensure dropdown closes
                const dropdownContent = this.closest('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                }
            }
            // For other links (e.g., to different HTML files without a hash),
            // let the browser handle default navigation.
        });
    });

    // Toggle dropdown on click for better mobile experience
    const dropbtns = document.querySelectorAll('.dropbtn');
    dropbtns.forEach(dropbtn => {
        dropbtn.addEventListener('click', function(e) {
            // Only toggle if screen width is small (likely mobile/tablet)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent default link behavior on mobile
                const dropdownContent = this.nextElementSibling; // Get the dropdown content div
                if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
                }
            }
        });
    });

    // Toggle visibility of subject year content
    const subjectHeaders = document.querySelectorAll('.subject-section h4');
    subjectHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Find all year-content divs within the same subject-section
            const allYearContents = this.closest('.subject-section').querySelectorAll('.year-content');
            
            // Toggle visibility for each year-content associated with this subject
            allYearContents.forEach(yearContent => {
                // If it's already active, hide it. Otherwise, show it.
                if (yearContent.classList.contains('active')) {
                    yearContent.classList.remove('active');
                    yearContent.style.display = 'none';
                } else {
                    // Optional: Close other open year contents within the same subject if desired
                    // this.closest('.subject-section').querySelectorAll('.year-content.active').forEach(openContent => {
                    //     if (openContent !== yearContent) {
                    //         openContent.style.display = 'none';
                    //         openContent.classList.remove('active');
                    //     }
                    // });
                    yearContent.classList.add('active');
                    yearContent.style.display = 'block';
                }
            });
        });
    });

    // Initial state: hide all year contents when the page loads
    document.querySelectorAll('.year-content').forEach(yearContent => {
        yearContent.style.display = 'none';
        yearContent.classList.remove('active');
    });
});