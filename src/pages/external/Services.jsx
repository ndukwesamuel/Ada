import React from "react";
import "../../styles/accordion.css";
import d from "../../assets/images/Frame 48.svg";
import image1 from "../../assets/images/image1.jpeg";
import image2 from "../../assets/images/image2.jpeg";
import image3 from "../../assets/images/image3.jpeg";
import image4 from "../../assets/images/image4.jpeg";
import Accordion from "../../components/Accordion";
import Download from "../../components/Download";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <div className="service-con overflow-x-hidden">
      <header>
        <div className="" style={{ height: "309px" }}>
          <img
            src={d}
            alt=""
            className="img-fluid tire"
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
      </header>

      <section style={{ backgroundColor: "#FFFDE4" }} className="py-5">
        <main className="container-lg d-flex flex-column gap-5">
          <div className="d-flex flex-column gap-3">
            <h3 className="fs-2 fw-semibold pt-5 text-center">What We Offer</h3>
            <p className="offset-1 col-10 text-center fw-normal fs-5">
              Pause Point app offers a comprehensive suite of features to
              streamline and enhance the resident experience. These features
              encompass visitor management, community engagement, health
              information, and security services. Here are the main points
              listed below:
            </p>
          </div>

          <div className="container gap-5 d-flex justify-content-between flex-wrap">
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
            >
              <div className="col-10">
                <img
                  src={image1}
                  alt=""
                  style={{ borderRadius: "20px 20px 0 0" }}
                  className="img-fluid"
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgba(4, 151, 60, 0.40)",
                  width: "100%",
                  borderRadius: " 0 0 40px 40px",
                }}
                className="border border-dark border-3"
              >
                <div className="d-flex flex-column py-4 px-4 gap-3">
                  <h3 className="fs-2 fw-semibold text-center">
                    Vistor Management
                  </h3>
                  <p className="fw-normal fs-5 pb-2">
                    Residents can use the app to pre-register their guests,
                    offering essential visitor information, and the security
                    personnel can efficiently verify visitors against this
                    pre-registered data. Pause Point app generate temporary
                    access codes or QR codes for visitors, streamlining their
                    entry process, and also provide real-time notifications to
                    residents, keeping them informed about visitor arrivals.
                    Creating privacy for users and ensuring safety.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
            >
              <div className="col-10">
                <img
                  src={image2}
                  alt=""
                  style={{ borderRadius: "20px 20px 0 0" }}
                  className="img-fluid"
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgba(4, 151, 60, 0.40)",
                  width: "100%",
                  borderRadius: " 0 0 40px 40px",
                }}
                className="border border-dark border-3"
              >
                <div className="d-flex flex-column py-4 px-4 gap-3">
                  <h3 className="fs-2 fw-semibold text-center">
                    Community Management
                  </h3>
                  <p className="fw-normal fs-5 pb-2">
                    Pause Point app serves as a central hub for
                    community-related activities, enabling administrators to
                    post announcements and alerts, ensuring residents are
                    updated with the latest news and important notices. It also
                    facilitates event scheduling, allowing residents to view and
                    RSVP for community events, and maintains a digital directory
                    of residents and essential contacts, promoting community
                    engagement.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
            >
              <div className="col-10">
                <img
                  src={image3}
                  alt=""
                  style={{ borderRadius: "20px 20px 0 0" }}
                  className="img-fluid"
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgba(4, 151, 60, 0.40)",
                  width: "100%",
                  borderRadius: " 0 0 40px 40px",
                }}
                className="border border-dark border-3"
              >
                <div className="d-flex flex-column py-4 px-4 gap-3">
                  <h3 className="fs-2 fw-semibold text-center">
                    Health Information
                  </h3>
                  <p className="fw-normal fs-5 pb-2">
                    Residents can access health-related information, including
                    health alerts and updates issued by community management,
                    ensuring they stay informed about health advisories or
                    critical news. Residents may also use the app to voluntarily
                    report their health status or symptoms, promoting community
                    awareness. Furthermore, the app can offer a section with
                    details about local healthcare resources, such as nearby
                    hospitals, clinics, and pharmacies, making it a valuable
                    health management tool. Like the saying goes Health is
                    Wealth.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
            >
              <div className="col-10">
                <img
                  src={image4}
                  alt=""
                  style={{ borderRadius: "20px 20px 0 0" }}
                  className="img-fluid"
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgba(4, 151, 60, 0.40)",
                  width: "100%",
                  borderRadius: " 0 0 40px 40px",
                }}
                className="border border-dark border-3"
              >
                <div className="d-flex flex-column py-4 px-4 gap-3">
                  <h3 className="fs-2 fw-semibold text-center">
                    Security Services
                  </h3>
                  <p className="fw-normal fs-5 pb-2">
                    Pause Point app plays a crucial role in enhancing security
                    within the gated community. It allows for the rapid
                    dissemination of emergency alerts and security
                    notifications, ensuring residents are promptly informed
                    during critical situations. Providing an additional layer of
                    security awareness. Moreover, the app features an incident
                    reporting system, enabling residents to report security
                    concerns directly. Lastly, it simplifies gate access control
                    by allowing residents to request or grant access to
                    visitors, enhancing overall security management.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pb-5">
            <h3 className="fs-2 fw-semibold pt-5 text-center pb-4">
              Frequently Asked Questions
            </h3>
            <Accordion />
          </div>
        </main>
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
      <div className="">
        <Download />
      </div>
    </div>
  );
};

export default Services;
