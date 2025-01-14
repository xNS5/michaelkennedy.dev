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
  <Article className={`h-auto`}>
    {/* Section One */}
      <h1 className={`text-center`}>{config.title}</h1>
      <section id="social" className={`grid grid-cols-2 justify-center`}>
          <div className={`flex flex-row justify-end mx-5`}>
              <div className={`flex flex-col justify-center items-center`}>
                  <Image
                      id={"profile_picture"}
                      src={profilePicture}
                      alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                      className="block rounded-3xl"
                      width={450}
                      height={450}
                  />
                  <span className={`flex flex-row`}>
                  {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
                      <Link key={i} href={link.url} className="mx-5 w-10 h-auto" target={link.target}>
                          <Icon type={link.icon ?? ""} altText={link.alt} className={`text-black`}/>
                          <p className={`hidden md:visible`}>{link.title}</p>
                      </Link>
                  ))}
            </span>
              </div>
          </div>
          <div className={`flex flex-col justify-start mx-5`}>
              <h2>{sectionOneData.title}</h2>
              <Text className={`text-xl`} text={sectionOneData.text}/>
          </div>
      </section>
      <section id="technologies">
          <h2>{sectionTwoData.title}</h2>
          <Text className={`text-xl`} text={sectionTwoData.text}/>
      </section>
  </Article>
  )
}