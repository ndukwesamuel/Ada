import React, { useState } from "react";
import Iphone from "../../assets/iPhone 12 Pro-up.png";
import Star1 from "../../assets/Star 2.svg";
import Line from "../../assets/Element 09.svg";
import Star2 from "../../assets/Star 1.svg";
import Hand from "../../assets/handFrame.png";
import Bulb from "../../assets/bulbFrame.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";
import Download from "../../components/Download";
import { Link } from "react-router-dom";
import TestimonialSlide from "../../components/TestimonialSlide";
import AppWrapperContainer from "@/components/layout/index";

const Home = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  return (
    <div className="overflow-x-hidden" ref={ref}>
      <div className="bg-[#04973C]">
        <AppWrapperContainer className="isolate flex justify-center py-16">
          <div className="relative max-w-[85%] w-[100%] lg:flex items-center justify-between gap-10 text-white">
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="relative max-w-[750px] m-auto text-left space-y-3 w-[100%] lg:w-[50%]"
            >
              <h1 className="text-[50px] font-[600]">Pause Point</h1>
              <p className="text-[18px] lg:text-[22px]">
                <span className="text-warning"></span>Experience seamless home
                management with our estate and visitor management tech
                solutions. Enjoy enhanced security, convenience, and stronger
                community connections. Let's connect, it's privacy time...
                <span className="text-warning"></span>
              </p>
              <img
                src={Line}
                alt="line"
                className="absolute -z-10 right-0 lg:right-30 bottom-0"
              />
              <Link to="/contact">
                <button className="bannerBtn mt-3  hover:border-lime-600 hover:bg-green-200 hover:text-teal-950">
                  Book A Demo
                </button>
              </Link>
            </motion.div>

            {/* Iphone */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-[100%] lg:w-[50%] flex justify-center"
            >
              <img src={Iphone} alt="iphone" className="hidden lg:block" />
              <img
                src={Star2}
                alt="star"
                className="absolute -z-10 top-0 right-0"
              />
            </motion.div>
            <img
              src={Star1}
              alt="star"
              className="absolute -z-10 bottom-0 left-0"
            />
          </div>
        </AppWrapperContainer>
      </div>

      <div className=" bg-[#D6EDCA] py-20">
        <AppWrapperContainer className="flex flex-col items-center gap-32">
          <div className="max-w-[90%] w-[100%] lg:flex items-center justify-between gap-10">
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-full lg:w-[55%]"
            >
              <img src={Hand} alt="hand" />
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-3 mt-10 lg:mt-0 w-full lg:w-[40%]"
            >
              <h2 className="text-[36px] font-[600]">What we offer</h2>
              <p className="text-[20px] tracking-[0.4px]">
                Certainly, here are few key offerings of Pause Point:
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Visitor Management System: Controls and tracks visitor access to
                the community or estate.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Community/Estate Management Tools: Provide tools to manage
                various aspects of the community, such as maintenance,
                communication, and facility bookings.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Artisan Services Platform: Connects residents with local
                artisans and service providers for tasks like repairs and
                maintenance.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Event Ticketing Platform: Facilitates the organization and
                management of community events, including ticket sales and
                RSVPs.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Resident (Peer to Peer) Marketplace: Enables residents to buy,
                sell, or exchange goods and services directly with each other.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Additional Services: Offer a range of extra features such as
                health information access, emergency assistance, utility bill
                payments, chats and more.
              </p>
            </motion.div>
          </div>
        </AppWrapperContainer>

        {/* Why Choose Us */}
        <AppWrapperContainer>
          <div className="max-w-[90%] mx-auto w-[100%] lg:flex items-center justify-between gap-10 lg:flex-row-reverse pt-16">
            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-full lg:w-[55%]"
            >
              <img src={Bulb} alt="bulb" />
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-3 mt-10 lg:mt-0 w-full lg:w-[40%]"
            >
              <h2 className="text-[36px] font-[600]">Why Choose Us</h2>
              <p className="text-[20px] tracking-[0.4px]">
                Using Pause Point is beneficial for several reasons:
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Safety First: Your security is our top priority. We combine
                advanced technology and dedicated personnel to keep your
                community safe.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Community Connection: We bring neighbors closer. Build strong
                relationships, share experiences, and collaborate like never
                before.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Efficient Estate Management: Streamline estate management with
                our admin portal. Approve new member registrations, manage
                events, and more.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Voice Your Opinions: Participate in community polls and surveys
                to shape decisions, ensuring your voice is heard.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Never Miss an Event: Stay in the loop with community events,
                gatherings, and activities. Create and manage your own events
                with ease.
              </p>
              <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
                Emergency Assistance: Your safety is our concern. Our emergency
                button ensures help is just a tap away.
              </p>
            </motion.div>
          </div>
        </AppWrapperContainer>
      </div>

      <div className="bg-[#FFFDE4] py-32">
        <AppWrapperContainer className="flex flex-col  gap-32 items-center">
          {/* Our Services */}
          <div className="max-w-[90%] w-[100%] space-y-20">
            {/* Our Services */}
            <div className="text-center space-y-5">
              <h3 className="text-[36px] font-[600] py-6">Our Services</h3>
              <div className="max-w-[1038px] w-full m-auto tracking-[0.4px]">
                <p>
                  <b>
                    At Pause Point, we offer a comprehensive suite of services
                    aimed at improving the overall quality of life within your
                    community, including enhanced security measures, enhanced
                    community connections, streamlined estate management through
                    an admin portal, tools for open dialogue and
                    decision-making, support for organizing community events,
                    and quick access to emergency assistance. Choose Pause Point
                    to create a safer, more connected, and thriving community
                    environment. Let's Connect, It's privacy time...
                  </b>
                </p>
              </div>
              <Link to="/services">
                <button className="seeMoreBtn m-auto mt-3">See More...</button>
              </Link>
            </div>

            {/* Subscription Plan */}
            <div className="text-center space-y-5">
              <h3 className="text-[36px] font-[600]">Subscription Plans</h3>
              <p className="text-[20px]">Subscribe to our Residential Plans</p>

              <div className="flex justify-around flex-wrap gap-20 pt-5 pb-10">
                <div className="relative isolate flex items-center justify-center">
                  <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
                  <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
                    <h3 className="text-[36px]">Basic</h3>
                    {/* <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p> */}

                    <div className="space-y-5 my-5">
                      <p className="checkMark tracking-[0.32px] ">
                        Vistor Management
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Security Alert
                      </p>
                      <p className="uncheckMark tracking-[0.32px]">
                        Resident Communications
                      </p>
                      <p className="uncheckMark tracking-[0.32px]">
                        Daily Help Management
                      </p>
                      <p className="uncheckMark tracking-[0.32px]">
                        Layered security
                      </p>
                      <p className="uncheckMark tracking-[0.32px]">
                        Leave at Gate
                      </p>
                      <Link to="/contact">
                        <button className="seeMoreBtn mt-3">Free Plan</button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative isolate flex items-center justify-center">
                  <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
                  <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
                    <h3 className="text-[36px]">Standard</h3>
                    {/* <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p> */}

                    <div className="space-y-6 my-5">
                      <p className="checkMark tracking-[0.32px]">
                        All features in Basic
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Security Management
                      </p>
                      <p className="checkMark tracking-[0.32px]">Polls</p>
                      <p className="checkMark tracking-[0.32px]">Helpdesks</p>
                      <p className="checkMark tracking-[0.32px]">
                        Resident identification (ID)
                      </p>
                      <p className="uncheckMark tracking-[0.32px]">
                        Amenities Booking
                      </p>
                      <Link to="/contact">
                        <button className="seeMoreBtn mt-3">Subscribe</button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative isolate flex items-center justify-center">
                  <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
                  <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
                    <h3 className="text-[36px]">Premium</h3>
                    <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p>

                    <div className="space-y-8 my-5">
                      <p className="checkMark tracking-[0.32px]">
                        All features in Standard
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Asset Management
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Vendor Management
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Final Accounts
                      </p>
                      <p className="checkMark tracking-[0.32px]">
                        Balance Sheet
                      </p>
                      <Link to="/contact">
                        <button className="seeMoreBtn mt-3">Subscribe</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[20px]">Social And Events</p>
              <div className="relative isolate flex items-center justify-center">
                <div className="absolute -z-10 h-[80%] max-w-[627px] w-full bg-[#9BD4A2] border-[3px] border-black"></div>
                <div className="max-w-[542px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
                  <h3 className="text-[36px]">Socialite</h3>
                  <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5">
                    {/* N1000 */}
                  </p>

                  <div className="space-y-5 my-5">
                    <p className="checkMark tracking-[0.32px]">
                      Create tickets for events
                    </p>
                    <p className="checkMark tracking-[0.32px]">
                      Generate Access code for guests
                    </p>
                    <p className="checkMark tracking-[0.32px]">Sell tickets</p>
                    <p className="checkMark tracking-[0.32px]">Buy tickets</p>
                    <p className="checkMark tracking-[0.32px]">
                      Guest Management
                    </p>
                    <p className="checkMark tracking-[0.32px]">
                      Security Agents & Alerts
                    </p>
                    <button className="seeMoreBtn mt-3">Try it</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial */}
          {/*           <TestimonialSlide /> */}
        </AppWrapperContainer>
      </div>

      <div className="bg-[#04973C]">
        <AppWrapperContainer className="bg-transparent">
          <Download />
        </AppWrapperContainer>
      </div>
    </div>
  );
};

export default Home;
