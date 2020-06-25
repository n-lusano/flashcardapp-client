import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export default function Card({ cards }) {
  let [index, setIndex] = useState(0);
  const cardCount = cards.length;

  return (
    <div>
      {cards.map((card, cardIndex) => {
        //see REFERENCES.md
        if (cardIndex === ((index % cardCount) + cardCount) % cardCount) {
          return (
            <div key={card.id} className="text-info">
              <div className="Card2">
                <div className="card-container">
                  <div className="card-flip">
                    <div className="card front">
                      <Jumbotron key={card.id}>{card.wordEn}</Jumbotron>
                    </div>
                    <div className="card back">
                      <Jumbotron key={card.id}>{card.wordNl}</Jumbotron>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    className="btn-outline-info"
                    variant="light"
                    onClick={() => {
                      setIndex(--index);
                    }}
                  >
                    &#11207;
                  </Button>
                  <Button className="btn-outline-success" variant="light">
                    &#x2714;
                  </Button>{" "}
                  <Button className="btn-outline-danger" variant="light">
                    &#x2716;
                  </Button>
                  <Button
                    className="btn-outline-info"
                    variant="light"
                    onClick={() => {
                      setIndex(++index);
                    }}
                  >
                    &#11208;
                  </Button>
                </div>
              </div>
              <br />
            </div>
          );
        }
      })}
    </div>
  );
}

//<div className="row-lg-4 card-container">

// function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         ITEM
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// render(<ControlledCarousel />);
