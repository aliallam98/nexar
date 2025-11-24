import ImageComparisonSlider from "../animations/ImageComparisonSlider";

const ImageComparisonSection = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <ImageComparisonSlider
          afterImage="/image.after.webp"
          beforeImage="/image.before.jfif"
          sectionTitle={"Vibrant Headphone Choices"}
          applyFilters={false}
          beforeTitle="Gold Tone"
          afterTitle="Crimson Shadow"
          beforeSubtitle="Flow Harmony"
          afterSubtitle="Flow Harmony"
        />
      </div>
    </section>
  );
};

export default ImageComparisonSection;
