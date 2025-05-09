import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../App";
export default function AdventureDetails() {
  const { id } = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdventure() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/adventures/${id}`);
        setAdventure(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchAdventure();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-xl">Loading...</div>;
  }

  if (!adventure) {
    return (
      <div className="p-8 text-center text-xl text-red-600">
        Adventure not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <img
        src={`${adventure.image}`}
        alt={adventure.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{adventure.name}</h1>
      <p className="text-gray-600 mb-4">
        {adventure.location} • {adventure.duration}
      </p>
      <p className="text-lg text-gray-800 mb-6">{adventure.longDescription}</p>

      <div className="text-amber-600 font-semibold">
        Price: ${adventure.price}
      </div>
      <div className="text-gray-600 mt-2">
        Difficulty: {adventure.difficulty}
      </div>
      <div className="text-gray-600">Rating: {adventure.rating}</div>
    </div>
  );
}
