import axios from "axios";

class UpdateProfileService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api/users",
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

  editProfile = (firstName, lastName, occupation, description, imageUrl) => {
    return this.service
      .post("/profile/edit", {
        firstName,
        lastName,
        occupation,
        description,
        imageUrl
      })
      .then(response => response.data);
  };
}

export default UpdateProfileService;
