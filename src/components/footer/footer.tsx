import Icon from "../icons/icon";
import Link from "next/link";
import { getDocument } from "@/db/db";
import type {Config} from '@/types/config';
import type { FooterItem } from "@/types/footer";

function getConfigEntries(obj: FooterItem[]) {
    return obj.reduce<Record<number, FooterItem[]>>((acc, curr) => {
      if(!acc.hasOwnProperty(curr.row)){
          acc[curr.row] = [];
      }
      acc[curr.row].push(curr);
      return acc;
    }, {});
  }

export default async function Footer (){
    const { footer } = await getDocument<Config>("config", "config");
    const entries = getConfigEntries(footer);

    return (
        <footer className="grid auto-rows-max rounded-2xl p-2 h-auto w-full">
            {footer &&
                Object.values(entries).map((elem: FooterItem[], i: number) => (
                    <div key={i} className="my-1 flex flex-row items-center justify-center">
                        {
                        elem.map((item: FooterItem, j: number) => {
                            if (item.type === "text") {
                                return <span className={"rounded text-white font-bold my-2"} key={j}>{item.text}</span>;
                            }
                            return (
                                <Link key={j} href={item?.url ?? ""} target={item.target} className={"m-1 h-10 w-auto text-white hover:text-sky-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.95)]"}>
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