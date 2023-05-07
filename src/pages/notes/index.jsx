import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [NOTES, setNOTES] = useState("");
  const router = useRouter();
  const fetchNotes = () => {
    const OfflineData = localStorage.getItem("NOTES_DATA");
    if (OfflineData) {
      setNOTES(JSON.parse(OfflineData));
    }
    const options = {
      method: "GET",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA")).accessToken || "",
      },
    };

    fetch("https://keeper-backend-eight.vercel.app/api/user/keeps", options)
      .then((response) => response.json())
      .then((response) => {
        if (response?.message === "Unauthorized!") {
          // work: check for bug
          localStorage.setItem("NOTES_DATA", null);
          router.replace("/auth/login");
          return;
        } else {
          setNOTES(response?.[0]?.keeps);
          localStorage.setItem(
            "NOTES_DATA",
            JSON.stringify(response[0]?.keeps)
          );
        }
        // console.log(response[0].keeps);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="bg-[#16213E] min-h-screen w-screen">
      <div className="flex justify-center flex-wrap">
        {NOTES ? (
          NOTES.map((item, index) => {
            return (
              <div
                onClick={() => {
                  router.push(`/notes/${item._id}`);
                }}
                key={index}
                className="bg-white inline-block p-3 m-5 rounded w-[200px] h-[250px] hover:bg-green-400 hover:cursor-pointer hover:text-white"
              >
                <p className="font-bold">{item?.title}</p>
                <p>{item.content}</p>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {/* bottom buttons */}
      <div className="fixed bottom-0 w-full">
        <button className="my-8 m-2 float-right px-5 py-2 bg-red-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none">
          Back
        </button>
        <button className="my-8  m-2 px-5 py-2 bg-red-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none">
          Logout
        </button>
        <button
          onClick={() => {
            router.push("notes/create-note");
          }}
          className="bottom-0 m-2 my-8 float-right px-5 py-2 bg-red-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none"
        >
          Create Note
        </button>
      </div>
    </div>
  );
};

export default Index;
