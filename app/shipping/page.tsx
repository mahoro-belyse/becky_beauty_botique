import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShippingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 shadow-inner">
        <h1 className="text-5xl font-extrabold text-center text-pink-700 drop-shadow-md">
          Shipping Information
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700 max-w-2xl mx-auto px-4">
          Learn how we deliver beauty right to your doorstep — safely, quickly,
          and affordably.
        </p>
      </div>

      {/* Content Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Delivery Options */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            🚚 Delivery Options
          </h2>
          <ul className="space-y-2 text-base pl-5 list-disc">
            <li>
              <strong>Local Delivery (Kigali):</strong> Same Day
            </li>
            <li>
              <strong>National Courier:</strong> 1–3 Business Days
            </li>
            <li>
              <strong>International Shipping:</strong> 5–10 Business Days
            </li>
          </ul>
        </section>

        {/* Shipping Costs */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            💰 Shipping Costs
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            Shipping fees are calculated at checkout based on your delivery
            address and preferred shipping method.
          </p>
        </section>

        {/* Order Processing */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            🕒 Order Processing Time
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            Orders are processed within 24–48 hours (excluding weekends and
            holidays). You'll receive a confirmation once it's shipped.
          </p>
        </section>

        {/* Track Order */}
        <section>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">
            🔎 Track Your Order
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            A tracking number will be emailed or sent via SMS once your order
            ships. You can also track it in your account under{" "}
            <strong>Order Tracking</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPage;
