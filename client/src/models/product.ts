import { types } from "mobx-state-tree";

export const ProductItem = types.model({
    id: types.identifierNumber,
    name: types.optional( types.string, "" ),
    model: types.optional( types.string, "" ),
    vendorCode: types.optional( types.string, "" ),
    description: types.optional( types.string, "" ),
    firstPrice: types.optional( types.number, 0 ),
    currentPrice: types.optional( types.number, 0 ),
    photos: types.optional( types.string, "" ),
    gender_id: types.optional( types.number, 0 ),
    brand_id: types.optional( types.string, "" ),
    type_id: types.optional( types.number, 0 )
})
.actions( self =>({

}));
