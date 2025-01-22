
import Container from "../components/Container";
import Heading from "@/app/components/Heading";

const ShippingPolicy = () => {
  return (
    <Container>
      <div className="py-10">
      <Heading title="Shipping Policy" />
        <p className="mb-4 text-gray-600">
          Thank you for choosing ChapterOne! We&apos;re committed to delivering your
          favorite books to your doorstep as efficiently as possible. Please
          review our shipping policy below:
        </p>

        <h2 className="text-lg font-semibold mb-2">Shipping Locations:</h2>
        <p className="mb-4 text-gray-600">
          We currently ship to addresses within the United States and select
          international locations. To confirm if we ship to your country, please
          proceed to checkout and enter your address.
        </p>

        <h2 className="text-lg font-semibold mb-2">Shipping Methods & Costs:</h2>
        <ul className="list-disc list-inside mb-4 text-gray-600">
          <li>Standard Shipping: $4.99 (5-7 business days)</li>
          <li>Expedited Shipping: $9.99 (2-3 business days)</li>
          <li>
            International Shipping: Rates vary based on destination and will be
            calculated at checkout.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">Processing Time:</h2>
        <p className="mb-4 text-gray-600">
          Orders are typically processed within 1-2 business days. Orders placed
          on weekends or holidays will be processed the following business day.
        </p>

        <h2 className="text-lg font-semibold mb-2">Tracking Your Order:</h2>
        <p className="mb-4 text-gray-600">
          Once your order has shipped, you will receive a shipping confirmation
          email with a tracking number. You can track your order&apos;s progress by
          clicking on the tracking link provided in the email.
        </p>

        <h2 className="text-lg font-semibold mb-2">Shipping Delays:</h2>
        <p className="mb-4 text-gray-600">
          While we strive to deliver your order within the estimated timeframe,
          unforeseen circumstances such as weather, carrier delays, or high order
          volumes may cause delays. We appreciate your patience and understanding
          in such situations.
        </p>

        <h2 className="text-lg font-semibold mb-2">Lost or Damaged Packages:</h2>
        <p className="mb-4 text-gray-600">
          If your package is lost or arrives damaged, please contact our
          customer support team at{" "}
          <a
            href="mailto:support@chapterone.com"
            className="text-blue-500 hover:underline"
          >
            support@chapterone.com
          </a>{" "}
          within 7 days of the estimated delivery date. We will work with the
          carrier to resolve the issue as quickly as possible.
        </p>

        <h2 className="text-lg font-semibold mb-2">International Shipping:</h2>
        <p className="text-gray-600">
          Please note that international orders may be subject to customs duties,
          taxes, or import fees levied by the destination country. These charges
          are the responsibility of the recipient and are not included in the
          shipping cost.
        </p>
      </div>
    </Container>
  );
};

export default ShippingPolicy;