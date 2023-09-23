import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { BaseHTML } from "../components/BaseHTML";
import {
    ConfigBar,
    SelectedElementComponent,
    ElementComponent,
} from "../components/ConfigBar";
import { Grid } from "../components/Grid";

import { el } from "../types/element";

let selectedElement: el = { id: 0, type: "None", color: "bg-white" };

const elementList: el[] = [
    { id: 1, type: "sand", color: "bg-amber-300" },
    { id: 2, type: "water", color: "bg-cyan-500" },
];

let gridCells: el[];

let gridCellSize = 64;
let screeenSize = { width: 0, height: 0 };
let gridSize = { width: 0, height: 0 };

const app = new Elysia();
app.use(html());

app.get("/", ({ html }: any) => {
    return html(
        <BaseHTML>
            <body class="bg-slate-300 h-full">
                <ConfigBar />
                <div
                    hx-get="/grid/get"
                    hx-trigger="load"
                    hx-swap="outerHTML"
                ></div>
            </body>
        </BaseHTML>
    );
});

app.get("/grid/get", ({ html }: any) => {
    gridSize = {
        width: Math.floor(screeenSize.width / gridCellSize),
        height: Math.floor((screeenSize.height - 80) / gridCellSize),
    };
    gridCells = Array(gridSize.width * gridSize.height).fill({
        id: 0,
        type: "None",
        color: "bg-transparent",
    });

    return html(
        <Grid
            cellsWidth={gridSize.width}
            cells={gridCells}
            gridSize={gridCellSize}
        />
    );
});

app.get("/element/get", ({ html }: any) => {
    return html(
        <SelectedElementComponent
            id={selectedElement.id}
            type={selectedElement.type}
            color={selectedElement.color}
        />
    );
});

app.get("/element/list", ({ html }: any) => {
    return html(
        <div class="flex gap-2">
            {elementList.map((element: el) => {
                return (
                    <ElementComponent
                        id={element.id}
                        type={element.type}
                        color={element.color}
                    />
                );
            })}
        </div>
    );
});

app.post("grid/set/:cellid", ({ params }) => {
    if (selectedElement.type !== "None")
        gridCells[parseInt(params.cellid)] = selectedElement;
    return (
        <Grid
            cellsWidth={gridSize.width}
            cells={gridCells}
            gridSize={gridCellSize}
        />
    );
});

app.post("/element/set/:id", ({ params }) => {
    const tempSelElement = elementList.find(
        (element) => element.id === parseInt(params.id)
    );
    selectedElement = tempSelElement as el;
    return (
        <SelectedElementComponent
            id={tempSelElement?.id}
            type={tempSelElement?.type}
            color={tempSelElement?.color}
        />
    );
});

app.get("/size/:width/:hight", ({ params }) => {
    screeenSize = {
        width: parseInt(params.width),
        height: parseInt(params.hight),
    };
});

app.get("/grid/start", () => {
    return (
        <div
            hx-get="/grid/update"
            hx-swap="outerHTML"
            hx-target="#cellGrid"
            hx-trigger="every 0.01s"
            id="trigger"
        ></div>
    );
});

app.get("/grid/update", () => {
    for (let index = gridCells.length; index > 0; index--) {
        const element = gridCells[index];

        if (index + gridSize.width < gridCells?.length) {
            //* Sand
            if (element.type === "sand") {
                if (gridCells[index + gridSize.width].type === "None") {
                    gridCells[index + gridSize.width] = element;
                    gridCells[index] = {
                        id: 0,
                        type: "None",
                        color: "bg-transparent",
                    };
                    break;
                } else if (
                    gridCells[index + gridSize.width - 1].type === "None"
                ) {
                    gridCells[index + gridSize.width - 1] = element;
                    gridCells[index] = {
                        id: 0,
                        type: "None",
                        color: "bg-transparent",
                    };
                    break;
                } else if (
                    gridCells[index + gridSize.width + 1].type === "None"
                ) {
                    gridCells[index + gridSize.width + 1] = element;
                    gridCells[index] = {
                        id: 0,
                        type: "None",
                        color: "bg-transparent",
                    };
                    break;
                }
            }

            //* Water
        }
    }

    return (
        <Grid
            cellsWidth={gridSize.width}
            cells={gridCells}
            gridSize={gridCellSize}
        />
    );
});

app.get("/grid/stop", () => {
    return (
        <button
            hx-get="/grid/start"
            hx-swap="outerHTML"
            class="p-2 bg-emerald-400 rounded-md hover:scale-105 active:scale-100 hover:bg-emerald-500 duration-150"
        >
            Start Scene
        </button>
    );
});

app.get("/grid/clear", () => {
    gridCells = Array(gridSize.width * gridSize.height).fill({
        id: 0,
        type: "None",
        color: "bg-transparent",
    });

    return (
        <Grid
            cellsWidth={gridSize.width}
            cells={gridCells}
            gridSize={gridCellSize}
        />
    );
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
