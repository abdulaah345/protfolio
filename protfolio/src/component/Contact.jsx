import { useState, useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap"; // استيراد Alert
import emailjs from "emailjs-com"; // استيراد EmailJS

function Contact() {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [buttonTextcomment, setButtonTextcomment] = useState("Add comment");
  const [status, setStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [comments, setComments] = useState([]); // إدارة التعليقات
  const [newComment, setNewComment] = useState(""); // تعليق جديد

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      setComments(savedComments);
    }
  }, []);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formDetails.firstName) errors.firstName = "First Name is required.";
    if (!formDetails.lastName) errors.lastName = "Last Name is required.";
    if (!formDetails.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formDetails.email))
      errors.email = "Email is invalid.";
    if (!formDetails.phone) errors.phone = "Phone number is required.";
    else if (!/^\d{11}$/.test(formDetails.phone))
      errors.phone = "Phone number must be 11 digits.";
    if (!formDetails.message) errors.message = "Message is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setButtonText("Send");
      return;
    }

    setButtonText("Sending...");

    emailjs
      .send(
        "service_dupkusd",
        "template_htkatt8",
        formDetails,
        "Uy57P5CxwyrwEn7BF"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus({ success: true, message: "Message sent successfully!" });
          setButtonText("Send");
          setFormDetails(formInitialDetails);
        },
        (error) => {
          console.error(error.text);
          setStatus({ success: false, message: "Failed to send message." });
          setButtonText("Send");
        }
      );
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment(""); // مسح الحقل
      setButtonTextcomment("Added");
      setTimeout(() => setButtonTextcomment("Add Comment"), 3000);
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col size={12} md={6}>
            <h2>Get In Touch</h2>
            {status && (
              <Alert
                variant={status.success ? "success" : "danger"}
                dismissible
                onClose={() => setStatus(null)}
              >
                {status.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col size={12} sm={6} className="px-1">
                  <input
                    name="firstName"
                    type="text"
                    value={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => onFormUpdate("firstName", e.target.value)}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="error-text">{formErrors.firstName}</p>
                  )}
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    name="lastName"
                    type="text"
                    value={formDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) => onFormUpdate("lastName", e.target.value)}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="error-text">{formErrors.lastName}</p>
                  )}
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    name="email"
                    type="email"
                    value={formDetails.email}
                    placeholder="Email Address"
                    onChange={(e) => onFormUpdate("email", e.target.value)}
                    required
                  />
                  {formErrors.email && (
                    <p className="error-text">{formErrors.email}</p>
                  )}
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input
                    type="tel"
                    value={formDetails.phone}
                    placeholder="Phone No."
                    onChange={(e) => onFormUpdate("phone", e.target.value)}
                    required
                  />
                  {formErrors.phone && (
                    <p className="error-text">{formErrors.phone}</p>
                  )}
                </Col>
                <Col size={12} className="px-1">
                  <textarea
                    rows="6"
                    value={formDetails.message}
                    placeholder="Message"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                    required
                  ></textarea>
                  {formErrors.message && (
                    <p className="error-text">{formErrors.message}</p>
                  )}
                  <button type="submit">
                    <span>{buttonText}</span>
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
