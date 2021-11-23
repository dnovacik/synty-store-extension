import React from "react";
import { Pack } from "./models";

export const PackData = ({ pack }: { pack: Pack }): JSX.Element => {
  return (
    <div>
      <p>{pack.name}</p>
      {pack.owned.UAS ? <span>Owned on Unity Asset Store</span> : null}
      {pack.owned.SS ? <span>Owned on Synty Store</span> : null}
    </div>
  );
};
