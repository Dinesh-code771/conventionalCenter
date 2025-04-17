// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeToggle.classList.replace("fa-moon", "fa-sun");
  } else {
    themeToggle.classList.replace("fa-sun", "fa-moon");
  }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Video Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video-container");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentVideoIndex = 0;

  // Function to play video
  function playVideo(video) {
    video.querySelector("video").play();
  }

  // Function to pause video
  function pauseVideo(video) {
    video.querySelector("video").pause();
  }

  // Function to switch videos
  function switchVideo(index) {
    // Remove active class from all videos and indicators
    videos.forEach((video) => {
      video.classList.remove("active");
      pauseVideo(video);
    });
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to current video and indicator
    videos[index].classList.add("active");
    indicators[index].classList.add("active");
    playVideo(videos[index]);

    currentVideoIndex = index;
  }

  // Auto play next video when current video ends
  videos.forEach((video, index) => {
    const videoElement = video.querySelector("video");
    videoElement.addEventListener("ended", () => {
      const nextIndex = (index + 1) % videos.length;
      switchVideo(nextIndex);
    });
  });

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      switchVideo(index);
    });
  });

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    switchVideo(prevIndex);
  });

  nextBtn.addEventListener("click", () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    switchVideo(nextIndex);
  });

  // Start the first video
  playVideo(videos[0]);

  // Optional: Automatic switching every 10 seconds if video hasn't ended
  setInterval(() => {
    const currentVideo = videos[currentVideoIndex].querySelector("video");
    if (currentVideo.currentTime < currentVideo.duration - 1) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      switchVideo(nextIndex);
    }
  }, 10000);
});

// Add this typing effect code to your existing script.js
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.textContent = this.txt;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2; // Faster delete speed
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".typing-text");
  const words = [
    "Perfect for Weddings",
    "Ideal for Conferences",
    "Great for Celebrations",
    "Business Meetings",
    "Special Occasions",
    "Corporate Events",
  ];
  const wait = 3000;

  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Updated carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".services-track");
  const cards = track.querySelectorAll(".service-card");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let cardsToShow = 3;
  let autoScrollInterval;

  // Initialize carousel
  function initCarousel() {
    const viewportWidth = window.innerWidth;
    cardsToShow = viewportWidth >= 1024 ? 3 : 1;
    createDots();
    updateCarousel();
    startAutoScroll();
  }

  // Create navigation dots
  function createDots() {
    dotsContainer.innerHTML = "";
    const numberOfDots = Math.ceil(cards.length / cardsToShow);

    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update carousel position
  function updateCarousel() {
    const slideWidth = 100 / cardsToShow;
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    // Update dots
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    // Update button visibility
    updateNavigationButtons();
  }

  // Navigation button visibility
  function updateNavigationButtons() {
    const maxIndex = Math.ceil(cards.length / cardsToShow) - 1;
    prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
    nextBtn.style.display = currentIndex === maxIndex ? "none" : "flex";
  }

  // Go to specific slide
  function goToSlide(index) {
    const maxIndex = Math.ceil(cards.length / cardsToShow) - 1;
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    updateCarousel();
  }

  // Auto scroll functionality
  function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      const maxIndex = Math.ceil(cards.length / cardsToShow) - 1;
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 1000); // 1 second interval
  }

  // Event Listeners
  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    clearInterval(autoScrollInterval);
  });

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    clearInterval(autoScrollInterval);
  });

  // Pause auto-scroll on hover
  track.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  track.addEventListener("mouseleave", startAutoScroll);

  // Handle window resize
  window.addEventListener("resize", initCarousel);

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoScrollInterval);
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoScroll();
  });

  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    const maxIndex = Math.ceil(cards.length / cardsToShow) - 1;

    if (difference > 50 && currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else if (difference < -50 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  // Initialize the carousel
  initCarousel();
});

// Initialize EmailJS
(function () {
  // Replace with your EmailJS public key
  emailjs.init("B40H23OIbfgyVxxEm");
})();

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const submitBtn = document.getElementById("submitBtn");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      countryCode: document.getElementById("countryCode").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    // Basic form validation
    if (!validateForm(formData)) {
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = "flex";
    submitBtn.disabled = true;

    // Format the message with all details
    const formattedMessage = `
New Contact Form Submission

Customer Details:
----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}

Message:
----------------
${formData.message}

----------------
This email was sent from your website contact form.
    `;

    // Prepare template parameters
    const templateParams = {
      to_email: "akeaptidinu@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      message: formattedMessage,
      // Add reply-to header
      reply_to: formData.email,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_02qmmzv", // Replace with your EmailJS service ID
        "template_4lcxnjo", // Replace with your EmailJS template ID
        templateParams
      )
      .then(function (response) {
        // Hide loading spinner
        loadingSpinner.style.display = "none";
        submitBtn.disabled = false;

        // Show success message
        showSuccessMessage(
          "Thank you! Your message has been sent successfully. We will contact you soon."
        );

        // Send auto-reply to customer
        sendAutoReply(formData);

        // Reset form
        contactForm.reset();
      })
      .catch(function (error) {
        // Hide loading spinner
        loadingSpinner.style.display = "none";
        submitBtn.disabled = false;

        // Show error message
        showErrorMessage(
          "Sorry, there was an error sending your message. Please try again."
        );
        console.error("EmailJS error:", error);
      });
  });

  // Auto-reply function
  function sendAutoReply(formData) {
    const autoReplyParams = {
      to_email: formData.email,
      to_name: formData.name,
      message: `
Dear ${formData.name},

Thank you for contacting Centennial Convention Center. We have received your inquiry and will get back to you shortly.

Your submitted details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.countryCode} ${formData.phone}

We appreciate your interest in our services and will respond to your message within 24-48 hours.

Best regards,
Centennial Convention Center Team
      `,
    };

    // Send auto-reply email
    emailjs
      .send("service_02qmmzv", "template_4lcxnjo", autoReplyParams)
      .catch(console.error);
  }

  // Form validation function
  function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (data.name.length < 2) {
      showErrorMessage("Please enter a valid name");
      return false;
    }

    if (!emailRegex.test(data.email)) {
      showErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!phoneRegex.test(data.phone)) {
      showErrorMessage("Please enter a valid 10-digit phone number");
      return false;
    }

    if (data.message.length < 10) {
      showErrorMessage("Please enter a message with at least 10 characters");
      return false;
    }

    return true;
  }

  // Success message function
  function showSuccessMessage(message) {
    showNotification(message, "success");
  }

  // Error message function
  function showErrorMessage(message) {
    showNotification(message, "error");
  }

  // Generic notification function
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            animation: slideIn 0.5s ease;
            z-index: 1000;
        `;

    if (type === "success") {
      notification.style.background = "#4CAF50";
    } else {
      notification.style.background = "#f44336";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.5s ease";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }
});

// Add these animations to your CSS
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    </style>
`
);

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector("i");

      // Close all other accordion items
      accordionButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.style.maxHeight = null;
          otherButton.querySelector("i").style.transform = "rotate(0deg)";
        }
      });

      // Toggle current accordion item
      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(45deg)";
      } else {
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
});

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function () {
  // Read More functionality
  const readMoreBtn = document.querySelector(".read-more-btn");
  const descriptionContainer = document.querySelector(".description-container");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function () {
      descriptionContainer.classList.add("expanded");
      // Optional: Smooth scroll to show expanded text
      setTimeout(() => {
        descriptionContainer.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    });
  }
});
