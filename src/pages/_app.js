import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-[#16213E] overflow-x-hidden">
      <Component {...pageProps} />
    </div>
  );
}
