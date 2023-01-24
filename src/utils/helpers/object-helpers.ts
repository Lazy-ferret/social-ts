
export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObj: any) => {
    return items.map((item : any) => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObj }
        }
        return item
    })
}

