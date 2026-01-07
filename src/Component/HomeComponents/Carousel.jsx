import React, { useEffect, useState } from 'react';

const Carousel = () => {
    const slides = [
        {
            id: 1,
            date: "March 22, 2026",
            title: "Urban Gardening Workshop",
            desc: "Discover how to create thriving gardens in small spaces. Perfect for apartment dwellers and balcony gardeners.",
            image: "https://i.ibb.co.com/6RtMM7D1/photo-1756716518925-8af9e272da86.jpg"
        },
        {
            id: 2,
            date: "April 5, 2026",
            title: "Composting & Sustainability Seminar",
            desc: "Learn the art of composting and sustainable gardening practices.",
            image: "https://i.ibb.co.com/SDjSV9hr/photo-1486484290742-0ce4eb743a34.jpg"
        },
        {
            id: 3,
            date: "March 15, 2026",
            title: "Spring Gardening Festival 2026",
            desc: "Join the biggest gardening event of the year.",
            image: "https://i.ibb.co.com/fYr9N5Kt/photo-1699202538450-f1b6d89aa19f.jpg"
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative h-130 w-full overflow-hidden">

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
          ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
                >
                    <img
                        src={slide.image}
                        className="w-full h-full object-cover"
                        alt={slide.title}
                    />

                    {/* Overlay */}
                    <div className="absolute  inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute  left-[4.16%] top-1/2 -translate-y-1/2 text-white max-w-xl">
                        <span className="inline-block mb-4 bg-green-600 px-4 py-1 rounded-full text-sm">
                            {slide.date}
                        </span>

                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                            {slide.title}
                        </h2>

                        <p className="text-white/80 mb-6">
                            {slide.desc}
                        </p>

                        <button className="btn bg-green-600 hover:bg-green-700 border-none text-white">
                            Learn More →
                        </button>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300
            ${activeIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                    />
                ))}
            </div>

        </div>
    );

};

export default Carousel;