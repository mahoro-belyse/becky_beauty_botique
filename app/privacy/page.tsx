import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-12">
        <h1 className="text-4xl font-bold text-center text-pink-700">
          Privacy Policy
        </h1>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 space-y-6 text-base leading-relaxed">
        <p>
          We value your privacy. Any information you share with Becky Beauty
          Boutique (like name, email, or address) is used only for processing
          your orders and improving our services.
        </p>
        <p>
          We do not sell or share your personal data with third parties without
          your permission. Our website uses cookies to enhance your browsing
          experience.
        </p>
        <p>
          You can request to access, correct, or delete your data at any time by
          contacting us at{" "}
          <a
            href="mailto:beckybeautyboutique@gmail.com"
            className="text-pink-600 underline"
          >
            beckybeautyboutique@gmail.com
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
