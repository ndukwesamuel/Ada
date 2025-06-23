import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../assets/images/pause point.png";
import { Link } from "react-router-dom";
import AppWrapperContainer from "./index";

const Footer = () => {
  return (
    <footer className="bg-green-100 py-8 max-w-[100%] mx-auto ">
     <AppWrapperContainer className="flex flex-col md:block items-center">
     <div className="max-w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center md:items-center text-center md:text-start">
          <div className="mb-4 md:mb-0  md:w-[270px] md:h-[228px]">
            <div className="md:flex flex-column justify- items-center">
              <div
                className="md:mb-4 bg-green-300 rounded"
                style={{ maxWidth: "6rem" }}
              >
                <Link to="/">
                  <img src={logo} alt="logo" width="100%" />
                </Link>
              </div>
            </div>
            <div className="space-x-4 hidden md:flex justify-center">
              <Link
                to="https://instagram.com/pausepoint_?igshid=OGQ5ZDc2ODk2ZA=="
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                to="https://twitter.com/pausepoint"
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                to="https://twitter.com/pausepoint"
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>

            <div className="mt-3 hidden md:block">
              <hr className="mb-2"/>
              <small className="text-gray-600 text-sm text-center">
                Copyrights © 2023 All Rights Reserved by PG WORKS SERVICES LTD.
              </small>
            </div>
          </div>

          {/* Company Links */}
          <div className="mb-8 md:mb-0 md:w-[270px] md:h-[228px]">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Company</h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-800">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-800">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-teal-800">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-800">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries We Serve */}
          <div className="mb-8 md:mb-0 md:w-[270px] md:h-[228px]">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Information
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-800">
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-teal-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-teal-800">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0 md:w-[270px] md:h-[228px]">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Contact us
            </h3>
            <div className="text-gray-600">
              
              <p className="mb-3">Lekki Palm City,
              <br />
              Ajah Lagos, Nigeria.
              <br /></p>
              <Link href="tel:+2347039845638" className="hover:text-gray-800 my-3">
                07039845638 || 09019269787
              </Link>
              <br />
              <Link
                href="support@pausepoint.net"
                className="hover:text-gray-800"
              >
                support@pausepoint.net
              </Link>
            </div>
            <div className="flex justify-center align-center space-x-4  md:hidden">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 border p-2 rounded-full"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
        <p className="md:hidden text-gray-600 text-sm text-center py-4">
          Copyright ©2024 PG Works Services Ltd.
          <br />
          All rights reserved.
        </p>
      </div>
     </AppWrapperContainer>
    </footer>
  );
};

export default Footer;
