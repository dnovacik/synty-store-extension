import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Pack } from "./models";
import { PackData } from "./packData";

export const Popup = ({}) => {
  const [packs, setPacks] = useState<Pack[]>();
  chrome.storage.sync
    .get(["syntyAssets"])
    .then((data) => setPacks(data["syntyAssets"]));
  return (
    <>
      <h3>Your Assets:</h3>
      {packs?.map((pack) => (
        <PackData pack={pack} key={packs?.indexOf(pack)} />
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
