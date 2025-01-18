"use client"

import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Icon from "@/components/icons/icon";
import Spinner from '@/components/spinner/spinner';

export default function Navbar(){
    const pathname = usePathname();
    const isNotHome = pathname.length > 1;
    const [isLoading, setIsLoading] = useState(false);

    const loadingHandler = () => setIsLoading((prev) => !prev);

    const getLoadingClass = (state: boolean) => {
        if(state){
            return 'bg-gray-200 text-gray-600 border-gray-200'
        }
        return 'hover:bg-sky-600 hover:text-white'
    }

    return (
        <nav
        className={`flex flex-col justify-center items-start ${isNotHome && 'py-1'} bg-white bg-opacity-50`}
        >
            { isNotHome &&
                <span
                    className={`flex flex-row justify-center items-center bg-white rounded-xl p-2 m-2 ${getLoadingClass(isLoading)} shadow-lg`}
                >
                        <Link
                            href={"/"}
                            onClick={() => {
                                loadingHandler();
                                setTimeout(() => {loadingHandler()}, 1000);
                            }}
                            className={`flex flex-row justify-center items-center ${isLoading && "pointer-events-none"}`}
                        >
                            <span className={`h-5 w-auto flex flex-col justify-center pr-2`}>
                                <Icon type={'fas-arrow-left'}/>
                            </span>
                            { isLoading &&
                                (<span className={`absolute`}>
                                         <Spinner/>
                                </span>)
                            }
                            <b>Home</b>
                            </Link>
                </span>
            }
        </nav>
    )
}