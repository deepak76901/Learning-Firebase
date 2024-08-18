import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Loader2 } from "lucide-react";

export default function DetailsPage() {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    firebase.getBookById(params.id).then((value) => setData(value.data()));
  }, [params]);

  if(data === null) return <h2>Loading...</h2>;
  return <div className="container">
    <img src={data.imageURL} alt="Loading..." />
  </div>;
}
