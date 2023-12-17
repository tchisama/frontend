export const getPrice = (price: number , quantity: number) => {
    
    if(price * quantity >= 75)
        return (Math.ceil(price - (price * 0.15)) * quantity);
    return price  *  quantity
}


export const PriceByPrice = (price: number) => {
    
    return (
        price >= 75 ? 
        Math.ceil(price - (price * 0.15))
        :
        price
        )
}

export const SheetPrice = 25
export const TShirtPrice = 75
export const CupPrice = 60


export const deliveryPriceConst = 35
