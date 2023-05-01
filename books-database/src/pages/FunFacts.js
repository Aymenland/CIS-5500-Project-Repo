import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FunFacts.css';
const config = require('../config.json')

const FunFacts = () => {
    const [funFacts, setFunFacts] = useState([]);

    useEffect(() => {
        // Fetch fun facts data from server
        fetch(`http://${config.server_host}:${config.server_port}/fun_facts`)
            .then(response => response.json())
            .then(data => {
                // Update the funFacts state with the data received from the server
                setFunFacts(data);
            })
            .catch(error => {
                console.error('Error fetching fun facts:', error);
            });
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="fun-facts-container">
            <h2 className="fun-facts-header">Fun Facts about Books</h2>
            <Slider {...sliderSettings}>
                {funFacts.map((fact, index) => (
                    <div key={index} className="fun-fact-slide">
                        <p>{fact}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FunFacts;
