import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FunFacts.css';

const FunFacts = () => {
    // Define an array of fun facts about books
    const funFacts = [
        'Did you know that the first book ever printed was the Bible?',
        'The longest book ever written has over two million words!',
        'The Harry Potter book series is the best-selling book series in history.',
        'Agatha Christie is the best-selling novelist of all time, with over 2 billion copies of her detective novels sold worldwide.',
        'The longest sentence ever printed in a book is found in Victor Hugo\'s "Les Misérables." ' +
        'It consists of 823 words and has no periods or commas, only semicolons and dashes..',

    ];

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
