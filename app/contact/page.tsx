"use client";
import Container from "../components/Container";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import {
  MdOutlineEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
} from "react-icons/md"; // react-icons kütüphanesinden ikonlar
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import Heading from "@/app/components/Heading"; // Ayrı bir başlık bileşeni oluşturduğumuzu varsayıyoruz

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log("Form Gönderildi", data); // Hata ayıklama için eklendi
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully!"); // Başarı mesajı
        reset();
      } else {
        const errorData = await response.json();
        console.error("Failed to send message:", errorData);
        toast.error("Failed to send message."); // Hata mesajı
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message."); // Hata mesajı
    }
  };

  return (
    <Container>
      <div className="py-10">
        <Heading title="Contact Us" />
        <p className="mb-8 text-gray-600">
          We&apos;re here to help! If you have any questions, concerns, or
          feedback, please don&apos;t hesitate to get in touch with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start mb-4">
              <MdAccessTime className="mr-2 text-gray-500" size={20} />
              <div>
                <Heading title="Customer Service Hours" size="text-md" />
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 5:00 PM (EST)
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <MdOutlineEmail className="mr-2 text-gray-500" size={20} />
              <div>
                <Heading title="Email" size="text-md" />
                <a
                  href="mailto:support@chapterone.com"
                  className="text-blue-500 hover:underline text-gray-600"
                >
                  support@chapterone.com 
                </a>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <MdPhone className="mr-2 text-gray-500" size={20} />
              <div>
                <Heading title="Phone" size="text-md" />
                <a
                  href="tel:+1-555-555-5555"
                  className="text-blue-500 hover:underline text-gray-600"
                >
                  +1-555-555-5555
                </a>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <MdLocationOn className="mr-2 text-gray-500" size={20} />
              <div>
                <Heading title="Mailing Address" size="text-md" />
                <p className="text-gray-600">
                  ChapterOne
                  <br />
                  123 Main Street
                  <br />
                  Anytown, USA 12345
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Heading title="Social Media" size="text-md" />
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://www.facebook.com"
                  className="hover:text-blue-600"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <AiOutlineFacebook size={24} />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="hover:text-blue-400"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <AiOutlineTwitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="hover:text-pink-600"
                  aira-label="Instagram"
                  target="_blank"
                >
                  <AiOutlineInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave your message here..."
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
