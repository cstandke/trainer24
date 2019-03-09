import React from "react";

const homePage = () => {
  let cardStyle = {
    // width: "18rem"
  };

  let card = {
    cardTitle: "Card title",
    cardText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    cardImage: "Card Image"
  };

  let cardArray = [];

  const cards = () => {
    cardArray.push(card);
    cardArray.push(card);
    cardArray.push(card);

    return cardArray.map(el => {
      return (
        <div className="col-md-3">
          <div className="card mb-4" style={cardStyle}>
            {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
            <div className="bg-secondary p-5 text-light">{el.cardImage}</div>
            <div className="card-body">
              <h5 className="card-title">{el.cardTitle}</h5>
              <p className="card-text">{el.cardText}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Trainer24</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>
      <div className="container-fluid p-2">
        <h2 className="display-5 my-2 mb-4">Check out our classes:</h2>
        <div className="row">
          {/* Cards go here */}
          {cards()}
        </div>
      </div>
    </div>
  );
};

export default homePage;
