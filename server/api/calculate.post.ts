import { H3Event } from 'h3';
import { match } from "ts-pattern";
import { delay } from '~/lib/utils';

type PlanRecord = {
    adult: number;
    child: number;
}

export default defineEventHandler(async (ev: H3Event) => {
    const data = await readBody(ev);
    console.log(data);
    
    const plan = match<string, PlanRecord>(data.plan)
        .with('1', () => ({adult: 250, child: 100 }))
        .with('2', () => ({adult: 350, child: 175 }))
        .with('3', () => ({adult: 500, child: 250 }))
        .run();
    
    const adults = data.adults * plan.adult;
    const children = data.children * plan.child;

    await delay(1000);
    
    return {
        amount: (adults + children)
    }
});
