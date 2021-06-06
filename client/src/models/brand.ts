import { types } from "mobx-state-tree";

export const BrandItem = types.model({
    id: types.string,
    logo: types.optional( types.null, null ),
    description: types.optional( types.string, "" )
})
.actions( self =>({

}));
