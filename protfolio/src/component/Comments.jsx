import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import { useState, useEffect } from "react";
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

  const [comments, setComments] = useState([]); // إدارة التعليقات
  const [newComment, setNewComment] = useState(""); // تعليق جديد
  const [buttonTextcomment, setButtonTextcomment] = useState("Add comment");
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment(""); // مسح الحقل
      setButtonTextcomment("Added");
      setTimeout(() => setButtonTextcomment("Add Comment"), 500);
    }
  };
<style>

   
</style>
  
  return (
    <section className="comments-section" id="skills">
      <Container>
        <Row>
          <Col className="skill-bx">
            <Carousel responsive={responsive} infinite={true} className="skill-slider">
              
                  {comments.map((comment, index) => (
                    <div key={index} className="carousel-item">{comment}</div>
                  ))}
             
            </Carousel>
            <textarea
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  required
                >
            </textarea>
                <button type="button" onClick={handleAddComment} className="commentButton">
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
