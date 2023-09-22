import { Elysia } from 'elysia';
import { html } from '@elysiajs/html'
import * as elements from "typed-html"

import { BaseHTML } from '../components/BaseHTML';

const app = new Elysia();
app.use(html())

app.get('/', ({ html }: any) => {
    return html(
        <BaseHTML>
            <body>
                <button hx-post="/click" hx-swap="outerHTML">Click Me!!!</button>
            </body>
        </BaseHTML>
    )
});

app.post('/click', ({ html }: any) => {
    return html(
        <h1 class="text-teal-500">Hello There</h1>
    )
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});