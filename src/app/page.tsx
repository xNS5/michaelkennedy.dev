import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import {Config } from "@/types/config";
import Link from "next/link";
import Icon from "@/components/icons/icon";
import Article from "@/components/article/article";
import type { Link as LinkType } from "@/types/config";
// import type {Education, Project, Skill, Highlight, Work} from "@/types/work";

import "./home.css";

export default async function Home() {
  const {home} = await getDocument<Config>("config", "config");
  const { sections } = home;
  const sectionOneData = sections[0];

  return   (
      <Article id={"home"} className={`flex flex-col justify-center items-center mt-[12%]`}>
          {/* Section One */}
          <section id="about"
                   className={"bg-stone-100 bg-opacity-95 flex flex-col xl:flex-row justify-center items-center rounded-xl"}>
              <div className={`container flex flex-col justify-center items-center m-5`}>
                  <img
                      id={"profile_picture"}
                      src={`/images/profile_picture.png`}
                      alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                      loading={"lazy"}
                      className={`block rounded-3xl shadow-lg h-[250px] md:h-[350px]`}
                  />

                  <ol className={`flex flex-row justify-center items-center space-x-4 lg:space-x-10 my-2`}>
                      {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
                          <li key={i}>
                              <Link key={i} href={link.url} target={link.target}
                                    className={`flex flex-col justify-center items-center text-center`}>
                                    <span className={`h-12 my-4 mx-2 w-auto`} aria-hidden={true}>
                                      <Icon type={link.icon ?? ""}/>
                                    </span>
                                  <label>{link.title}</label>
                              </Link>

                          </li>
                      ))}
                  </ol>
              </div>
              <div className={`flex flex-col justify-center items-center`}>
                  <h1>{sectionOneData.title}</h1>
                  <Text className={`md:text-2xl text-content`} text={sectionOneData.text}/>
              </div>
          </section>
      </Article>
  )
}