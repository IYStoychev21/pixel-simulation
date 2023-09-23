import { Elysia } from 'elysia';
import { html } from '@elysiajs/html'
import * as elements from "typed-html"

import { BaseHTML } from '../components/BaseHTML';
import { ConfigBar } from '../components/ConfigBar';

import { el } from "../types/element"

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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});