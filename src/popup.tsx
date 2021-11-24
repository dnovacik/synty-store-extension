import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Pack } from "./models";

export const Popup = ({}) => {
  const [packs, setPacks] = useState<Pack[]>();
  chrome.storage.sync
    .get(["syntyAssets"])
    .then((data) => setPacks(data["syntyAssets"]));
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
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
