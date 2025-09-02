import FullScreenSlider from '@/components/Slider';

const slides = [
  {
    src: '/assets/images/1.jpg',
  },
  {
    src: '/assets/images/2.jpg',
  },
  {
    src: '/assets/images/3.jpg',
  },
  {
    src: '/assets/images/4.jpg',
  },
  {
    src: '/assets/images/5.jpg',
  },
  {
    src: '/assets/images/6.jpg',
  },
];

export default function Home() {
  return (
    <>
      <FullScreenSlider
        slides={slides}
        autoplayDelay={4000}
        showArrows={false}
        showDots={false}
      />
    </>
  );
}
