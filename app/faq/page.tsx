import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 shadow-inner">
        <h1 className="text-5xl font-extrabold text-center text-pink-700 drop-shadow-md">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700 max-w-2xl mx-auto px-4">
          Find quick answers to common questions about our products, shipping,
          returns, and more.
        </p>
      </div>

      {/* FAQ Content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Question 1 */}
        <section>
          <h2 className="text-xl font-semibold text-pink-600 mb-2">
            📦 How long does shipping take?
          </h2>
          <p className="text-base text-gray-700">
            Shipping within Kigali takes 1 day. Other locations in Rwanda take
            1–3 business days. International delivery takes 5–10 business days.
          </p>
        </section>

        {/* Question 2 */}
        <section>
          <h2 className="text-xl font-semibold text-pink-600 mb-2">
            🔁 Can I return a product?
          </h2>
          <p className="text-base text-gray-700">
            Yes, but only if you report the issue within 3 days of receiving
            your order. After that, we cannot accept returns.
          </p>
        </section>

        {/* Question 3 */}
        <section>
          <h2 className="text-xl font-semibold text-pink-600 mb-2">
            💄 Do you help with shade matching?
          </h2>
          <p className="text-base text-gray-700">
            Absolutely! Visit our{" "}
            <a href="/FindYourFit" className="text-pink-600 underline">
              Shade Finder
            </a>{" "}
            page or contact us directly for personalized help.
          </p>
        </section>

        {/* Question 4 */}
        <section>
          <h2 className="text-xl font-semibold text-pink-600 mb-2">
            📬 Do you deliver outside Rwanda?
          </h2>
          <p className="text-base text-gray-700">
            Yes! We offer international shipping. Shipping fees and time depend
            on your location.
          </p>
        </section>

        {/* Contact */}
        <section className="text-center mt-10">
          <p className="text-lg font-semibold text-gray-800">
            Still need help?
          </p>
          <a
            href="/contact"
            className="inline-block mt-2 px-6 py-3 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition"
          >
            Contact Us
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
