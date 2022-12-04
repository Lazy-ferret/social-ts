
export const updateObjectInArray = (items, itemId, objPropName, newObj) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObj }
        }
        return item
    })
}

