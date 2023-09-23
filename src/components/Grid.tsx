import * as elements from 'typed-html';
import { el } from '../types/element';

export const GridCell = ({ id, elementId, type, color, width, height, top, left }: any) => {
    return (
        <div hx-post={`/grid/set/${id}`} hx-swap="outerHTML" hx-target="#cellGrid" id={`${elementId} ${id}`} class={`h-${height / 4} w-${width / 4} ${color} cursor-pointer border-slate-400 absolute border hover:border-slate-800 duration-75`} style={`top: ${top}px; left: ${left}px;`} ></div>
    )
}

setInterval(() => {
}, 0.1);

export const Grid = ({cellsWidth, cells, gridSize}: any) => {
    let i = -1;
    let j = -1;
    let top = 0;
    let left = -gridSize;

    return (

        <div id="cellGrid" class={`h-[calc(100%-80px)] w-full flex flex-col relative`}>
            {
                cells?.map((cell: el) => {
                    j++;
                    i++;

                    if(i == cellsWidth)
                    {
                        i = 0;
                        top += gridSize;
                        left = 0;

                        return (
                            <GridCell id={j} elementId={cell.id} type={cell.type} color={cell.color} width={gridSize} height={gridSize} top={top} left={left} />
                        )

                    }

                    left += gridSize

                    return (
                        <GridCell id={j} elementId={cell.id} type={cell.type} color={cell.color} width={gridSize} height={gridSize} top={top} left={left}/>
                    )
                })
            }
        </div>
    )
}