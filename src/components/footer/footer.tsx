import Icon from "../icons/icon";
import Link from "next/link";
import type { FooterItem } from "./footertypes";
import type { Config } from "@/lib/config-provider";
import { getDocument } from "@/db/db";


function getConfigEntries(obj: Config[]) {
    return obj.reduce((acc, curr) => {
      if(!acc[curr.row]){
          acc[curr.row] = [];
      }
      acc[curr.row].push(curr);
      return acc;
    }, []);
  }

export default async function Footer (){
    const {footer} = await getDocument<Config>("config", "config");
    const entries = getConfigEntries(footer);

    return (
        <footer className="grid auto-rows-max">
            {footer &&
                entries.map((elem: FooterItem[], i: number) => (
                    <div key={i} className="my-1 flex flex-row items-center justify-center">
                        {
                        elem.map((item: FooterItem, j: number) => {
                            if (item.type === "text") {
                                return <span className={"rounded text-white my-2"} key={j}>{item.text}</span>;
                            }
                            return (
                                <Link key={j} href={item?.url ?? ""} target={item.target} className={"m-1 h-10 w-auto text-white"}>
                                    {item.icon && item.icon.length > 0 ? (
                                        <Icon type={item.icon} altText={item.alt}/>
                                    ) : (
                                        <span className="rounded">
                                            {item.text}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
        </footer>
    )
}