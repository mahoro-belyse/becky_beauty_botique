import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfServicePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-12">
        <h1 className="text-4xl font-bold text-center text-pink-700">
          Terms of Service
        </h1>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 space-y-6 text-base leading-relaxed">
        <p>
          By using our website or purchasing from Becky Beauty Boutique, you
          agree to follow these terms. All content and products are owned by us
          and cannot be copied without permission.
        </p>
        <p>
          Orders are processed within 24–48 hours. We reserve the right to
          cancel or refuse any order at any time for any reason.
        </p>
        <p>
          Prices, policies, and products may change without notice. You are
          responsible for checking our site for updates.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
