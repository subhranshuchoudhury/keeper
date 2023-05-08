import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [NOTES, setNOTES] = useState("");
  const router = useRouter();
  const fetchNotes = () => {
    if (!JSON.parse(localStorage.getItem("AUTH_DATA"))?.accessToken) {
      router.replace("/auth/login");
      return;
    }
    const OfflineData = localStorage.getItem("NOTES_DATA");
    if (OfflineData) {
      setNOTES(JSON.parse(OfflineData));
    }
    const options = {
      method: "GET",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA"))?.accessToken || "",
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
            const time = new Date(item?.timestamp)?.toLocaleTimeString();
            const date = new Date(item?.timestamp)?.toLocaleDateString();
            return (
              <div>
                <button className="group relative p-3 block m-5 rounded w-[200px] h-[250px] hover:cursor-pointer bg-[#102979]">
                  <span
                    onClick={() => {
                      router.push(`/notes/${item?._id}`);
                    }}
                    key={index}
                    className="transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 duration-200 text-white absolute w-full h-full top-0 left-0 flex justify-center flex-col items-center group-hover:top-5 group-hover:-left-5 rounded-lg"
                  >
                    <span className="block font-bold">{item?.title}</span>
                    <span className="block">
                      {item.content?.slice(0, 50)}...
                    </span>

                    <div className="absolute text-xs bottom-5 flex justify-between text-[#e5e5e5] w-[180px] uppercase">
                      <span>{time}</span>
                      <span>{date}</span>
                    </div>
                  </span>
                </button>
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
