import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
const CreateNote = () => {
  const router = useRouter();
  const titleString = useRef();
  const contentString = useRef();
  const [date, setdate] = useState(null);
  const [loading, setloading] = useState(false);
  // const [Note, setNote] = useState({
  //   title: "",
  //   content: "",
  // });
  useEffect(() => {
    // const { getItem } = localStorage;
    // const draftTitle = getItem("DRAFT_TITLE");
    // const draftContent = getItem("DRAFT_CONTENT");
    // const authData = getItem("AUTH_DATA");

    // titleString.current.value = draftTitle
    //   ? draftTitle
    //   : titleString.current.value;
    // contentString.current.value = draftContent
    //   ? draftContent
    //   : contentString.current.value;

    // if (!authData) {
    //   router.replace("/auth/login");
    //   return;
    // }
    if (localStorage.getItem("DRAFT_TITLE")) {
      titleString.current.value = localStorage.getItem("DRAFT_TITLE");
    }
    if (localStorage.getItem("DRAFT_CONTENT")) {
      contentString.current.value = localStorage.getItem("DRAFT_CONTENT");
    }
    if (!localStorage.getItem("AUTH_DATA")) {
      router.replace("/auth/login");
      return;
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
    ) {
      swal("Empty box!", "Title or content cannot be empty.", "info");
      return;
    }
    setloading(true);
    const myPost = {
      title: titleString.current.value,
      content: contentString.current.value,
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

    fetch("https://keeper-backend-theta.vercel.app/api/user/keep", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "request saved") {
          eraserButton();
          swal("Saved!", "Your document has been saved!.", "success");
          router.replace("/notes");
          return;
        } else {
          swal("Oops!", "Try again, the document is not saved.", "error");
        }
      })
      .catch((err) => console.error(err));
    setloading(false);
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
        <div className="bg-[#0F3460] p-10 rounded-lg  shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          <div className="flex justify-between">
            <div>
              <div
                onClick={backButton}
                className="bg-white w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <Image
                  width={30}
                  height={30}
                  src="/assets/images/back.png"
                  alt="back button"
                />
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  eraserButton();
                  router.replace("/notes");
                }}
                className="inline-block mr-3 w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <Image
                  width={41}
                  height={41}
                  src="/assets/images/delete.png"
                  alt="delete button"
                />
              </div>
              <div
                onClick={() => {
                  eraserButton();
                  swal(
                    "Cleared!",
                    "All the data fields are cleared.",
                    "success"
                  );
                }}
                className="inline-block mr-3 w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <Image
                  width={41}
                  height={41}
                  src="/assets/images/eraser (2).png"
                  alt="eraser button"
                />
              </div>
              <div
                onClick={postKeep}
                className="inline-block w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
              >
                <Image
                  width={41}
                  height={41}
                  src="/assets/images/save.png"
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
              <p className="mt-5 text-[#9d9fa4] hover:text-white">
                {new Date().toDateString()}
              </p>
              <p className="mt-5 text-[#9d9fa4] hover:text-white">
                {date ? date.toLocaleTimeString().toUpperCase() : "..."}
              </p>
            </div>
          </form>
        </div>
        {loading ? (
          <div className="absolute top-0 left-0 bg-[#000000ac] w-full h-full blur-1 flex justify-center items-center">
            <Image
              src={"/assets/images/loading-dot.gif"}
              width={80}
              height={80}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CreateNote;
