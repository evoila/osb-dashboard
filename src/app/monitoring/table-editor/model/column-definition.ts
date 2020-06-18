

export class ColumnDefinition{

    public queryId: string;
    public name: string;
    public path: any[];
    
    public constructor(queryId: string, name: string, path: any[]) { 

        this.queryId = queryId;
        this.name = name;
        this.path = path;
      }
    
      jsonify(){
        return JSON.stringify(this);
      }

      private generateUniqueString() {
        var ts = String(new Date().getTime()),
            i = 0,
            out = '';
        for (i = 0; i < ts.length; i += 2) {
            out += Number(ts.substr(i, 2)).toString(36);
        }
        return ('prefix' + out);
    }
    
    

    
}