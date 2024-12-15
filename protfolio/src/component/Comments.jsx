import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import { useState, useEffect } from "react";
import { db } from "./firebase"; // Import Firebase
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const Comments = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [comments, setComments] = useState([]); // Manage comments
  const [newComment, setNewComment] = useState(""); // New comment
  const [email, setEmail] = useState(""); // Email input
  const [rating, setRating] = useState(0); // Rating input
  const [buttonTextcomment, setButtonTextcomment] = useState("Add comment");

  // Fetch comments from Firestore on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const loadedComments = querySnapshot.docs.map((doc) => doc.data());
        setComments(loadedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim() && email.trim() && rating > 0) {
      try {
        const commentsRef = collection(db, "comments");
        const newCommentData = {
          text: newComment,
          email: email,
          rating: rating,
          timestamp: new Date(),
        };
        await addDoc(commentsRef, newCommentData);
        setComments([newCommentData, ...comments]); // Optimistic update
        setNewComment(""); // Clear comment input
        setEmail(""); // Clear email input
        setRating(0); // Reset rating
        setButtonTextcomment("Added");
        setTimeout(() => setButtonTextcomment("Add Comment"), 500);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <section className="comments-section" id="skills">
      <Container>
        <Row>
          <Col className="skill-bx">
            <Carousel
              responsive={responsive}
              infinite={true}
              className="skill-slider"
            >
              {comments.map((comment, index) => (
                <div key={index} className="carousel-item">
                  <div className="comment-box">
                    <div className="comment-content">
                      <div className="comment-image">
                        <img src="src\assets\img\dot.jpg" alt="User" />
                      </div>
                      <strong>{comment.email}</strong>
                      <p>{comment.text}</p>
                      <div className="rating">
                        <span style={{ color: "gold" }}>
                          {"★".repeat(comment.rating)}
                        </span>
                        <span style={{ color: "ddd" }}>
                          {"☆".repeat(5 - comment.rating)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            <input
              name="name"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Name..."
              required
              className="emailInput"
            />
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment (max 30 characters)..."
              maxLength="30"
              required
            />
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`star ${rating >= star ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddComment}
              className="commentButton"
            >
              <span>{buttonTextcomment}</span>
            </button>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};

export default Comments;
