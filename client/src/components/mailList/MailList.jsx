import React, { useState } from "react";
import "./mailList.css";

const MailList = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
    const recipient = inputValue; // replace with the recipient's email address
    if (!recipient) {
      console.log("empty");
      setInputValue("Email field can't be blank!");
    } else {
      // Validate the email address using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!recipient || !emailRegex.test(recipient)) {
        alert("Please enter a valid email address");
      } else {
        setLoading(true);
        fetch("https://booking-com-api-o1kq.onrender.com/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipient }),
        })
          .then((response) => {
            setLoading(false);
            if (response.ok) {
              console.log("Email sent successfully");
            } else {
              console.log("Failed to send email");
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
        setInputValue("");
      }
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <form className="mailInputContainer" onSubmit={(e) => sendEmail(e)}>
        <input required name="email" id="email-input" type="email" onChange={handleInputChange} placeholder="Your Email" value={inputValue} />
        <button disabled={loading}>Subscribe</button>
      </form>
    </div>
  );
};

export default MailList;
