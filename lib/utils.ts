export function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), ms);
    })
}

export function post(url: string, data: object): Promise<unknown> {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    }).then(res => {
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(res => res)
}
