"use client";


import Container from "../components/Container";
import Heading from "@/app/components/Heading";
import Link from "next/link";

const FAQ = () => {
  return (
    <Container>
      <div className="py-10">
        <Heading title="Frequently Asked Questions" size="text-2xl" />

        <div className="mb-4">
          <Heading title="What is ChapterOne?" size="text-lg" />
          <p className="text-gray-600">
            ChapterOne is an online bookstore dedicated to providing a vast
            selection of books across various genres. We aim to connect readers
            with their next favorite book and foster a community of book lovers.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="How do I place an order?" size="text-lg" />
          <p className="text-gray-600">
            Browse our catalog, add items to your cart, and proceed to checkout.
            Follow the on-screen instructions to enter your shipping and payment
            information.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="How long will it take to receive my order?" size="text-lg" />
          <p className="text-gray-600">
            Standard shipping usually takes 5-7 business days. Expedited shipping
            options are available at checkout.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="Do you offer international shipping?" size="text-lg" />
          <p className="text-gray-600">
            Yes, we ship to select countries. Shipping rates and delivery times
            vary based on the destination.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="What is your return policy?" size="text-lg" />
          <p className="text-gray-600">
            We offer a 30-day return policy for items in their original
            condition. Please see our{" "}
            <Link href="/returns" className="text-blue-500 hover:underline">
              Returns & Exchanges
            </Link>{" "}
            page for more details.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="How can I track my order?" size="text-lg" />
          <p className="text-gray-600">
            Once your order has shipped, you will receive a tracking number via
            email.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="What payment methods do you accept?" size="text-lg" />
          <p className="text-gray-600">
            We accept major credit cards (Visa, Mastercard, American Express),
            PayPal, and ChapterOne gift cards.
          </p>
        </div>

        <div className="mb-4">
          <Heading title="How do I contact customer support?" size="text-lg" />
          <p className="text-gray-600">
            You can reach us via email at{" "}
            <a href="mailto:support@chapterone.com" className="text-blue-500 hover:underline">
              support@chapterone.com
            </a>
            , or by phone at{" "}
            <a href="tel:+1-555-555-5555" className="text-blue-500 hover:underline">
              +1-555-555-5555
            </a>
            .
          </p>
        </div>

        <div className="mb-4">
          <Heading title="Do you offer gift cards?" size="text-lg" />
          <p className="text-gray-600">
            Yes, we offer digital gift cards that can be purchased online and
            redeemed for any item on our website.
          </p>
        </div>

        <div>
          <Heading title="Can I suggest a book to be added to your catalog?" size="text-lg" />
          <p className="text-gray-600">
            Absolutely! We always welcome book suggestions. Please email us at{" "}
            <a href="mailto:suggestions@chapterone.com" className="text-blue-500 hover:underline">
              suggestions@chapterone.com
            </a>{" "}
            with the title and author.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default FAQ;