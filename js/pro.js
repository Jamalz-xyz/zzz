document.addEventListener('DOMContentLoaded', function() {
      // Tab switching functionality
      const tabs = document.querySelectorAll('.category-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs and content
          document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding content
          this.classList.add('active');
          const category = this.getAttribute('data-category');
          document.getElementById(`${category}-content`).classList.add('active');
        });
      });
      
      // Search functionality
      const searchInput = document.getElementById('projectSearch');
      const caseCards = document.querySelectorAll('#case-content .project-card');
      const projectCards = document.querySelectorAll('#projects-content .project-card');
      const noCaseResults = document.getElementById('noCaseResults');
      const noProjectResults = document.getElementById('noProjectResults');
      
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let hasCaseResults = false;
        let hasProjectResults = false;
        
        // Search in cases
        caseCards.forEach(card => {
          const searchData = card.getAttribute('data-search').toLowerCase();
          const isMatch = searchTerm === '' || searchData.includes(searchTerm);
          
          if (isMatch) {
            card.style.display = '';
            card.classList.add('highlight');
            hasCaseResults = true;
          } else {
            card.style.display = 'none';
            card.classList.remove('highlight');
          }
        });
        
        // Search in projects
        projectCards.forEach(card => {
          const searchData = card.getAttribute('data-search').toLowerCase();
          const isMatch = searchTerm === '' || searchData.includes(searchTerm);
          
          if (isMatch) {
            card.style.display = '';
            card.classList.add('highlight');
            hasProjectResults = true;
          } else {
            card.style.display = 'none';
            card.classList.remove('highlight');
          }
        });
        
        // If search is empty, remove all highlights
        if (searchTerm === '') {
          document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('highlight');
          });
        }
        
        noCaseResults.style.display = hasCaseResults || searchTerm === '' ? 'none' : 'block';
        noProjectResults.style.display = hasProjectResults || searchTerm === '' ? 'none' : 'block';
      });
      
      // Theme toggle functionality
      const themeToggle = document.getElementById('themeToggle');
      themeToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      });
      
      // Mobile menu toggle
      const menuToggle = document.getElementById('menuToggle');
      const navbarMenu = document.getElementById('navbarMenu');
      menuToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
      });
    });