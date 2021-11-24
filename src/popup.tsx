import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { Pack, PersistedData } from "./models";
import "./popup.css";

import syntyLogo from "./assets/favicon.png";
import uasLogo from "./assets/unity.svg";

export const Popup = ({ }) => {
  const [data, setData] = useState<PersistedData>();
  const [grouped, setGrouped] = useState<Array<{ type: string, packs: Array<Pack> }>>();
  const [selectedGroup, setSelectedGroup] = useState<{ type: string, packs: Array<Pack> }>();

  useEffect(() => {
    reloadPacks()
  }, []);

  useEffect(() => {
    groupPacks();
  }, [data]);

  useEffect(() => {
    if (grouped) {
      setSelectedGroup(grouped[0]);
    }
  }, [grouped]);

  const reloadPacks = () => {
    chrome.storage.sync
      .get(["syntyAssets"])
      .then((data) => { console.log(data); setData(data["syntyAssets"]) });
  };

  const groupPacks = () => {
    if (data) {
      const groupped = _.chain(data.packs)
        .groupBy("type")
        .map((value, key) => {
          return {
            type: key,
            packs: _.sortBy(value, ["baseName"])
          }
        })
        .value();

      setGrouped(groupped);
    }
  }

  const clearStorage = () => {
    chrome.storage.sync.clear().then(() => reloadPacks());
  };

  const renderGroup = () => {
    return (
      selectedGroup &&
      <div style={{ display: "flex", flexDirection: "column", padding: "10px 15px", width: "100%", marginTop: "85px", height: "calc(320px - 85px)", overflowY: "scroll" }}>
        {
          selectedGroup.packs && selectedGroup.packs.map((pack, index) => {
            return (
              <div key={`pack-${index}`} style={{ display: "flex", flexDirection: "row", width: "100%", height: "30px", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex" }}>{pack.baseName}</span>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {
                    pack.owned.SS && <img style={{ display: "flex", width: "20px", height: "20px", marginLeft: "15px" }} src={syntyLogo} alt="Synty Store" />
                  }
                  {
                    pack.owned.UAS && <img style={{ display: "flex", width: "20px", height: "20px", marginLeft: "15px" }} src={uasLogo} alt="Unity Asset Store" />
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div style={{ width: "320px", height: "320px", display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll" }}>
      <div key={`group`} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "fixed", left: 0, top: 0, height: "85px", width: "100%", padding: "15px", borderBottom: "1px solid #000" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {
              grouped && grouped.map((group, index) => {
                return (
                  <h2 style={{ marginBottom: "15px", marginRight: "25px", borderBottom: group === selectedGroup ? "2px solid #000" : "none", cursor: "pointer" }} onClick={() => setSelectedGroup(group)}>{group.type} Series</h2>
                )
              })
            }
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <span style={{ display: "flex" }}>name</span>
            <span style={{ display: "flex" }}>bought on</span>
          </div>
        </div>
      </div>
      {
        renderGroup()
      }
    </div >
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
