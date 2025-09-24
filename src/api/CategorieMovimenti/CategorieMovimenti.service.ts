import { CategorieMovimenti } from "./CategorieMovimenti.entity";
import { CategorieMovModel } from "./CategorieMovimenti.model";

export class CategoriaMovimentiService {
    async getCategorieMovimenti(): Promise<CategorieMovimenti[] > {
    const categorie = await CategorieMovModel.find();
    
    console.log(categorie);
    return categorie;
  }
}

export default new CategoriaMovimentiService();