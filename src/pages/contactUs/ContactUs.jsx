import React from 'react';
import "./contact.css"

function ContactUs() {
  return (
    <section id="contact-form">
      <h2 className="contactus">Contact</h2>
      <form id="contact" name="contact" acceptCharset="utf-8">
        <label><span>Name</span><input name="name" type="text" placeholder="Name" /></label>
        <label><span>Email</span><input name="email" type="email" placeholder="Email" /></label>
        <label><span>Message</span><textarea name="message" placeholder="Message" defaultValue={""} /></label>
        <input name="submit" type="submit" defaultValue="Send" />
      </form>
    </section>
  );
}

export default ContactUs;