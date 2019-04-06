import axios from "axios";

class UpdateProfileService {
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
      .post("/users/imageupload", theFile)
      .then(res => res.data)
      .catch(err => {
        // console.error(err);
        throw err;
      });
  }

  editProfile(firstName, lastName, occupation, description, imageUrl) {
    return this.service
      .post("/users/profile/edit", {
        firstName,
        lastName,
        occupation,
        description,
        imageUrl
      })
      .then(response => response.data);
  };

  getUserDetails(userId) {
    return this.service
      .get(`/users/${userId}`)
      .then(response => response.data)
      .catch(err => console.log(err));
  }
}

export default UpdateProfileService;
