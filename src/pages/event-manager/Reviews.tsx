import { useEffect, useState } from "react";
import { Link } from "react-router";
import Reviewpagecard from "./Reviewpagecard";
import { axiosInstance } from "../../lib/axios";

type ReviewItem = {
  id: number;
  text: string;
  rating: number;
  event: {
    name: string;
    thumbnail: string;
  };
  reviewer: {
    fullName: string;
    avatar: string;
  };
};

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await axiosInstance.get<ReviewItem[]>("/reviews");
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div className="w-full flex min-h-screen">
      <div className="md:w-[70%] max-w-250 flex flex-col bg-white px-10 py-8">
        <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
          <Link to="/">
            <span className="hover:text-neutral-900 cursor-pointer">Home</span>
          </Link>
          <span className="mx-1">&gt;</span>
          <Link to="/profile" className="hover:text-neutral-900 cursor-pointer">
            Event Manager
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-neutral-700">Reviews</span>
        </nav>
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">My Reviews</h1>
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <Reviewpagecard
              key={r.id}
              eventName={r.event.name}
              avatar={r.reviewer.avatar}
              text={r.text}
              rating={r.rating}
              reviewerName={r.reviewer.fullName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
