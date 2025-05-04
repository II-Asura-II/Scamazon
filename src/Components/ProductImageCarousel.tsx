import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProductImageCarousel = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [currentFocus, setCurrentFocus] = useState(1);
  const totalImages = images.length || 0;

  const scrollCarousel = (direction: "next" | "previous") => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const itemWidth = (carousel.firstChild as HTMLElement).offsetWidth;

    if (direction === "next") {
      if (currentFocus === totalImages) {
        carousel.scrollBy({ left: -itemWidth * totalImages, behavior: "smooth" });
        setCurrentFocus(1);
      } else {
        carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
        setCurrentFocus(currentFocus + 1);
      }
    } else {
      if (currentFocus === 1) {
        carousel.scrollBy({ left: itemWidth * totalImages, behavior: "smooth" });
        setCurrentFocus(totalImages);
      } else {
        carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
        setCurrentFocus(currentFocus - 1);
      }
    }
  };

  const next = () => scrollCarousel("next");
  const previous = () => scrollCarousel("previous");

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  })

  return (
    <div className="p-4">
      <div className="flex w-fit mx-auto flex-col items-center">
        <div className="flex">
          <button onClick={previous}>
            <ChevronLeft size={40} />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto no-bar mx-auto w-100 items-center">
            {images.map((image, i) => (
              <div
                className="flex justify-center items-center min-w-100 max-w-100 h-70 p-1"
                key={i}>
                <img src={image} alt={alt} className="h-70" />
              </div>
            ))}
          </div>
          <button onClick={next}>
            <ChevronRight size={40} />
          </button>
        </div>
        <div className="flex">
          {Array.from({ length: totalImages || 0 }).map((_, i) => (
            <Dot
              size={40}
              key={i}
              color={currentFocus === i + 1 ? "black" : "gray"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
