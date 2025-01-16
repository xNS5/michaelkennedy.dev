import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import { Config, SectionType } from "@/lib/config-provider";
import Link from "next/link";
import Icon from "@/components/icons/icon";
import Article from "@/components/article/article";
import type { Link as LinkType } from "@/lib/config-provider";
import type {Education, Project, Skill, Highlight, Work} from "@/types/work";

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
      <Article>
          {/* Section One */}
          <section id="about" className={"bg-white flex flex-col xl:flex-row justify-center items-center"}>
              <div className={`flex flex-col justify-center items-center mx-5 my-10`}>
                  <img
                      id={"profile_picture"}
                      src={`/images/profile_picture.png`}
                      alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                      className="block rounded-3xl shadow-lg h-92 w-96"
                      loading={"lazy"}
                  />
                  <span className={`flex flex-row`}>
                      {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
                          <Link key={i} href={link.url} className="mx-5 w-10 h-auto" target={link.target}>
                              <Icon type={link.icon ?? ""}
                                    altText={link.alt} {...(link.color && {className: `text-${link.color}`})}/>
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
                  <Text className={`md:text-lg text-content`} text={sectionTwoData.text}/>
              </div>
              <div className={`flex flex-col 2xl:flex-row justify-center my-2`}>
                  <div className={`flex flex-col items-center mx-5`}>
                      <h3><b>Work Experience</b></h3>
                      <ol className={`first:mt-2 last:mb-2`}>
                          {work.map((w: Work, i: number) =>
                              (
                                  <li key={i}>
                                      <span className={`experience-group`}>
                                          <span
                                              className={`flex flex-col items-start 2xl:flex-row 2xl:justify-between 2xl:space-x-10`}>
                                              <h5>
                                                  <b>{w.name}</b>
                                              </h5>
                                              <p className={`text-nowrap`}>{w.startDate} - {w.endDate}</p>
                                          </span>
                                          <p><i>{w.position}</i></p>
                                      </span>
                                  </li>
                              )
                          )}
                      </ol>
                  </div>
                  <div className={`flex flex-col items-center mx-5`}>
                      <h3><b>Education</b></h3>
                      <ol className={`first:mt-2 last:mb-2`}>
                          {education.map((edu: Education, i: number) =>
                              (
                                  <li key={i}>
                                      <span className={`experience-group`}>
                                          <span
                                              className={`flex flex-col 2xl:flex-row 2xl:justify-between 2xl:space-x-60`}>
                                              <h5>
                                                  <b>{edu.institution}</b>
                                              </h5>
                                              <p className={`text-nowrap`}>{edu.startDate} - {edu.endDate}</p>
                                          </span>
                                          <p><i>{edu.studyType} in {edu.area}</i></p>
                                          <p><i>Minor in {edu.minor}</i></p>
                                      </span>
                                  </li>
                              )
                          )}
                      </ol>
                  </div>
              </div>
          </section>
          {/*Section three*/}
          <section id="technologies" className={`flex flex-col text-black bg-white`}>
              <h2 className={`border-b-2 border-black my-2`}>Technologies</h2>
              <ol>
                  {
                      skills.map((skill: Skill, i: number) =>
                          <li key={i} className={`p-2 my-2`}>
                              <h3><b>{skill.name}</b></h3>
                              <ol className={`flex flex-col lg:flex-row flex-wrap justify-center`}>
                                  {skill.highlights.map((highlight: Highlight, j: number) =>
                                      <li key={j}
                                          className={`flex flex-col justify-center items-center rounded-lg border-2 border-black shadow-lg p-5 m-2.5`}>
                                          <div className={`min-w-16 w-10 h-auto`}><Icon type={highlight?.icon ?? ''}/>
                                          </div>
                                          <h5>{highlight.name}</h5>
                                      </li>
                                  )}
                              </ol>
                          </li>
                      )
                  }
              </ol>
          </section>
          {/* Section four */}
          <section id="Projects" className={`flex flex-col text-white bg-black bg-opacity-90`}>
              <h2 className={`border-b-2 border-white my-2`}>Projects</h2>
              <ol className={`flex flex-col lg:flex-row`}>
                  {
                      projects.map((project: Project, i: number) =>
                          <li key={i} className={`m-2 p-2 border-2 border-white rounded-lg`}>
                              <h3><b>{project.name}</b></h3>
                              <p>{project.description}</p>
                              <ol className={`list-disc pl-5`}>
                                  {
                                      project.technologies.map((tech: string, j: number) =>
                                          <li key={j}>
                                              {tech}
                                          </li>
                                      )
                                  }
                              </ol>
                          </li>
                      )
                  }
              </ol>
          </section>

      </Article>
  )
}