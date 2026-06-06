"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurtidaController = void 0;
var common_1 = require("@nestjs/common");
var CurtidaController = function () {
    var _classDecorators = [(0, common_1.Controller)('curtida')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _criar_decorators;
    var _listar_decorators;
    var _deletar_decorators;
    var CurtidaController = _classThis = /** @class */ (function () {
        function CurtidaController_1(curtidaService) {
            this.curtidaService = (__runInitializers(this, _instanceExtraInitializers), curtidaService);
        }
        CurtidaController_1.prototype.criar = function (data) {
            return this.curtidaService.criar(data);
        };
        CurtidaController_1.prototype.listar = function () {
            return this.curtidaService.listar();
        };
        CurtidaController_1.prototype.deletar = function (id) {
            return this.curtidaService.deletar(+id);
        };
        return CurtidaController_1;
    }());
    __setFunctionName(_classThis, "CurtidaController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _criar_decorators = [(0, common_1.Post)()];
        _listar_decorators = [(0, common_1.Get)()];
        _deletar_decorators = [(0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _criar_decorators, { kind: "method", name: "criar", static: false, private: false, access: { has: function (obj) { return "criar" in obj; }, get: function (obj) { return obj.criar; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listar_decorators, { kind: "method", name: "listar", static: false, private: false, access: { has: function (obj) { return "listar" in obj; }, get: function (obj) { return obj.listar; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletar_decorators, { kind: "method", name: "deletar", static: false, private: false, access: { has: function (obj) { return "deletar" in obj; }, get: function (obj) { return obj.deletar; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CurtidaController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CurtidaController = _classThis;
}();
exports.CurtidaController = CurtidaController;
