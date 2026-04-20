import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

type revieweditorprops = {
  username: string | undefined;
  avatar: string | undefined;
  userId: number | undefined;
  eventId: number | undefined;
};

export default function Revieweditor({
  username,
  avatar,
  userId,
  eventId,
}: revieweditorprops) {
  const [previewstar, setpreviewstar] = useState<number>(0);
  const [star, setStar] = useState<number>(0);
  const [review, setReview] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const { data } = await axiosInstance.post(`/transactions/attendance/`, {
          data: { eventId: eventId, userId: userId },
        });
        setAttendance(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAttendance();
  }, [userId]);

  const postreview = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (review == "") {
      return toast.error("Text must not empty");
    }
    const payload = {
      text: review,
      rating: star,
      userId: userId,
      eventId: eventId,
    };
    try {
      await axiosInstance.post("/reviews", payload);
      toast.success("Review submitted!");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-70 border border-neutral-200 overflow-hidden  flex flex-col rounded-2xl drop-shadow-md bg-white mb-5">
      {attendance?.length == 0 ? (
        <div className="bg-gray-400/20 backdrop-blur-[2px] w-full h-full absolute flex justify-center items-center text-neutral-500 ">
          You only may review if you attend the event
        </div>
      ) : (
        ""
      )}
      <div
        className={`p-5 w-full min-h-70 flex flex-col disabled ${attendance?.length == 0 ? "pointer-events-none" : ""}`}
      >
        <div className="flex gap-5 items-center">
          <img
            src={avatar ?? "https://placehold.co/100"}
            className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden object-cover outline-none"
          ></img>{" "}
          <span>{username ?? "USER_NAME_HERE"}</span>
          {/* custom star UI */}
          <div
            className="flex cursor-pointer"
            onMouseLeave={() => setpreviewstar(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex text-amber-500">
                <div
                  onMouseEnter={() => setpreviewstar(n)}
                  onClick={() => setStar(n)}
                >
                  {(previewstar || star) < n ? "☆" : "★"}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end of custom star UI */}
        <textarea
          maxLength={500}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border text-sm border-neutral-200 w-full grow mt-3 p-2"
        ></textarea>
        {attendance?.length > 0 ? (
          <button
            onClick={postreview}
            className="px-5 py-2 bg-[#e5ff07] rounded-lg mt-5 hover:bg-[#d4e207]"
          >
            {" "}
            Submit Review{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
