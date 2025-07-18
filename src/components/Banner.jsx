import { useEffect, useState } from 'react';

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background image with clip-path for slanted bottom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/banner.jpg')`,
          transform: `translateY(${offsetY * 0.5}px)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

      {/* Triangle shape on bottom right */}
      <div
        className="absolute bottom-0 right-0 z-20"
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#ffff', // Sama dengan background di bawah banner (gray-100)
          clipPath: 'polygon(100% 100%, 100% 0%, 0% 100%)',
        }}
      ></div>

      {/* Text with slower parallax */}
      <div
        className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Ideas</h1>
        <p className="text-lg md:text-xl mt-2 drop-shadow-md">
          Where all our great things begin
        </p>
      </div>
    </div>
  );
};

export default Banner;
