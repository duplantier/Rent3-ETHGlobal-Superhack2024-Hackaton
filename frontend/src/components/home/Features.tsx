"use client";
import { Clipboard } from "lucide-react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
const Skeleton = ({ source }: { source: string }) => (
  <div className="flex justify-center items-center  min-h-[6rem] ">
    <Image
      src={source}
      alt={`Picture of the ${source}`}
      width={2500}
      height={100}
      className="w-full inline-block h-full select-none object-cover rounded-xl "
    />
  </div>
);
export const Features: React.FC = () => {
  const items = [
    {
      title: "Transparency and Trust",
      description:
        "Base's smart contracts ensure trustless transactions, while Blockscout provides transparent, it's easily auditable records.",
      header: <Skeleton source={"/trust.svg"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Security",
      description:
        "Base secures contract execution, Blockscout enhances transparency, and Worldcoin adds biometric user verification for added protection.",
      header: <Skeleton source={"/security.svg"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Reduced Costs",
      description:
        "Base's low fees and Mode's seamless crypto payments minimize costs by eliminating traditional banking fees and intermediaries.",
      header: <Skeleton source={"/money.svg"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Centralized & Global Identity Verification",
      description:
        " Worldcoin's biometric verification ensures secure, global identity verification, enabling trustless transactions.",
      header: <Skeleton source={"/worldcoin.png"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Faster Transactions",
      description:
        "Base ensures near-instant contract execution, and Mode enables rapid crypto payments, speeding up the rental process.",
      header: <Skeleton source={"/time.svg"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Privacy",
      description:
        "Worldcoin offers pseudonymous identity verification, and Base supports private, secure transactions without personal data exposure.",
      header: <Skeleton source={"/security"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Fraud Prevention",
      description:
        "Blockscout's transparent records and Worldcoin's verified users reduce the risk of fraud on the platform.",
      header: <Skeleton source={"/security"} />,
      icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
    },
  ];
  return (
    <section className="min-h-[100vh] py-16 w-full bg-brand-white dark:bg-brand-black flex flex-col items-center justify-center  bg-grid-small-black/[0.08] dark:bg-grid-small-white/[0.1] relative overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-brand-black bg-brand-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col justify-center items-center z-50">
        <h1 className="text-5xl font-bold text-brand-black dark:text-brand-white mb-8">
          Key Features
        </h1>
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};
