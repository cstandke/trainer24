import axios from "axios";

class OfferService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/offers",
      withCredentials: true
    });
    this.service = service;
  }

  handleUpload(theFile) {
    // console.log('file in service: ', theFile)
    return this.service
      .post("/imageupload", theFile)
      .then(res => res.data)
      .catch(err => {
        // console.error(err);
        throw err;
      });
  }

  createoffer = (
    offername,
    offertype,
    offerdescription,
    imageUrl,
    loggedInUser
  ) => {
    return this.service
      .post("/create", {
        offername,
        offertype,
        offerdescription,
        imageUrl,
        loggedInUser
      })
      .then(response => response.data);
  };

  getOfferDetail(offerId) {
    return this.service.get(`/${offerId}`
    ).then(response => response.data)
    .catch(err => console.log(err))
  }

  joinCourse(offerId) {
    return this.service.post(`/join?courseId=${offerId}`)
    .then(response => response)
    .catch(err => err)
  }

  

  //needs to be enabled once there is functionaliy in FE

  //   editoffer = (offername, offerdescription, offertype, imageUrl) => {
  // //     return this.service
  // //       .post("/edit", {(offername, offerdescription, offertype, imageUrl))
  // //       .then(response => response.data);
  // //   };

  //   deleteoffer = () => {
  //       return this.service
  //       .post("/delete", ??? )
  //       .then(response => response.data);
  //   }
}

export default OfferService;
