import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactAudioPlayer from "react-audio-player";
useRouter;
const Index = () => {
  const router = useRouter();
  return (
    <>
      <ReactAudioPlayer src="/assets/audios/METAMORPHOSIS.mp3" autoPlay loop />
      <div className="flex h-screen w-full items-center justify-center bg-[#16213E] bg-cover bg-no-repeat">
        <div className="rounded-xl bg-[#0F3460] bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 hover:bg-cyan-600">
          <div className="text-white">
            <div className="mb-4 flex flex-col items-center">
              <Image
                src="/assets/images/profile 2.jpg"
                width={100}
                height={50}
                alt="logo"
                className="rounded-full"
              />
              <h1 className="mt-3 mb-2 text-2xl">Subhranshu Choudhury</h1>
              <Image
                onClick={() =>
                  router.push(
                    "https://www.linkedin.com/in/subhranshusekharchoudhury/"
                  )
                }
                src="/assets/images/linkedin.gif"
                width={100}
                height={50}
                alt="linked in logo"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
