document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.progress-bar');

  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function checkProgressBars() {
      progressBars.forEach(bar => {
          if (isInViewport(bar)) {
              const width = bar.getAttribute('data-width');
              bar.style.width = width + '%';
              bar.style.opacity = 1;
          }
      });
  }

  window.addEventListener('scroll', checkProgressBars);
  window.addEventListener('resize', checkProgressBars);

  // Ініціалізація початкового стану
  progressBars.forEach(bar => {
      bar.classList.add('hidden');
  });
});




document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.progress-bar');

  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function animateNumber(element, start, end, duration) {
      let startTime = null;

      function animate(currentTime) {
          if (!startTime) startTime = currentTime;
          const progress = currentTime - startTime;
          const currentNumber = Math.min(Math.easeInOutQuad(progress, start, end - start, duration), end);
          element.textContent = Math.floor(currentNumber)+ 1 + ' тыс км';

          if (progress < duration) {
              requestAnimationFrame(animate);
          }
      }

      requestAnimationFrame(animate);
  }

  Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  };

  function checkProgressBars() {
      progressBars.forEach(bar => {
          if (isInViewport(bar) && !bar.classList.contains('animated')) {
              const width = bar.getAttribute('data-width');
              const target = parseInt(bar.getAttribute('data-target'), 10);
              bar.style.width = width + 'px';
              bar.style.opacity = 1;
              bar.classList.add('animated');
              animateNumber(bar, 0, target, 2000);
          }
      });
  }

  window.addEventListener('scroll', checkProgressBars);
  window.addEventListener('resize', checkProgressBars);

  // Ініціалізація початкового стану
  progressBars.forEach(bar => {
      bar.classList.add('hidden');
  });
});

