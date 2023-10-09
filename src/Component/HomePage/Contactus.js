import React from 'react'
import FooterPage from './Footer'
import "./HomePage.css"
import NavHome from '../Navbar/NavHome'


function Contactus () {

    const submitHandler = () => {
    

    }

    return (
        <div>
            <NavHome />
            <div id="codsfndkj">
                <div className="container contact-us-container">
                    <div className="contact-info">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="ls-n-25 m-b-1 contact_infoss">Contact Info</h2>
                                <p>
                                   Over 50,000+ Marketers From Top Brands Have Accessed our Exclusive Growth Hacks
                                </p>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="feature-box text-center">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    <div className="feature-box-content">
                                        <h3>Address</h3>
                                        <h5>412, Ghanshyam Enclave, <br/>New Link Rd, near <br/>Lalji Pada Police Station, Kandivali West, Mumbai, Maharashtra 400067</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="feature-box text-center">
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <div className="feature-box-content">
                                        <h3>Phone Number</h3>
                                        <h5>9930903090</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="feature-box text-center">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    <div className="feature-box-content">
                                        <h3>E-mail Address</h3>
                                        <h5>strategytoolio@gmail.com</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="feature-box text-center">
                                    <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                                    <div className="feature-box-content">
                                        <h3>Working Days/Hours</h3>
                                        <h5>Mon - Sat / 10:00AM - 7:00PM</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="mt-6 mb-2">Send Us a Message</h2>
                            <form className="mb-0" action="#">
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="contact-name">
                                        Your Name
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact-name"
                                        name="contact-name"
                                        placeholder='Enter Name'
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="contact-email">
                                        Your E-mail
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contact-email"
                                        placeholder='Enter Email'
                                        name="contact-email"
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="contact-number">
                                        Your Mobile Number
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="contact-number"
                                        placeholder='Enter Mobile Number'
                                        name="contact-number"
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="contact-message">
                                        Your Message
                                        <span className="required">*</span>
                                    </label>
                                    <textarea
                                        cols={30}
                                        rows={1}
                                        id="contact-message"
                                        placeholder='Enter Message'
                                        className="form-control"
                                        name="contact-message"
                                        required=""
                                        data-gramm="false"
                                        wt-ignore-input="true"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="form-footer mb-0 mt-3">
                                    <button style={{ marginLeft: '10px' }} type="submit" className="mb-4 btn btn-dark font-weight-normal" 
                                    onSubmit={submitHandler}>Send Message</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8208955182854!2d72.83231781490309!3d19.20302358701516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b136b7f03edf%3A0x9a9a041dc3dd57bb!2sAppCare%20Solutions!5e0!3m2!1sen!2sin!4v1674452578325!5m2!1sen!2sin"
                                width={600}
                                height={450}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </div>
                    </div>
                </div>
            </div>
            <FooterPage />
        </div>
    )
}

export default Contactus;