import "@/styles/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className="bg-[#16213E] overflow-x-hidden">
      <div className="h-10"></div>
      <Image
        onClick={() => router.push("/")}
        className="fixed m-5 hover:cursor-pointer transition ease-in-out delay-150 hover:rotate-12 hover:scale-110 rounded-xl"
        src={"/assets/images/keeper (1).png"}
        width={100}
        height={100}
        alt="logo"
      ></Image>
      <Component {...pageProps} />
    </div>
  );
}
