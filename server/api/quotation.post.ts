import { H3Event } from 'h3'
import { delay } from '~/lib/utils';

export default defineEventHandler(async (ev: H3Event) => {
    const data = await readBody(ev);
    console.log(data);

    await delay(1000);

    return {
        ok: true
    }
})