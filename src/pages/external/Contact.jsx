import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Img from "../../assets/contactImg.png";
import ImgMobile2 from "../../assets/contact_hero1.png";
import Download from "../../components/Download";
import ThankYouCard from "@/components/cards/ThankYouCard";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_camprhh",
        "template_si0uxzp",
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_number: data.user_number,
          user_address: data.user_address,
          message: data.message,
        },
        "HYJ16_wtBbAKW1zEE"
      );
      setIsModalVisible(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an issue sending your message. Please try again later.");
    }
  };

  return (
    <div className="bg-[#FFFDE4] overflow-x-hidden">
      <div>
        <div style={{ height: "300px" }}>
          <img
            className="hidden md:block"
            src={Img}
            alt=""
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <img
            className="md:hidden"
            src={ImgMobile2}
            alt=""
            style={{ height: "100%", width: "100%", objectFit: "100%" }}
          />
        </div>
        <div className="lg:flex items-center justify-between gap-20 space-y-10 lg:space-y-0 lg:pt-28 lg:pb-48 m-auto max-w-[85%] w-[100%]">
          <div className="w-full lg:w-[30%] space-y-5 pt-5">
            <h3 className="text-[24px] font-semibold">
              Get In Touch With Us For More Information
            </h3>
            <p>
              <span className="font-semibold">Phone Numbers</span>
              <br />
              +2347039845638 <br />
              +2349019269787
            </p>
            <p>
              <span className="font-semibold">Email Address</span>
              <br />
              support@pausepoint.net
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-[70%] border-4 border-black space-y-10 rounded-[20px] text-center mb-5 px-10 py-10"
          >
            <h3 className="text-[32px] font-semibold">Book A Demo</h3>
            <input
              type="text"
              className={`w-full p-2 rounded-[10px] border ${errors.user_name ?  "border-red-500" : "border-[#00000099]"} placeholder:text-[#00000080]`}
              placeholder="Full Name"
              {...register("user_name", { required: "Full Name is required" })}
            />
            {errors.user_name && <p className="text-red-500">{errors.user_name.message}</p>}

            <input
              type="email"
              className={`w-full p-2 rounded-[10px] border ${errors.user_email ? "border-red-500" : "border-[#00000099]"} placeholder:text-[#00000080]`}
              placeholder="Email Address"
              {...register("user_email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.user_email && <p className="text-red-500">{errors.user_email.message}</p>}

            <input
              type="text"
              className={`w-full p-2 rounded-[10px] border ${errors.user_number ? "border-red-500" : "border-[#00000099]"} placeholder:text-[#00000080]`}
              placeholder="Phone Number"
              {...register("user_number", { required: "Phone Number is required" })}
            />
            {errors.user_number && <p className="text-red-500">{errors.user_number.message}</p>}

            <input
              type="text"
              className={`w-full p-2 rounded-[10px] border ${errors.user_address ? "border-red-500" : "border-[#00000099]"} placeholder:text-[#00000080]`}
              placeholder="Address"
              {...register("user_address")}
            />

            <textarea
              cols="30"
              rows="5"
              className={`w-full p-2 rounded-[10px] border ${errors.message ? "border-red-500" : "border-[#00000099]"} placeholder:text-[#00000080] min-h-[220px] max-h-[293px]`}
              placeholder="Type your Message"
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}

            <button type="submit" disabled={isSubmitting} className="seeMoreBtn">
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
        {isModalVisible && <ThankYouCard closeModal={() => setIsModalVisible(false)} />}
        <Download />
      </div>
    </div>
  );
};

export default Contact;
