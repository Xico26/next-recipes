import { Roboto_Slab } from "next/font/google";
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
export default function Step (props) {
    return (
    <div className={`${robotoSlab.className} flex gap-6 items-center py-6`}>
        <div className="text-2xl flex items-center justify-center font-bold border-myaccent rounded-full h-10 w-10 border-4">{props.index + 1}</div>
        <p>{props.step}</p>
    </div>
    )
}