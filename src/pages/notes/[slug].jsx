import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
export const getServerSideProps = async (context) => {
  let { slug } = context.query;

  if (!slug) {
    slug = null;
  }
  return { props: { slug: slug } };
};
const Slug = (props) => {
  const { slug } = props;
  const titleString = useRef();
  const contentString = useRef();
  const router = useRouter();
  const [Fetching, setFetching] = useState(true);
  const [isReadOnly, setisReadOnly] = useState(true);
  const [NOTE, setNOTE] = useState({
    keepId: "",
    doc_Id: "",
    title: "",
    content: "",
    timestamp: 0,
  });
  const [loading, setLoading] = useState(false);

  // const [date, setdate] = useState(null);

  // back function
  // const backButton = () => {
  //   router.back();
  // };
  // eraser function
  const eraserButton = () => {
    // alert(titleString.current.value);

    if (isReadOnly) return;
    titleString.current.value = "";
    contentString.current.value = "";
    // setNOTE({
    //   title: "",
    //   content: "",
    //   timestamp: new Date().getTime(),
    // });
  };
  // tick function
  const tickButton = () => {
    if (isReadOnly) return;
    setLoading(true);

    const NoteData = {
      title: titleString.current.value,
      content: contentString.current.value,
      keepId: NOTE.keepId,
    };
    if (NoteData.title.length === 0 && NoteData.content.length === 0) return;
    const options = {
      method: "PUT",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA")).accessToken || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NoteData),
    };

    fetch("https://keeper-backend-eight.vercel.app/api/user/keep", options)
      .then((response) => response.json())
      .then((response) => {
        setLoading(true);
        if (response?.message === "Unauthorized!") {
          // work: check for bug
          //  localStorage.setItem("NOTES_DATA", null);
          localStorage.setItem("AUTH_DATA", null);
          router.replace("/auth/login");
          setLoading(false);

          return;
        } else {
          console.log(response);
          // alert("Updated");
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };
  const fetchNote = async () => {
    if (!localStorage.getItem("AUTH_DATA")) {
      router.replace("/auth/register");
      return;
    }
    if (!slug) return;
    const options = {
      method: "GET",
      headers: {
        "x-access-token":
          JSON.parse(localStorage.getItem("AUTH_DATA")).accessToken || "",
      },
    };

    fetch(
      `https://keeper-backend-eight.vercel.app/api/user/keep/${slug}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response?.message === "Unauthorized!") {
          // work: check for bug
          // localStorage.setItem("NOTES_DATA", null);
          localStorage.setItem("AUTH_DATA", null);
          router.replace("/auth/login");
          return;
        } else {
          // console.log(response);
          NOTE.doc_Id = response?.[0]?._id;
          NOTE.keepId = response?.[0]?.keeps?.[0]?._id;
          NOTE.title = response?.[0]?.keeps?.[0]?.title;
          NOTE.content = response?.[0]?.keeps?.[0]?.content;
          NOTE.timestamp = response?.[0]?.keeps?.[0]?.timestamp;
          setFetching(false);
          // console.log(NOTE);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchNote();
    // for current time and date.
  }, []);
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        {!Fetching ? (
          <div className="bg-[#0F3460] p-10 rounded-xl relative  shadow-2xl overflow-hidden">
            <div>
              <div className="flex justify-between">
                <div>
                  <div
                    onClick={() => router.back()}
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
                    onClick={() => setisReadOnly(!isReadOnly)}
                    className="inline-block mr-3 bg-white w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
                  >
                    <img
                      width={30}
                      src="/assets/images/editpencil.png"
                      alt="eraser button"
                    />
                  </div>
                  {!isReadOnly ? (
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
                  ) : null}

                  {!isReadOnly ? (
                    <div
                      onClick={tickButton}
                      className="inline-block bg-green-300 w-fit p-2 rounded-full mb-5 cursor-pointer hover:scale-125"
                    >
                      <img
                        width={30}
                        src="/assets/images/tick.png"
                        alt="tick button"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <form action="">
                <input
                  ref={titleString}
                  placeholder="Title..."
                  required
                  className="w-full mb-8 text-white text-center h-10 text-xl outline-none focus:ring-4 rounded-lg bg-[#151d38]"
                  type="text"
                  readOnly={isReadOnly}
                  onChange={(e) => {
                    NOTE.title = e.target.value;
                  }}
                  defaultValue={NOTE.title || ""}
                  name=""
                  id=""
                />
                <textarea
                  placeholder="Add your note ✍️..."
                  required
                  ref={contentString}
                  rows={10}
                  readOnly={isReadOnly}
                  className="w-full text-white p-2 outline-none focus:ring-4 rounded-lg bg-[#151d38]"
                  type="text"
                  onChange={(e) => (NOTE.content = e.target.value)}
                  defaultValue={NOTE.content || ""}
                  name=""
                  id=""
                />
                <div className="flex justify-between">
                  <p className="mt-5 text-[#9d9fa4]">
                    {new Date(NOTE?.timestamp)?.toDateString() || ""}
                  </p>
                  <p className="mt-5 text-[#9d9fa4]">
                    {new Date(NOTE?.timestamp)
                      .toLocaleTimeString()
                      ?.toUpperCase() || ""}
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
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="absolute top-0 left-0 bg-[#000000ac] w-screen h-screen blur-1 flex justify-center items-center">
            <Image
              src={"/assets/images/loading-dot.gif"}
              width={80}
              height={80}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Slug;
