 // Initialize the dashboard
 document.addEventListener('DOMContentLoaded', function() {
    // Current user data
    let currentUser = {
        name: "",
        title: "",
        email: "",
        avatar: "C:\Users\hp\Desktop\ITE-L200B-Group-07\Multimedia\Young Afro Professional Doctor, Doctor, Afro, Medical PNG Transparent Image and Clipart for Free Download.jpg"
    };

    // Calendar data
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Admin accounts
    let adminAccounts = [
        { username: "", email: "", password: "" }
    ];

    // Current admin
    let currentAdmin = null;

    // DOM Elements
    const loadingScreen = document.getElementById('loadingScreen');
    const authScreen = document.getElementById('authScreen');
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeBtn = document.getElementById('welcomeBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutHeaderBtn = document.getElementById('logoutHeaderBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const notificationIcon = document.getElementById('notificationIcon');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const applyTheme = document.getElementById('applyTheme');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYear = document.getElementById('currentMonthYear');
const adminProfile=document.getElementById("adminProfileSection");
    // Initialize the app
    function init() {
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Check if admin is already logged in (from localStorage)
            const loggedInAdmin = localStorage.getItem('loggedInAdmin');
            if (loggedInAdmin) {
                try {
                    currentAdmin = JSON.parse(loggedInAdmin);
                    showDashboard();
                } catch (e) {
                    console.error("Error parsing loggedInAdmin:", e);
                    showAuthScreen();
                }
            } else {
                showAuthScreen();
            }
        }, 2000);

        // Event listeners
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });

        loginForm.addEventListener('submit', handleLogin);
        signupForm.addEventListener('submit', handleSignup);
        welcomeBtn.addEventListener('click', closeWelcomeMessage);
        logoutBtn.addEventListener('click', handleLogout);
        logoutHeaderBtn.addEventListener('click', handleLogout);

        // Initialize dashboard components
        initializeCalendar();
        loadRecentBookings();
        initCharts();
        initDashboardEventListeners();
        initAdminProfileEdit();
    }

    // Show auth screen
    function showAuthScreen() {
        authScreen.style.display = 'flex';
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        sidebar.style.display = 'none';
        mainContent.style.display = 'none';
        header.style.display = 'none';
    }

    // Handle login
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const admin = adminAccounts.find(acc => acc.username === username && acc.password === password);
        
        if (admin) {
            currentAdmin = admin;
            localStorage.setItem('loggedInAdmin', JSON.stringify(currentAdmin));
            showDashboard();
        } else {
            alert('Invalid username or password');
        }
    }

    // Handle signup
    function handleSignup(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (adminAccounts.some(acc => acc.username === username)) {
            alert('Username already exists');
            return;
        }

        const newAdmin = { username, email, password };
        adminAccounts.push(newAdmin);
        
        alert('Account created successfully! Please login.');
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        signupForm.reset();
    }

    // Show dashboard
    function showDashboard() {
        authScreen.style.display = 'none';
        sidebar.style.display = 'flex';
        header.style.display = 'flex';
        mainContent.style.display = 'block';
        
        // Show welcome message
        setTimeout(() => {
            welcomeMessage.style.display = 'block';
        }, 500);
    }

    // Close welcome message
    function closeWelcomeMessage() {
        welcomeMessage.style.display = 'none';
    }

    // Handle logout
    function handleLogout(e) {
        e.preventDefault();
        currentAdmin = null;
        localStorage.removeItem('loggedInAdmin');
        showAuthScreen();
        loginForm.reset();
    }

    // Initialize calendar
    function initializeCalendar() {
        renderCalendar(currentMonth, currentYear);
        
        // Event listeners for calendar navigation
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }

    // Render calendar for specific month and year
    function renderCalendar(month, year) {
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        // Set month and year in header
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                           "July", "August", "September", "October", "November", "December"];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-header';
            dayElement.textContent = day;
            calendarDays.appendChild(dayElement);
        });
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get days from previous month
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.textContent = prevMonthDays - i;
            calendarDays.appendChild(dayElement);
        }
        
        // Add days from current month
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Mark today
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Randomly mark some days as having appointments (for demo)
            if (Math.random() > 0.7) {
                dayElement.classList.add('has-appointment');
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Calculate days from next month to fill the grid
        const totalCells = firstDay + daysInMonth;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
    }

    // Load recent bookings
    function loadRecentBookings() {
        const recentBookings = document.getElementById('recentBookings');
        recentBookings.innerHTML = '';
        
        const bookings = [
            { patient: "John Smith", doctor: "Dr. Sarah Johnson", time: "10:00 AM" },
            { patient: "Maria Garcia", doctor: "Dr. Michael Chen", time: "11:30 AM" },
            { patient: "David Kim", doctor: "Dr. Aisha Mohammed", time: "09:00 AM" },
            { patient: "Emma Wilson", doctor: "Dr. Robert Brown", time: "02:15 PM" }
        ];
        
        bookings.forEach(booking => {
            const bookingElement = document.createElement('div');
            bookingElement.className = 'booking-item';
            bookingElement.innerHTML = `
                <img src="https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg" alt="Patient">
                <div class="booking-info">
                    <h4>${booking.patient}</h4>
                    <p>${booking.time} • ${booking.doctor}</p>
                </div>
            `;
            recentBookings.appendChild(bookingElement);
        });
    }

    // Initialize charts
    function initCharts() {
        // Appointments chart
        const appointmentsCtx = document.getElementById('appointmentsChart').getContext('2d');
        new Chart(appointmentsCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Appointments',
                    data: [12, 19, 15, 22, 18, 10],
                    backgroundColor: 'rgba(26, 115, 232, 0.7)',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Visits chart
        const visitsCtx = document.getElementById('visitsChart').getContext('2d');
        new Chart(visitsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Patient Visits',
                    data: [120, 150, 180, 200, 240, 210],
                    borderColor: 'rgba(38, 166, 154, 1)',
                    backgroundColor: 'rgba(38, 166, 154, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Initialize dashboard event listeners
    function initDashboardEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link, .dropdown-item[data-section]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelector(`.nav-link[data-section="${section}"]`).classList.add('active');
                
                // Update header title
                document.getElementById('headerTitle').textContent = this.textContent.trim();
                
                // Show/hide sections
                if (section === 'profile') {
                    document.getElementById('adminProfileSection').style.display = 'block';
                } else {
                    document.getElementById('adminProfileSection').style.display = 'none';
                }
            });
        });

        // Settings toggle in sidebar
        document.getElementById('settingsToggle').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('settingsMenu').classList.toggle('show');
        });

        // Settings buttons
        document.getElementById('changePasswordBtn').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('settingsModal').style.display = 'flex';
            document.getElementById('passwordSettings').style.display = 'block';
            document.getElementById('themeSettings').style.display = 'none';
        });

        document.getElementById('changeThemeBtn').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('settingsModal').style.display = 'flex';
            document.getElementById('passwordSettings').style.display = 'none';
            document.getElementById('themeSettings').style.display = 'block';
        });

        document.getElementById('settingsBtn').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('settingsModal').style.display = 'flex';
            document.getElementById('passwordSettings').style.display = 'block';
            document.getElementById('themeSettings').style.display = 'none';
        });

        // Close settings modal
        closeSettings.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });

        // Theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Apply theme
        applyTheme.addEventListener('click', function() {
            const activeTheme = document.querySelector('.theme-option.active').getAttribute('data-theme');
            applyThemeSettings(activeTheme);
            settingsModal.style.display = 'none';
        });

        // Profile image upload
        document.getElementById('profileImageUpload').addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('profileImage').src = event.target.result;
                    document.getElementById('headerProfileImage').src = event.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // Profile form submission
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            currentUser.name = document.getElementById('profileNameInput').value;
            currentUser.title = document.getElementById('profileTitleInput').value;
            
            // Update profile info
            document.getElementById('profileName').textContent = currentUser.name;
            document.getElementById('profileTitle').textContent = currentUser.title;
            document.getElementById('headerProfileName').textContent = currentUser.name;
            
            // Show success feedback
            alert('Profile updated successfully!');
            document.getElementById('adminProfileSection').style.display = 'none';
  
        });

        // Password form submission
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically send this to your backend
            alert('Password changed successfully!');
            document.getElementById('settingsModal').style.display = 'none';
            this.reset();
        });

        // Add doctor form
        document.getElementById('addDoctorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Increment doctor count
            const totalDoctors = document.getElementById('totalDoctors');
            totalDoctors.textContent = parseInt(totalDoctors.textContent) + 1;
            this.reset();
            
            // Show success feedback
            alert('Doctor added successfully!');
        });

        // Dropdown menus
        notificationIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('notificationDropdown').style.display = 
                document.getElementById('notificationDropdown').style.display === 'block' ? 'none' : 'block';
            document.getElementById('profileMenu').style.display = 'none';
        });
        
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('profileMenu').style.display = 
                document.getElementById('profileMenu').style.display === 'block' ? 'none' : 'block';
            document.getElementById('notificationDropdown').style.display = 'none';
        });
        
        // Close dropdowns when clicking elsewhere
        document.addEventListener('click', function() {
            document.getElementById('notificationDropdown').style.display = 'none';
            document.getElementById('profileMenu').style.display = 'none';
        });
    }

    // Apply theme settings
    function applyThemeSettings(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'default':
                root.style.setProperty('--primary-color', '#1a73e8');
                root.style.setProperty('--dark-color', '#0d47a1');
                root.style.setProperty('--light-color', '#e8f0fe');
                root.style.setProperty('--sidebar-bg', 'linear-gradient(135deg, #0d47a1, #1a73e8)');
                root.style.setProperty('--bg-color', '#f5f5f5');
                root.style.setProperty('--card-bg', '#ffffff');
                root.style.setProperty('--text-color', '#333333');
                break;
            case 'blue':
                root.style.setProperty('--primary-color', '#1a73e8');
                root.style.setProperty('--dark-color', '#0d47a1');
                root.style.setProperty('--light-color', '#e8f0fe');
                root.style.setProperty('--sidebar-bg', 'linear-gradient(135deg, #0d47a1, #1a73e8)');
                root.style.setProperty('--bg-color', '#e8f0fe');
                root.style.setProperty('--card-bg', '#ffffff');
                root.style.setProperty('--text-color', '#0d47a1');
                break;
            case 'dark':
                root.style.setProperty('--primary-color', '#4fc3f7');
                root.style.setProperty('--dark-color', '#bbdefb');
                root.style.setProperty('--light-color', '#333333');
                root.style.setProperty('--sidebar-bg', 'linear-gradient(135deg, #222222, #333333)');
                root.style.setProperty('--bg-color', '#222222');
                root.style.setProperty('--card-bg', '#333333');
                root.style.setProperty('--text-color', '#ffffff');
                break;
        }
    }

    // Start the application
    init();
});