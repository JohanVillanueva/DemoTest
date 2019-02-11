
export class Item{
    id:string;
    title:string;
    description:string="";
    isFav:boolean;
    image:any=null;

    
    constructor(title:string,description:string,image:any,isFav:boolean=false) {
        this.id= (new Date()).getTime() + title;
        this.title=title;
        this.description=description;
        this.image=image;
        this.isFav=isFav;
    }
}