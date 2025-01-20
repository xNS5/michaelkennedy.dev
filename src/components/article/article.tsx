import React from "react";


export default function Article({id, children, className}: Readonly<{
    id?: string;
    children: React.ReactNode;
    className?: string;
}>){
    return (
        <article {...(id ? {id: id} : undefined)} className={`${className ?? ""}`}>
            {children}
        </article>
    )
}