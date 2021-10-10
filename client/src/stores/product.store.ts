import { ProductItem } from '../models/product';
import { types, unprotect } from "mobx-state-tree";
import { cast } from "mobx-state-tree";
import '../App.css';
import { ApiServices } from '../services/api-services/product-service';

const service: ApiServices = new ApiServices();
let productFilters = new Map();
export let filters: any = {};

export const productModel = ProductItem.create({
  id: 0
});

export const ProductStore = types.model({
  products: types.array( ProductItem ),
  gender: types.optional( types.string, "" ),
  bagProducts: types.array( ProductItem ),
  totalPrice: types.optional( types.number, 0 )
})
.actions( self => ({

  async getProductById ( id: string | number ) {
    const result = await service.getOneProduct( id );
    let itemArray : any = [ result ];
    self.products = itemArray;
    return self.products;
  },

  async getProductsByGender ( id: number ) {
    const result = await service.getProductsByGender( id );
    if( result.length === 0 )
    return self.products;
    self.products = result
    console.log(self.products.length)
  },

  async setFiltersClient ( key: string, value: string | number ) {

    if( filters[key] ) {
      
      let position = filters[key].indexOf( value );

      if( position !== -1 ) {
        if( key !== "gender_id")
        filters[ key ].splice( filters[ key ].indexOf( value ), 1);

        if( filters[ key ].length === 0) {
          delete filters[ key ];
        }
      }
      else {
        filters[key].push( value );
      }
    }
    else {
      filters[key] = [];
      filters[key].push( value );
    }
  },

  async applyFilters () {
    let result = await service.getProductsByFilter( filters );
    
    if( result.length && !result.includes("error") && !result.includes("Error") ) {
      self.products = result;
    }
    else {
      alert("Произошла ошибка, перезагрузите страницу");
    }
  },

  // async getProductsByFilters(){
  //   let data = {
  //     filters: Object.fromEntries( productFilters ),
  //   }

  //   let result = await service.getProductsByFilter( filters );

  //   if( result.length === 0 )
  //   return self.products;

  //   self.products = result;
  // },

  async getByIds ( ids: Array<string> ) {
    let result = await service.getProductsByIds( ids );
    self.bagProducts = result;
  },
}))

export const productStore = ProductStore.create({});
unprotect( productStore );






