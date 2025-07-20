 // Initialize syntax highlighting
    document.addEventListener('DOMContentLoaded', (event) => {
      hljs.highlightAll();
      
      // Theme toggle functionality
      const themeToggle = document.getElementById('themeToggle');
      const html = document.documentElement;
      
      // Check saved theme preference
      const savedTheme = localStorage.getItem('theme') || 'dark';
      html.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
      
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
      
      function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' 
          ? '<i class="fas fa-moon"></i>' 
          : '<i class="fas fa-sun"></i>';
      }

      // Mobile menu toggle
      const menuToggle = document.getElementById('menuToggle');
      const navbarMenu = document.getElementById('navbarMenu');
      
      menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
          navbarMenu.classList.remove('active');
        });
      });

      // Copy button functionality
      document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const codeBlock = this.parentElement.nextElementSibling;
          const codeText = codeBlock.textContent;
          
          navigator.clipboard.writeText(codeText).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
              this.innerHTML = originalText;
            }, 2000);
          });
        });
      });

      // Search functionality
      document.getElementById('codeSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.code-file').forEach(file => {
          const fileName = file.querySelector('.file-name').textContent.toLowerCase();
          file.style.display = fileName.includes(searchTerm) ? 'block' : 'none';
        });
      });
    });