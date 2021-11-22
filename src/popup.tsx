import React from "react";
import ReactDOM from "react-dom";

export const Popup = ({}) => {
  const sendScrapeUASMessage = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab.id) return console.log("CANNOT FIND TAB");

      chrome.tabs.sendMessage(activeTab.id, "syncUAS");
    });
  };

  return (
    <>
      <button onClick={sendScrapeUASMessage}>Sync Asset Store</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
