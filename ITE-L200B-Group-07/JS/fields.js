const container = document.getElementById('specialtySection');
const infoBox1 =  document.getElementById('boxA');
const infoBox2 =  document.getElementById('boxB');

const fields = [
  "Gynecologist", "Pediatrician", "Cardiologist", "Dermatologist", "Dentist", "Psychiatrist", "General Physician", "Orthopedic",
  "Neurologist", "ENT Specialist", "Urologist", "Oncologist", "Radiologist", "Surgeon", "Nephrologist", "Allergist",
  "Anesthesiologist", "Immunologist", "Endocrinologist", "Gastroenterologist", "Hematologist", "Infectious Disease Specialist",
  "Internal Medicine Specialist", "Ophthalmologist", "Pathologist", "Plastic Surgeon", "Pulmonologist", "Rheumatologist",
  "Sleep Medicine Specialist", "Sports Medicine Specialist", "Geriatrician", "Geneticist", "Chiropractor", "Nutritionist",
  "Occupational Therapist", "Physical Therapist", "Podiatrist", "Prosthodontist", "Speech Therapist", "Addiction Specialist",
  "Audiologist", "Behavioral Therapist", "Cosmetic Surgeon", "Cytopathologist", "Emergency Medicine Specialist", "Fertility Specialist",
  "Foot and Ankle Surgeon", "Gastrointestinal Surgeon", "Head and Neck Surgeon", "Hyperbaric Physician", "Medical Geneticist",
  "Neonatologist", "Neuropsychologist", "Nuclear Medicine Specialist", "Oculoplastic Surgeon", "Oral Surgeon", "Orthodontist",
  "Pain Management Specialist", "Palliative Care Specialist", "Pediatric Surgeon", "Periodontist", "Preventive Medicine Specialist",
  "Rehabilitation Specialist", "Reproductive Endocrinologist", "Sleep Specialist", "Spine Specialist", "Thoracic Surgeon",
  "Trauma Surgeon", "Travel Medicine Specialist", "Tropical Disease Specialist", "Vascular Surgeon", "Wound Care Specialist",
  "Dental Hygienist", "Emergency Dentist", "Implantologist", "Maxillofacial Surgeon", "Oral Medicine Expert", "Pediatric Dentist",
  "Public Health Dentist", "Endodontist", "Military Doctor", "Flight Surgeon", "Occupational Medicine Specialist", "Medical Examiner",
  "Forensic Pathologist", "Biomedical Scientist", "Clinical Pharmacologist", "Dermatopathologist", "Telemedicine Doctor",
  "Rural Health Specialist", "Primary Care Physician", "Family Physician", "Clinical Geneticist", "Clinical Psychologist",
  "Pain Psychologist", "Mental Health Counselor", "Health Coach", "Holistic Doctor", "Homeopathic Doctor", "Ayurvedic Doctor"
];

const navList = document.getElementById("navList");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

// Build nav list
fields.forEach((field, index) => {
  const li = document.createElement("li");
  li.textContent = field;
  if (index === 0) li.classList.add("active");
  li.addEventListener("click", () => {
    document.querySelectorAll(".nav-list li").forEach(el => el.classList.remove("active"));
    li.classList.add("active");
    showResult(field);
    showSpecialtyQuote(field);
  });
  navList.appendChild(li);
});

// Show selected field
function showResult(text) {
  results.textContent = `Results for: ${text}`;
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  const match = fields.find(field => field.toLowerCase().includes(val));
  if (match) {
    document.querySelectorAll(".nav-list li").forEach(el => {
      el.classList.toggle("active", el.textContent === match);
    });
    showResult(match);
    showSpecialtyQuote(match);
  }
});

// Updated specialtyQuotes object
const specialtyQuotes = {
  "Pediatrician": { text: "Caring for the smallest patients with the biggest hearts.", author: "Unknown" },
  "Cardiologist": { text: "A healthy heart beats with a healthy lifestyle.", author: "Unknown" },
  "Dermatologist": { text: "Your skin is your body's largest organ — protect it well.", author: "Unknown" },
  "Dentist": { text: "Every tooth in a man's head is more valuable than a diamond.", author: "Cervantes" },
  "Psychiatrist": { text: "Mental health matters as much as physical health.", author: "Unknown" },
  "General Physician": { text: "The first step to healing is proper diagnosis.", author: "Unknown" },
  "Orthopedic": { text: "Keeping you moving pain-free and strong.", author: "Unknown" },
  "Neurologist": { text: "Understanding the brain, the body's control center.", author: "Unknown" },
  "ENT Specialist": { text: "Breathing easy, hearing well, living fully.", author: "Unknown" },
  "Urologist": { text: "Focused on urinary tract and male reproductive health.", author: "Unknown" },
  "Oncologist": { text: "Fighting cancer with science and compassion.", author: "Unknown" },
  "Radiologist": { text: "Seeing beneath the surface to help save lives.", author: "Unknown" },
  "Surgeon": { text: "Precision and care in every incision.", author: "Unknown" },
  "Nephrologist": { text: "Caring for your kidneys, keeping you healthy.", author: "Unknown" },
  "Allergist": { text: "Finding relief from allergies for a better life.", author: "Unknown" },
  "Anesthesiologist": { text: "Keeping patients safe and comfortable during procedures.", author: "Unknown" },
  "Immunologist": { text: "Defending your body from diseases every day.", author: "Unknown" },
  "Endocrinologist": { text: "Balancing your hormones, balancing your life.", author: "Unknown" },
  "Gastroenterologist": { text: "Helping your digestive system run smoothly.", author: "Unknown" },
  "Hematologist": { text: "Studying blood to improve health.", author: "Unknown" },
  "Infectious Disease Specialist": { text: "Battling infections with expertise and care.", author: "Unknown" },
  "Internal Medicine Specialist": { text: "Comprehensive care for adults of all ages.", author: "Unknown" },
  "Ophthalmologist": { text: "Protecting your vision, brightening your world.", author: "Unknown" },
  "Pathologist": { text: "Diagnosing diseases through lab work.", author: "Unknown" },
  "Plastic Surgeon": { text: "Restoring and enhancing with artistry and skill.", author: "Unknown" },
  "Pulmonologist": { text: "Helping you breathe easy and live better.", author: "Unknown" },
  "Rheumatologist": { text: "Managing arthritis and autoimmune diseases with care.", author: "Unknown" },
  "Sleep Medicine Specialist": { text: "Improving your rest for a healthier life.", author: "Unknown" },
  "Sports Medicine Specialist": { text: "Keeping athletes in peak condition.", author: "Unknown" },
  "Geriatrician": { text: "Providing specialized care for the elderly.", author: "Unknown" },
  "Geneticist": { text: "Exploring genetics to unlock health mysteries.", author: "Unknown" },
  "Chiropractor": { text: "Aligning your body for optimal health.", author: "Unknown" },
  "Nutritionist": { text: "Fueling your body for life and energy.", author: "Unknown" }
};

// Show quote
function showSpecialtyQuote(specialty) {
  const quoteText = document.getElementById('quoteText');
  const quote = specialtyQuotes[specialty];
  if (quote) {
    quoteText.innerHTML = `"${quote.text}" <br><span>- ${quote.author}</span>`;
  } else {
    quoteText.innerHTML = `"No specific quote for ${specialty}, but your health matters!" <br><span>- Unknown</span>`;
  }
}
function showResult(text) {
    results.textContent = `Results for: ${text}`;
    document.getElementById("specialtyHeading").textContent = text; 

  }

  const specialtyMessages = {
    
    "Pediatrician": "Take control of your health by consulting a dedicated pediatrician. With expert care and specialized knowledge, they provide crucial support tailored to your unique medical needs and lifestyle. Don’t wait—your well-being starts with the right professional.",
    "Cardiologist": "Take control of your health by consulting a dedicated cardiologist...",
    "Dermatologist": "Take control of your health by consulting a dedicated dermatologist...",
    "Dentist": "Take control of your health by consulting a dedicated dentist...",
    "Psychiatrist": "Take control of your health by consulting a dedicated psychiatrist...",
    "General Physician": "Take control of your health by consulting a dedicated general physician...",
    "Orthopedic": "Take control of your health by consulting a dedicated orthopedic...",
    "Neurologist": "Take control of your health by consulting a dedicated neurologist...",
    "ENT Specialist": "Take control of your health by consulting a dedicated ENT specialist...",
    "Urologist": "Take control of your health by consulting a dedicated urologist...",
    "Oncologist": "Take control of your health by consulting a dedicated oncologist...",
    "Radiologist": "Take control of your health by consulting a dedicated radiologist...",
    "Surgeon": "Take control of your health by consulting a dedicated surgeon...",
    "Nephrologist": "Take control of your health by consulting a dedicated nephrologist...",
    "Allergist": "Take control of your health by consulting a dedicated allergist...",
    "Anesthesiologist": "Take control of your health by consulting a dedicated anesthesiologist...",
    "Immunologist": "Take control of your health by consulting a dedicated immunologist...",
    "Endocrinologist": "Take control of your health by consulting a dedicated endocrinologist...",
    "Gastroenterologist": "Take control of your health by consulting a dedicated gastroenterologist...",
    "Hematologist": "Take control of your health by consulting a dedicated hematologist...",
    "Infectious Disease Specialist": "Take control of your health by consulting a dedicated infectious disease specialist...",
    "Internal Medicine Specialist": "Take control of your health by consulting a dedicated internal medicine specialist...",
    "Ophthalmologist": "Take control of your health by consulting a dedicated ophthalmologist...",
    "Pathologist": "Take control of your health by consulting a dedicated pathologist...",
    "Plastic Surgeon": "Take control of your health by consulting a dedicated plastic surgeon...",
    "Pulmonologist": "Take control of your health by consulting a dedicated pulmonologist...",
    "Rheumatologist": "Take control of your health by consulting a dedicated rheumatologist...",
    "Sleep Medicine Specialist": "Take control of your health by consulting a dedicated sleep medicine specialist...",
    "Sports Medicine Specialist": "Take control of your health by consulting a dedicated sports medicine specialist...",
    "Geriatrician": "Take control of your health by consulting a dedicated geriatrician...",
    "Geneticist": "Take control of your health by consulting a dedicated geneticist...",
    "Chiropractor": "Take control of your health by consulting a dedicated chiropractor...",
    "Nutritionist": "Take control of your health by consulting a dedicated nutritionist..."
  };
  
  function showResult(text) {
    results.textContent = `Results for: ${text}`;
    document.getElementById("specialtyHeading").textContent = text;
  
    const message = specialtyMessages[text];
    const rightMessage = document.getElementById("rightMessage");
    rightMessage.textContent = message || "Explore this specialty for expert care tailored to your needs.";
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const selectFields = [
      "Gynecologist", "Pediatrician", "Cardiologist", "Dermatologist", "Dentist",
      "Psychiatrist", "General Physician", "Orthopedic", "Neurologist", "ENT Specialist",
      "Urologist", "Oncologist", "Radiologist", "Surgeon", "Nephrologist", "Allergist",
      "Anesthesiologist", "Immunologist", "Endocrinologist", "Gastroenterologist",
      "Hematologist", "Infectious Disease Specialist", "Internal Medicine Specialist",
      "Ophthalmologist", "Pathologist", "Plastic Surgeon", "Pulmonologist", "Rheumatologist",
      "Sleep Medicine Specialist", "Sports Medicine Specialist", "Geriatrician", "Geneticist",
      "Chiropractor", "Nutritionist",
      "Occupational Therapist", "Physical Therapist", "Podiatrist", "Prosthodontist", "Speech Therapist", "Addiction Specialist",
  "Audiologist", "Behavioral Therapist", "Cosmetic Surgeon", "Cytopathologist", "Emergency Medicine Specialist", "Fertility Specialist",
  "Foot and Ankle Surgeon", "Gastrointestinal Surgeon", "Head and Neck Surgeon", "Hyperbaric Physician", "Medical Geneticist",
  "Neonatologist", "Neuropsychologist", "Nuclear Medicine Specialist", "Oculoplastic Surgeon", "Oral Surgeon", "Orthodontist",
  "Pain Management Specialist", "Palliative Care Specialist", "Pediatric Surgeon", "Periodontist", "Preventive Medicine Specialist",
  "Rehabilitation Specialist", "Reproductive Endocrinologist", "Sleep Specialist", "Spine Specialist", "Thoracic Surgeon",
  "Trauma Surgeon", "Travel Medicine Specialist", "Tropical Disease Specialist", "Vascular Surgeon", "Wound Care Specialist",
  "Dental Hygienist", "Emergency Dentist", "Implantologist", "Maxillofacial Surgeon", "Oral Medicine Expert", "Pediatric Dentist",
  "Public Health Dentist", "Endodontist", "Military Doctor", "Flight Surgeon", "Occupational Medicine Specialist", "Medical Examiner",
  "Forensic Pathologist", "Biomedical Scientist", "Clinical Pharmacologist", "Dermatopathologist", "Telemedicine Doctor",
  "Rural Health Specialist", "Primary Care Physician", "Family Physician", "Clinical Geneticist", "Clinical Psychologist",
  "Pain Psychologist", "Mental Health Counselor", "Health Coach", "Holistic Doctor", "Homeopathic Doctor", "Ayurvedic Doctor"
    ];
  
    const data = {};
  
    selectFields.forEach(field => {
      data[field] = {
        boxA: generateDoctors(field, 300),
        boxB: generateDoctors(field, 200),
      };
    });
  
    function generateDoctors(field, count) {
      const hospitals = ["MindCare Clinic", "City Hospital", "LifeLine Health", "Global Care", "Hope Hospital"];
      const names = ["Alex", "Taylor", "Jordan", "Morgan", "Casey", "Drew", "Riley", "Jamie", "Quinn", "Sam", "Avery", "Skyler"];
      const surnames = ["Nguyen", "Smith", "Lee", "Brown", "Garcia", "Jones", "Miller", "Davis", "Clark", "Lopez", "Turner", "Evans"];
      const cards = [];
  
      for (let i = 0; i < count; i++) {
        const name = `Dr. ${names[i % names.length]} ${surnames[i % surnames.length]}`;
        const hospital = hospitals[i % hospitals.length];
        const ratingCount = 1 + (i % 5);
        const stars = "<i class='bx bx-star'></i>".repeat(ratingCount) + "<i class='bx bx-star' style='opacity: 0.3;'></i>".repeat(5 - ratingCount);
        const img = `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`;
        const fieldSec=selectFields[i% selectFields.length];
        cards.push(`
          <div class="card">
            <img src="${img}" alt="Doctor" class="doctor-img" />
            <div class="details">
              <h3>${name}</h3>
            <p class="doctor-field">${fieldSec}</p>
              <p>${hospital}</p>
              <div class="rating">${stars}</div>
              <div class="availability"><p style="margin-top: 10px;">Available <span class="dot"></span></p></div>
            </div>
            <button class="book-btn">Book Now</button>
          </div>
        `);
        const fieldsToUpdate = [field];
        const allFields = document.querySelectorAll(".doctor-field");
        
        allFields.forEach((el, i) => {
          el.textContent = fieldsToUpdate[i] || el.textContent;
        });
        
      }
  
      return cards.join("");
    }
  
    window.displayDoctors = function(field) {
      if (!data[field]) {
        alert(`No doctors for the field "${field}"`);
        return;
      }
      document.getElementById('boxA').innerHTML = data[field].boxA;
      document.getElementById('boxB').innerHTML = data[field].boxB;
    }
  
    // Optional: show default on load
    
        displayDoctors('Gynecologist');
  });

  function attachBookingButtons() {
    const bookButtons = document.querySelectorAll(".book-btn");
  
    bookButtons.forEach(button => {
      button.addEventListener("click", function () {
        const card = this.closest(".card");
  
        if (!card) {
          console.error("No .card container found.");
          return;
        }
  
        const doctorName = card.querySelector("h3")?.textContent || '';
        const doctorField = card.querySelectorAll("p")[0]?.textContent || '';
  
        document.getElementById("doctorName").value = doctorName;
        document.getElementById("doctorField").value = doctorField;
  
        const serviceOptions = ["consultation", "treatment", "check-up"];
        if (serviceOptions.includes(doctorField.toLowerCase())) {
          document.getElementById("service").value = doctorField.toLowerCase();
        } else {
          document.getElementById("service").value = "";
        }
  
        showForm();
      });
    });
  }
  
  function initModal() {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close");
  
    window.showForm = function () {
      modal.style.display = "block";
      document.getElementById('date').min = new Date().toISOString().split('T')[0];
    };
  
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    document.getElementById("bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        notes: document.getElementById("notes").value,
      };
  
      console.log("Form submitted:", formData);
      alert("Thank you for your booking request! We will contact you shortly.");
      modal.style.display = "none";
      this.reset();
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    initModal();
    attachBookingButtons();
  });