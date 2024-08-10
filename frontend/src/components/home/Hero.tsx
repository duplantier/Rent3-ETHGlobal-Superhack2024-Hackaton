import Link from "next/link";
import { Cover } from "../ui/cover";
import { Spotlight } from "../ui/spotlight";

export const Hero: React.FC = () => {
  return (
    <div className="min-h-[100vh] w-full flex md:items-center md:justify-center bg-brand-white dark:bg-brand-black  antialiased bg-grid-black/[0.09] dark:bg-grid-white/[0.05] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#27F2CD"
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-brand-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className=" p-4 max-w-7xl  mx-auto relative z-30 w-full pt-20 md:pt-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-50 py-6 bg-clip-text text-transparent bg-gradient-to-tr from-neutral-800 via-neutral-600 to-neutral-500 dark:from-neutral-800 dark:via-white dark:to-white ">
          Renting with a <Cover>contract-level</Cover> security and
          transparency.
        </h1>
        <p className="mt-4 font-normal text-base text-slate-500 dark:text-neutral-300 max-w-2xl text-center mx-auto">
          Rent3 is a decentralized rental platform that provides a secure and
          transparent rental experience, leveraging Base, Blockscout, and
          Worldcoin. Deployed on Mode.
        </p>
        <Link
          href="/get-started"
          className="w-[300px] mt-8 px-4 py-2 flex gap-2 justify-center items-center border-2 rounded-lg shadow-sm bg-gray-900 border-gray-400 hover:border-brand-primary  dark:hover:bg-gray-950  text-gray-50 dark:text-slate-300 dark:hover:text-brand-white dark:hover:border-brand-primary hover:text-brand-primary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
