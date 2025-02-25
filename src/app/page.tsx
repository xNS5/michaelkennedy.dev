import { getDocument } from "@/db/db";
import Text from "@/components/text/text";
import {Config } from "@/types/config";
import Link from "next/link";
import Icon from "@/components/icons/icon";
import Article from "@/components/article/article";
import type { Link as LinkType } from "@/types/config";
import type {Education, Project, Skill, Highlight, Work} from "@/types/work";

import "./home.css";
import Image from "next/image";


export default async function Home() {
  const {home, resume} = await getDocument<Config>("config", "config");
  const {education, work, skills, projects} = await (await fetch(resume.resume_json_url, { next: { revalidate: 10} } )).json();
  const { sections } = home;
  const sectionOneData = sections[0];
  const sectionTwoData = sections[1];

  return   (
      <Article id={"home"}>
          {/* Section One */}
          <section id="about" className={"bg-neutral-200 flex flex-col xl:flex-row justify-center items-center"}>
              <div className={`flex flex-col justify-center items-center m-5`}>
                  <img
                      id={"profile_picture"}
                      src={`/images/profile_picture.png`}
                      alt="A man with a beard wearing a red and black plaid shirt, red-tinted sunglasses, and a tan cap smiles outdoors on a sunny day, with blurred cars and buildings in the background."
                      loading={"lazy"}
                      className={`block rounded-3xl shadow-lg h-[250px] md:h-[350px]`}
                  />

                  <ol className={`flex flex-row justify-center items-center space-x-4 lg:space-x-10 my-2`}>
                      {sectionOneData.links && sectionOneData.links.map((link: LinkType, i: number) => (
                          <li key={i} >
                              <Link key={i} href={link.url} target={link.target} className={`flex flex-col justify-center items-center text-center`}>
                                  <span className={`h-12 my-4 mx-2 w-auto`} aria-hidden={true}>
                                      <Icon type={link.icon ?? ""} />
                                    </span>
                                    <label>{link.title}</label>
                              </Link>

                          </li>
                      ))}
                  </ol>
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
          <section id="technologies" className={`flex flex-col text-black bg-neutral-200`}>
              <h2 className={`border-b-2 border-black my-2`}>Technologies</h2>
              <ol>
                  {
                      skills.map((skill: Skill, i: number) =>
                          <li key={i} className={`p-2 my-2`}>
                              <h3><b>{skill.name}</b></h3>
                              <ol className={`flex flex-col lg:flex-row flex-wrap justify-center`}>
                                  {skill.highlights.map((highlight: Highlight, j: number) =>
                                      <li key={j}
                                          className={`flex flex-col justify-center items-center rounded-lg shadow-lg p-5 m-2.5 bg-gray-400`}>
                                          <div className={`min-w-16 w-10 h-auto`} aria-hidden={true}>
                                            <Icon type={highlight?.icon ?? ''}
                                                                                        altText={highlight.alt}/>
                                          </div>
                                          <p>{highlight.name}</p>
                                      </li>
                                  )}
                              </ol>
                          </li>
                      )
                  }
              </ol>
          </section>
          {/* Section four */}
          <section id="projects" className={`flex flex-col bg-black bg-opacity-90`}>
              <h2 className={`border-b-2 border-white text-white my-2`}>Projects</h2>
              <ol className={`flex flex-col xl:flex-row`}>
                  {
                      projects.map((project: Project, i: number) =>
                          <li key={i} className={`flex flex-col m-2 p-5 bg-gray-400 rounded-lg min-w-[225px]`}>
                              <h3><b>{project.name}</b></h3>
                              <p className={`my-2`}>{project.description}</p>
                              <ol className={`list-disc pl-5 my-2`}>
                                  {
                                      project.technologies.map((tech: string, j: number) =>
                                          <li key={j}>
                                              <p>{tech}</p>
                                          </li>
                                      )
                                  }
                              </ol>
                              {project.url && <div className={`flex flex-row justify-center items-center`}>
                              <span
                                  className={`text-center border rounded-lg shadow-lg text-black font-bold my-5 p-2 border-black hover:border-sky-600 hover:text-sky-600 hover:border-2 bg-neutral-200 max-w-[200px] hover:shadow-xl`}>
                                  <Link href={project.url} target={"_blank"}>Project Repository</Link>
                              </span>
                              </div>}
                          </li>
                      )
                  }
              </ol>
          </section>
      </Article>
  )
}