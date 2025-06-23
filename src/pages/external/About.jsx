import React from "react";
import hero from "../../assets/images/about-header.svg";
import star2 from "../../assets/images/Star 2.svg";
import star1 from "../../assets/images/Star 1.svg";
import image1 from "../../assets/images/Frame 91.svg";
import image2 from "../../assets/images/Frame 8.svg";
// import person1 from "../../assets/images/cofounder1.png";
// import person2 from '../assets/images/Ellipse 8.svg'
// import person3 from "../../assets/images/businessdev.png";
// import linkedin from "../../assets/images/devicon_linkedin.svg";
// import twitter from "../../assets/images/fa6-brands_x-twitter.png";
// import { Link } from "react-router-dom";
// import blard from "../../assets/images/blard.jpeg"

const About = () => {
  return (
    <div className="about-con overflow-x-hidden">
      <header className="bg-[#04973C]">
        <div
          className="container-lg d-flex justify-content-between align-items-center about-hero gap-3 position-relative"
          style={{ height: "553px" }}
        >
          <div className=" col-12 col-sm-6 pe-lg-5">
            <h1 className="text-light fs-2 fw-semibold pb-3">About Us</h1>
            <p className="pe-5 fw-normal text-light fs-5 ">
              At Pause Point, we're on a mission to create safer, more connected
              communities through innovative technology. Our platform brings
              neighbors closer, secures assets, and ensures family safety. With
              privacy and security as our guiding principles, we're reshaping
              the way you experience the world right at your doorstep. Welcome
              to <b>Pause Point</b>, your gateway to safer, more connected
              living.
            </p>
          </div>
          <div className="d-none d-sm-block col-sm-6 pe-2">
            <img src={hero} alt="" className="img-fluid" />
          </div>
          <img
            src={star2}
            alt=""
            className="position-absolute d-none d-sm-block"
            style={{ bottom: "50px", left: "14px" }}
          />
          <img
            src={star1}
            alt=""
            className="position-absolute"
            style={{ top: "15px", right: "10px" }}
          />
        </div>
      </header>
      <section style={{ backgroundColor: "#FFFDE4" }} className="pt-2 pb-5">
        <main className="container-lg pb-5 pe-3 pe-lg-0">
          <div className="d-flex align-items-center pt-5 mt-3 gap-5 flex-column flex-md-row">
            <div className="col-12 col-md-5">
              <h3 className="fs-3 fw-semibold pb-3 text-center text-md-start">
                Vision
              </h3>
              <p className="fw-normal fs-5">
                Our vision at Pause Point is to redefine community living in a
                digital age. We envision a world where residents enjoy peace of
                mind, knowing their privacy and security are paramount. Our
                platform will continue to be the bridge that strengthens
                community bonds, secures assets, and provides a safe environment
                for families to thrive. Together, we aim to build a future where
                'home' means not only a physical place but also a strong,
                connected, and secure community.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <img src={image1} alt="" className="img-fluid" />
            </div>
          </div>

          <div className="d-flex align-items-center pt-5 mt-3 gap-5 flex-column-reverse flex-md-row">
            <div className="col-12 col-md-6">
              <img src={image2} alt="" className="img-fluid" />
            </div>
            <div className="col-12 col-md-5">
              <h3 className="fs-3 fw-semibold pb-3 text-center text-md-start">
                Mission
              </h3>
              <p className="fw-normal fs-5">
                At Pause Point, our mission is to create a secure and connected
                world within communities. We aim to empower residents to build
                strong social connections, safeguard their valuable assets, and
                ensure the safety of their families. Through innovative
                technology and unwavering commitment to privacy and security, we
                strive to foster a sense of belonging and trust within every
                neighborhood.
              </p>
            </div>
          </div>
          {/* <div className="pt-5 mt-3">
            <h3 className="fs-3 fw-semibold pb-3 text-center mb-1">Our Team</h3>
            <div className="d-flex justify-content-between gap-4 flex-column flex-md-row">
              <div
                className="flex-fill"
                style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    style={{ width: "90px", height: "90px" }}
                    className="rounded-circle my-6"
                  >
                    <img src={person1} alt="" className="img-fluid" />
                  </div>
                  <div className="pb-3">
                    <h4 className="text-center fs-5 fw-semibold">
                      Mr. Oyelakin Kazeem
                    </h4>
                    <h5 className="text-center fs-6 fw-medium">
                      Co-Founder, CEO & ACTO
                    </h5>
                  </div>
                </div>
                <div style={{ backgroundColor: "#04973C" }}>
                  <div className="d-flex justify-content-center align-items-center py-2 gap-2">
                    <Link to={""}>
                      <img src={linkedin} alt="" />
                    </Link>
                    <Link to={""}>
                      <img src={twitter} alt="" />
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="flex-fill"
                style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    className="rounded-circle my-3"
                  >
                    <img src={blard} alt="" className='img-fluid w-100' style={{ width: "100px", height: "100px", borderRadius: "50%" }}/>
                  </div>
                  <div className="pb-3">
                    <h4 className="text-center fs-5 fw-semibold">
                      Peter Omu (a.k.a Blard)
                    </h4>
                    <h5 className="text-center fs-6 fw-medium">
                      Technical Team Lead
                    </h5>
                  </div>
                </div>
                <div style={{ backgroundColor: "#04973C" }}>
                  <div className="d-flex justify-content-center align-items-center py-2 gap-2">
                    <Link to={""}>
                      <img src={linkedin} alt="" />
                    </Link>
                    <Link to={""}>
                      <img src={twitter} alt="" />
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="flex-fill"
                style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-circle my-3"
                  >
                    <img src={person3} alt="" className="img-fluid" />
                  </div>
                  <div className="pb-3">
                    <h4 className="text-center fs-5 fw-semibold">
                      Engr. Kieran Uba
                    </h4>
                    <h5 className="text-center fs-6 fw-medium">
                      Chief Operating Officer
                    </h5>
                  </div>
                </div>
                <div style={{ backgroundColor: "#04973C" }}>
                  <div className="d-flex justify-content-center align-items-center py-2 gap-2">
                    <Link to={""}>
                      <img src={linkedin} alt="" />
                    </Link>
                    <Link to={""}>
                      <img src={twitter} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </main>
      </section>
    </div>
  );
};

export default About;
