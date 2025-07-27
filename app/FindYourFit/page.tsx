import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShadeFinderPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 shadow-inner">
        <h1 className="text-5xl font-extrabold text-center text-pink-700 drop-shadow-md">
          Shade Finder
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700 max-w-2xl mx-auto px-4">
          Not sure which shade is right for your skin tone? Use this guide to
          help find your perfect match in foundation, concealer, and more.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Step 1 */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            🎨 Understand Your Undertone
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            Are you warm, cool, or neutral? Look at the veins on your wrist —
            green veins mean warm, blue means cool, and a mix means neutral.
          </p>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            💡 Choose the Right Foundation Shade
          </h2>
          <p className="text-base text-gray-700">
            Select a shade that blends seamlessly into your jawline. We
            recommend swatching 2–3 shades and comparing them in natural light.
          </p>
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            💋 Lipstick & Blush Matching
          </h2>
          <p className="text-base text-gray-700">
            For warm skin tones, go for coral, peach, or bronze. For cool tones,
            try rose, berry, or mauve. Neutrals can wear almost any color!
          </p>
        </section>

        {/* CTA */}
        <section className="text-center mt-10">
          <p className="text-lg font-semibold text-gray-800">Still unsure?</p>
          <a
            href="/contact"
            className="inline-block mt-2 px-6 py-3 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition"
          >
            Contact Our Beauty Experts
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShadeFinderPage;
