// Check login status when dashboard loads
document.addEventListener("DOMContentLoaded", function() {
  checkLogin();
  loadProfile();
  initDashboardComponents();
});

function checkLogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
      alert("Please login first to get access to dashboard ");
      window.location.href = "home.html";
  }
}

function initDashboardComponents() {
  // Theme System
  function setTheme(theme) {
      document.body.className = `${theme}-theme`;
      localStorage.setItem('selectedTheme', theme);
      document.querySelector('.color-list').classList.remove('show');
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  setTheme(savedTheme);
  
  // Initialize other components
  initNotifications();
  initMenu();
  initPassLog();
  initAppointList();
  initCalendar();
  initChart();
  initPrescriptionCarousel();
  initModal();
  initStarRating();
  initContactForm();
}

function loadProfile() {
  const headerName = document.getElementById("headerName");
  const storedName = localStorage.getItem("fullName");
  if (storedName) {
      headerName.textContent = storedName;
  }
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "home.html";
});

// Change Password Modal Functionality
const changePassModal = document.getElementById("changePasswordModal");
const changePassBtn = document.getElementById("changePassBtn");
const closeBtn = document.querySelector(".change-pass-close"); // Changed to specific close button

// Show modal when change password is clicked
changePassBtn.addEventListener("click", function(e) {
    e.preventDefault();
    changePassModal.style.display = "block";
});

// Close modal when X is clicked
closeBtn.addEventListener("click", function() {
    changePassModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", function(event) {
    if (event.target == changePassModal) {
        changePassModal.style.display = "none";
    }
});

// Handle password change form submission
document.getElementById("changePassForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const currentPass = document.getElementById("currentPass").value;
    const newPass = document.getElementById("newPass").value;
    const confirmPass = document.getElementById("confirmPass").value;
    const storedPass = localStorage.getItem("password");

    if (currentPass !== storedPass) {
        alert("Current password is incorrect");
        return;
    }

    if (newPass !== confirmPass) {
        alert("New passwords don't match");
        return;
    }

    localStorage.setItem("password", newPass);
    alert("Password changed successfully!");
    changePassModal.style.display = "none";
    this.reset();
});

//welcome message
// Display user's name in welcome message
function displayUserName() {
  const userName = localStorage.getItem("fullName") ;
  const welcomeText = document.getElementById("welcomeText");
  
  if (welcomeText) {
      welcomeText.textContent = `Welcome back, ${userName}! Here's your health overview.`;
  }
}

// Call this function when the dashboard loads
document.addEventListener("DOMContentLoaded", function() {
  displayUserName();
  
});

// Add this to handle home navigation
document.getElementById("homeLink").addEventListener("click", function(e) {
  e.preventDefault();
  window.location.href = "home.html";
});
// Notification System
function initNotifications() {
    const notificationBell = document.getElementById('notificationBell');
    const notificationPanel = document.getElementById('notificationPanel');
    
    notificationBell.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationPanel.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBell) {
            notificationPanel.classList.remove('active');
        }
    });
    
    document.querySelector('.mark-all-read').addEventListener('click', function() {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        document.querySelector('.notification-badge').textContent = '0';
        document.querySelector('.notification-count').textContent = '0';
    });
    
    document.querySelectorAll('.notification-dismiss').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.notification-item').remove();
            updateNotificationCount();
        });
    });
    
    function updateNotificationCount() {
        const count = document.querySelectorAll('.notification-item.unread').length;
        document.querySelector('.notification-badge').textContent = count;
        document.querySelector('.notification-count').textContent = count;
    }
}

// Menu System
function initMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const menuList = document.getElementById('menuList');
    
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', function(e) {
        if (!menuIcon.contains(e.target) && !menuList.contains(e.target)) {
            menuList.style.display = 'none';
        }
    });
}

// Password/Logout Menu
function initPassLog() {
    const toggleButton = document.querySelector(".circle");
    const passLogList = document.getElementById("passLogList");
    
    toggleButton.addEventListener("click", () => {
        passLogList.style.display = passLogList.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".passLog").contains(e.target)) {
            passLogList.style.display = "none";
        }
    });
}


function toggleColorList() {
    document.querySelector('.color-list').classList.toggle('show');
}

function setTheme(theme) {
    // Remove all theme classes first
    document.body.classList.remove('pink-theme', 'blue-theme', 'black-theme', 'default-theme');
    
    // Add the selected theme class
    if (theme !== 'default') {
        document.body.classList.add(theme + '-theme');
    }
    
    // Store the theme preference in localStorage
    localStorage.setItem('theme', theme);
    
    // Close the color picker
    document.querySelector('.color-list').classList.remove('show');
}

// Check for saved theme preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
});

// Appointment List
function initAppointList() {
    const appointIcon = document.getElementById("appointIcon");
    const appointList = document.getElementById("appointList");
    
    appointIcon.addEventListener("click", () => {
        appointList.style.display = appointList.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener("click", (e) => {
        if (!appointList.contains(e.target) && e.target !== appointIcon) {
            appointList.style.display = "none";
        }
    });
}

// Calendar System
function initCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");
    let currentDate = new Date();
    
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        monthYear.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;
        calendarDays.innerHTML = "";
        
        for (let i = 0; i < firstDay; i++) {
            calendarDays.appendChild(document.createElement("div"));
        }
        
        for (let day = 1; day <= lastDate; day++) {
            const dayElement = document.createElement("div");
            dayElement.className = "day";
            dayElement.textContent = day;
            
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add("today");
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    window.changeMonth = function(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate);
    };
    
    renderCalendar(currentDate);
}

// Chart System
function initChart() {
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
            const { width, height, ctx } = chart;
            ctx.restore();
            
            const fontSize = (height / 350).toFixed(2);
            ctx.font = `${fontSize}em Segoe UI`;
            ctx.textBaseline = "middle";
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color');
            
            const text1 = "120 Appointments";
            const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
            const text1Y = height / 2 - 10;
            ctx.fillText(text1, text1X, text1Y);
            
            const text2 = "this Year";
            const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
            const text2Y = height / 2 + 15;
            ctx.fillText(text2, text2X, text2Y);
            
            ctx.save();
        }
    };
    
    Chart.register(centerTextPlugin);
    
    const ctx = document.getElementById('myDoughnutChart').getContext('2d');
    const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Appointments', 'Reschedules', 'Cancellations'],
            datasets: [{
                label: 'Appointments Overview',
                data: [60, 25, 15],
                backgroundColor: [
                    getComputedStyle(document.body).getPropertyValue('--accent-color'),
                    getComputedStyle(document.body).getPropertyValue('--secondary-color'),
                    getComputedStyle(document.body).getPropertyValue('--text-color')
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-color')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

// Prescription Carousel
function initPrescriptionCarousel() {
    const cards = [
        {
            card: `
                <div class="card-id">
                    <div class="card-details">
                        <p><b>Medicine Name:</b> Amoxicillin 250mg</p>
                        <p><b>Prescribed by:</b> Dr. Sarah James – Pediatrician</p>
                        <p><b>Date:</b> April 4, 2025</p>
                    </div>
                </div>
            `
        },
        {
            card: `
                <div class="card-id">
                    <div class="card-details">
                        <p><b>Medicine Name:</b> Ibuprofen 400mg</p>
                        <p><b>Prescribed by:</b> Dr. Marcus Lee – General Physician</p>
                        <p><b>Date:</b> March 20, 2025</p>
                    </div>
                </div>
            `
        },
        {
            card: `
                <div class="card-id">
                    <div class="card-details">
                        <p><b>Medicine Name:</b> Loratadine 10mg</p>
                        <p><b>Prescribed by:</b> Dr. Fiona Ahmed – Allergist</p>
                        <p><b>Date:</b> February 15, 2025</p>
                    </div>
                </div>
            `
        },
        {
            card: `
                <div class="card-id">
                    <div class="card-details">
                        <p><b>Medicine Name:</b> Metformin 500mg</p>
                        <p><b>Prescribed by:</b> Dr. James Obi – Endocrinologist</p>
                        <p><b>Date:</b> January 28, 2025</p>
                    </div>
                </div>
            `
        }
    ];
    
    let currentCardIndex = 0;
    const cardContainer = document.getElementById("card-container");
    
    function showCards() {
        cardContainer.innerHTML = '';
        const cardsPerView = window.innerWidth < 768 ? 1 : 2;
        
        for (let i = 0; i < cardsPerView; i++) {
            const index = (currentCardIndex + i) % cards.length;
            cardContainer.innerHTML += cards[index].card;
        }
    }
    
    window.nextCard = function() {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        showCards();
    };
    
    window.prevCard = function() {
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        showCards();
    };
    
    window.addEventListener('resize', showCards);
    showCards();
}

//  booking  System
function initModal() {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close");
    
    window.showForm = function() {
        modal.style.display = "block";
        document.getElementById('date').min = new Date().toISOString().split('T')[0];
    };
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            notes: document.getElementById('notes').value
        };
        
        console.log('Form submitted:', formData);
        alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
        modal.style.display = "none";
        this.reset();
    });
}

// Edit Profile System
function initEditProfile() {
  const fileInput = document.getElementById('fileInput');
  const profileImage = document.getElementById('profileImage');
  const headerImage = document.getElementById('headerImage');
  const editForm = document.getElementById('editProfile');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('Email-inp');
  const contactInput = document.getElementById('contact');
  const headerName = document.getElementById('headerName');
  const overlay = document.getElementById('overlay');
  
  // Load saved profile data
  function loadProfile() {
      const savedName = localStorage.getItem('profileName');
      const savedEmail = localStorage.getItem('profileEmail');
      const savedContact = localStorage.getItem('profileContact');
      const savedImage = localStorage.getItem('profileImage');

      if (savedName) {
          nameInput.value = savedName;
          headerName.textContent = savedName;
      }
      if (savedEmail) emailInput.value = savedEmail;
      if (savedContact) contactInput.value = savedContact;
      if (savedImage) {
          profileImage.src = savedImage;
          headerImage.src = savedImage;
      }
  }

  // Initialize profile editor
  window.editProfile = function() {
      document.querySelector('.edit-container').style.display = "flex";
      overlay.style.display = "block";
      loadProfile(); // Load current values when opening editor
  };
  
  window.editProfileClose = function() {
      document.querySelector('.edit-container').style.display = "none";
      overlay.style.display = "none";
  };
  
  // Handle image upload
  fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              profileImage.src = e.target.result;
              // Don't update header image until saved
          };
          reader.readAsDataURL(file);
      }
  });

  // Handle form submission
  editForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = nameInput.value;
      const email = emailInput.value;
      const contact = contactInput.value;
      const image = profileImage.src;
      
      // Save to localStorage
      localStorage.setItem('profileName', name);
      localStorage.setItem('profileEmail', email);
      localStorage.setItem('profileContact', contact);
      localStorage.setItem('profileImage', image);
      
      // Update header
      headerName.textContent = name;
      headerImage.src = image;
      
      
      // Close the editor
      editProfileClose();
      
      // Show success message (optional)
      alert('Profile updated successfully!');
  });

  // Close editor when clicking overlay
  overlay.addEventListener('click', editProfileClose);

  // Load profile when page loads
  loadProfile();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initEditProfile);
//feedback and reviews
// Star Rating Logic
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');
const ratingInput = document.getElementById('rating-input');
let currentRating = 0;

stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = parseInt(this.getAttribute('data-rating'));
    currentRating = rating;
    ratingInput.value = rating;
    
    // Update star display
    stars.forEach((s, index) => {
      if (index < rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    
    // Update rating text
    const ratingTexts = [
      "Not rated yet",
      "Poor",
      "Fair",
      "Good",
      "Very Good",
      "Excellent"
    ];
    ratingValue.textContent = ratingTexts[rating];
  });

  // Hover effect
  star.addEventListener('mouseover', function() {
    const hoverRating = parseInt(this.getAttribute('data-rating'));
    stars.forEach((s, index) => {
      if (index < hoverRating) {
        s.style.color = 'gold';
      }
    });
  });

  star.addEventListener('mouseout', function() {
    stars.forEach((s, index) => {
      if (index >= currentRating) {
        s.style.color = '#555';
      }
    });
  });
});


 // Form handling logic
 const contactForm = document.getElementById('contactForm');
 const SERVICE_ID = "SERVICE_ID HERE";
 const TEMPLATE_ID = "TEMPLATE_ID HERE";

 // Handle form submission
 contactForm.addEventListener('submit', function(e) {
   e.preventDefault();
   
   // Send form using EmailJS
   emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target)
     .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert("Message Sent");
       contactForm.reset();
        // Reset rating
        stars.forEach(star => star.classList.remove('active'));
        ratingValue.textContent = "Not rated yet";
        ratingInput.value = "0";
        currentRating = 0;
      
     }, function(error) {
       console.log('FAILED...', error);
       alert("Oops! Something went wrong. Please try again.");
     });
 });