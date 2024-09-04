import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Loader2 } from "lucide-react";

export default function DetailsPage() {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  console.log("Data ", data);

  useEffect(() => {
    firebase.getBookById(params.id).then((value) => setData(value.data()));
  }, [params]);

  useEffect(() => {
    const getImage = async () => {
      console.log("Fetching image");
      const snapshot = await firebase.getImageUrl(data?.imageURL);
      setImageUrl(snapshot)
    };
    if (data) {
      getImage();
    }
  }, [data]);

  if (!data) return <h3>Loading...</h3>;
  return (
    <div className="container">
      <img src={imageUrl} alt="Loading..." loading="lazy" />
      <p>{data.name}</p>
    </div>
  );
}
