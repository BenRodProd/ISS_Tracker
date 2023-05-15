import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";
const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker() {
  //   const [coords, setCoords] = useState({
  //     longitude: 0,
  //     latitude: 0,
  //   });
  //   function getISSCoords(data) {
  //     setCoords({ longitude: data.longitude, latitude: data.latitude });
  //   }
  // async function getISSCoords() {
  //   try {
  //     const response = await fetch(URL);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCoords({ longitude: data.longitude, latitude: data.latitude });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const { data, error, isloading, mutate } = useSWR(URL, {
    refreshInterval: 1000,
  });
  function handleReload() {
    mutate({ ...data });
  }
  if (error) {
    alert("ERROR!!!!");
  }
  if (!data) {
    return <div>Is Loading...</div>;
  }

  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onRefresh={() => handleReload()}
      />
    </main>
  );
}
