import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loadingImg from "../../../images/Loading-Infinity.gif";
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/reviews`)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setTestimonials(data);
                console.log("Testimonial data: ", data);
            })
            .catch(err => console.log(err));
    }, []);
    // console.log(testimonials);
    if(loading){
        return (
            <div>
                <img src={loadingImg} alt="" />
            </div>
        );
    }
    return (
        <section id="reviews">
            <h1 className="text-brand text-center mb-5">What Our Students Say</h1>
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                autoPlay={true}
                interval={3000}
                stopOnHover={true}
                swipeable={true}
            >
                {testimonials && testimonials.map((testimonial) => (
                    <div key={testimonial._id}>
                        <img
                            src={
                                testimonial.img || "https://www.w3schools.com/howto/img_avatar.png"
                            }
                            alt=""
                        />
                        <div className="myCarousel shadow-sm">
                            <h3>{testimonial.name}</h3>
                            <h4>{testimonial.from}</h4>
                            <p className="text-brand">{testimonial.quote}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Testimonials;