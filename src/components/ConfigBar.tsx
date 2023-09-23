import * as elements from "typed-html"
import { el } from "../types/element"

const elementList: el[] = [ 
    {id: 1, type: "sand", color: "bg-amber-300"},
    {id: 2, type: "water", color: "bg-cyan-500"}
]

const ElementComponent = ({ id, type, color }: el) => {
    return (
        <div class="h-16 w-16 flex flex-col items-center justify-center">
            <div id={`${id}`} class={`h-16 w-16 hover:scale-105 active:scale-100 cursor-pointer ease-linear duration-100 ${color}`}></div>
            <h1>{type}</h1>
        </div>
    )
}

export const ConfigBar = () => {
    return (
        <div class="h-20 flex items-center justify-center bg-slate-400">
            <div class="flex gap-2">
                {elementList.map((element: el) => {
                    return (
                        <ElementComponent id={element.id} type={element.type} color={element.color} />
                    )
                })}
            </div>
        </div>
    )
}