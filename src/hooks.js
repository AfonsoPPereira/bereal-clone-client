import { useEffect } from 'react';

export const useLazyLoading = (e) => {
    useEffect(() => {
        const lazyImages = [].slice.call(
            document.querySelectorAll('.lazy-loaded-image.lazy')
        );
        const lazyImageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            }
        );
        lazyImages.forEach((lazyImage) => lazyImageObserver.observe(lazyImage));
    });
};
