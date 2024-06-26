import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#234764] text-white">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to={"/"}>GuideMyClass Reserachers</Link>
            <p className=" mt-4 text-sm text-white">
            Please be aware that there is no violation of college or university law and that this service is entirely lawful. You can use the paper you received from our organization as
a starting point for your own academic research or as a means of gaining a deeper
understanding of the subject. Please remember to cite any insights you take as well.
Please see your institution&#39;s plagiarism policy for further information on rephrasing
guidelines. site administration.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Quick Links</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                <Link className="hover:opacity-75" to="/prices">
                  {" "}
                  Prices{" "}
                </Link>
                <Link className="hover:opacity-75" to="/faq">
                  Faq
                </Link>
                {/* <Link className="hover:opacity-75" to="/samples">
                  {" "}
                  Samples{" "}
                </Link> */}
                <Link className="hover:opacity-75" to="/guarantees">
                  {" "}
                  Guarantees{" "}
                </Link>
                <Link className="hover:opacity-75" to="/about-us">
                  {" "}
                  About us{" "}
                </Link>
                <Link className="hover:opacity-75" to="/services">
                  {" "}
                  Services{" "}
                </Link>
               
              </nav>
            </div>
            <div>
              <p className="font-medium">Contacts</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                <a
                  className="hover:opacity-75 flex space-x-2"
                  href="tel:447365270700"
                >
                  {" "}
                  <img
                    src={require("../images/gb.svg").default}
                    alt="ExtaEssay svg"
                    className="h-5 w-5"
                  />{" "}
                  <span>+447365270700</span>
                </a>
                <a
                  className="hover:opacity-75"
                  href="mailto:support@guidemyclass.com"
                >
                  {" "}
                  support@guidemyclass.com
                </a>
              </nav>
            </div>
            <div>
              <p className="font-medium">We accept</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex space-x-2">
                  <img
                    src={require("../images/logo-visa.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img
                    src={require("../images/logo-mastercard.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                </div>
                <div className="flex space-x-2">
                  <img
                    src={require("../images/logo-amex.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img
                    src={require("../images/logo-discover.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img
                    src={require("../images/logo-ideal.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                </div>
              </nav>
            </div>
            <div>
              <p className="font-medium">Global Offices</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex space-x-2">
                  <img className="w-8"
                    src={require("../images/um.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img className="w-8"
                    src={require("../images/gb.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
          
             
                  <img className="w-8"
                    src={require("../images/nl.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img className="w-8"
                    src={require("../images/ca.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                  <img className="w-8"
                    src={require("../images/sg.svg").default}
                    alt="ExtaEssay svg"
                  />{" "}
                </div>
              </nav>
            </div>
            <div className="fixed bottom-0 right-0 flex justify-end mb-4 mr-4">
              <a href="https://wa.link/guidemyclass" target="_blank" rel="noopener noreferrer">
                <img
                  src={require("../images/whatsapp.svg").default}
                  alt="WhatsApp"
                  className="h-8 w-8"
                />
              </a>
              <a href="https://t.me/guidemyclass" target="_blank" rel="noopener noreferrer">
                <img
                  src={require("../images/telegram.svg").default}
                  alt="Telegram"
                  className="h-8 w-8 ml-4"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
