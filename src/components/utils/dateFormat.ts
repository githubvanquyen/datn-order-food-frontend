const dateFormat = (d: string) =>{
    const date = new Date(d);
    return date.getHours() +  ": " + (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes())
}

export default dateFormat