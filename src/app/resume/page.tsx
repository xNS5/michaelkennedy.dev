import {Suspense} from "react";
import Loading from "@/app/loading";
import {getDocument} from "@/db/db";
import parse from "html-react-parser/lib/index";
import type { Config } from '@/lib/config-provider';
import Icon from "@/components/icons/icon";

export async function generateMetadata() {
    const {config: {pages: { resume }}} = await getDocument<Config>("config", "config");
    return {
        title: resume.title
    }
}

export default async function Page(){
    const {config: {pages: { resume }}} = await getDocument<Config>("config", "config");
    const { resume_html_url, resume_html_stylesheet_url} = resume;
    let resume_html: any = parse(await( await fetch(resume_html_url)).text());
    let resumeStylesheet = await ( await fetch(resume_html_stylesheet_url)).text();

    return(
        <Suspense fallback={<Loading/>}>
            <a href={'/api/download/'} className={`flex flex-row justify-center items-center font-bold text-lg rounded-xl bg-white p-2 m-4 hover:bg-sky-600 hover:text-white shadow-lg`}>
                <span className={`flex flex-col justify-center h-5 w-auto mr-1`}>
                    <Icon type={`far-circle-down`}/>
                </span>
                Download</a>
            <div className={`bg-white my-2 p-10 mx-10 lg:max-w-[1200px] text-lg`}>
                <style>
                    {resumeStylesheet}
                </style>
                {...resume_html[2].props.children[1].props.children}
            </div>
        </Suspense>
    )
}