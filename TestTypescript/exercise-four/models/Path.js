"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PathBuilder = /** @class */ (function () {
    function PathBuilder() {
    }
    Object.defineProperty(PathBuilder.prototype, "OperationId", {
        get: function () {
            return this.operationId;
        },
        enumerable: true,
        configurable: true
    });
    PathBuilder.prototype.setOperationId = function (operationId) {
        this.operationId = operationId;
        return this;
    };
    Object.defineProperty(PathBuilder.prototype, "Parameters", {
        get: function () {
            return this.parameters;
        },
        enumerable: true,
        configurable: true
    });
    PathBuilder.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
        return this;
    };
    Object.defineProperty(PathBuilder.prototype, "Consumes", {
        get: function () {
            return this.consumes;
        },
        enumerable: true,
        configurable: true
    });
    PathBuilder.prototype.setConsumes = function (consumes) {
        this.consumes = consumes;
        return this;
    };
    Object.defineProperty(PathBuilder.prototype, "Path", {
        get: function () {
            return this.path;
        },
        enumerable: true,
        configurable: true
    });
    PathBuilder.prototype.setPath = function (path) {
        this.path = path;
        return this;
    };
    Object.defineProperty(PathBuilder.prototype, "HttpMethod", {
        get: function () {
            return this.httpMethod;
        },
        enumerable: true,
        configurable: true
    });
    PathBuilder.prototype.setHttpMethod = function (httpMethod) {
        this.httpMethod = httpMethod;
        return this;
    };
    PathBuilder.prototype.build = function () {
        return new Path(this);
    };
    return PathBuilder;
}());
exports.PathBuilder = PathBuilder;
var Path = /** @class */ (function () {
    /**
     *
     */
    function Path(pathBuilder) {
        this.hasBodyOrQueryReq = false;
        this.hasBodyReq = false;
        this.hasParameters = false;
        this.hasPathReq = false;
        this.hasQueryReq = false;
        this.consumes = pathBuilder.Consumes[0];
        this.parameters = new Parameters(pathBuilder.OperationId);
        this.setParameters(pathBuilder.Parameters);
        this.httpMethod = pathBuilder.HttpMethod;
        this.path = pathBuilder.Path;
    }
    Path.prototype.setParameters = function (parameters) {
        var _this = this;
        if (parameters && parameters.length > 0) {
            this.hasParameters = true;
            parameters.forEach(function (parameter, index) {
                var inPropertyValue = parameter['in'];
                if (inPropertyValue) {
                    if (!_this.hasBodyOrQueryReq)
                        _this.hasBodyOrQueryReq = ['body', 'query'].includes(inPropertyValue);
                    switch (inPropertyValue) {
                        case 'body':
                            _this.hasBodyReq = true;
                            _this.parameters.Body.addParameter(parameter, index == parameters.length - 1);
                            return false;
                        case 'path':
                            _this.hasPathReq = true;
                            _this.parameters.Path.addParameter(parameter, index == parameters.length - 1);
                            return false;
                        case 'query':
                            _this.hasQueryReq = true;
                            _this.parameters.Query.addParameter(parameter, index == parameters.length - 1);
                            return false;
                        default:
                            return false;
                    }
                }
            });
        }
    };
    return Path;
}());
var Parameters = /** @class */ (function () {
    function Parameters(operationId) {
        this.body = new Body('body', operationId);
        this.path = new Query('path', operationId);
        this.query = new Query('query', operationId);
    }
    Parameters.prototype.setBody = function (body) {
        this.body = body;
    };
    Parameters.prototype.setPath = function (path) {
        this.path = path;
    };
    Parameters.prototype.setQuery = function (query) {
        this.query = query;
    };
    Object.defineProperty(Parameters.prototype, "Body", {
        get: function () {
            return this.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameters.prototype, "Path", {
        get: function () {
            return this.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameters.prototype, "Query", {
        get: function () {
            return this.query;
        },
        enumerable: true,
        configurable: true
    });
    return Parameters;
}());
var Query = /** @class */ (function () {
    function Query(parameterType, operationId) {
        this.params = [];
        this.setModelName(parameterType, operationId);
    }
    Object.defineProperty(Query.prototype, "Params", {
        get: function () {
            return this.params;
        },
        enumerable: true,
        configurable: true
    });
    Query.prototype.addParameter = function (param, isTheLast) {
        this.params.push(new Param(param, isTheLast));
        return this;
    };
    Query.prototype.setModelName = function (parameterType, operationId) {
        this.modelName = "Req" + (this.capitalizeString(parameterType.toLowerCase()) + this.capitalizeString(operationId));
    };
    Query.prototype.capitalizeString = function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    };
    return Query;
}());
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(parameterType, operationId) {
        return _super.call(this, parameterType, operationId) || this;
    }
    return Body;
}(Query));
var Param = /** @class */ (function () {
    function Param(params, isTheLast) {
        this.isRequired = false;
        this.comma = false;
        this.isBoolean = false;
        this.isNumber = false;
        this.isString = false;
        this.name = params.name;
        this.isRequired = params.required;
        this.comma = !isTheLast;
        this.setParamType(params.type);
    }
    Param.prototype.setParamType = function (type) {
        switch (type) {
            case 'string':
                this.isString = true;
                break;
            case 'number':
                this.isNumber = true;
                break;
            case 'boolean':
                this.isBoolean = true;
                break;
            default:
                break;
        }
    };
    return Param;
}());
