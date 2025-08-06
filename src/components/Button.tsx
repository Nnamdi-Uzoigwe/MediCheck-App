interface childrenProps {
    children: string
}

export default function Button({ children }:childrenProps) {
 return (
    <div className="bg-purple-500 hover:bg-purple-600 w-fit text-white py-3 px-8 cursor-pointer rounded-lg">
        {children}
    </div>
 )
}