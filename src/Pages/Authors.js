import React, { useEffect } from "react";
import useHeaderStore from "../Stores/Header";
//  import "";
export default function Authors() {
  const close = useHeaderStore((state) => state.close);

  useEffect(() => {
    close();
  }, [close]);
  return <div className="Authors">authors </div>;
}
