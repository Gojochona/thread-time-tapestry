import fabric from "@/assets/fabric.png";
import tape from "@/assets/tape.png";

export function Blobs({ variant = "default" }: any) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft color blobs */}
      <div
        className="blob absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.1 60 / 0.5), transparent 70%)" }}
      />
      <div
        className="blob absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.15 260 / 0.25), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="blob absolute -bottom-40 left-1/4 h-[450px] w-[450px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.16 50 / 0.3), transparent 70%)", animationDelay: "-12s" }}
      />
      {/* Irregular organic shapes — abstract blue navy splotches like the design */}
      <svg className="absolute -right-10 top-20 h-72 w-72 opacity-30" viewBox="0 0 200 200" fill="none">
        <path
          fill="oklch(0.55 0.12 260)"
          d="M48.5,-58.4C61.6,-46.7,69.3,-29.7,71.1,-12.5C72.8,4.7,68.7,22.1,58.6,34.7C48.6,47.4,32.6,55.3,15.2,61.1C-2.2,66.8,-21.1,70.4,-36.4,63.7C-51.7,57,-63.5,40,-69.1,21.4C-74.7,2.7,-74.1,-17.6,-65.3,-32.9C-56.5,-48.3,-39.6,-58.7,-22.6,-65.9C-5.5,-73.1,11.7,-77,26.7,-72.7C41.7,-68.5,54.4,-56.1,48.5,-58.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg className="absolute -left-16 bottom-1/4 h-80 w-80 opacity-20" viewBox="0 0 200 200" fill="none">
        <path
          fill="oklch(0.72 0.18 50)"
          d="M40,-52C50.6,-41.5,56.5,-27.4,60.6,-12.4C64.7,2.7,67.1,18.6,60.7,30.4C54.4,42.3,39.4,50.1,24.2,55.2C8.9,60.4,-6.6,62.8,-22.4,59.8C-38.2,56.7,-54.4,48.2,-62.6,34.8C-70.7,21.4,-70.9,3.1,-65.4,-11.8C-59.9,-26.7,-48.7,-38.2,-36.3,-48.2C-23.9,-58.1,-11.9,-66.6,1.6,-68.6C15.2,-70.6,30.5,-66,40,-52Z"
          transform="translate(100 100)"
        />
      </svg>
      {variant === "rich" && (
        <>
          <img src={fabric} alt="" className="float absolute -right-10 top-1/4 h-80 w-auto opacity-25 mix-blend-multiply" style={{ animationDelay: "-4s" }} />
          <img src={tape} alt="" className="float absolute -left-12 bottom-20 h-72 w-auto opacity-20" style={{ animationDelay: "-8s" }} />
        </>
      )}
    </div>
  );
}
