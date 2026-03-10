
document.addEventListener("DOMContentLoaded", () => {
    // --- Sticky Header Functionality ---
    const header = document.querySelector(".header")
    let lastScrollY = window.scrollY
    const headerHeight = header.offsetHeight // Get initial header height
  
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY
  
      if (currentScrollY > headerHeight) {
        // Only apply sticky behavior after scrolling past initial header
        header.classList.add("sticky")
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          header.classList.add("sticky-hidden")
        } else {
          // Scrolling up
          header.classList.remove("sticky-hidden")
        }
      } else {
        // At the top of the page or within the initial header height
        header.classList.remove("sticky")
        header.classList.remove("sticky-hidden")
      }
      lastScrollY = currentScrollY
    })
  
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector(".menu-toggle")
    const navList = document.querySelector(".nav-list")
  
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show")
    })
  
    // --- Dropdown Menu Functionality ---
    const dropdownToggle = document.querySelector(".dropdown-toggle")
    const dropdownMenu = document.querySelector(".dropdown-menu")
  
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault() // Prevent default link behavior
      dropdownMenu.classList.toggle("show")
      // Close dropdown if clicked outside
      e.stopPropagation() // Prevent this click from immediately closing the dropdown via document click
    })
  
    document.addEventListener("click", (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show")
      }
    })

    // --- Image Carousel Functionality ---
    const mainProductImage = document.querySelector(".main-product-image")
    const thumbnails = document.querySelectorAll(".thumbnail")
    const leftArrow = document.querySelector(".left-arrow")
    const rightArrow = document.querySelector(".right-arrow")
    const thumbnailZoomPreview = document.querySelector(".thumbnail-zoom-preview")
  
    // Use actual thumbnail sources so preview and main image stay in sync.
    const imageSources = Array.from(thumbnails).map((thumbnail) => thumbnail.getAttribute("src"))
    let currentImageIndex = 0
  
    // Function to update the main image and active thumbnail
    function updateMainImage(index) {
      mainProductImage.src = imageSources[index]
      mainProductImage.alt = thumbnails[index].alt // Update alt text
  
      // Remove active class from all thumbnails
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      // Add active class to the current thumbnail
      thumbnails[index].classList.add("active")
      currentImageIndex = index
    }
  
    // Initialize with the first image as active
    updateMainImage(0)
  
    // Thumbnail click handler
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        updateMainImage(index)
      })
  
      // Thumbnail hover for zoom preview
      thumbnail.addEventListener("mouseover", (e) => {
        const thumbRect = thumbnail.getBoundingClientRect()
        const carouselRect = document.querySelector(".product-image-carousel").getBoundingClientRect()
  
        // Position the zoom preview relative to the carousel container
        // Adjust top to be above the thumbnail, and left to be centered or slightly offset
        thumbnailZoomPreview.style.top = `${thumbRect.top - carouselRect.top - thumbnailZoomPreview.offsetHeight - 10}px` // 10px above thumbnail
        thumbnailZoomPreview.style.left = `${thumbRect.left - carouselRect.left + (thumbRect.width / 2) - thumbnailZoomPreview.offsetWidth / 2}px`
  
        thumbnailZoomPreview.style.backgroundImage = `url(${imageSources[index]})`
        thumbnailZoomPreview.style.display = "block"
      })
  
      thumbnail.addEventListener("mouseout", () => {
        thumbnailZoomPreview.style.display = "none"
      })
    })
  
    // Carousel arrow click handlers
    leftArrow.addEventListener("click", () => {
      let newIndex = currentImageIndex - 1
      if (newIndex < 0) {
        newIndex = imageSources.length - 1 // Loop to last image
      }
      updateMainImage(newIndex)
    })
  
    rightArrow.addEventListener("click", () => {
      let newIndex = currentImageIndex + 1
      if (newIndex >= imageSources.length) {
        newIndex = 0 // Loop to first image
      }
      updateMainImage(newIndex)
    })
  })
  
  function initializeCompanyLogosCarousel() {
    const companyLogos = document.querySelector('.company-logos')
    if (!companyLogos || companyLogos.dataset.carouselReady === 'true') return

    const logoImages = Array.from(companyLogos.querySelectorAll('img'))
    if (logoImages.length < 2) return

    // Duplicate once so CSS animation can loop seamlessly.
    const duplicateLogos = document.createDocumentFragment()
    logoImages.forEach((logo) => {
      duplicateLogos.appendChild(logo.cloneNode(true))
    })

    companyLogos.appendChild(duplicateLogos)
    companyLogos.dataset.carouselReady = 'true'
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeCompanyLogosCarousel()
  })
  
  // function addLogoTransitions() {
  //   const logoImages = document.querySelectorAll('.company-logos img');
  //   logoImages.forEach(img => {
  //     img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  //   });
  // }
  
  // // Call this after DOM is loaded
  // document.addEventListener('DOMContentLoaded', () => {
  //   addLogoTransitions();
  // });


//   faq section js 

document.addEventListener("DOMContentLoaded", () => {
    // --- FAQ Functionality ---
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
  
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")
  
        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active")
          faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false")
        })
  
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
          question.setAttribute("aria-expanded", "true")
        }
      })
    })
  
    // --- Email Catalogue Functionality ---
    const emailInput = document.querySelector(".email-input")
    const sendButton = document.querySelector(".send-catalogue-btn")
  
    if (sendButton && emailInput) {
      sendButton.addEventListener("click", () => {
        const email = emailInput.value.trim()
  
        if (!email) {
          alert("Please enter your email address")
          emailInput.focus()
          return
        }
  
        if (!isValidEmail(email)) {
          alert("Please enter a valid email address")
          emailInput.focus()
          return
        }
  
        // Simulate sending catalogue
        const originalText = sendButton.textContent
        sendButton.textContent = "SENDING..."
        sendButton.disabled = true
  
        setTimeout(() => {
          sendButton.textContent = "SENT ✓"
          setTimeout(() => {
            sendButton.textContent = originalText
            sendButton.disabled = false
            emailInput.value = ""
            alert("Catalogue sent successfully! Check your email.")
          }, 2000)
        }, 1500)
      })
  
      // Handle Enter key in email input
      emailInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendButton.click()
        }
      })
    }
  
    // --- Applications Carousel Functionality ---
    const applicationsSection = document.querySelector(".applications-section")
    const applicationsCarousel = applicationsSection ? applicationsSection.querySelector(".applications-carousel") : null
    const applicationsTrack = applicationsSection ? applicationsSection.querySelector(".carousel-track") : null
    const applicationsPrevBtn = applicationsSection ? applicationsSection.querySelector(".prev-btn") : null
    const applicationsNextBtn = applicationsSection ? applicationsSection.querySelector(".next-btn") : null
    const applicationCards = applicationsSection ? applicationsSection.querySelectorAll(".application-card") : []

    if (applicationsCarousel && applicationsTrack && applicationCards.length > 0) {
      let currentIndex = 0
      let maxIndex = 0

      function isMobileView() {
        return window.innerWidth <= 768
      }

      function getCardWidth() {
        const firstCard = applicationCards[0]
        const gap = Number.parseFloat(window.getComputedStyle(applicationsTrack).columnGap || window.getComputedStyle(applicationsTrack).gap || "0")
        return firstCard.getBoundingClientRect().width + gap
      }

      function recalculateCarouselBounds() {
        const cardWidth = getCardWidth()
        const viewportWidth = applicationsCarousel.clientWidth
        const visibleCards = Math.max(1, Math.floor(viewportWidth / cardWidth))
        maxIndex = Math.max(0, applicationCards.length - visibleCards)
        if (currentIndex > maxIndex) currentIndex = maxIndex
        return cardWidth
      }

      function updateApplicationsCarousel() {
        const cardWidth = recalculateCarouselBounds()

        if (isMobileView()) {
          applicationsTrack.style.transform = "none"
          if (applicationsPrevBtn) applicationsPrevBtn.disabled = true
          if (applicationsNextBtn) applicationsNextBtn.disabled = true
          return
        }

        applicationsTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`
        if (applicationsPrevBtn) applicationsPrevBtn.disabled = currentIndex === 0
        if (applicationsNextBtn) applicationsNextBtn.disabled = currentIndex >= maxIndex
      }

      if (applicationsPrevBtn) {
        applicationsPrevBtn.addEventListener("click", () => {
          if (currentIndex > 0) {
            currentIndex--
            updateApplicationsCarousel()
          }
        })
      }

      if (applicationsNextBtn) {
        applicationsNextBtn.addEventListener("click", () => {
          if (currentIndex < maxIndex) {
            currentIndex++
            updateApplicationsCarousel()
          }
        })
      }

      updateApplicationsCarousel()
      window.addEventListener("resize", updateApplicationsCarousel)

      // Desktop drag and mobile horizontal drag both work on the viewport container.
      let isDragging = false
      let dragStartX = 0
      let dragScrollLeft = 0

      applicationsCarousel.addEventListener("mousedown", (e) => {
        if (!isMobileView()) return
        isDragging = true
        applicationsCarousel.style.cursor = "grabbing"
        dragStartX = e.pageX - applicationsCarousel.offsetLeft
        dragScrollLeft = applicationsCarousel.scrollLeft
      })

      applicationsCarousel.addEventListener("mouseleave", () => {
        isDragging = false
        applicationsCarousel.style.cursor = "grab"
      })

      applicationsCarousel.addEventListener("mouseup", () => {
        isDragging = false
        applicationsCarousel.style.cursor = "grab"
      })

      applicationsCarousel.addEventListener("mousemove", (e) => {
        if (!isDragging || !isMobileView()) return
        e.preventDefault()
        const x = e.pageX - applicationsCarousel.offsetLeft
        const walk = (x - dragStartX) * 1.5
        applicationsCarousel.scrollLeft = dragScrollLeft - walk
      })
    }
  
    // --- Manufacturing Process Tabs ---
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab")
  
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked button and corresponding content
        button.classList.add("active")
        const targetContent = document.getElementById(targetTab)
        if (targetContent) {
          targetContent.classList.add("active")
        }
      })
    })

  
    // Touch drag for applications carousel is handled in its scoped block above.
  
    // --- Smooth Scroll Animation for Tab Content ---
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)
  
    // Observe tab contents for animation
    tabContents.forEach((content) => {
      content.style.opacity = "0"
      content.style.transform = "translateY(20px)"
      content.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      contentObserver.observe(content)
    })
  
    // --- Utility Functions ---
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })
  

  // part 3 starts here 

  document.addEventListener("DOMContentLoaded", () => {
    // --- Testimonials Carousel Functionality ---
    const testimonialsCarousel = document.querySelector(".testimonials-carousel")
    const carouselTrack = testimonialsCarousel ? testimonialsCarousel.querySelector(".carousel-track") : null
    const testimonialCards = testimonialsCarousel ? testimonialsCarousel.querySelectorAll(".testimonial-card") : []
  
    if (carouselTrack && testimonialCards.length > 0) {
      let isDown = false
      let startX
      let scrollLeft
  
      // Mouse events for desktop drag
      carouselTrack.addEventListener("mousedown", (e) => {
        isDown = true
        carouselTrack.classList.add("active-drag")
        startX = e.pageX - carouselTrack.offsetLeft
        scrollLeft = carouselTrack.scrollLeft
      })
  
      carouselTrack.addEventListener("mouseleave", () => {
        isDown = false
        carouselTrack.classList.remove("active-drag")
      })
  
      carouselTrack.addEventListener("mouseup", () => {
        isDown = false
        carouselTrack.classList.remove("active-drag")
      })
  
      carouselTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - carouselTrack.offsetLeft
        const walk = (x - startX) * 1.5 // Adjust scroll speed
        carouselTrack.scrollLeft = scrollLeft - walk
      })
  
      // Touch events for mobile swipe
      carouselTrack.addEventListener("touchstart", (e) => {
        isDown = true
        startX = e.touches[0].pageX - carouselTrack.offsetLeft
        scrollLeft = carouselTrack.scrollLeft
      })
  
      carouselTrack.addEventListener("touchend", () => {
        isDown = false
      })
  
      carouselTrack.addEventListener("touchmove", (e) => {
        if (!isDown) return
        const x = e.touches[0].pageX - carouselTrack.offsetLeft
        const walk = (x - startX) * 1.5
        carouselTrack.scrollLeft = scrollLeft - walk
      })
    }
  
    // --- Learn More Button Functionality (Portfolio Cards) ---
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn")
  
    learnMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // In a real application, this would navigate to a product detail page
        // or open a modal with more information.
        const cardTitle = button.closest(".portfolio-card").querySelector("h3").textContent
        alert(`You clicked "Learn More" for: ${cardTitle}`)
        console.log(`Learn More clicked for: ${cardTitle}`)
      })
    })
  
    // --- Talk to an Expert Button Functionality (CTA Section) ---
    const talkToExpertBtn = document.querySelector(".talk-to-expert-btn")
  
    if (talkToExpertBtn) {
      talkToExpertBtn.addEventListener("click", () => {
        // In a real application, this would open a contact form modal,
        // redirect to a contact page, or initiate a chat.
        alert("Connecting you with an expert! Please wait...")
        console.log("Talk to an Expert button clicked.")
      })
    }
  
    // --- Intersection Observer for Section Animations ---
    const sectionsToAnimate = document.querySelectorAll(
      ".testimonials-section .section-title, .testimonials-section .section-subtitle, .testimonial-card, " +
        ".portfolio-section .section-title, .portfolio-section .section-subtitle, .portfolio-card, " +
        ".cta-section .cta-box",
    )
  
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px", // Adjust when element enters viewport
    }
  
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up") // Add a class for animation
          observer.unobserve(entry.target) // Stop observing once animated
        }
      })
    }, observerOptions)
  
  })


  class ManufacturingCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 8;
        this.isAnimating = false;
        
        this.slides = [
            { title: 'Raw Material', step: 1 },
            { title: 'Extrusion', step: 2 },
            { title: 'Cooling', step: 3 },
            { title: 'Sizing', step: 4 },
            { title: 'Quality Control', step: 5 },
            { title: 'Marking', step: 6 },
            { title: 'Cutting', step: 7 },
            { title: 'Packaging', step: 8 }
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
        this.setupSwipeGestures();
        this.setupKeyboardNavigation();
    }
    
    bindEvents() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    setupSwipeGestures() {
        const container = document.querySelector('.carousel-content');
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            this.handleSwipe(startX, startY, endX, endY, endTime - startTime);
        }, { passive: true });
    }
    
    handleSwipe(startX, startY, endX, endY, duration) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        
        // Only handle horizontal swipes that are fast enough
        if (Math.abs(deltaX) > Math.abs(deltaY) && 
            Math.abs(deltaX) > minSwipeDistance && 
            duration < maxSwipeTime) {
            
            if (deltaX > 0) {
                this.previousSlide();
            } else {
                this.nextSlide();
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }
    
    nextSlide() {
        if (this.isAnimating || this.currentSlide >= this.totalSlides - 1) return;
        
        this.goToSlide(this.currentSlide + 1, 'next');
    }
    
    previousSlide() {
        if (this.isAnimating || this.currentSlide <= 0) return;
        
        this.goToSlide(this.currentSlide - 1, 'prev');
    }
    
    goToSlide(index, direction = 'next') {
        if (this.isAnimating || index === this.currentSlide || 
            index < 0 || index >= this.totalSlides) return;
        
        this.isAnimating = true;
        this.animateSlide(this.currentSlide, index, direction);
        this.currentSlide = index;
        this.updateUI();
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }
    
    animateSlide(fromIndex, toIndex, direction) {
        const slides = document.querySelectorAll('.slide');
        const currentSlide = slides[fromIndex];
        const nextSlide = slides[toIndex];
        
        // Prepare next slide
        nextSlide.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlide.style.opacity = '0';
        nextSlide.style.position = 'absolute';
        nextSlide.style.top = '0';
        nextSlide.style.left = '0';
        nextSlide.style.width = '100%';
        
        // Force reflow
        nextSlide.offsetHeight;
        
        // Start animation
        requestAnimationFrame(() => {
            // Animate current slide out
            currentSlide.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
            currentSlide.style.opacity = '0';
            
            // Animate next slide in
            nextSlide.style.transform = 'translateX(0)';
            nextSlide.style.opacity = '1';
            
            // Clean up after animation
            setTimeout(() => {
                // Reset all slides
                slides.forEach((slide, index) => {
                    slide.classList.remove('active');
                    if (index === toIndex) {
                        slide.classList.add('active');
                        slide.style.position = 'relative';
                        slide.style.transform = '';
                        slide.style.opacity = '';
                        slide.classList.add('fade-in');
                        
                        // Remove fade-in class after animation
                        setTimeout(() => {
                            slide.classList.remove('fade-in');
                        }, 400);
                    } else {
                        slide.style.position = 'absolute';
                        slide.style.transform = 'translateX(100%)';
                        slide.style.opacity = '0';
                    }
                });
            }, 400);
        });
    }
    
    updateUI() {
        // Update step badge
        const stepBadge = document.getElementById('stepBadge');
        const currentSlideData = this.slides[this.currentSlide];
        stepBadge.textContent = `Step ${currentSlideData.step}/8: ${currentSlideData.title}`;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        
        // Add visual feedback for disabled state
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.style.opacity = '1';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
        } else {
            nextBtn.style.opacity = '1';
        }
    }
    
    // Public method to go to specific slide (for external control)
    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSlides) {
            const direction = stepNumber > this.currentSlide + 1 ? 'next' : 'prev';
            this.goToSlide(stepNumber - 1, direction);
        }
    }
    
    // Get current step info
    getCurrentStep() {
        return {
            step: this.currentSlide + 1,
            title: this.slides[this.currentSlide].title,
            total: this.totalSlides
        };
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.manufacturingCarousel = new ManufacturingCarousel();
});

// Handle page visibility change to pause animations
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.manufacturingCarousel) {
        window.manufacturingCarousel.isAnimating = false;
    }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.carousel-card')) {
        e.preventDefault();
    }
});

function initializeInlineModals() {
  if (document.body.dataset.inlineModalInit === "true") return
  document.body.dataset.inlineModalInit = "true"

  function closeAllModals() {
    document.querySelectorAll(".inline-modal.is-open").forEach((modal) => {
      modal.classList.remove("is-open")
      modal.setAttribute("aria-hidden", "true")
    })
    document.body.style.overflow = ""
  }

  // Delegated click handling is resilient to future DOM changes.
  document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-open-modal]")
    if (openTrigger) {
      const modalId = openTrigger.getAttribute("data-open-modal")
      const modal = modalId ? document.getElementById(modalId) : null
      if (!modal) return
      closeAllModals()
      modal.classList.add("is-open")
      modal.setAttribute("aria-hidden", "false")
      document.body.style.overflow = "hidden"
      return
    }

    if (event.target.closest("[data-close-modal]")) {
      closeAllModals()
    }
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals()
    }
  })

  document.querySelectorAll(".inline-modal__form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      alert("Thanks! Your request has been submitted.")
      closeAllModals()
      form.reset()
    })
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeInlineModals)
} else {
  initializeInlineModals()
}

document.addEventListener("DOMContentLoaded", () => {
  const featureCards = Array.from(document.querySelectorAll(".features-section .feature-card"))
  if (featureCards.length === 0) return

  function setActiveFeature(activeCard) {
    featureCards.forEach((card) => {
      const isActive = card === activeCard
      card.classList.toggle("is-active", isActive)
      card.setAttribute("aria-pressed", isActive ? "true" : "false")
    })
  }

  featureCards.forEach((card) => {
    card.setAttribute("role", "button")
    card.setAttribute("tabindex", "0")
    card.setAttribute("aria-pressed", "false")

    card.addEventListener("click", () => setActiveFeature(card))

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        setActiveFeature(card)
      }
    })

    card.addEventListener("mousedown", () => card.classList.add("is-pressed"))
    card.addEventListener("mouseup", () => card.classList.remove("is-pressed"))
    card.addEventListener("mouseleave", () => card.classList.remove("is-pressed"))
    card.addEventListener("touchstart", () => card.classList.add("is-pressed"), { passive: true })
    card.addEventListener("touchend", () => card.classList.remove("is-pressed"))
  })

  // Set first card as selected by default.
  setActiveFeature(featureCards[0])
})
  

