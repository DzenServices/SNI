'use client';

import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type Slide = { src: string; title?: string; subtitle?: string };
type Props = {
  slides: Slide[];
  autoplayDelay?: number; // ms
  showArrows?: boolean;
  showDots?: boolean;
};

const FullScreenSlider: React.FC<Props> = ({
  slides,
  autoplayDelay = 4000,
  showArrows = true,
  showDots = true,
}) => {
  // 1) Создаём плагин один раз
  const autoplay = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // 2) Инициализируем Embla с loop
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  // 3) Стартуем автоплей после mount
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
    autoplay.current.play(); // <- ключевая строка
  }, [emblaApi, onSelect]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Управление паузой при наведении (устойчиво к StrictMode) */}
      <div
        className="size-full overflow-hidden"
        ref={emblaRef}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="relative h-screen w-full flex-[0_0_100%]">
              <div className="absolute inset-0">
                <Image
                  src={s.src}
                  alt={s.title ?? `Slide ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {(s.title || s.subtitle) && (
                <div className="relative z-10 flex h-full items-center justify-center">
                  <div className="mx-6 max-w-3xl text-center text-white">
                    {s.title && (
                      <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                        {s.title}
                      </h2>
                    )}
                    {s.subtitle && (
                      <p className="text-lg opacity-90 sm:text-xl">
                        {s.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            aria-label="Prev"
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 px-3 py-2 backdrop-blur transition hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 px-3 py-2 backdrop-blur transition hover:bg-white"
          >
            ›
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`size-2.5 rounded-full transition ${
                i === selectedIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FullScreenSlider;
