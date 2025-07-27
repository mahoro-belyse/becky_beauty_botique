import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-12">
        <h1 className="text-4xl font-bold text-center text-pink-700">
          Cookies Policy
        </h1>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 space-y-6 text-base leading-relaxed">
        <p>
          Our website uses cookies to personalize your experience and help us
          understand how visitors use our site. A cookie is a small file placed
          on your device that helps remember your preferences.
        </p>
        <p>
          By using our site, you agree to our use of cookies. You can choose to
          disable cookies in your browser settings, but this may affect your
          experience.
        </p>
        <p>
          We use cookies to remember items in your cart, show you relevant
          products, and analyze site performance using tools like Google
          Analytics.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicyPage;
