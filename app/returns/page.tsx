import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-100 to-pink-100 py-12 shadow-inner">
        <h1 className="text-5xl font-extrabold text-center text-pink-700 drop-shadow-md">
          Returns & Exchanges
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700 max-w-2xl mx-auto px-4">
          We want you to love your order — please read our return and exchange
          policy carefully.
        </p>
      </div>

      {/* Content Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Return Policy */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            📦 Return Policy
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            All sales are final after <strong>3 days</strong> from the date the
            order was delivered. We do not accept any returns or complaints made
            beyond this period.
          </p>
          <p className="text-base mt-2 text-gray-700">
            If you receive a damaged or incorrect product, please contact us
            within the 3-day window to initiate a return or exchange.
          </p>
        </section>

        {/* What Can't Be Returned */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            🚫 Non-Returnable Items
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Used beauty or personal care products</li>
            <li>Products without original packaging</li>
            <li>Items not reported within 3 days of delivery</li>
          </ul>
        </section>

        {/* How to Request a Return */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            📝 How to Request a Return
          </h2>
          <p className="text-base text-gray-700">
            To request a return, contact our support team by email at{" "}
            <a
              href="mailto:beckybeautyboutique@gmail.com"
              className="text-pink-600 underline"
            >
              beckybeautyboutique@gmail.com
            </a>
            with your order number, photo evidence (if needed), and a brief
            explanation.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnsPage;
