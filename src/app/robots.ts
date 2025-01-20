import {getDocument} from "@/db/db"
import { headers } from 'next/headers';
import  {Config} from "@/types/config";

export default async function robots(){
    const { metadata } = await getDocument<Config>("config", "config");
    const { robots } = metadata;

    if(!robots){
        console.error("Robots.txt data not found, check DB connection")
        return {};
    }
    const myHeaders = await headers();
    const origin = myHeaders.get('host');
    const proto = myHeaders.get("x-forwarded-proto");

    return {sitemap: `${proto ?? "http"}://${origin}/sitemap.xml`, ...robots};
}