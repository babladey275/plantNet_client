import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/3YNhmT5W/409089784-3ec6b4c8-f0bd-44e5-929e-3000b28e891c-removebg-preview.png",

      title: "Bring Nature Indoors",
      description: "Enhance your home with lush, air-purifying houseplants.",
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/fVQFBgTY/409106597-c30fa0f2-f6f5-49ae-831d-db6f2e101156-removebg-preview.png",

      title: "Office Greenery",
      description:
        "Boost productivity and create a refreshing workspace with vibrant office plants.",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/ym99nkTK/412272093-db9a520e-7a56-4a75-b70e-fbd9c1aa8460-removebg-preview.png",
      title: "Thriving in Every Space",
      description:
        "Find resilient plants that adapt beautifully to any environment.",
    },
  ];

  return (
    <div className="w-full bg-[#e5ebe8]">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={7000}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16"
          >
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <p className="text-xl text-gray-700">{slide.description}</p>
              <h2 className="text-3xl md:text-5xl font-bold italic text-black mt-2 mb-8 md:mb-12">
                {slide.title}
              </h2>
              <a
                href="#plants"
                className="px-6 py-3 border bg-white hover:border-lime-500 text-black font-semibold hover:bg-lime-500 hover:text-white transition"
              >
                Shop Now
              </a>
            </div>

            {/* Image */}
            <div className="md:w-1/2 group flex justify-center md:justify-end">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-xs md:max-w-md group-hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
