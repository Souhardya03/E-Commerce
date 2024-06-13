import React from "react";

const Footer = () => {
  return (
    <div className=" border-t mt-3">

      <footer className="relative bg-[#171616] pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="lg:text-3xl text-2xl fonat-semibold text-gray-200">
                Let's keep in touch!
              </h4>
              <h5 className="lg:text-lg text-sm mt-0 mb-2 text-gray-400">
                Send Us email, we will respond 1-2 business days.
              </h5>
              <div className="mt-6 flex lg:mb-0 mb-6">
                <input type="text" className=" border bg-transparent lg:w-[50%] w-full rounded-[2px] px-3 py-2 border-gray-400" placeholder="Email Address..." />
                <button className="text-white border p-2 px-3 ml-1 bg-red-600 font-medium herobutton rounded-[2px] border-gray-400">Send</button>
              </div>
            </div>
            <div className="w-full text-gray-400 lg:w-6/12 px-4">
              <div className="flex gap-8 lg:mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block text-white uppercase text-blueGray-500 text-[15px] font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://blog.creative-tim.com?ref=njs-profile"
                      >
                        Cancel Order
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Return Order
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                      >
                        Track Order
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-[15px] text-white font-semibold mb-2">
                    Policies
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        Return Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms?ref=njs-profile"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy?ref=njs-profile"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us?ref=njs-profile"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <div
                  
                  className="text-blueGray-500"
                >
                  {" "}
                  All Rights Reserved | 
                  <a
                    href="https://devdark.cloud/"
                    className="text-blueGray-500 ml-2 hover:text-blueGray-800"
                  >
                     By Souhardya D.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
