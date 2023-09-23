import * as elements from "typed-html"
import { el } from "../types/element"

export const ElementComponent = ({ id, type, color }: el) => {
    return (
        <div hx-post={`/element/set/${id}`} hx-target="#selEl" hx-swap="outerHTML" class="h-16 w-16 flex flex-col items-center justify-center hover:scale-105 active:scale-100 cursor-pointer ease-linear duration-100">
            <div id={`${id}`} class={`h-16 w-16 ${color}`}></div>
            <h1>{type}</h1>
        </div>
    )
}

export const SelectedElementComponent = ({ id, type, color }: el) => {
    return (
        <div class="h-14 w-14 absolute left-1 top-0.5 text-center" id="selEl">
            <div id={`${id}`} class={`h-14 w-14 ${color}`}></div>
            <h1>{type}</h1>
        </div>
    )
}

export const ConfigBar = () => {
    return (
        <div class="h-20 flex items-center justify-center bg-slate-400">
            <div hx-get="/element/get" hx-trigger="load" hx-swap="outerHTML"></div>
            <div hx-get="/element/list" hx-trigger="load" hx-swap="outerHTML"></div>
        </div>
    )
}