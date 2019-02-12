export class PathBuilder{

    private parameters:any[];
    private consumes:any[];
    private path:string;
    private httpMethod:string;
    private operationId:string;

    constructor() {
        
    }

    get OperationId(){
        return this.operationId;
    }
    setOperationId(operationId:string):PathBuilder{
        this.operationId=operationId;
        return this;
    }
    get Parameters(){
        return this.parameters;
    }
    setParameters(parameters:any[]):PathBuilder{
        this.parameters=parameters;
        return this;
    }
    get Consumes(){
        return this.consumes;
    }
    setConsumes(consumes:any[]):PathBuilder{
        this.consumes=consumes;
        return this;
    }
    get Path(){
        return this.path;
    }
    setPath(path:string):PathBuilder{
        this.path=path;
        return this;
    }
    get HttpMethod(){
        return this.httpMethod;
    }
    setHttpMethod(httpMethod:string):PathBuilder{
        this.httpMethod=httpMethod;
        return this;
    }
   
    build():Path{
        return new Path(this);
    }
}

class Path{
    private consumes:string;
    private hasBodyOrQueryReq:boolean=false;
    private hasBodyReq:boolean=false;
    private hasParameters:boolean=false;
    private hasPathReq:boolean=false;
    private hasQueryReq:boolean=false;
    private httpMethod:string;
    private parameters:Parameters;
    private path:string;
    /**
     *
     */
    constructor(pathBuilder: PathBuilder) {
        this.consumes =  pathBuilder.Consumes[0];
        this.parameters = new Parameters(pathBuilder.OperationId);
        this.setParameters(pathBuilder.Parameters);
        this.httpMethod = pathBuilder.HttpMethod;
        this.path = pathBuilder.Path;
    }

    private setParameters(parameters:any[]):void{
        if(parameters && parameters.length>0) {
            this.hasParameters=true;
            parameters.forEach((parameter,index) => {
                let inPropertyValue = parameter['in'];
                if(inPropertyValue){
                    if(!this.hasBodyOrQueryReq) this.hasBodyOrQueryReq = ['body','query'].includes(inPropertyValue);
                    switch (inPropertyValue) {
                        case 'body':
                            this.hasBodyReq = true;
                            this.parameters.Body.addParameter(parameter,index==parameters.length-1);
                            return false;
                        case 'path':
                            this.hasPathReq = true;
                            this.parameters.Path.addParameter(parameter,index==parameters.length-1);
                            return false;
                        case 'query':
                            this.hasQueryReq = true;
                            this.parameters.Query.addParameter(parameter,index==parameters.length-1);
                            return false;
                        default:
                            return false;
                    }
                }
            });
        }
    }
}

class Parameters{
    private body:Body ;
    private path:Query ;
    public query:Query ;

    setBody(body:Body){
        this.body = body;
    }
    setPath(path:Query){
        this.path = path;
    }
    setQuery(query:Query){
        this.query = query;
    }

    get Body(){
        return this.body;
    }
    get Path(){
        return this.path;
    }
    get Query(){
        return this.query;
    }

    constructor(operationId:string) {
       this.body = new Body('body',operationId);
       this.path = new Query('path',operationId);
       this.query = new Query('query',operationId);
    }
}

class Query{
    private modelName:string;
    private params:Array<Param>;
    constructor(parameterType:string,operationId:string) {
        this.params =[];
        this.setModelName(parameterType,operationId);
    }
    get Params(){
        return this.params;
    }
    addParameter(param:any,isTheLast){
        this.params.push(new Param(param,isTheLast));
        return this;
    }
    private setModelName(parameterType:string,operationId:string){
        this.modelName = `Req${this.capitalizeString(parameterType.toLowerCase())+this.capitalizeString(operationId)}`
    }
    private capitalizeString(word:string) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }
}
class Body extends Query{
    private isRequired:boolean;
    
    constructor(parameterType:string,operationId:string) {
       super(parameterType,operationId);
    }
    
}

class Param{
    private name:string;
    private isRequired:boolean=false;
    private comma:boolean=false;
    private isBoolean:boolean=false;
    private isNumber:boolean=false;
    private isString:boolean=false;

    constructor(params:any, isTheLast:boolean) {
        this.name=params.name;
        this.isRequired = params.required;
        this.comma = !isTheLast;
        this.setParamType(params.type);
        
    }

    setParamType(type:string):void{
        switch (type) {
            case 'string':
                this.isString=true;
                break;
            case 'number':
                this.isNumber=true;
                break;
            case 'boolean':
                this.isBoolean=true;
                break;
            default:
                break;
        }
    }
}