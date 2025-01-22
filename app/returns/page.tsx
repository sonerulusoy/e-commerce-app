import Container from "../components/Container";
import Heading from "@/app/components/Heading";

const ReturnsAndExchanges = () => {
  return (
    <Container>
      <div className="py-10">
        <Heading title="Returns & Exchanges" />
        <p className="mb-4 text-gray-600">
          We want you to be completely satisfied with your purchase from
          ChapterOne. If you&apos;re not happy with your order, we offer returns
          and exchanges within 30 days of delivery, subject to the terms and
          conditions outlined below.
        </p>

        <h2 className="text-lg font-semibold mb-2">Eligibility:</h2>
        <ul className="list-disc list-inside mb-4 text-gray-600">
          <li>
            Items must be returned in their original condition, unread, and with
            all original packaging.
          </li>
          <li>
            Returns must be initiated within 30 days of the delivery date.
          </li>
          <li>
            Proof of purchase (order confirmation or receipt) is required for
            all returns and exchanges.
          </li>
          <li>
            Digital products (eBooks, audiobooks) are not eligible for return or
            exchange.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          How to Initiate a Return or Exchange:
        </h2>
        <ol className="list-decimal list-inside mb-4 text-gray-600">
          <li>
            Contact our customer support team at{" "}
            <a
              href="mailto:support@chapterone.com"
              className="text-blue-500 hover:underline"
            >
              support@chapterone.com
            </a>{" "}
            to request a Return Authorization (RA) number.
          </li>
          <li>
            Pack the item securely in its original packaging, including all
            accessories and documentation.
          </li>
          <li>Clearly write the RA number on the outside of the package.</li>
          <li>
            Ship the package to the following address:
            <br />
            ChapterOne Returns
            <br />
            123 Main Street
            <br />
            Anytown, USA 12345
          </li>
        </ol>

        <h2 className="text-lg font-semibold mb-2">Refunds:</h2>
        <p className="mb-4 text-gray-600">
          Once your return is received and inspected, we will process your
          refund within 5-7 business days. Refunds will be issued to the
          original payment method. Shipping costs are non-refundable.
        </p>

        <h2 className="text-lg font-semibold mb-2">Exchanges:</h2>
        <p className="mb-4 text-gray-600">
          If you would like to exchange an item for a different title or format,
          please indicate your preference when requesting your RA number. We
          will do our best to accommodate your request, subject to availability.
          Any price difference will be charged or refunded accordingly.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          Damaged or Defective Items:
        </h2>
        <p className="mb-4 text-gray-600">
          If you receive a damaged or defective item, please contact our
          customer support team within 7 days of delivery. We will provide a
          replacement or a full refund, including shipping costs.
        </p>

        <h2 className="text-lg font-semibold mb-2">Questions?</h2>
        <p className="text-gray-600">
          If you have any questions about our returns and exchanges policy,
          please don&apos;t hesitate to contact us at{" "}
          <a
            href="mailto:support@chapterone.com"
            className="text-blue-500 hover:underline"
          >
            support@chapterone.com
          </a>
          .
        </p>
      </div>
    </Container>
  );
};

export default ReturnsAndExchanges;
