import axios from "axios";

export default axios.create({
  baseURL: `https://lecture-me.herokuapp.com`,
  responseType: "json",
});
