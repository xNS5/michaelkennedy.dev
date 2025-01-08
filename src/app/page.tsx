import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import { Config, SectionType } from "@/lib/config-provider";
import profilePicture from "../../public/images/profile_picture.png";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import type { Link as LinkType } from "@/lib/config-provider";
import Icon from "@/components/icons/icon";

export default async function Home() {
  const {config, footer, navbar}: Config = await getDocument<Config>("config", "config");
  const { sections }: { sections: SectionType[] } = config.pages.home;
  const sectionOneData = sections[0];
  const sectionTwoData = sections[1];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <article className="rounded-3xl shadow-xl border border-slate-200 px-10 w-50" style={{backgroundColor: "rgb(245, 243, 241)"}}>
          {/* Section One */}
          <section id="about" className="grid grid-cols-1 place-items-center p-10">
            <Image
              src={profilePicture}
              alt="Picture of the author"
              sizes="(max-width: 500px) 50vw"
              className="rounded-full align-end"
              style={{
                width: "25vw",
                height: "auto",
              }}
            />
            <div className="flex">
            {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
              <Link key={i} href={link.url} className="mx-5" target={link.target}>
                <Icon type={link.icon ?? ""} altText={link.alt}/>
                {link.title}
              </Link>
            ))}
            </div>
            <div>
              <h2 className="font-medium">{sectionOneData.title}</h2>
              <Text className="text-xl" text={sectionOneData.text} />
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

