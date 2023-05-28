

export const save=(key, data)=> {
    localStorage.setItem(key, JSON.stringify(data));
}
export const get=(key)=> {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}