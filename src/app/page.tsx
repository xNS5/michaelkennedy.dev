import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import { Config, SectionType } from "@/lib/config-provider";
import profilePicture from "../../public/images/profile_picture.png";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons/icon";
import Article from "@/components/article/article";
import type { Link as LinkType } from "@/lib/config-provider";

import "./home.css"

export default async function Home() {
  const {config}: Config = await getDocument<Config>("config", "config");
  const { sections }: { sections: SectionType[] } = config.pages.home;
  const sectionOneData = sections[0];
  const sectionTwoData = sections[1];

  return   (
  <Article className={`h-auto w-screen`}>
    {/* Section One */}
      <section id="about" className={"bg-white flex flex-col md:flex-row justify-center items-center"}>
          <div className={`flex flex-col justify-center items-center mx-5 my-10`}>
              <Image
                  id={"profile_picture"}
                  src={profilePicture}
                  alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                  className="block rounded-3xl shadow"
                  width={350}
                  height={350}
              />
              <span className={`flex flex-row`}>
              {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
                  <Link key={i} href={link.url} className="mx-5 w-10 h-auto" target={link.target}>
                      <Icon type={link.icon ?? ""} altText={link.alt} className={`text-${link.color}`}/>
                      <p className={`hidden md:visible`}>{link.title}</p>
                  </Link>
              ))}
        </span>
          </div>
          <div className={`flex flex-col justify-center items-center max-w-[700px]`}>
              <h1>{sectionOneData.title}</h1>
              <Text className={`md:text-xl`} text={sectionOneData.text}/>
          </div>
      </section>
      {/* Section Two */}
      <section id="technologies" className={`text-white bg-black bg-opacity-80`}>
          <h2>{sectionTwoData.title}</h2>
          <div className={`flex flex-row justify-center items-center`}>
              <Text className={`md:text-xl`} text={sectionTwoData.text}/>
          </div>
      </section>
  </Article>
  )
}