import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Pack } from "./models";

export const Popup = ({}) => {
  const [packs, setPacks] = useState<Pack[]>();

  const reloadPacks = () => {
    chrome.storage.sync
      .get(["syntyAssets"])
      .then((data) => setPacks(data["syntyAssets"]));
  };
  reloadPacks();

  const clearStorage = () => {
    chrome.storage.sync.set({ syntyAssets: [] }).then(() => reloadPacks());
  };

  return (
    <>
      <h3>Your Assets:</h3>
      {packs?.map((pack) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
          }}
        >
          <b>
            <span>{pack.name}</span>
          </b>
          <span>Series: {pack.type}</span>

          {pack.owned.UAS ? <span>Owned on UAS</span> : null}
          {pack.owned.SS ? <span>Owned on SS</span> : null}
        </div>
      ))}

      <div>
        <button
          onClick={reloadPacks}
          style={{
            margin: "10px",
            marginTop: "20px",
          }}
        >
          Reload
        </button>
        <button
          onClick={clearStorage}
          style={{
            margin: "10px",
          }}
        >
          Clear Storage
        </button>
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
