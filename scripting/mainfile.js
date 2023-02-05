// ===== Fading in on scroll ===== //
// add appear class to set opacity=1 for desired elements upon reaching them
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          console.log('intersecting');
        } else {
          entry.target.classList.remove('appear');
        }
    });
  });
  
  // get every element that fades in
  const fadingElements = document.querySelectorAll('.fade-in');
  fadingElements.forEach((el) => observer.observe(el));
  
  
  // ===== About Section ===== //
  // about tabs
  const educationTab = document.getElementById('education-tab');
  const skillsTab = document.getElementById('skills-tab');
  const experienceTab = document.getElementById('experience-tab');
  
  // about cards
  const educationSection = document.getElementById('education-card');
  const skillsSection = document.getElementById('skills-card');
  const experienceSection = document.getElementById('experience-card');
  
  // has to be a better way to do this, and i'll find it. not pressing matter rn
  function openEducationTab() {
      if (skillsTab.classList.contains('active-tab')) {
          skillsTab.classList.remove('active-tab');
          skillsSection.classList.remove('active-link');
      } else if (experienceTab.classList.contains('active-tab')) {
          experienceTab.classList.remove('active-tab');
          experienceSection.classList.remove('active-link');
      }
  
      educationTab.classList.add('active-tab');
      educationSection.classList.add('active-link')
  }
  
  function openSkillsTab() {
      if (educationTab.classList.contains('active-tab')) {
          educationTab.classList.remove('active-tab');
          educationSection.classList.remove('active-link');
      } else if (experienceTab.classList.contains('active-tab')) {
          experienceTab.classList.remove('active-tab');
          experienceSection.classList.remove('active-link');
      }
  
      skillsTab.classList.add('active-tab');
      skillsSection.classList.add('active-link')
  }
  
  function openExperienceTab() {
      if (skillsTab.classList.contains('active-tab')) {
          skillsTab.classList.remove('active-tab');
          skillsSection.classList.remove('active-link');
      } else if (educationTab.classList.contains('active-tab')) {
          educationTab.classList.remove('active-tab');
          educationSection.classList.remove('active-link');
      }
  
      experienceTab.classList.add('active-tab');
      experienceSection.classList.add('active-link')
  }
  
  
  // ===== Portfolio Section ===== //
  // carousel contants
  const carouselCards = document.querySelector('.carousel-cards');
  const carouselButtons = document.querySelectorAll('.carousel-btn');
  const numberOfCards = document.querySelectorAll('.car-card').length;
  
  // tracking where user is in the carousel
  let imageIndex = 1;
  let translateX = 0;
  let totalWidth = screen.width;
  
  carouselButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        if (event.target.id === 'previous') {
          if (imageIndex !== 1) {
            imageIndex--;
            translateX += totalWidth;
          }
        } else {
          if (imageIndex !== numberOfCards) {
            imageIndex++;
            translateX -= totalWidth;
          }
        }
        
        carouselCards.style.transform = `translateX(${translateX}px)`;
      });
    });