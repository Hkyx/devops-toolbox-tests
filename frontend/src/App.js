import axios from "axios";
import React, { useState } from "react";

import { getCurrentDate } from "./utils/date";

import Play from "./assets/play.svg";
import Stop from "./assets/stop.svg";
import "./styles.css";

export default function App() {
  // localstorage key for url
  const timerStorageKey = "fetch-time-interval";
  const urlStorageKey = "fetch-url-interval";

  // timer values
  const timerOptions = [1000, 5000, 10000, 30000, 60000];

  // get initial url from localstorage
  const initialTimer = localStorage.getItem(timerStorageKey) || timerOptions[0];
  const initialUrl = localStorage.getItem(urlStorageKey);

  // declare state props with update functions
  const [data, setData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [timer, setTimer] = useState(initialTimer);
  const [timestamp, setTimestamp] = useState(null);
  const [url, setUrl] = useState(initialUrl); // https://jsonplaceholder.typicode.com/posts/1

  // fetch data
  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setResponseTime(res.responseTime);
        setStatus("success");
      })
      .catch((err) => {
        setData(err);
        setResponseTime(err.responseTime);
        setStatus("error");
      })
      .finally(() => {
        setTimestamp(getCurrentDate());
      });
  };

  // on input value change
  const handleUrlChange = (event) => setUrl(event.target.value);

  // on input key press
  const handleUrlKeyPress = (event) => {
    // if key is `enter`
    if (event.charCode === 13) {
      handleStartClick();
    }
  };

  // on select value change
  const handleTimerSelect = (event) => setTimer(event.target.value);

  // on start button click
  const handleStartClick = () => {
    // remove previous interval
    // and reset data/status
    if (intervalId != null) {
      handleStopClick();
    }
    // fetch data immediately
    fetchData();
    // start fetch interval
    const id = setInterval(() => fetchData(), timer);
    // set interval id
    setIntervalId(id);
    // store url in localstorage
    localStorage.setItem(timerStorageKey, timer);
    localStorage.setItem(urlStorageKey, url);
  };

  // on stop button click
  const handleStopClick = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div className="App">
      <h2>Fetch URL</h2>
      <p className="caption secondary-text">
        Enter an URL and click "Start" or press "Enter" to fetch on specified
        interval and display the returned JSON data.
      </p>
      <div className="input-container">
        <input
          className="input"
          disabled={intervalId != null}
          onChange={handleUrlChange}
          onKeyPress={handleUrlKeyPress}
          placeholder="Enter an URL..."
          value={url}
        />
        <select
          className="select"
          disabled={intervalId != null}
          onChange={handleTimerSelect}
          value={timer}
        >
          {timerOptions.map((timerValue) => (
            <option key={timerValue} value={timerValue}>
              Every {timerValue / 1000} sec
            </option>
          ))}
        </select>
        {(intervalId == null && (
          <button className="button start" onClick={handleStartClick}>
            <img src={Play} alt="play" />
            <span>Start</span>
          </button>
        )) || (
          <button className="button stop" onClick={handleStopClick}>
            <img src={Stop} alt="stop" />
            <span>Stop</span>
          </button>
        )}
      </div>
      {status && (
        <div className={`status ${status}-background`}>
          <span>
            {timestamp} | {status} | {responseTime}ms
          </span>
          <span className="flex"></span>
          <span>{intervalId == null ? "Stopped" : "Running"}</span>
        </div>
      )}
      <pre>
        <code>
          {(data && JSON.stringify(data, null, 2)) || "No data yet..."}
        </code>
      </pre>
    </div>
  );
}
