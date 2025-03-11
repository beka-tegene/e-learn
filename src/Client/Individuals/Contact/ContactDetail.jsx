import React, { Component } from "react";
import image1 from "/assets/img/breadcrumb_bg3.png";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

class ContactDetail extends Component {
  render() {
    const divStyle = {
      backgroundImage: `url(${image1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
    return (
      <React.Fragment>
        <section className="breadcrumb-area breadcrumb-bg" style={divStyle}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-content">
                  <h3 className="title">Contact With Us</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <a href="/">Home</a>
                    </span>
                    <span className="breadcrumb-separator">
                      <RiArrowRightSLine />
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      Contact
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-area section-py-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="contact-info-wrap">
                  <h2 className="title">Keep In Touch With Us</h2>
                  <p>keep connected</p>
                  <ul className="list-wrap">
                    <li>
                      <div className="icon">
                        <FaLocationDot />
                      </div>
                      <div className="content">
                        <p>
                          Addis Ababa, Ethiopia <br /> Sengatera traders bldg
                          5th floor
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <MdPhone />
                      </div>
                      <div className="content">
                        <a href="tel:0123456789">(+251) 946-545-454</a>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <MdEmail />
                      </div>
                      <div className="content">
                        <a href="mailto:info@gmail.com">
                          info@kegeberewtech.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-form-wrap">
                  <h4 className="title">Get in Touch</h4>
                  <form
                    id="contact-form"
                    action="https://themeadapt.com/tm/eduvalt/src/assets/mail.php"
                    method="POST"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="name"
                            type="text"
                            placeholder="Name *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="email"
                            type="email"
                            placeholder="E-mail *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="phone"
                            type="number"
                            placeholder="Phone *"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <input
                            name="subject"
                            type="text"
                            placeholder="Your Subject *"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-grp">
                      <textarea
                        name="message"
                        placeholder="Message"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <button type="submit" className="btn" disabled>
                      Send Message
                    </button>
                  </form>
                  <p className="ajax-response mb-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="contact-map">
          <iframe
            className="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5416268184313!2d38.74512547490908!3d9.01425519104649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85af85c2c629%3A0x41b0831f5ff82fc8!2sPURPOSE%20BLACK%20ETHIOPIA%20OFFICE!5e0!3m2!1sen!2str!4v1701336138977!5m2!1sen!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Embed"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ContactDetail;
