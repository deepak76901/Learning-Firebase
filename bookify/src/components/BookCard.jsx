import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function BookCard(props) {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() =>
      firebase.getImageUrl(props.imageURL).then((url) => setImageUrl(url))
    );
  }, []);
  return (
    <Card style={{ width: "2rem", padding: "1rem", maxWidth: "18rem" }}>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <Card.Img variant="top" src={imageUrl} alt={`Loading...`} />
      )}
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {`THis book is sold by ${props.username}, and the cost of the book is Rs.${props.price}`}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/book/view/${props.id}`)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
