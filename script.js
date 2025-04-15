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

// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".services-track");
  const cards = document.querySelectorAll(".service-card");
  const dotsContainer = document.querySelector(".service-dots");
  let currentIndex = 0;
  let interval;

  // Calculate dimensions
  function updateDimensions() {
    const isMobile = window.innerWidth <= 768;
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = isMobile
      ? containerWidth - 32 // Account for margins
      : (containerWidth - 64) / 3; // Desktop: 3 cards with gaps

    // Update card widths
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
    });

    return { isMobile, containerWidth, cardWidth };
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    const { isMobile } = updateDimensions();
    const totalSlides = Math.ceil(cards.length / (isMobile ? 1 : 3));

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update dots
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    const { isMobile, cardWidth } = updateDimensions();
    const cardsPerView = isMobile ? 1 : 3;
    currentIndex = index;

    // Calculate the scroll position
    let scrollOffset;
    if (isMobile) {
      // Center the card on mobile
      scrollOffset = -(index * (cardWidth + 16)); // 16px for gap
    } else {
      // Show multiple cards on desktop
      scrollOffset = -(index * (cardWidth * 3 + 32)); // 32px for gaps
    }

    track.style.transform = `translateX(${scrollOffset}px)`;
    updateDots();
  }

  // Auto scroll
  function startAutoScroll() {
    interval = setInterval(() => {
      const { isMobile } = updateDimensions();
      const totalSlides = Math.ceil(cards.length / (isMobile ? 1 : 3));
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }, 2000);
  }

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(interval);
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      touchEndX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener("touchend", () => {
    const difference = touchStartX - touchEndX;
    if (Math.abs(difference) > 50) {
      // Minimum swipe distance
      const { isMobile } = updateDimensions();
      const totalSlides = Math.ceil(cards.length / (isMobile ? 1 : 3));
      if (difference > 0) {
        // Swipe left
        currentIndex = (currentIndex + 1) % totalSlides;
      } else {
        // Swipe right
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      }
      goToSlide(currentIndex);
    }
    startAutoScroll();
  });

  // Pause on hover (desktop only)
  track.addEventListener("mouseenter", () => clearInterval(interval));
  track.addEventListener("mouseleave", startAutoScroll);

  // Handle resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    clearInterval(interval);

    resizeTimer = setTimeout(() => {
      createDots();
      updateDimensions();
      goToSlide(0);
      startAutoScroll();
    }, 250);
  });

  // Initial setup
  createDots();
  updateDimensions();
  startAutoScroll();
});
