import axios from "axios";

const cloudinaryService = {
  cloudinaryUpload: (fileToUpload: FormData): Promise<any> => {
    return axios
      .post(`http://localhost:3000` + "/cloudinary-upload", fileToUpload)
      .then((res: any) => res.data)
      .catch((err: any) => console.log(err));
  },
};

export default cloudinaryService;
