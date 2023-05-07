import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const CreateNote = () => {
  const router = useRouter();
  const titleString = useRef();
  const contentString = useRef();
  const [date, setdate] = useState(null);
  // const [Note, setNote] = useState({
  //   title: "",
  //   content: "",
  // });
  useEffect(() => {
    if (localStorage.getItem("DRAFT_TITLE")) {
      titleString.current.value = localStorage.getItem("DRAFT_TITLE");
    }
    if (localStorage.getItem("DRAFT_CONTENT")) {
      contentString.current.value = localStorage.getItem("DRAFT_CONTENT");
    }
    // for current time and date.
    setdate(new Date());
    setInterval(() => {
      const d = new Date();
      setdate(d);
    }, 1000);

    // others
  }, []);

  const postKeep = () => {
    if (!localStorage.getItem("AUTH_DATA")) {
      router.replace("/auth/register");
      return;
    }
    if (
      titleString.current.value.length === 0 &&
      contentString.current.value.length === 0
    )
      return;
    const myPost = {
      title: titleString.current.value,
      content:contentString.current.value

    };
    const options = {
      method: "POST",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA")).accessToken || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myPost),
    };

    fetch("https://keeper-backend-eight.vercel.app/api/user/keep", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "request saved") {
          eraserButton();
          router.replace("/notes");
          return;
        }
      })
      .catch((err) => console.error(err));
  };

  // back function
  const backButton = () => {
    router.back();
  };
  // eraser function
  const eraserButton = () => {
    titleString.current.value = "";
    contentString.current.value = "";
    localStorage.setItem("DRAFT_TITLE", "");
    localStorage.setItem("DRAFT_CONTENT", "");
  };
  // tick function
  // const tickButton = () => {
  //   postKeep();
  // };

  return (
    <>
      <div className="flex bg-[#16213E] h-screen justify-center items-center">
        <div className="bg-[#0F3460] p-10 rounded-lg  shadow-2xl">
          <div className="flex justify-between">
            <div>
              <div
                onClick={backButton}
                className="bg-white w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <img
                  width={30}
                  src="/assets/images/back.png"
                  alt="back button"
                />
              </div>
            </div>
            <div>
              <div
                onClick={eraserButton}
                className="inline-block mr-3 bg-red-300 w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <img
                  width={30}
                  src="/assets/images/eraser.png"
                  alt="eraser button"
                />
              </div>
              <div
                onClick={postKeep}
                className="inline-block bg-green-300 w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <img
                  width={30}
                  src="/assets/images/tick.png"
                  alt="tick button"
                />
              </div>
            </div>
          </div>
          <form action="">
            <input
              placeholder="Title..."
              required
              className="w-full mb-8 text-white text-center h-10 text-xl outline-none focus:ring-4 rounded-lg bg-[#151d38]"
              type="text"
              onChange={(e) => {
                // Note.title = e.target.value;
                localStorage.setItem("DRAFT_TITLE", e.target.value);
              }}
              ref={titleString}
              name=""
              id=""
            />
            <textarea
              placeholder="Add your note ✍️..."
              required
              onChange={(e) => {
                localStorage.setItem("DRAFT_CONTENT", e.target.value);
                // Note.content = e.target.value;
              }}
              rows={10}
              className="w-full text-white p-2 outline-none focus:ring-4 rounded-lg bg-[#151d38]"
              type="text"
              ref={contentString}
              name=""
              id=""
            />
            <div className="flex justify-between">
              <p className="mt-5 text-[#9d9fa4]">
                {new Date().toLocaleDateString()}
              </p>
              <p className="mt-5 text-[#9d9fa4]">
                {date ? date.toLocaleTimeString().toUpperCase() : "..."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
