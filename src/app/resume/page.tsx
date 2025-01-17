import Article from "@/components/article/article";
import {Suspense} from "react";
import Loading from "@/app/loading";

export default function Resume(){
    return(
        <Article>
            <Suspense fallback={<Loading/>}>
                <iframe src="https://xns5.github.io/resume/" className="block w-screen h-screen"/>
            </Suspense>
        </Article>
    )
}