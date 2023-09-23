import { Elysia } from 'elysia';
import { html } from '@elysiajs/html'
import * as elements from "typed-html"

import { BaseHTML } from '../components/BaseHTML';
import { ConfigBar, SelectedElementComponent, ElementComponent } from '../components/ConfigBar';

import { el } from "../types/element"

let selectedElement: el = {id: 0, type: "None", color: "bg-white"}

const elementList: el[] = [ 
    {id: 1, type: "sand", color: "bg-amber-300"},
    {id: 2, type: "water", color: "bg-cyan-500"}
]

const app = new Elysia();
app.use(html())

app.get('/', ({ html }: any) => {
    return html(
        <BaseHTML>
            <body class='bg-slate-300'>
                <ConfigBar />
            </body>
        </BaseHTML>
    )
});

app.get('/element/get', ({ html }: any) => {
    return html(
        <SelectedElementComponent id={selectedElement.id} type={selectedElement.type} color={selectedElement.color}/>
    )
})

app.get('/element/list', ({ html }: any) => {
    return html(
        <div class="flex gap-2">
                {elementList.map((element: el) => {
                    return (
                        <ElementComponent id={element.id} type={element.type} color={element.color} />
                    )
                })}
        </div>
    )
})

app.post('/element/set/:id', ({ params }) => {
        const tempSelElement = elementList.find(element => element.id === parseInt(params.id))
        return  <SelectedElementComponent id={tempSelElement?.id} type={tempSelElement?.type} color={tempSelElement?.color}/>
    }
)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});