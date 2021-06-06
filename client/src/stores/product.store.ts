import { ProductItem } from '../models/product';
import { types, unprotect } from "mobx-state-tree";
import { cast } from "mobx-state-tree";
import '../App.css';
import { ApiServices } from '../services/api-services/product-service';

const service: ApiServices = new ApiServices();
export let productFilters = new Map();
export let filters: any = {};

export const ProductStore = types.model({
  products: types.array( ProductItem ),
  gender: types.optional( types.string, "" )
})
.actions(self => ({
  async getProductsByGender ( id: number ) {
    debugger
    const result = await service.getProductsByGender( id );
    if( result.length === 0 )
    return self.products;
    self.products = result
    console.log(self.products.length)
  },

  async setFilters ( key: string, value: string | number ) {
    productFilters.set( key, value );
    if( key === "gender_id" ) {
      self.gender = value === 1 ? "man" : "woman";
    }
  },

  async setFiltersClient ( key: string, value: string | number ) {

    if( filters[key] ) {

      let isExist = filters[key].indexOf( value );

      if( isExist !== -1 ) {
        if( key !== "gender_id")
        filters[ key ].splice( filters[ key ].indexOf( value ), 1) 
      }
      else {
        filters[key].push( value );
      }
    }
    else {
      filters[key] = [];
      filters[key].push( value );
      debugger
    }
    console.log(filters);
  },

  async applyFilters () {
    debugger
    filters.type_id = [2,4];
    filters.gender_id = [2];
    let result = await service.getProductsByFilter( filters );

    self.products = result;


  },

  async getProductsByFilters(){
    debugger
    let data = {
      filters: Object.fromEntries( productFilters ),
    }

    let result = await service.getProductsByFilter( filters );

    if( result.length === 0 )
    return self.products;
    self.products = result;
  }


}))

export const model = ProductItem.create({
  id: 0
});

export const productStore = ProductStore.create({});
unprotect( productStore );






