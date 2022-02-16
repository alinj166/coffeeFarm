import { NormalUser } from "./normal-user";

export class Admin extends NormalUser {
    constructor(public id:string ,public code:string,public image:String,public name:String,public password:String ,public task:String,public admin:boolean)
    {
        super(id,code,image,name,password,task,admin);
    }
}
