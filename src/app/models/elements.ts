export class Elements{
    id_element:number
    category_id:number
    name_element:string 
    description:string
    quantity:number

    constructor(id:number){
        this.id_element=id;
    }

    public updateQuantity(subtract){
        this.quantity-=subtract;
    }
}