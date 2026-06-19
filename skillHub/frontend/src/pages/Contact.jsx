import { useState } from "react";

import API from "../api/courseApi";

import { toast } from "react-toastify";

function Contact() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: ""
    });

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {

      toast.error(
        "All Fields Required"
      );

      return;
    }

    try {

      await API.post(
        "/contact",
        formData
      );

      toast.success(
        "Message Sent Successfully"
      );

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    }

    catch (error) {

      toast.error(
        "Failed To Send Message"
      );

    }

  }

  return (

    <div className="page-container">

      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <br /><br />

        <textarea
          rows="5"
          placeholder="Enter Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value
            })
          }
        />

        <br /><br />

        <button type="submit">
          Send Message
        </button>

      </form>

    </div>

  );
}

export default Contact;
