import React from "react";

export default function Header({children}: Readonly<{
    children: React.ReactNode
}>){
    return <header
        className={`bg-[url(/images/asilomar.jpg)] bg-cover md:bg-[center_-10em] xl:bg-[center_-50em] bg-no-repeat min-h-[25rem] w-full bg-black -z-10`}
    >
        {children}
    </header>
}