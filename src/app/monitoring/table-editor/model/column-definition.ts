import { ColumnMapping } from "./column-mapping";

export class ColumnDefinition{

    public id: string;
    public name: string;
    public content: ColumnMapping | null;
    
    public constructor(id: string, name: string) { 

        this.id = id;
        this.name = name;
        this.content = null;
      }
    
      jsonify(){
        return JSON.stringify(this);
      }
    
    

    
}