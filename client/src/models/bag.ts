import { types } from "mobx-state-tree";

export const BagItem = types.model({
    id: types.number,
    size: types.optional( types.string, "" ),
    price: types.optional( types.number, 0 ),
    count: types.optional( types.number, 1 ),
    total: types.optional( types.number, 0 )
})

