import { types } from "mobx-state-tree";

export const AmountItem = types.model({
    id: types.number,
    amount: types.optional( types.number, 0 ),
    product_id: types.optional( types.number, 0 ),
    size_id: types.optional( types.string, "" ),
})
.actions( self =>({

}));
