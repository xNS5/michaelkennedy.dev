import Article from "@/components/article/article";
import {Suspense} from "react";
import Loading from "@/app/loading";
import parse from "html-react-parser/lib/index";

export default async function Page(){
    let resume: any = parse(await( await fetch('https://raw.githubusercontent.com/xNS5/resume/refs/heads/development/MichaelKennedy_Resume.html')).text());
    let resumeStylesheet = await ( await fetch('https://raw.githubusercontent.com/xNS5/resume/refs/heads/development/theme/stylesheet.css')).text();

    return(
        <Suspense fallback={<Loading/>}>
            <Article className={`bg-white my-2 p-10 mx-10 lg:max-w-[1200px] text-lg`}>
                <style>
                    {resumeStylesheet}
                </style>
                {resume[2].props.children[1].props.children[1]}
            </Article>
        </Suspense>
    )
}