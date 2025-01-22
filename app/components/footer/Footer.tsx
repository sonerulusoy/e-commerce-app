import Link from "next/link";
import Container from "../Container";
import { Redressed, Roboto } from "next/font/google";
import FooterList from "./FooterList";
import { MdFacebook, MdOutlineFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Footer = () => {
  return (
    <footer
      className={`bg-gray-100 text-gray-600 pt-16 pb-8 ${roboto.className}`}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-800">About Us</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Find your next favorite book. We offer a wide selection of genres,
              knowledgeable staff recommendations, and a welcoming space to
              explore the world of literature.
            </p>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} ChapterOne. All rights reserved.
            </p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <FooterList>
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Customer Service
              </h3>
              <Link
                href="/contact"
                className="hover:underline block mb-2 text-sm"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:underline block mb-2 text-sm"
              >
                Shipping Policy
              </Link>
              <Link
                href="/returns"
                className="hover:underline block mb-2 text-sm"
              >
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="hover:underline block text-sm">
                FAQs
              </Link>
            </FooterList>
          </div>
          <div className="col-span-1 md:col-span-1">
            <FooterList>
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com"
                  className="hover:text-blue-600"
                  target="_blank"

                >
                  {" "}
                  {/* Facebook ana sayfasına yönlendirir */}
                  <MdOutlineFacebook size={24} />
                </Link>
                <Link
                  href="https://www.twitter.com"
                  className="hover:text-blue-400"
                  target="_blank"

                >
                  {" "}
                  {/* Twitter ana sayfasına yönlendirir */}
                  <AiOutlineTwitter size={24} />
                </Link>
                <Link
                  href="https://www.instagram.com"
                  className="hover:text-pink-600"
                  target="_blank"

                >
                  {" "}
                  {/* Instagram ana sayfasına yönlendirir */}
                  <AiOutlineInstagram size={24} />
                </Link>
                <Link
                  href="https://www.youtube.com"
                  className="hover:text-red-600"
                  target="_blank"
                >
                  {" "}
                  {/* YouTube ana sayfasına yönlendirir */}
                  <AiOutlineYoutube size={24} />
                </Link>
              </div>
            </FooterList>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
