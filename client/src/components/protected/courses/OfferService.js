import axios from "axios";

class OfferService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
      withCredentials: true
    });
    this.service = service;
  }

  handleUpload(theFile) {
    // console.log('file in service: ', theFile)
    return this.service
      .post("/offers/imageupload", theFile)
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
    location,
    imageUrl,
    fileUrl,
    udemyId,
    udemyUrl,
    udemyTitle,
    loggedInUser
  ) => {
    return this.service
      .post("/offers/create", {
        offername,
        offertype,
        offerdescription,
        location,
        imageUrl,
        fileUrl,
        udemyId,
        udemyUrl,
        udemyTitle,
        loggedInUser
      })
      .then(response => response.data);
  };

  getOfferDetail(offerId) {
    return this.service.get(`/offers/${offerId}`
    ).then(response => response.data)
    .catch(err => console.log(err))
  }

  joinCourse(offerId) {
    return this.service.post(`/offers/join?courseId=${offerId}`)
    .then(response => response)
    .catch(err => err)
  }

  leaveCourse(offerId) {
    return this.service.post(`/offers/leave?courseId=${offerId}`)
    .then(response => response)
    .catch(err => err)
  }

  getUdemyData(urlString) {
    return this.service.get(`/offers/udemyCourseInfo?search=${urlString}`)
    .then (response => response)
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
