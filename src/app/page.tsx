import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import { Config, SectionType } from "@/lib/config-provider";
import profilePicture from "../../public/images/profile_picture.png";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icons/icon";
import Article from "@/components/article/article";
import type { Link as LinkType } from "@/lib/config-provider";
import type {Education, Project, Skill, Work} from "@/types/work";

import "./home.css"

const prod_url = "https://raw.githubusercontent.com/xNS5/resume/refs/heads/prod/resume.json";
const dev_url = "https://raw.githubusercontent.com/xNS5/resume/refs/heads/development/resume.json";

export default async function Home() {
  const {config}: Config = await getDocument<Config>("config", "config");
  const {education, work, skills, projects} = await (await fetch(dev_url)).json();
  const { sections }: { sections: SectionType[] } = config.pages.home;
  const sectionOneData = sections[0];
  const sectionTwoData = sections[1];

  return   (
      <Article className={``}>
          {/* Section One */}
          <section id="about" className={"bg-white flex flex-col xl:flex-row justify-center items-center"}>
              <div className={`flex flex-col justify-center items-center mx-5 my-10`}>
                  <img
                      id={"profile_picture"}
                      src={`/images/profile_picture.png`}
                      alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                      className="block rounded-3xl shadow-lg h-96 w-auto"
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
                  <Text className={`md:text-xl text-content`} text={sectionOneData.text}/>
              </div>
          </section>
          {/* Section Two */}
          <section id="experience" className={`flex flex-col text-white bg-black bg-opacity-90`}>
              <h2 className={`border-b-2 border-white my-2`}>My Experience</h2>
              <div className={`flex flex-row justify-center items-center`}>
                  <Text className={`md:text-xl text-content`} text={sectionTwoData.text}/>
              </div>
              <span className={`flex flex-col xl:flex-row justify-center align-top my-2`}>
                  <div className={`flex flex-col justify-around items-center mx-10`}>
                      <h3>Work Experience</h3>
                      <ol>
                          {work.map((w: Work, i: number) =>
                              (
                                  <li key={i} className={`first:mt-2 last:mb-2`}>
                                  <span className={`experience-group`}>
                                      <h5><b>{w.name}</b></h5>
                                      <p>{w.startDate} - {w.endDate}</p>
                                  </span>
                                  <span className={`experience-group`}>
                                      <p><i>{w.position}</i></p>
                                      <p>{w.location}</p>
                                  </span>
                              </li>
                              )
                          )}
                      </ol>
                  </div>
                  <div className={`flex flex-col justify-start items-center mx-10`}>
                      <h3>Education</h3>
                      <ol>
                          {education.map((edu: Education, i: number) => (
                              <li key={i} className={`my-2`}>
                                  <span className={`experience-group`}>
                                      <h5><b>{edu.institution}</b></h5>
                                      <p>{edu.startDate} - {edu.endDate}</p>
                                  </span>
                                  <span className={`experience-group`}>
                                          <div>
                                              <p>{edu.studyType} in {edu.area}</p>
                                              <p>Minor in {edu.minor}</p>
                                          </div>
                                      <p>{edu.location}</p>
                                  </span>
                              </li>
                          ))}
                      </ol>
                  </div>

              </span>
              <div>
                  <h3>Technologies</h3>
                  <ol>
                      {skills.map((skill: Skill, i: number) =>
                          <li key={i}>
                              <h5>{skill.name}</h5>
                          </li>
                      )}
                  </ol>
              </div>
          </section>
          <section id="Projects" className={`text-black bg-white`}>
              <h2 className={`border-b-2 border-white my-2`}>Projects</h2>
              <div className={`flex flex-col justify-center items-center`}>
                  <ol>
                      {}
                  </ol>
              </div>
          </section>
      </Article>
  )
}