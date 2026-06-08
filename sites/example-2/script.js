document.querySelectorAll('.specimen-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(12px)';
  item.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.2 });

  observer.observe(item);
});
