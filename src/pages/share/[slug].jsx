import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
export const getServerSideProps = async (context) => {
  let { slug } = context.query;

  if (!slug) {
    slug = null;
  }
  return { props: { slug: slug } };
};
const Slug = (props) => {
  const [Fetching, setFetching] = useState(true);
  const [NOTE, setNote] = useState({
    keepId: "...",
    creator: "...",
    title: "...",
    content: "...",
    sharedon: 0,
    timestamp: 0,
  });
  const router = useRouter();
  const fetchShare = () => {
    console.log("viewing...");
    const options = { method: "GET" };

    fetch(
      `https://keeper-backend-theta.vercel.app/api/share/${props.slug}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success" && response.data !== null) {
          setFetching(false);
          NOTE.title = response.data.title;
          NOTE.content = response.data.content;
          NOTE.timestamp = response.data.timestamp;
          NOTE.creator = response.data.creator;
          NOTE.sharedon = response.data.sharedon;
          NOTE.keepId = response.data._id;
        } else {
          swal("No document found!", "", "info");
          router.replace("/");
        }
      })
      .catch((err) => {
        swal("Server or network error!", "Try again after sometime.", "error");
        // router.reload();
        setFetching(false);
        console.error(err);
      });
  };
  useEffect(() => {
    fetchShare();
  }, []);
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        {!Fetching ? (
          <div className="bg-[#0F3460] p-10 rounded-xl relative shadow-2xl overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
            <div>
              <form action="">
                <input
                  placeholder="Title..."
                  required
                  className="w-full mb-8 text-white text-center h-10 text-xl outline-none focus:ring-4 rounded-lg bg-[#151d38]"
                  type="text"
                  readOnly={true}
                  defaultValue={NOTE.title || ""}
                  name=""
                  id=""
                />
                <textarea
                  placeholder="Add your note ✍️..."
                  required
                  rows={10}
                  readOnly={true}
                  className="w-full text-white p-2 outline-none focus:ring-4 rounded-lg bg-[#151d38]"
                  type="text"
                  defaultValue={NOTE.content || ""}
                  name=""
                  id=""
                />
                <div title="created at" className="flex justify-between">
                  <p className="mt-5 text-[#9d9fa4] hover:text-white">
                    {new Date(NOTE?.timestamp)?.toDateString() || ""}
                  </p>
                  <p className="mt-5 text-[#9d9fa4] hover:text-white">
                    {new Date(NOTE?.timestamp)
                      .toLocaleTimeString()
                      ?.toUpperCase() || ""}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p
                    title="owner of the document"
                    className="mt-5 text-[#9d9fa4] hover:text-white"
                  >
                    @{NOTE.creator || ""}
                  </p>
                  <p
                    title="shared on"
                    className="mt-5 text-[#9d9fa4] hover:text-white"
                  >
                    {new Date(NOTE?.sharedon)
                      .toLocaleTimeString()
                      ?.toUpperCase() || ""}{" "}
                    {new Date(NOTE?.sharedon)
                      .toLocaleDateString()
                      ?.toUpperCase() || ""}
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 bg-[#000000ac] w-screen h-screen blur-1 flex justify-center items-center">
            <Image
              src={"/assets/images/loading-dot.gif"}
              width={80}
              height={80}
              alt="loading"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Slug;
