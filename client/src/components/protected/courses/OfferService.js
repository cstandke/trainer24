import axios from "axios";

class OfferService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/offers"
    });
    this.service = service;
  }

  createoffer = (offername, offerdescription, offertype, loggedInUser) => {
    return this.service
      .post("/create", {
        offername,
        offerdescription,
        offertype,
        loggedInUser
      })
      .then(response => response.data);
  };

  //   editoffer = (offername, offerdescription, offertype) => {
  // //     return this.service
  // //       .post("/edit", {(offername, offerdescription, offertype))
  // //       .then(response => response.data);
  // //   };

  //   deleteoffer = () => {
  //       return this.service
  //       .post("/delete", ??? )
  //       .then(response => response.data);
  //   }
}

export default OfferService;
