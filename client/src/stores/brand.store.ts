import { BrandItem } from '../models/brand';
import { types, unprotect } from "mobx-state-tree";
import { cast } from "mobx-state-tree";
import '../App.css';
import { BrandService } from '../services/api-services/brand-service';

const service: BrandService = new BrandService();
export let productFilters = new Map();

export const BrandStore = types.model({
  brands: types.array( BrandItem )
})
.actions(self => ({

    async getAllBrands () {
        const result = await service.getAllBrands();
        if( result.length === 0 )
        return self.brands;
        self.brands = result
        console.log("Brands",self.brands)
    },
}))

export const model = BrandItem.create({
    id: " "
 });

export const brandStore = BrandStore.create({});
unprotect( brandStore );






