export class User{
    _name:string;
    email:string;
    constructor(name:string, email:string){
        this.name=name;
        this.email=email;
    }

    set name(newName:string){
        this._name=newName;
    }
}
