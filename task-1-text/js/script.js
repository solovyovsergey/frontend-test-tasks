document.addEventListener('DOMContentLoaded', () => {
  // Генерация оглавления (ToC)
  const tocList = document.getElementById('js-toc');
  const titles = document.querySelectorAll('.article-page__title');

  if (tocList && titles.length > 0) {
    const fragment = document.createDocumentFragment();

    titles.forEach((title, index) => {
      if (!title.id) {
        title.id = `section-${index + 1}`;
      }

      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = `#${title.id}`;
      a.textContent = title.textContent;

      li.appendChild(a);
      fragment.appendChild(li);
    });

    tocList.appendChild(fragment);
  }

  // Оптимизированная кнопка "Наверх" через IntersectionObserver
  const scrollTopBtn = document.getElementById('js-scroll-top');
  const firstTitle = document.querySelector('.article-page__main-title');

  if (scrollTopBtn && firstTitle) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Если главный заголовок скрылся из виду — показываем кнопку
          if (!entry.isIntersecting) {
            scrollTopBtn.classList.add('scroll-top-btn--show');
          } else {
            scrollTopBtn.classList.remove('scroll-top-btn--show');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(firstTitle);

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
