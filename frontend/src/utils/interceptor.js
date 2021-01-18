import axios from "axios";

function setRequestStartTime(req) {
  req.meta = req.meta || {};
  req.meta.requestStartedTime = new Date().getTime();
  return req;
}

function setResponseTime(res) {
  res.responseTime = new Date().getTime() - res.config.meta.requestStartedTime;
  return res;
}

export default function configureInterceptors() {
  // add request start time to meta prop on request
  axios.interceptors.request.use((req) => setRequestStartTime(req));
  // add response time prop based on request start time
  axios.interceptors.response.use(
    (res) => {
      return setResponseTime(res);
    },
    (res) => {
      throw setResponseTime(res);
    }
  );
}
