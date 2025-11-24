import ScrollVelocity from "../animations/ScrollVelocity";

const ScrollVelocitySection = () => {
  const textsArr = ["React Bits", "Scroll Down"];

  return (
    <div className="h-[600px] py-20">
      <div className="-rotate-4 origin-center bg-amber-200 py-6">
        <ScrollVelocity
          texts={textsArr}
          className="custom-scroll-text"
          velocity={35}
          displayInline
          direction="right"
        />
      </div>
      <div className="rotate-6 origin-center bg-black/20 backdrop-blur-sm text-white py-6">
        <ScrollVelocity
          texts={textsArr}
          className="custom-scroll-text"
          velocity={35}
          displayInline
          direction="left"
        />
      </div>
    </div>
  );
};

export default ScrollVelocitySection;
