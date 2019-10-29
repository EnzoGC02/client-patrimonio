export class Outputs{
    availability_id:number;
    element_id:number;
    office_id:number;
    date_output:string;
    proceedings:number
    description:string

    constructor(
        id_avail:number,
        id_elem:number,
        id_off:number,
        date:string,
        procced:number,
        descrip:string
    ){
        this.availability_id=id_avail
        this.element_id=id_elem
        this.office_id=id_off
        this.date_output=date
        this.proceedings=procced
        this.description=descrip
    }
}