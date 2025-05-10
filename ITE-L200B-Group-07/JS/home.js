function showLoading() {
    document.getElementById("createAccount").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("homepage").classList.add("hidden");
    
    document.getElementById("loadingScreen").classList.remove("hidden");
    let loadingText = document.getElementById("loadingText");
    
    setTimeout(() => {
        loadingText.textContent = "Please wait...";
    }, 1000);
    
    setTimeout(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
        showHome();
    }, 2000);
}

function showHome() {
    document.getElementById("homepage").classList.remove("hidden");
    document.getElementById("createAccount").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
}



document.addEventListener('DOMContentLoaded', function() {
    // Check login status first
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn) {
        // User is logged in - show homepage immediately
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('createAccount').classList.add('hidden');
        document.getElementById('homepage').classList.remove('hidden');
    } else {
        // New visitor - show loading then create account
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('createAccount').classList.remove('hidden');
        }, 3000);
    }

    // Navbar toggle functionality
    const menuOpenButton = document.getElementById("menu-open-button");
    const menuCloseButton = document.getElementById("menu-close-button");
    const navMenu = document.querySelector(".nav-menu");
    
    menuOpenButton.addEventListener("click", () => {
        navMenu.classList.add("active");
    });
    
    menuCloseButton.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

    // Form submission handlers
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createAccount();
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });

    // Nav login button
    document.getElementById('navLoginBtn').addEventListener('click', function() {
        document.getElementById('homepage').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
        document.getElementById('createAccount').classList.add('hidden');
    });
document.getElementById('navLog').addEventListener('click', function()  {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('createAccount').classList.add('hidden');
    
})
    // Initialize Swiper for testimonials
    const swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        grabCursor: true,
        spaceBetween: 20
    });
});

// Handle back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('createAccount').classList.add('hidden');
            document.getElementById('homepage').classList.remove('hidden');
        }
    }
});

function createAccount() {
    const fullName = document.getElementById("fullName").value;
    const user = document.getElementById("userName").value;
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("passLog").value;
    const confirmLog = document.getElementById("confirmPass").value;
    const dateBirth = document.getElementById("birthDate").value;
    const agreement = document.getElementById("agreement").checked;

    if (!user || !fullName || !email || !password || !confirmLog || !dateBirth) {
        alert("Please fill all fields");
        return;
    }

    if (!agreement) {
        alert("You must agree to the terms and conditions");
        return;
    }

    if (password !== confirmLog) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("dateBirth", dateBirth);
    
    showLoading();
}

function login() {
    const user = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const storedUser = localStorage.getItem("user");
    const storedPass = localStorage.getItem("password");

    if (user === storedUser && password === storedPass) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('fieldSearch');
    const medicalFields = document.getElementById('medicalFields');
    const resultCount = document.getElementById('resultCount');
    const allFields = medicalFields.querySelectorAll('li');
    const categoryHeadings = medicalFields.querySelectorAll('h3');
    
    // Store original HTML for reset
    const originalHTML = medicalFields.innerHTML;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;
        let currentCategory = '';
        let newHTML = '';
        let hasVisibleItems = false;
        
        if (searchTerm === '') {
            // Reset to original view if search is empty
            medicalFields.innerHTML = originalHTML;
            resultCount.textContent = 'All Fields';
            return;
        }
        
        // Process each field item
        allFields.forEach(field => {
            const fieldText = field.textContent.toLowerCase();
            if (fieldText.includes(searchTerm)) {
                visibleCount++;
                
                // Check if we need to add a category heading
                let prevElement = field.previousElementSibling;
                while (prevElement) {
                    if (prevElement.tagName === 'H3') {
                        if (prevElement.textContent !== currentCategory) {
                            currentCategory = prevElement.textContent;
                            newHTML += `<h3>${currentCategory}</h3>`;
                        }
                        break;
                    }
                    prevElement = prevElement.previousElementSibling;
                }
                
                newHTML += field.outerHTML;
                hasVisibleItems = true;
            }
        });
        
        // Update the display
        if (hasVisibleItems) {
            medicalFields.innerHTML = newHTML;
            resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'Field' : 'Fields'}`;
        } else {
            medicalFields.innerHTML = '<div class="no-results">No matching fields found</div>';
            resultCount.textContent = '0 Fields';
        }
    });
    
    
    medicalFields.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            alert(`You selected: ${e.target.textContent}`);
            
        }
    });
});
