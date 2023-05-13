import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import swal from "sweetalert";
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("AUTH_DATA") &&
      localStorage.getItem("AUTH_DATA") !== undefined
    ) {
      const Data = JSON.parse(localStorage.getItem("AUTH_DATA"));
      if (Data.accessToken !== null) {
        const options = {
          method: "GET",
          headers: {
            "x-access-token": Data.accessToken.toString(),
          },
        };

        fetch("https://keeper-backend-eight.vercel.app/api/verify", options)
          .then((response) => response.json())
          .then((response) => {
            if (response?.success) {
              router.replace("/notes");
            } else {
              router.replace("/auth/login");
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Network or server error!","try again after sometime.","error")
          });
      } else {
        router.replace("/auth/login");
      }
    } else {
      router.replace("/auth/register");
    }
  }, []);

  return (
    <>
      <div className="flex bg-[#16213E] h-screen justify-center items-center">
        <div className="bg-[#0F3460] p-10 rounded-lg  shadow-2xl text-white">
          {/* task: lower the image size */}
          <Image
            src="/assets/images/loading-dot.gif"
            alt="loading"
            width={100}
            height={100}
          ></Image>
        </div>
      </div>
    </>
  );
};

export default Home;
