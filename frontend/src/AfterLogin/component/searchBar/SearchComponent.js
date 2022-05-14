import React, { useState, useEffect, useRef } from "react";
import "boxicons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { notification } from "antd";

export default function SearchComponent() {
  //set the state for the search input
  const [expSearch, setExpSearch] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef();
  //use speech recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  //check if the browser supports speech recognition. When is not listening or finish listening or expand the search bar, focus on the input
  useEffect(() => {
    if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
      notification.error({
        message: "Error",
        description: "Your browser does not support speech recognition",
        duration: 2,
        placement: "bottomLeft",
      });
    }
    if (!listening || expSearch === true) {
      inputRef.current.focus();
    }
  }, [
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
    expSearch,
  ]);

  //expand or collapse the search input
  const toggleExpSearch = () => {
    setExpSearch(!expSearch);
  };

  //navigate to different search engine with the search input when user press enter
  const searchInput = (e) => {
    if (e.keyCode === 13) {
      switch (e.target.nextElementSibling.nextElementSibling.value) {
        case "Google":
          window.open("//www.google.com/search?q=" + e.target.value);
          break;
        case "Bing":
          window.open("//www.bing.com/search?q=" + e.target.value);
          break;
        case "Youtube":
          window.open(
            "//www.youtube.com/results?search_query=" + e.target.value
          );
          break;
        case "TikTok":
          window.open("//www.tiktok.com/search?q=" + e.target.value);
          break;
        case "Yahoo":
          window.open("//search.yahoo.com/search?p=" + e.target.value);
          break;
        default:
          break;
      }
    }
  };
  //search the input when the user change the selection and the search bar is expanded
  const searchInput2 = (e) => {
    if (expSearch === true&&inputRef.current.value.trim()!=="") {
      switch (e.target.value) {
        case "Google":
          window.open("//www.google.com/search?q=" + inputRef.current.value);
          break;
        case "Bing":
          window.open("//www.bing.com/search?q=" + inputRef.current.value);
          break;
        case "Youtube":
          window.open(
            "//www.youtube.com/results?search_query=" + inputRef.current.value
          );
          break;
        case "TikTok":
          window.open("//www.tiktok.com/search?q=" + inputRef.current.value);
          break;
        case "Yahoo":
          window.open("//search.yahoo.com/search?p=" + inputRef.current.value);
          break;
        default:
          break;
      }
    }
  };
  //handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <button type="button" onClick={toggleExpSearch} className="searchButton">
        {expSearch ? (
          <box-icon
            name="x-circle"
            animation="tada-hover"
            color="#456be7"
          ></box-icon>
        ) : (
          <box-icon
            name="search"
            animation="tada-hover"
            color="#456be7"
          ></box-icon>
        )}
      </button>
      <input
        ref={inputRef}
        type="search"
        className={expSearch ? "exp-search-show" : null}
        placeholder="search..."
        onKeyUp={searchInput}
        value={transcript || input}
        onInput={(e) => {
          handleChange(e);
          resetTranscript();
        }}
      />
      {/* conditionally render different icon based on if the voice search is active */}
      {expSearch ? (
        listening ? (
          <box-icon
            name="microphone"
            type="solid"
            color="#20201e"
            style={{
              margin: "0 0 0 15px",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={SpeechRecognition.stopListening}
            animation="flashing"
          ></box-icon>
        ) : (
          <box-icon
            name="microphone"
            type="solid"
            color="#20201e"
            style={{
              margin: "0 0 0 15px",
              fontSize: "22px",
              cursor: "pointer",
              }}
              animation="tada-hover"
            onClick={SpeechRecognition.startListening}
          ></box-icon>
        )
      ) : null}
      <select className="custom-select" onChange={searchInput2}>
        <option value="Google">Google</option>
        <option value="Bing">Bing</option>
        <option value="Youtube">Youtube</option>
        <option value="TikTok">Tik Tok</option>
        <option value="Yahoo">Yahoo</option>
      </select>
    </div>
  );
}
