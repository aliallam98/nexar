export const NewsletterHeroSection = () => {
  return (
    <section className="py-10 md:py-20" id="newsletter">
      <div className="relative container mx-auto px-5 md:px-10">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
          Subscribe to Our Newsletter
          <br />
          for Design Insights
        </h1>
        <p className="text-center text-xl lg:text-2xl mt-10 text-gray-500">
          Be the first to discover trends, inspirations, and special offers as
          <br />
          we bring the world of design directly to your inbox
        </p>
        <div className="mx-auto border flex max-sm:flex-col items-center shadow-md mt-10 md:mt-0 md:absolute bg-white md:-bottom-[120px] md:left-1/2 md:-translate-x-1/2 p-2 rounded-md md:w-3/4 lg:w-1/2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-4 w-full outline-none placeholder-gray-500"
          />
          <button className="bg-black px-12 py-4 text-white rounded-md max-sm:w-full hover:bg-gray-800 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
