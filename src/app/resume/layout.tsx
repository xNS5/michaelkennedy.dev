export default function ResumeLayout({children} : Readonly<{
    children: React.ReactNode
}>){
    return <span className="flex flex-col justify-center items-center" >{children}</span>
}