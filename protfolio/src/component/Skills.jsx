import React from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png"
const Skills = () => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return(
    <section className='skill' id='skills'>
        <Container>
            <Row>
                <Col className="skill-bx">
                <h2>Skills</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae ratione pariatur voluptate ea, ipsam consequuntur optio asperiores temporibus dolorem iure eos harum minima quis omnis saepe eveniet deserunt! Reiciendis.</p>
                <Carousel responsive={responsive} infinite={true} className='skill-slider'>
                    <div className='item'>
                        <img src='' alt='image'/>
                        <h5>Web development</h5>
                    </div>
                    <div className='item'>
                    <img src='' alt='image'/>

                        <h5>Web development</h5>
                    </div>
                    <div className='item'>
                        <img src='' alt='image'/>
                        <h5>Web development</h5>
                    </div>
                    <div className='item'>
                        <img src='' alt='image'/>
                        <h5>Web development</h5>
                    </div>
                    <div className='item'>
                        <img src='' alt='image'/>
                        <h5>Web development</h5>
                    </div>

                </Carousel>
                </Col>
            </Row>
        </Container>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
}

export default Skills;
