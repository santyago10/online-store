import { BrandItem } from '../models/brand';
import { types, unprotect } from "mobx-state-tree";
import { cast } from "mobx-state-tree";
import '../App.css';
import { AmountService } from '../services/api-services/amount-service';
import { AmountItem } from '../models/amount';

const service: AmountService = new AmountService();
export let productFilters = new Map();

export const AmountStore = types.model({
  sizes: types.array( AmountItem )
})
.actions( self => ({

    async getSizes ( id: number ) {
      debugger
      let result = await service.getProductSizes( id );

      if( result.toString().includes("Error") || result.toString().includes("error") ) {
        alert ( "Ошибка! Перезагрузите страницу или попробуйте позже" )
        return
      }
      self.sizes = result;
    },
}))

export const model = AmountItem.create({
    id: 0
 });

export const amountStore = AmountStore.create({});
unprotect( amountStore );






