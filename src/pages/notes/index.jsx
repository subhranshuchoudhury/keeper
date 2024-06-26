import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
const Index = () => {
  const [NOTES, setNOTES] = useState(null);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchNotes = () => {
    setLoading(true);
    if (!JSON.parse(localStorage.getItem("AUTH_DATA"))?.accessToken) {
      router.replace("/auth/login");
      return;
    }
    const OfflineData = localStorage.getItem("NOTES_DATA");

    const options = {
      method: "GET",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA"))?.accessToken || "",
      },
    };

    fetch("https://keeper-backend-theta.vercel.app/api/user/keeps", options)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response?.message === "Unauthorized!") {
          // work: check for bug
          localStorage.clear();
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
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (OfflineData !== "undefined" && OfflineData) {
          setNOTES(JSON.parse(OfflineData));
        }
        swal("Network or server error!", "try again after sometime", "error");
      });
  };
  const logout = () => {
    localStorage.clear();
    router.replace("/auth/login");
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="bg-[#16213E] min-h-screen w-screen">
      <div className="m-10 flex justify-center flex-wrap mt-24">
        {NOTES?.length > 0 ? (
          NOTES.map((item, index) => {
            const time = new Date(item?.timestamp)?.toLocaleTimeString();
            const date = new Date(item?.timestamp)?.toLocaleDateString();
            // work: add a perfect delete function to handle this.
            if (item) {
              return (
                <div key={index}>
                  <button className="group relative block m-5 rounded w-[200px] h-[250px] hover:cursor-pointer hover:bg-[#6de8b7] hover:animate-pulse">
                    <span
                      onClick={() => {
                        router.push(`/notes/${item?._id}`);
                      }}
                      className="transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 duration-200 text-white absolute w-full h-full top-0 left-0 flex justify-center flex-col items-center group-hover:top-5 group-hover:-left-5 rounded-lg shadow-2xl"
                    >
                      <span className="block font-bold">{item?.title}</span>
                      <span className="block">
                        {item?.content?.slice(0, 50)}...
                      </span>

                      <div className="absolute text-xs bottom-5 flex justify-between text-[#e5e5e5] w-[180px] uppercase">
                        <span>{time}</span>
                        <span>{date}</span>
                      </div>
                    </span>
                  </button>
                </div>
              );
            }
          })
        ) : NOTES?.length == 0 ? (
          <div className="absolute top-0 left-0 bg-[#000000ac] w-full h-full blur-1 flex justify-center items-center">
            <Image
              src={"/assets/images/loading-dot.gif"}
              width={80}
              height={80}
              alt="loading"
            />
          </div>
        ) : null}
      </div>
      {/* bottom buttons */}
      <div className="fixed bottom-0 w-full">
        <button
          onClick={logout}
          className="my-8 px-5 py-2 hover:animate-pulse"
        >
          <Image
            src={"/assets/images/logout.png"}
            width={50}
            height={50}
            title="Logout"
            alt="logout"
          ></Image>
        </button>
        <button
          onClick={()=>router.push("/about")}
          className="my-8 py-2hover:animate-pulse"
        >
          <Image
            src={"/assets/images/talk.png"}
            width={50}
            height={50}
            title="About me"
            alt="about us"
          ></Image>
        </button>
        {Loading ? (
          <div className="my-8  m-2 px-5 py-2">
            <Image
              src={"/assets/images/loading-dot.gif"}
              width={70}
              height={70}
              alt="loading"
            ></Image>
          </div>
        ) : null}

        <button
          onClick={() => {
            router.push("notes/create-note");
          }}
          className="bottom-0 m-2 my-8 float-right px-5 py-2 hover:animate-spin"
        >
          <Image
            src={"/assets/images/plus.png"}
            alt="create note"
            width={50}
            title="Add new note"
            height={50}
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default Index;
