// Check login status when dashboard loads
document.addEventListener("DOMContentLoaded", function() {
  checkLogin();
  loadProfile();
  initDashboardComponents();
});

function checkLogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
      alert("Please login first to access the doctors page");
      window.location.href = "home.html";
  }
}


        
    const quotes = [
      {
        text: `"The greatest wealth is health."<br><span>- Virgil</span>`,
      },
      {
        text: `"Health is not valued until sickness comes."<br><span>- Thomas Fuller</span>`,
      }
    ];
  
    let currentQuoteIndex = 0;
  
    function showQuote(index) {
      const quoteElement = document.getElementById("quoteText");
      quoteElement.innerHTML = quotes[index].text;
    }
  
    function nextQuote() {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      showQuote(currentQuoteIndex);
    }
  
    function prevQuote() {
      currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
      showQuote(currentQuoteIndex);
    }
  
  
    const cards = [
    {
      card: `
        <div class="card-id">
          <img src="https://i.pravatar.cc/100?img=47" alt="Doctor" class="doctor-img">
          <div class="details">
            <h3>Dr. Yun Meisheng</h3>
            <p>Gynecologist</p>
            <p>City Hospital</p>
            <div class="rating"><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i></div>
           <div class="availability"><p style="margin-top: 10px;">Available<span class="dot" ></span></p> </div>
          <button class="book-btn">Book Now</button>
            </div>
          
        </div>
      `
    },
    {
      card: `
        <div class="card-id">
          <img src="https://i.pravatar.cc/100?img=52" alt="Doctor" class="doctor-img">
          <div class="details">
            <h3>Dr. Fong Liu</h3>
            <p>Gynecologist</p>
            <p>General Health Center</p>
            <div class="rating"><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i></div>
            <div class="availability"><p style="margin-top: 10px;">Available<span class="dot"></span></p> </div>
          <button class="book-btn">Book Now</button>
            </div>
          
        </div>
      `
    },
    {
      card: `
        <div class="card-id">
          <img src="https://i.pravatar.cc/100?img=33" alt="Doctor" class="doctor-img">
          <div class="details">
            <h3>Dr. Kim Seo-jin</h3>
            <p>Gynecologist</p>
            <p>Lotus Medical</p>
            <div class="rating"><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i></div>
            <div class="availability"><p style="margin-top: 10px;">Available<span class="dot"></span></p> </div>
         <button class="book-btn">Book Now</button>
            </div>
          
        </div>
      `
    }
  ];
  
  let currentCardIndex = 0;
  const cardsPerSlide = 2;
  
  function showCards(startIndex) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';
  
    for (let i = 0; i < cardsPerSlide; i++) {
      const index = (startIndex + i) % cards.length;
      cardContainer.innerHTML += cards[index].card;
    }
  }
  
  function nextCard() {
    currentCardIndex = (currentCardIndex + cardsPerSlide) % cards.length;
    showCards(currentCardIndex);
  }
  
  function prevCard() {
    currentCardIndex = (currentCardIndex - cardsPerSlide + cards.length) % cards.length;
    showCards(currentCardIndex);
  }
  
  // Show first 2 cards
  showCards(currentCardIndex);
  
      
          
      
      let currentIndex = 0;
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") currentIndex++;
        else if (e.key === "ArrowLeft") currentIndex--;
  
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= fields.length) currentIndex = fields.length - 1;
  
        document.querySelectorAll(".nav-list li").forEach((li, idx) => {
          li.classList.toggle("active", idx === currentIndex);
        });
        showResult(fields[currentIndex]);
      });
  
      
      document.getElementById("scrollLeft").onclick = () => {
        navList.scrollBy({ left: -100, behavior: "smooth" });
      };
      document.getElementById("scrollRight").onclick = () => {
        navList.scrollBy({ left: 100, behavior: "smooth" });
      };
  
  
      const menuIcon = document.getElementById('menuIcon');
      const menuList = document.getElementById('menuList');
      const menuItems = menuList.querySelectorAll('li');
      
      let currentFocus = -1;
      
      // Toggle menu visibility on icon click
      menuIcon.addEventListener('click', () => {
        const isVisible = menuList.style.display === 'block';
        menuList.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
          currentFocus = 0;
          setActive(menuItems);
        }
      });
      
      // Hide menu if clicking outside
      document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !menuList.contains(e.target)) {
          menuList.style.display = 'none';
          currentFocus = -1;
        }
      });
      
      // keyboard navigation for menu_list
      document.addEventListener('keydown', (e) => {
        if (menuList.style.display !== 'block') return;
      
        if (e.key === 'ArrowDown') {
          currentFocus = (currentFocus + 1) % menuItems.length;
          setActive(menuItems);
          e.preventDefault();
        } else if (e.key === 'ArrowUp') {
          currentFocus = (currentFocus - 1 + menuItems.length) % menuItems.length;
          setActive(menuItems);
          e.preventDefault();
        } else if (e.key === 'Enter') {
          if (currentFocus > -1) {
            menuItems[currentFocus].querySelector('a').click();
          }
        } else if (e.key === 'Escape') {
          menuList.style.display = 'none';
          currentFocus = -1;
        }
      });
      
      function setActive(items) {
        items.forEach((item, index) => {
          item.classList.toggle('active', index === currentFocus);
          if (index === currentFocus) item.focus();
        });
      }
      
      