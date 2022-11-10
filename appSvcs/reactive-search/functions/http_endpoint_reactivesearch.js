// jshint ignore: start
/// <reference path="./realm.d.ts" />
'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


// @ts-ignore
exports = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, validate, db, collection, validateConnection, index, dbName, collectionName, indexName, data, mongodb, query, client, reactiveSearch, result, results, _b, err_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (AUTHORIZATION_CREDENTIALS) {
                    if (((_c = request === null || request === void 0 ? void 0 : request.headers['Authorization']) === null || _c === void 0 ? void 0 : _c[0]) !== AUTHORIZATION_CREDENTIALS) {
                        result = {
                            error: {
                                code: 401,
                                message: 'invalid username or password',
                                status: 'Unauthorized'
                            }
                        };
                        response.setStatusCode(401);
                        response.setHeader('Content-Type', 'application/json');
                        response.setBody(JSON.stringify(result));
                        return [2 /*return*/];
                    }
                }
                _a = request.query, validate = _a.validate, db = _a.db, collection = _a.collection, validateConnection = _a.validateConnection, index = _a.index;
                dbName = db;
                collectionName = collection;
                indexName = index || '';
                data = EJSON.parse(request.body.text());
                mongodb = data.mongodb, query = data.query;
                client = context.services.get('mongodb-atlas');
                if (!dbName || !collectionName) {
                    //check if mongodb key is present in req.body
                    if (!mongodb ||
                        !mongodb.db ||
                        !mongodb.db.trim() ||
                        !mongodb.collection ||
                        !mongodb.collection.trim()) {
                        response.setStatusCode(400);
                        response.setHeader('Content-Type', 'application/json');
                        response.setBody(JSON.stringify({
                            error: {
                                message: "mongodb object is required with db and collection name as its keys",
                                code: 400,
                                status: "Bad Request"
                            }
                        }));
                        return [2 /*return*/];
                    }
                    dbName = mongodb.db;
                    collectionName = mongodb.collection;
                    if (mongodb.index && mongodb.index.trim()) {
                        indexName = mongodb.index;
                    }
                }
                if (!query) {
                    response.setStatusCode(400);
                    response.setHeader('Content-Type', 'application/json');
                    response.setBody(JSON.stringify({
                        error: {
                            message: "query is required",
                            code: 400,
                            status: "Bad Request"
                        }
                    }));
                    return [2 /*return*/];
                }
                reactiveSearch = new ReactiveSearch({
                    client: client,
                    database: dbName,
                    collection: collectionName,
                    index: indexName
                });
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, , 9]);
                if (!validateConnection) return [3 /*break*/, 3];
                return [4 /*yield*/, reactiveSearch.validateCollection()];
            case 2:
                result = _d.sent();
                if (result.error) {
                    response.setStatusCode(500);
                    response.setHeader('Content-Type', 'application/json');
                    response.setBody(JSON.stringify({
                        error: __assign({}, result)
                    }));
                }
                _d.label = 3;
            case 3:
                if (!validate) return [3 /*break*/, 5];
                return [4 /*yield*/, reactiveSearch.translate(query)];
            case 4:
                _b = _d.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, reactiveSearch.query(query)];
            case 6:
                _b = _d.sent();
                _d.label = 7;
            case 7:
                results = _b;
                response.setStatusCode(200);
                response.setHeader('Content-Type', 'application/json');
                response.setBody(JSON.stringify(results));
                return [3 /*break*/, 9];
            case 8:
                err_1 = _d.sent();
                response.setStatusCode(500);
                response.setHeader('Content-Type', 'application/json');
                response.setBody(JSON.stringify({
                    error: {
                        status: "Internal server error",
                        code: 500,
                        message: err_1.message
                    }
                }));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var ASCENDING = 1;
var DESCENDING = -1;
var ALL_FIELDS = '*';
var INCLUDE_FIELD = 1;
var EXCLUDE_FIELD = 0;
var FUZZINESS_AUTO = 'AUTO';
var AUTHORIZATION_CREDENTIALS = "Basic ZnVua3lkZW1vOmZ1bmt5ZGVtbw==";
var nativeCeil = Math.ceil, nativeMax = Math.max;
var range = function (start, end, step, fromRight) {
    if (step === void 0) { step = 1; }
    var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
    while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
    }
    return result;
};
var validateSingleDataField = function (field) {
    if (typeof field !== 'string' && !Array.isArray(field)) {
        throw new Error("invalid dataField value");
    }
    if (Array.isArray(field) && field.length > 1) {
        throw new Error("only one dataField is allowed");
    }
};
var validateGeoValue = function (val) {
    if (val) {
        if (!val.location && !val.geoBoundingBox) {
            throw new Error("Invalid geo value");
        }
    }
};
var validateRangeValue = function (value) {
    if (value) {
        if (value.start === undefined && value.end === undefined) {
            throw new Error("invalid range value");
        }
        if (typeof value.start !== 'string' && typeof value.start !== 'number') {
            throw new Error("invalid start value");
        }
        if (typeof value.end !== 'string' && typeof value.end !== 'number') {
            throw new Error("invalid end value");
        }
        if (value.boost && typeof value.boost !== 'number') {
            throw new Error("invalid boost value");
        }
    }
};
var getStringFieldsFromDataField = function (dataField) {
    var fields = null;
    if (dataField) {
        if (typeof dataField === 'string') {
            fields = [dataField];
        }
        else {
            // It's an array
            if (dataField.length > 0) {
                var queryField = dataField[0];
                if (typeof queryField === 'string' || queryField instanceof String) {
                    fields = dataField;
                }
                else {
                    fields = dataField.map(function (value) { return value.field; });
                }
            }
        }
    }
    return fields;
};
var getFieldsFromDataField = function (fields) {
    var dataFields = null;
    if (fields) {
        if (typeof fields === 'string') {
            dataFields = [{ field: fields, weight: 1 }];
        }
        else {
            // It's an array
            if (fields.length > 0) {
                var queryField = fields[0];
                if (typeof queryField === 'string' || queryField instanceof String) {
                    dataFields = fields.map(function (field) { return ({
                        field: field,
                        weight: 1
                    }); });
                }
                else {
                    dataFields = fields;
                }
            }
        }
    }
    return dataFields;
};
var getIncludeExcludeFields = function (query) {
    var _a = query.includeFields, includeFields = _a === void 0 ? [] : _a, _b = query.excludeFields, excludeFields = _b === void 0 ? [] : _b, highlight = query.highlight;
    if (includeFields.length === 0 &&
        excludeFields.length === 0 &&
        highlight !== true) {
        return null;
    }
    if (excludeFields.includes(ALL_FIELDS)) {
        return {
            $project: {
                _0923biu3g4h: INCLUDE_FIELD
            }
        };
    }
    if (includeFields.includes(ALL_FIELDS)) {
        if (excludeFields.length === 0) {
            // Don't run the pipeline
            return null;
        }
        else {
            includeFields = includeFields.filter(function (item) { return item !== ALL_FIELDS; });
        }
    }
    // Exclude pipeline should be run before include
    var excludeAggregation = {}, includeAggregation = {};
    if (excludeFields.length > 0) {
        excludeAggregation = Object.assign.apply(Object, __spreadArray([{}], Array.from(excludeFields, function (field) {
            var _a;
            return (_a = {}, _a[field] = EXCLUDE_FIELD, _a);
        })));
    }
    if (includeFields.length > 0) {
        includeAggregation = Object.assign.apply(Object, __spreadArray([{}], Array.from(includeFields, function (field) {
            var _a;
            return (_a = {}, _a[field] = INCLUDE_FIELD, _a);
        })));
    }
    var res = {
        $project: __assign(__assign({}, excludeAggregation), includeAggregation)
    };
    if (highlight) {
        res.$project = __assign(__assign({}, res.$project), { highlights: { $meta: 'searchHighlights' } });
    }
    if (Object.keys(res).length) {
        return res;
    }
    return null;
};
var getPaginationMap = function (query) {
    var hits = [];
    var size = query.size;
    if (query.from) {
        hits.push({ $skip: query.from });
    }
    if (size && size < 0) {
        throw new Error("Invalid size. Size should be >= 0");
    }
    if (size === undefined) {
        size = 10;
    }
    if (size === 0) {
        size = 1;
    }
    hits.push({ $limit: query.size || 10 });
    return {
        $facet: {
            hits: hits,
            total: [
                {
                    $count: 'count'
                },
            ]
        }
    };
};
var generateTermRelevantQuery = function (relevantRSQuery) {
    var isValidValue = Boolean(relevantRSQuery.value);
    if (Array.isArray(relevantRSQuery.value) && !relevantRSQuery.value.length) {
        isValidValue = false;
    }
    // allow value like 0
    if (!Array.isArray(relevantRSQuery.value) &&
        typeof relevantRSQuery.value === 'number') {
        isValidValue = true;
    }
    if (isValidValue) {
        if (relevantRSQuery.queryFormat === 'and') {
            var filter = {};
            if (Array.isArray(relevantRSQuery.value)) {
                filter = relevantRSQuery.value.map(function (v) { return ({
                    phrase: {
                        query: [v],
                        path: relevantRSQuery.dataField
                    }
                }); });
            }
            else {
                filter = [
                    {
                        phrase: {
                            query: [relevantRSQuery.value],
                            path: relevantRSQuery.dataField
                        }
                    },
                ];
            }
            return {
                compound: {
                    filter: filter
                }
            };
        }
        // by default returns for OR query format
        return {
            compound: {
                filter: {
                    phrase: {
                        query: Array.isArray(relevantRSQuery.value)
                            ? relevantRSQuery.value
                            : [relevantRSQuery.value],
                        path: relevantRSQuery.dataField
                    }
                }
            }
        };
    }
    return null;
};
var getFuzziness = function (query) {
    var _a;
    var queryLength = ((_a = query === null || query === void 0 ? void 0 : query.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    var fuzziness = query.fuzziness;
    if (fuzziness === undefined) {
        return {};
    }
    if (typeof fuzziness === 'string') {
        if (fuzziness.toUpperCase() === FUZZINESS_AUTO) {
            if (queryLength > 5) {
                fuzziness = 2;
            }
            else if (queryLength >= 3) {
                fuzziness = 1;
            }
            else {
                fuzziness = 0;
            }
        }
        else {
            if (isNaN(Number(fuzziness))) {
                return {};
            }
            fuzziness = parseInt(fuzziness);
        }
    }
    if (fuzziness > 2) {
        throw new Error("Fuzziness value can't be greater than 2");
    }
    if (fuzziness === 0) {
        return {};
    }
    return {
        fuzzy: {
            maxEdits: fuzziness
        }
    };
};
var getSynonymsQuery = function (query) {
    var enableSynonyms = query.enableSynonyms, synonymsField = query.synonymsField, value = query.value, dataField = query.dataField;
    if (enableSynonyms && synonymsField) {
        var fields = getStringFieldsFromDataField(dataField);
        if (fields) {
            return {
                text: {
                    query: value,
                    path: fields,
                    synonyms: synonymsField
                }
            };
        }
    }
    return null;
};
var getAutoCompleteQuery = function (query) {
    var autocompleteField = query.autocompleteField, value = query.value;
    var fields = getFieldsFromDataField(autocompleteField);
    if (fields) {
        var fuzziness_1 = getFuzziness(query);
        return {
            compound: {
                should: fields.map(function (x) { return ({
                    autocomplete: __assign({ path: x.field, query: value, score: { boost: { value: x.weight } } }, fuzziness_1)
                }); })
            }
        };
    }
    return null;
};
var convertToMeter = function (distance, unit) {
    switch (unit) {
        case "mi":
            return distance * 1609.34;
        case "yd":
            return distance / 1.094;
        case "ft":
            return distance / 3.281;
        case "km":
            return distance * 1000;
        case "cm":
            return distance / 100;
        case "mm":
            return distance / 1000;
        // https://en.wikipedia.org/wiki/Nautical_mile
        case "nmi":
            return distance * 1852;
        default:
            return distance;
    }
};
var convertLocation = function (location) {
    var loc = [0, 0];
    if (typeof location === "string") {
        var data = ("" + location).split(",");
        if (data.length !== 2) {
            throw new Error("Invalid location");
        }
        loc[0] = parseFloat(data[1]);
        loc[1] = parseFloat(data[0]);
    }
    else if (Array.isArray(location)) {
        if (location.length !== 2) {
            throw new Error("Invalid location");
        }
        loc = location;
    }
    else {
        loc = [location.lat, location.long];
    }
    if (isNaN(loc[0])) {
        throw new Error("Invalid lat");
    }
    if (isNaN(loc[1])) {
        throw new Error("Invalid long");
    }
    loc[0] = parseFloat("" + loc[0]);
    loc[1] = parseFloat("" + loc[1]);
    return loc;
};
// TODO set return type
//
// Target remains $search for geo query as well
// ref: https://docs.atlas.mongodb.com/reference/atlas-search/geoWithin/
var getGeoQuery = function (query, config) {
    try {
        var val = __assign({}, query.value);
        validateGeoValue(val);
        var res = [];
        var search = {};
        // geo point query
        if (val.location) {
            val.location = convertLocation(val.location);
            if (!val.distance || isNaN(val.distance)) {
                throw new Error("Distance is required in value");
            }
            if (!val.unit) {
                val.unit = "m";
            }
            if (val.unit !== "m") {
                // convert data to meter as mongo only supports meter
                val.distance = convertToMeter(val.distance, val.unit);
            }
            search = {
                geoWithin: {
                    circle: {
                        center: {
                            type: 'Point',
                            coordinates: val.location
                        },
                        radius: val.distance
                    },
                    path: query.dataField
                }
            };
        }
        // geo bounding box query
        if (val.geoBoundingBox) {
            // mongo geo bounding accepts bottomRight and topLeft
            // following is the conversion
            /**
             * topLeft: {x1,y1}
                bottomRight: {x2,y2}

                topRight: {x2,y1}
                bottomLeft: {x1,y2}
             */
            var bottomRight = convertLocation(val.geoBoundingBox.bottomRight);
            var topLeft = convertLocation(val.geoBoundingBox.topLeft);
            search = {
                geoWithin: {
                    box: {
                        bottomLeft: {
                            type: 'Point',
                            coordinates: [topLeft[0], bottomRight[1]]
                        },
                        topRight: {
                            type: 'Point',
                            coordinates: [bottomRight[0], topLeft[1]]
                        }
                    },
                    path: query.dataField
                }
            };
        }
        var compoundQuery = {
            compound: {
                should: [search]
            }
        };
        if (query.index || config.index) {
            compoundQuery.index = query.index || config.index;
        }
        res = [{ $search: compoundQuery }];
        var projectTarget = getIncludeExcludeFields(query);
        if (projectTarget) {
            res.push(projectTarget);
        }
        res.push(getPaginationMap(query));
        return res;
    }
    catch (err) {
        throw err;
    }
};
// TODO set return type
var getRangeQuery = function (query, config) {
    try {
        validateSingleDataField(query.dataField);
        validateRangeValue(query.value);
        var res = [];
        var field = Array.isArray(query.dataField)
            ? query.dataField[0]
            : query.dataField;
        var search = {
            range: {
                path: field
            }
        };
        if (query.value && query.value.start !== undefined) {
            search.range.gte = query.value.start;
        }
        if (query.value && query.value.end !== undefined) {
            search.range.lte = query.value.end;
        }
        if (query.value && query.value.boost !== undefined) {
            search.range.score = {
                boost: {
                    value: query.value.boost
                }
            };
        }
        var compoundQuery = {
            compound: {
                should: [search]
            }
        };
        if (query.index || config.index) {
            compoundQuery.index = query.index || config.index;
        }
        if (query.includeNullValues) {
            compoundQuery.compound.should.push({
                compound: {
                    mustNot: [
                        {
                            exists: {
                                path: "" + field
                            }
                        },
                    ]
                }
            });
        }
        res = [
            {
                $search: compoundQuery
            },
        ];
        var projectTarget = getIncludeExcludeFields(query);
        if (projectTarget) {
            res.push(projectTarget);
        }
        var facet = getPaginationMap(query);
        if (query.aggregations && query.aggregations.length) {
            if (query.aggregations.includes("min")) {
                facet.$facet.min = [
                    {
                        $group: {
                            _id: null,
                            min: {
                                $min: Array.isArray(query.dataField)
                                    ? "$" + query.dataField[0]
                                    : "$" + query.dataField
                            }
                        }
                    },
                ];
            }
            if (query.aggregations.includes("max")) {
                facet.$facet.max = [
                    {
                        $group: {
                            _id: null,
                            max: {
                                $max: Array.isArray(query.dataField)
                                    ? "$" + query.dataField[0]
                                    : "$" + query.dataField
                            }
                        }
                    },
                ];
            }
            if (query.value && query.aggregations.includes("histogram")) {
                if (query.value &&
                    query.value.start === undefined &&
                    query.value.end === undefined) {
                    throw new Error("histogram needs start and end value");
                }
                if (query.interval === undefined) {
                    throw new Error("invalid interval");
                }
                facet.$facet.histogram = [
                    {
                        $bucket: {
                            groupBy: Array.isArray(query.dataField)
                                ? "$" + query.dataField[0]
                                : "$" + query.dataField,
                            boundaries: range(query.value.start, query.value.end, query.interval),
                            "default": "other"
                        }
                    },
                ];
            }
        }
        res.push(facet);
        return res;
    }
    catch (err) {
        throw err;
    }
};
var getSearchAggregation = function (query, isWildCardHighlightSearch) {
    if (isWildCardHighlightSearch === void 0) { isWildCardHighlightSearch = false; }
    var value = query.value, dataField = query.dataField, _a = query.highlightField, highlightField = _a === void 0 ? '*' : _a;
    var fields = getFieldsFromDataField(dataField);
    if (fields) {
        var fuzziness_2 = getFuzziness(query);
        var search = {
            compound: {
                must: fields.map(function (x) { return ({
                    text: __assign({ path: x.field === '*' || isWildCardHighlightSearch
                            ? { wildcard: isWildCardHighlightSearch ? highlightField : '*' }
                            : x.field, query: value, score: { boost: { value: x.weight } } }, fuzziness_2)
                }); })
            }
        };
        return search;
    }
    return null;
};
// TODO set return type
var getSearchQuery = function (query, config) {
    var _a, _b;
    try {
        var searchQuery = [];
        var value = query.value;
        if (value && value.length) {
            var shouldAggregation = [];
            var highlightQuery = getHighlightQuery(query);
            var isWildCardHighlightSearch = ((_b = (_a = highlightQuery === null || highlightQuery === void 0 ? void 0 : highlightQuery.highlight) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.wildcard) !== undefined;
            var search = getSearchAggregation(query, isWildCardHighlightSearch);
            if (search) {
                shouldAggregation.push(search);
            }
            var synonyms = getSynonymsQuery(query);
            if (synonyms) {
                shouldAggregation.push(synonyms);
            }
            var autocomplete = getAutoCompleteQuery(query);
            if (autocomplete) {
                shouldAggregation.push(autocomplete);
            }
            var compoundQuery = shouldAggregation.length > 0
                ? {
                    compound: {
                        should: shouldAggregation
                    }
                }
                : {};
            var q = { $search: __assign(__assign({}, compoundQuery), highlightQuery) };
            if (query.index || config.index) {
                q.$search.index = query.index || config.index;
            }
            searchQuery.push(q);
        }
        var projectTarget = getIncludeExcludeFields(query);
        if (projectTarget) {
            searchQuery.push(projectTarget);
        }
        if (query.sortBy) {
            searchQuery.push(getSearchSortByQuery(query));
        }
        searchQuery.push(getPaginationMap(query));
        return searchQuery;
    }
    catch (err) {
        throw err;
    }
};
var getSearchSortByQuery = function (query) {
    var _a, _b, _c;
    var sortBy = DESCENDING;
    var field = '_id';
    if (query.sortBy) {
        sortBy = query.sortBy === "asc" ? ASCENDING : DESCENDING;
    }
    if (query.dataField) {
        var _field = _getFirstDataFieldValue(query.dataField);
        if (_field) {
            field = _field;
        }
        else {
            return { $sort: (_a = { score: { $meta: 'textScore' } }, _a[field] = sortBy, _a) };
        }
        return { $sort: (_b = {}, _b[field] = sortBy, _b) };
    }
    else {
        /*
            From MongoDB documentation
            In the { <sort-key> } document, set the { $meta: "textScore" } expression
            to an arbitrary field name. The field name is ignored by the query system.
        */
        return { $sort: (_c = { score: { $meta: 'textScore' } }, _c[field] = sortBy, _c) };
    }
};
var getQueryStringQuery = function (query) {
    var _a = query.queryString, queryString = _a === void 0 ? false : _a, dataField = query.dataField, value = query.value;
    if (queryString && dataField && value) {
        var field = _getFirstDataFieldValue(dataField);
        if (field) {
            return {
                queryString: {
                    defaultPath: field,
                    query: value
                }
            };
        }
    }
    return {};
};
var _getFirstDataFieldValue = function (dataField) {
    var field = null;
    if (Array.isArray(dataField)) {
        if (dataField.length > 0) {
            var queryField = dataField[0];
            if (typeof queryField === 'string' || queryField instanceof String) {
                field = queryField;
            }
            else {
                field = queryField.field;
            }
        }
    }
    else {
        field = dataField;
    }
    return field;
};
var getHighlightQuery = function (query) {
    var _a = query.highlight, highlight = _a === void 0 ? false : _a, highlightField = query.highlightField, highlightConfig = query.highlightConfig, dataField = query.dataField;
    var _b = highlightConfig || {}, _c = _b.maxCharsToExamine, maxCharsToExamine = _c === void 0 ? 500000 : _c, _d = _b.maxNumPassages, maxNumPassages = _d === void 0 ? 5 : _d;
    if (highlight) {
        var fields = [];
        if (highlightField) {
            if (typeof highlightField === 'string') {
                if (highlightField.indexOf('*') > -1) {
                    fields = {
                        wildcard: highlightField
                    };
                }
                else {
                    fields = [highlightField];
                }
            }
            else {
                fields = highlightField;
            }
        }
        else {
            var _fields = getStringFieldsFromDataField(dataField);
            if (_fields) {
                fields = _fields;
                for (var _i = 0, _e = _fields; _i < _e.length; _i++) {
                    var x = _e[_i];
                    if (x.indexOf('*') > -1) {
                        fields = {
                            wildcard: x
                        };
                    }
                }
            }
            else {
                fields = {
                    wildcard: '*'
                };
            }
        }
        return {
            highlight: {
                path: fields,
                maxCharsToExamine: maxCharsToExamine,
                maxNumPassages: maxNumPassages
            }
        };
    }
    else {
        return {};
    }
};
// TODO set return type
var getTermQuery = function (query, config) {
    try {
        validateSingleDataField(query.dataField);
        var search = {};
        var res = [];
        if (query.index || config.index) {
            search.index = query.index || config.index;
        }
        // const isArrayVal = Array.isArray(query.value);
        // const queryFormat = query.queryFormat || `or`;
        var isArrayField = Array.isArray(query.dataField);
        var field = "" + (query.dataField && isArrayField ? query.dataField[0] : query.dataField);
        /**
        if (queryFormat === `or`) {
            search.compound = {
                filter: {
                    text: {
                        query: isArrayVal ? query.value : [query.value],
                        path: query.dataField,
                    },
                },
            };

            res.push({
                $search: search,
            });
        }
    */
        /**
     if (query.queryFormat === 'and' && Array.isArray(query.value)) {
            const filter = query.value.map((item) => ({
                text: {
                    query: [item],
                    path: query.dataField,
                },
            }));
            search.compound = {
                filter,
            };

            res.push({
                $search: search,
            });
        }
    **/
        var sortBy = query.sortBy || "count";
        var facetQuery = [
            {
                $unwind: "$" + field
            },
            { $sortByCount: "$" + field },
        ];
        if (sortBy === "asc" || sortBy === "desc") {
            facetQuery.push({
                $sort: {
                    _id: sortBy === "asc" ? 1 : -1
                }
            });
        }
        if (query.aggregationSize !== undefined) {
            facetQuery.push({
                $limit: query.aggregationSize
            });
        }
        res.push({
            $facet: {
                aggregations: facetQuery
            }
        });
        return res;
    }
    catch (err) {
        throw err;
    }
};
var RSQuerySchema = {
    index: { type: String },
    enablePopularSuggestions: { type: Boolean },
    maxPopularSuggestions: { type: Number },
    clearOnQueryChange: { type: Boolean },
    results: { type: Array, each: { type: Object } },
    id: { type: String },
    type: { type: String, "enum": ["search", "term", "geo", "range"] },
    react: { and: { type: [String, Array] }, or: { type: [String, Array] } },
    queryFormat: { type: String, "enum": ["or", "and"] },
    dataField: { type: [String, Array] },
    categoryField: { type: String },
    categoryValue: { type: String },
    nestedField: { type: String },
    from: { type: [Number] },
    size: { type: Number },
    sortBy: { type: String, "enum": ["asc", "desc", "count"] },
    // @ts-ignore
    value: { type: [String, Number, Object, Array] },
    aggregationField: { type: String },
    aggregationSize: { type: Number },
    after: { type: Object },
    includeNullValues: { type: Boolean },
    includeFields: { type: Array, each: { type: String } },
    excludeFields: { type: Array, each: { type: String } },
    fuzziness: { type: [String, Number] },
    searchOperators: { type: Boolean },
    highlight: { type: Boolean },
    highlightField: { type: [String, Number] },
    highlightConfig: {
        maxCharsToExamine: { type: Number },
        maxNumPassages: { type: Number }
    },
    interval: { type: Number },
    aggregations: { type: Array, each: { type: String } },
    missingLabel: { type: String },
    showMissing: { type: Boolean },
    defaultQuery: { type: Array, each: { type: Object } },
    customQuery: { type: Object },
    execute: { type: Boolean },
    enableSynonyms: { type: Boolean },
    synonymsField: { type: String },
    selectAllLabel: { type: String },
    pagination: { type: Boolean },
    queryString: { type: Boolean },
    autocompleteField: { type: [String, Array] }
};
var buildQueryPipeline = function (queryMap, config) {
    var mongoPipelines = {};
    // other pipelines added because of default or custom query
    var extraTargets = [];
    Object.keys(queryMap).forEach(function (item) {
        var _a = queryMap[item], rsQuery = _a.rsQuery, mongoQuery = _a.mongoQuery, error = _a.error;
        var id = (rsQuery === null || rsQuery === void 0 ? void 0 : rsQuery.id) || "" + Date.now();
        if (rsQuery && mongoQuery) {
            if (rsQuery.execute === undefined || rsQuery.execute) {
                var finalMongoQuery = __spreadArray([], mongoQuery);
                if (rsQuery.defaultQuery) {
                    var defaultQueryTargets_1 = Array.isArray(rsQuery.defaultQuery)
                        ? rsQuery.defaultQuery
                        : [rsQuery.defaultQuery];
                    var mongoQueryIndexesToDelete_1 = [];
                    var skip_1 = null;
                    var limit_1 = null;
                    // delete skip and limit from defaultQuery if present
                    defaultQueryTargets_1 = defaultQueryTargets_1.filter(function (defaultQueryItem) {
                        var defaultKey = Object.keys(defaultQueryItem)[0];
                        if (defaultKey === "$skip") {
                            skip_1 = defaultQueryItem["$skip"];
                        }
                        if (defaultKey === "$limit") {
                            limit_1 = defaultQueryItem["$limit"];
                        }
                        return defaultKey !== "$skip" && defaultKey !== "$limit";
                    });
                    mongoQuery.forEach(function (mongoQueryItem, index) {
                        var key = Object.keys(mongoQueryItem)[0];
                        // check if defaultQuery has that value then use defaultQuery target,
                        // eg. $limit exist in both then use the one passed in defaultQuery
                        defaultQueryTargets_1.forEach(function (defaultQueryItem) {
                            var defaultKey = Object.keys(defaultQueryItem)[0];
                            if (defaultKey === key) {
                                mongoQueryIndexesToDelete_1.push(index);
                            }
                        });
                    });
                    // generated facet pipeline for skip and limit
                    // if present in default query
                    // and remove them from root mongo query
                    var hits = [];
                    if (skip_1 !== null) {
                        hits.push({ $skip: skip_1 });
                    }
                    if (limit_1 !== null) {
                        hits.push({ $limit: limit_1 });
                    }
                    if (hits.length) {
                        var facetIndex = mongoQuery.findIndex(function (item) {
                            return item.$facet && item.$facet.hits;
                        });
                        if (facetIndex > -1) {
                            mongoQuery[facetIndex] = {
                                $facet: {
                                    hits: hits,
                                    total: [
                                        {
                                            $count: 'count'
                                        },
                                    ]
                                }
                            };
                        }
                    }
                    finalMongoQuery = __spreadArray(__spreadArray([], defaultQueryTargets_1), mongoQuery.filter(function (_, i) {
                        return mongoQueryIndexesToDelete_1.indexOf(i) === -1;
                    }));
                }
                if (rsQuery.react) {
                    var andQuery_1 = [];
                    var orQuery_1 = [];
                    var currentSearch = null;
                    var isTermQuery_1 = rsQuery.type === 'term';
                    // must query
                    if (rsQuery.react.and) {
                        // if and is not array convert it to array
                        var relevantAndRef = Array.isArray(rsQuery.react.and)
                            ? rsQuery.react.and
                            : [rsQuery.react.and];
                        relevantAndRef.forEach(function (andItem) {
                            var _a;
                            if (queryMap[andItem]) {
                                var _b = queryMap[andItem], relevantRSQuery = _b.rsQuery, relevantMongoQuery = _b.mongoQuery;
                                if (relevantRSQuery && relevantMongoQuery) {
                                    // handles case where relevant query is term query
                                    if (relevantRSQuery.type === 'term') {
                                        if (!isTermQuery_1) {
                                            var relTermQuery = generateTermRelevantQuery(relevantRSQuery);
                                            if (relTermQuery) {
                                                andQuery_1.push(relTermQuery);
                                            }
                                        }
                                    }
                                    else {
                                        if ((_a = relevantMongoQuery[0]) === null || _a === void 0 ? void 0 : _a.$search) {
                                            var queryCopy = __assign({}, relevantMongoQuery[0].$search);
                                            // remove highlight from relevant query
                                            queryCopy = JSON.parse(JSON.stringify(queryCopy, function (k, v) {
                                                if (k === 'highlight') {
                                                    return undefined;
                                                }
                                                if (k === "index") {
                                                    return undefined;
                                                }
                                                return v;
                                            }));
                                            andQuery_1.push(queryCopy);
                                        }
                                    }
                                    if (relevantRSQuery.customQuery) {
                                        andQuery_1.push(relevantRSQuery.customQuery.$search
                                            ? relevantRSQuery.customQuery.$search
                                            : relevantRSQuery.customQuery);
                                    }
                                }
                            }
                        });
                    }
                    // should query
                    if (rsQuery.react.or) {
                        // if or is not array convert it to array
                        var relevantOrRef = Array.isArray(rsQuery.react.or)
                            ? rsQuery.react.or
                            : [rsQuery.react.or];
                        relevantOrRef.forEach(function (orItem) {
                            var _a;
                            if (queryMap[orItem]) {
                                var _b = queryMap[orItem], relevantRSQuery = _b.rsQuery, relevantMongoQuery = _b.mongoQuery;
                                if (relevantRSQuery && relevantMongoQuery) {
                                    if (relevantRSQuery.type === 'term') {
                                        if (!isTermQuery_1) {
                                            var relTermQuery = generateTermRelevantQuery(relevantRSQuery);
                                            if (relTermQuery) {
                                                orQuery_1.push(relTermQuery);
                                            }
                                        }
                                    }
                                    else {
                                        if ((_a = relevantMongoQuery[0]) === null || _a === void 0 ? void 0 : _a.$search) {
                                            var queryCopy = __assign({}, relevantMongoQuery[0].$search);
                                            // remove highlight from relevant query
                                            queryCopy = JSON.parse(JSON.stringify(queryCopy, function (k, v) {
                                                if (k === 'highlight') {
                                                    return undefined;
                                                }
                                                if (k === "index") {
                                                    return undefined;
                                                }
                                                return v;
                                            }));
                                            orQuery_1.push(queryCopy);
                                        }
                                    }
                                    if (relevantRSQuery.customQuery) {
                                        orQuery_1.push(relevantRSQuery.customQuery.$search
                                            ? relevantRSQuery.customQuery.$search
                                            : relevantRSQuery.customQuery);
                                    }
                                }
                            }
                        });
                    }
                    var compoundQuery = {
                        $search: {
                            compound: {}
                        }
                    };
                    if (!isTermQuery_1) {
                        currentSearch = mongoQuery[0].$search;
                        // if has both the clause
                        // perform and with the current query and (and & or) with react queries
                        // example: must: {  must: { A, should: B}, $currentComponentQuery }
                        if (orQuery_1.length && andQuery_1.length) {
                            if (currentSearch) {
                                compoundQuery.$search.compound = {
                                    must: [
                                        currentSearch,
                                        {
                                            compound: {
                                                must: __spreadArray(__spreadArray([], andQuery_1), [
                                                    {
                                                        compound: {
                                                            should: __spreadArray([], orQuery_1)
                                                        }
                                                    },
                                                ])
                                            }
                                        },
                                    ]
                                };
                            }
                            else {
                                compoundQuery.$search.compound = {
                                    must: __spreadArray(__spreadArray([], andQuery_1), [
                                        {
                                            compound: {
                                                should: __spreadArray([], orQuery_1)
                                            }
                                        },
                                    ])
                                };
                            }
                        }
                        else if (orQuery_1.length || andQuery_1.length) {
                            if (orQuery_1.length) {
                                compoundQuery.$search.compound = {
                                    should: currentSearch ? __spreadArray([currentSearch], orQuery_1) : orQuery_1
                                };
                            }
                            if (andQuery_1.length) {
                                compoundQuery.$search.compound = {
                                    must: currentSearch ? __spreadArray([currentSearch], andQuery_1) : andQuery_1
                                };
                            }
                        }
                        else {
                            compoundQuery.$search = currentSearch;
                        }
                        var index = (currentSearch || {}).index;
                        if (index) {
                            delete currentSearch.index;
                        }
                        if (compoundQuery &&
                            compoundQuery.$search &&
                            compoundQuery.$search.compound &&
                            Object.keys(compoundQuery.$search.compound).length) {
                            // add index to final compound query
                            if (rsQuery.index || config.index) {
                                compoundQuery.$search.index = rsQuery.index || config.index;
                            }
                            finalMongoQuery = currentSearch
                                ? __spreadArray(__spreadArray(__spreadArray([], extraTargets), [compoundQuery]), finalMongoQuery.slice(1)) : __spreadArray(__spreadArray(__spreadArray([], extraTargets), [compoundQuery]), finalMongoQuery);
                        }
                        else {
                            finalMongoQuery = currentSearch
                                ? __spreadArray(__spreadArray([], extraTargets), finalMongoQuery.slice(1)) : __spreadArray(__spreadArray([], extraTargets), finalMongoQuery);
                        }
                    }
                    else {
                        if (orQuery_1.length) {
                            compoundQuery.$search.compound = {
                                should: orQuery_1
                            };
                        }
                        if (andQuery_1.length) {
                            compoundQuery.$search.compound = {
                                must: andQuery_1
                            };
                        }
                        if (compoundQuery &&
                            compoundQuery.$search &&
                            compoundQuery.$search.compound &&
                            Object.keys(compoundQuery.$search.compound).length) {
                            // add index to final compound query
                            if (rsQuery.index || config.index) {
                                compoundQuery.$search.index = rsQuery.index || config.index;
                            }
                            finalMongoQuery = __spreadArray(__spreadArray(__spreadArray([], extraTargets), [
                                compoundQuery
                            ]), finalMongoQuery);
                        }
                        else {
                            finalMongoQuery = __spreadArray(__spreadArray([], extraTargets), finalMongoQuery);
                        }
                    }
                }
                mongoPipelines[id] = finalMongoQuery;
            }
        }
        else {
            mongoPipelines[id] = {
                error: error
            };
        }
    });
    return mongoPipelines;
};
var getQueriesMap = function (queries, config) {
    var res = {};
    queries.forEach(function (item) {
        // Default value of dataField is *
        if ((item.type === 'search' || item.type === undefined) &&
            item.dataField === undefined) {
            item.dataField = '*';
        }
        var itemId = item.id || "" + Date.now();
        try {
            res[itemId] = {
                rsQuery: item,
                mongoQuery: {}
            };
            // default item type to search
            if (!item.type) {
                item.type = "search";
            }
            if (item.type === "search") {
                res[itemId].mongoQuery = getSearchQuery(item, config);
            }
            if (item.type === "geo") {
                // in case if value is not set, treat it as match_all query / search query
                // this helps in loading all the data on map initially
                if (!item.value) {
                    item.type = 'search';
                    res[itemId].mongoQuery = getSearchQuery(item, config);
                }
                else {
                    res[itemId].mongoQuery = getGeoQuery(item, config);
                }
            }
            if (item.type == "term") {
                res[itemId].mongoQuery = getTermQuery(item, config);
            }
            if (item.type == "range") {
                res[itemId].mongoQuery = getRangeQuery(item, config);
            }
        }
        catch (err) {
            res[itemId] = {
                rsQuery: item,
                error: {
                    status: "Bad request",
                    message: err.message,
                    code: 400
                }
            };
        }
    });
    return res;
};
var performance = {
    now: function () {
        var time = new Date();
        return time.getTime();
    }
};
var ReactiveSearch = /** @class */ (function () {
    function ReactiveSearch(config) {
        var _this = this;
        this.verify = function (data) {
            var errors = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var x = data_1[_i];
                var error = _this.schema.validate(x);
                if (error.length > 0) {
                    errors.push(error.toString());
                }
                else {
                    errors.push(null);
                }
            }
            if (errors.filter(function (x) { return x; }).length === 0) {
                return null;
            }
            else {
                return errors;
            }
        };
        // TODO define type for mongo query
        this.translate = function (data) {
            var error = _this.verify(data);
            if (error) {
                return {
                    error: {
                        error: error,
                        code: 400,
                        status: "Bad Request"
                    }
                };
            }
            var queryMap = getQueriesMap(data, _this.config);
            var result = buildQueryPipeline(queryMap, _this.config);
            return result;
        };
        this.transformResponse = function (totalTimeTaken, data) {
            var transformedRes = [];
            data.forEach(function (item) {
                var _a;
                var _b, _c, _d, _e, _f, _g;
                var rsQuery = item.rsQuery, response = item.response, error = item.error, took = item.took, raw = item.raw;
                if (error) {
                    return transformedRes.push(error);
                }
                if (rsQuery) {
                    // user can re-shape response incase of default query
                    // hence we will be returning raw key in that case
                    // prepare response for term aggregations
                    // should be of following shape {..., aggregations: {[dataField]: {buckets: [{key:'', doc_count: 0}]}}}
                    if (rsQuery.type === 'term') {
                        var dataField = Array.isArray(rsQuery.dataField)
                            ? "" + rsQuery.dataField[0]
                            : "" + rsQuery.dataField;
                        return transformedRes.push({
                            id: rsQuery.id,
                            took: took,
                            hits: {},
                            raw: raw,
                            status: 200,
                            aggregations: (_a = {},
                                _a[dataField] = {
                                    buckets: (_b = response[0]) === null || _b === void 0 ? void 0 : _b.aggregations.map(function (item) {
                                        var _a, _b;
                                        return ({
                                            key: item._id,
                                            doc_count: ((_a = item === null || item === void 0 ? void 0 : item.count) === null || _a === void 0 ? void 0 : _a.$numberInt)
                                                ? parseInt((_b = item === null || item === void 0 ? void 0 : item.count) === null || _b === void 0 ? void 0 : _b.$numberInt)
                                                : (item === null || item === void 0 ? void 0 : item.count) || 0
                                        });
                                    })
                                },
                                _a)
                        });
                    }
                    // if not term aggregations return search results
                    // for range query it can have min, max and histogram values
                    var _h = response[0], hits = _h.hits, total = _h.total, min = _h.min, max = _h.max, histogram = _h.histogram;
                    var dataToReturn = {
                        id: rsQuery.id,
                        took: took,
                        raw: raw,
                        hits: {
                            total: {
                                value: ((_c = total[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
                                relation: "eq"
                            },
                            // TODO add max score
                            max_score: 0,
                            hits: rsQuery.size === 0
                                ? []
                                : hits.map(function (item) {
                                    return item.highlights
                                        ? {
                                            _index: rsQuery.index || _this.config.index || "default",
                                            _collection: _this.config.collection,
                                            _id: item._id,
                                            // TODO add score pipeline
                                            _score: 0,
                                            _source: __assign(__assign({}, item), { highlights: null }),
                                            highlight: item.highlights.map(function (entity) {
                                                var _a;
                                                return (_a = {},
                                                    _a[entity.path] = entity.texts
                                                        .map(function (text) {
                                                        return text.type === 'text'
                                                            ? text.value
                                                            : "<b>" + text.value + "</b>";
                                                    })
                                                        .join(' '),
                                                    _a);
                                            })
                                        }
                                        : {
                                            _index: rsQuery.index || _this.config.index || "default",
                                            _collection: _this.config.collection,
                                            _id: item._id,
                                            // TODO add score pipeline
                                            _score: 0,
                                            _source: item
                                        };
                                })
                        },
                        error: null,
                        status: 200
                    };
                    if (min || max || histogram) {
                        dataToReturn.aggregations = {};
                    }
                    if (min) {
                        dataToReturn.aggregations.min = {
                            value: ((_d = min[0].min) === null || _d === void 0 ? void 0 : _d.$numberInt)
                                ? parseInt((_e = min[0].min) === null || _e === void 0 ? void 0 : _e.$numberInt)
                                : min[0].min || 0
                        };
                    }
                    if (max) {
                        dataToReturn.aggregations.max = {
                            value: ((_f = max[0].max) === null || _f === void 0 ? void 0 : _f.$numberInt)
                                ? parseInt((_g = max[0].max) === null || _g === void 0 ? void 0 : _g.$numberInt)
                                : max[0].max || 0
                        };
                    }
                    if (histogram) {
                        var dataField = Array.isArray(rsQuery.dataField)
                            ? "" + rsQuery.dataField[0]
                            : "" + rsQuery.dataField;
                        dataToReturn.aggregations[dataField] = {
                            buckets: histogram.map(function (item) {
                                var _a, _b;
                                return ({
                                    key: item._id,
                                    doc_count: ((_a = item === null || item === void 0 ? void 0 : item.count) === null || _a === void 0 ? void 0 : _a.$numberInt)
                                        ? parseInt((_b = item === null || item === void 0 ? void 0 : item.count) === null || _b === void 0 ? void 0 : _b.$numberInt)
                                        : (item === null || item === void 0 ? void 0 : item.count) || 0
                                });
                            })
                        };
                    }
                    return transformedRes.push(dataToReturn);
                }
            });
            var result = {
                settings: {
                    took: totalTimeTaken
                }
            };
            transformedRes.forEach(function (item) {
                var id = item.id, rest = __rest(item, ["id"]);
                result[id] = rest;
            });
            return result;
        };
        this.query = function (data) {
            var error = _this.verify(data);
            if (error) {
                return {
                    error: {
                        error: error,
                        code: 400,
                        status: "Bad Request"
                    }
                };
            }
            var queryMap = getQueriesMap(data, _this.config);
            var aggregationsObject = buildQueryPipeline(queryMap, _this.config);
            try {
                var totalStart_1 = performance.now();
                return Promise.all(Object.keys(aggregationsObject).map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var rsQuery, start, error_1, collection, response, raw, end, took, err_2, end, took;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                rsQuery = queryMap[item].rsQuery;
                                start = performance.now();
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 5, , 6]);
                                error_1 = aggregationsObject[item].error;
                                // return if item has error before execution,
                                // this would ideally be 400 error
                                if (error_1) {
                                    return [2 /*return*/, {
                                            rsQuery: rsQuery,
                                            error: {
                                                id: item,
                                                hits: null,
                                                error: error_1,
                                                status: error_1 === null || error_1 === void 0 ? void 0 : error_1.code
                                            },
                                            took: 0
                                        }];
                                }
                                collection = this.config.client
                                    .db(this.config.database)
                                    .collection(this.config.collection);
                                return [4 /*yield*/, collection
                                        .aggregate(aggregationsObject[item])
                                        .toArray()];
                            case 2:
                                response = _a.sent();
                                raw = undefined;
                                if (!(rsQuery && rsQuery.defaultQuery)) return [3 /*break*/, 4];
                                return [4 /*yield*/, collection.aggregate(rsQuery.defaultQuery).toArray()];
                            case 3:
                                raw = _a.sent();
                                _a.label = 4;
                            case 4:
                                end = performance.now();
                                took = Math.abs(end - start) || 1;
                                return [2 /*return*/, { rsQuery: rsQuery, took: took, error: error_1, raw: raw, response: response }];
                            case 5:
                                err_2 = _a.sent();
                                end = performance.now();
                                took = Math.abs(end - start) || 1;
                                return [2 /*return*/, {
                                        rsQuery: rsQuery,
                                        error: {
                                            id: item,
                                            hits: null,
                                            error: err_2.toString(),
                                            status: 500
                                        },
                                        took: took
                                    }];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); })).then(function (res) {
                    var totalEnd = performance.now();
                    var totalTimeTaken = Math.abs(totalEnd - totalStart_1) || 1;
                    var transformedRes = _this.transformResponse(totalTimeTaken, res);
                    return transformedRes;
                });
            }
            catch (err) {
                throw err;
            }
        };
        this.validateCollection = function () { return __awaiter(_this, void 0, void 0, function () {
            var admin, databases, collections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin = this.config.client.db().admin();
                        return [4 /*yield*/, admin.listDatabases({
                                nameOnly: true
                            })];
                    case 1:
                        databases = _a.sent();
                        databases = databases.databases.map(function (x) { return x.name; });
                        if (!databases.includes(this.config.database)) {
                            return [2 /*return*/, {
                                    code: 400,
                                    error: 'Database does not exist',
                                    message: 'Database does not exist'
                                }];
                        }
                        return [4 /*yield*/, this.config.client
                                .db(this.config.database)
                                .listCollections()
                                .toArray()];
                    case 2:
                        collections = _a.sent();
                        collections = collections.map(function (x) { return x.name; });
                        if (!collections.includes(this.config.collection)) {
                            return [2 /*return*/, {
                                    code: 400,
                                    error: 'Collection does not exist',
                                    message: 'Collection does not exist'
                                }];
                        }
                        return [2 /*return*/, {
                                code: 200,
                                message: 'Database and collection exist'
                            }];
                }
            });
        }); };
        this.config = {
            client: config.client,
            database: config.database,
            collection: config.collection,
            index: config.index
        };
        // @ts-ignore
        this.schema = new Schema(RSQuerySchema, { strip: false });
    }
    return ReactiveSearch;
}());


/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

const typeOf = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  if (isBuffer(val)) return 'buffer';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val);

  return typeof val;
};

// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
function isBuffer(obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}



/**
 * Set given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @param {Mixed} val
 * @return {Object}
 * @api public
 */

const dot = {}
dot.set = function(obj, path, val) {
  var segs = path.split('.');
  var attr = segs.pop();
  var src = obj;

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (!isSafe(obj, seg)) return src;
    obj[seg] = obj[seg] || {};
    obj = obj[seg];
  }

  if (isSafe(obj, attr)) {
    obj[attr] = val;
  }

  return src;
};

/**
 * Get given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @return {Mixed}
 * @api public
 */

dot.get = function(obj, path) {
  var segs = path.split('.');
  var attr = segs.pop();

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (!obj[seg]) return;
    obj = obj[seg];
  }

  return obj[attr];
};

/**
 * Delete given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @return {Mixed}
 * @api public
 */

dot.delete = function(obj, path) {
  var segs = path.split('.');
  var attr = segs.pop();

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (!obj[seg]) return;
    if (!isSafe(obj, seg)) return;
    obj = obj[seg];
  }

  if (!isSafe(obj, attr)) return;

  if (Array.isArray(obj)) {
    obj.splice(attr, 1);
  } else {
    delete obj[attr];
  }
};

function isSafe(obj, prop) {
  if (isObject(obj)) {
    return obj[prop] === undefined || hasOwnProperty(obj, prop);
  }

  if (Array.isArray(obj)) {
    return !isNaN(parseInt(prop, 10));
  }

  return false;
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}


/**
 * Custom errors.
 *
 * @private
 */

class ValidationError extends Error {
  constructor(message, path) {
    super(message);

    defineProp(this, 'path', path);
    defineProp(this, 'expose', true);
    defineProp(this, 'status', 400);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

const defineProp = (obj, prop, val) => {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: val
  });
};


/**
 * Default error messages.
 *
 * @private
 */

const Messages = {
  // Type message
  type(prop, ctx, type) {
    if (typeof type == 'function') {
      type = type.name;
    }

    return `${prop} must be of type ${type}.`;
  },

  // Required message
  required(prop) {
    return `${prop} is required.`;
  },

  // Match message
  match(prop, ctx, regexp) {
    return `${prop} must match ${regexp}.`;
  },

  // Length message
  length(prop, ctx, len) {
    if (typeof len == 'number') {
      return `${prop} must have a length of ${len}.`;
    }

    const { min, max } = len;

    if (min && max) {
      return `${prop} must have a length between ${min} and ${max}.`;
    }
    if (max) {
      return `${prop} must have a maximum length of ${max}.`;
    }
    if (min) {
      return `${prop} must have a minimum length of ${min}.`;
    }
  },

  // Size message
  size(prop, ctx, size) {
    if (typeof size == 'number') {
      return `${prop} must have a size of ${size}.`;
    }

    const { min, max } = size;

    if (min !== undefined && max !== undefined) {
      return `${prop} must be between ${min} and ${max}.`;
    }
    if (max !== undefined) {
      return `${prop} must be less than ${max}.`;
    }
    if (min !== undefined) {
      return `${prop} must be greater than ${min}.`;
    }
  },

  // Enum message
  enum(prop, ctx, enums) {
    const copy = enums.slice();
    const last = copy.pop();
    return `${prop} must be either ${copy.join(', ')} or ${last}.`;
  },

  // Illegal property
  illegal(prop) {
    return `${prop} is not allowed.`;
  },

  // Default message
  default(prop) {
    return `Validation failed for ${prop}.`;
  }
};






/**
 * A property instance gets returned whenever you call `schema.path()`.
 * Properties are also created internally when an object is passed to the Schema constructor.
 *
 * @param {String} name - the name of the property
 * @param {Schema} schema - parent schema
 */

class Property {
  constructor(name, schema) {
    this.name = name;
    this.registry = {};
    this._schema = schema;
    this._type = null;
    this.messages = {};
  }

  /**
   * Registers messages.
   *
   * @example
   * prop.message('something is wrong')
   * prop.message({ required: 'thing is required.' })
   *
   * @param {Object|String} messages
   * @return {Property}
   */

  message(messages) {
    if (typeof messages == 'string') {
      messages = { default: messages };
    }

    const entries = Object.entries(messages);

    for (const [key, val] of entries) {
      this.messages[key] = val;
    }

    return this;
  }

  /**
   * Mount given `schema` on current path.
   *
   * @example
   * const user = new Schema({ email: String })
   * prop.schema(user)
   *
   * @param {Schema} schema - the schema to mount
   * @return {Property}
   */

  schema(schema) {
    this._schema.path(this.name, schema);
    return this;
  }

  /**
   * Validate using named functions from the given object.
   * Error messages can be defined by providing an object with
   * named error messages/generators to `schema.message()`
   *
   * The message generator receives the value being validated,
   * the object it belongs to and any additional arguments.
   *
   * @example
   * const schema = new Schema()
   * const prop = schema.path('some.path')
   *
   * schema.message({
   *   binary: (path, ctx) => `${path} must be binary.`,
   *   bits: (path, ctx, bits) => `${path} must be ${bits}-bit`
   * })
   *
   * prop.use({
   *   binary: (val, ctx) => /^[01]+$/i.test(val),
   *   bits: [(val, ctx, bits) => val.length == bits, 32]
   * })
   *
   * @param {Object} fns - object with named validation functions to call
   * @return {Property}
   */

  use(fns) {
    Object.keys(fns).forEach(name => {
      let arr = fns[name];
      if (!Array.isArray(arr)) arr = [arr];
      const fn = arr.shift();
      this._register(name, arr, fn);
    });

    return this;
  }

  /**
   * Registers a validator that checks for presence.
   *
   * @example
   * prop.required()
   *
   * @param {Boolean} [bool] - `true` if required, `false` otherwise
   * @return {Property}
   */

  required(bool = true) {
    return this._register('required', [bool]);
  }

  /**
   * Registers a validator that checks if a value is of a given `type`
   *
   * @example
   * prop.type(String)
   *
   * @example
   * prop.type('string')
   *
   * @param {String|Function} type - type to check for
   * @return {Property}
   */

  type(type) {
    this._type = type;
    return this._register('type', [type]);
  }

  /**
   * Convenience method for setting type to `String`
   *
   * @example
   * prop.string()
   *
   * @return {Property}
   */

  string() {
    return this.type(String);
  }

  /**
   * Convenience method for setting type to `Number`
   *
   * @example
   * prop.number()
   *
   * @return {Property}
   */

  number() {
    return this.type(Number);
  }

  /**
   * Convenience method for setting type to `Array`
   *
   * @example
   * prop.array()
   *
   * @return {Property}
   */

  array() {
    return this.type(Array);
  }

  /**
   * Convenience method for setting type to `Date`
   *
   * @example
   * prop.date()
   *
   * @return {Property}
   */

  date() {
    return this.type(Date);
  }

  /**
   * Registers a validator that checks length.
   *
   * @example
   * prop.length({ min: 8, max: 255 })
   * prop.length(10)
   *
   * @param {Object|Number} rules - object with `.min` and `.max` properties or a number
   * @param {Number} rules.min - minimum length
   * @param {Number} rules.max - maximum length
   * @return {Property}
   */

  length(rules) {
    return this._register('length', [rules]);
  }

  /**
   * Registers a validator that checks size.
   *
   * @example
   * prop.size({ min: 8, max: 255 })
   * prop.size(10)
   *
   * @param {Object|Number} rules - object with `.min` and `.max` properties or a number
   * @param {Number} rules.min - minimum size
   * @param {Number} rules.max - maximum size
   * @return {Property}
   */

  size(rules) {
    return this._register('size', [rules]);
  }

  /**
   * Registers a validator for enums.
   *
   * @example
   * prop.enum(['cat', 'dog'])
   *
   * @param {Array} rules - allowed values
   * @return {Property}
   */

  enum(enums) {
    return this._register('enum', [enums]);
  }

  /**
   * Registers a validator that checks if a value matches given `regexp`.
   *
   * @example
   * prop.match(/some\sregular\sexpression/)
   *
   * @param {RegExp} regexp - regular expression to match
   * @return {Property}
   */

  match(regexp) {
    return this._register('match', [regexp]);
  }

  /**
   * Registers a validator that checks each value in an array against given `rules`.
   *
   * @example
   * prop.each({ type: String })
   * prop.each([{ type: Number }])
   * prop.each({ things: [{ type: String }]})
   * prop.each(schema)
   *
   * @param {Array|Object|Schema|Property} rules - rules to use
   * @return {Property}
   */

  each(rules) {
    this._schema.path(join('$', this.name), rules);
    return this;
  }

  /**
   * Registers paths for array elements on the parent schema, with given array of rules.
   *
   * @example
   * prop.elements([{ type: String }, { type: Number }])
   *
   * @param {Array} arr - array of rules to use
   * @return {Property}
   */

  elements(arr) {
    arr.forEach((rules, i) => {
      this._schema.path(join(i, this.name), rules);
    });
    return this;
  }

  /**
   * Registers all properties from the given object as nested properties
   *
   * @example
   * prop.properties({
   *   name: String,
   *   email: String
   * })
   *
   * @param {Object} props - properties with rules
   * @return {Property}
   */

  properties(props) {
    for (const [prop, rule] of Object.entries(props)) {
      this._schema.path(join(prop, this.name), rule);
    }
    return this;
  }

  /**
   * Proxy method for schema path. Makes chaining properties together easier.
   *
   * @example
   * schema
   *   .path('name').type(String).required()
   *   .path('email').type(String).required()
   *
   */

  path(...args) {
    return this._schema.path(...args);
  }

  /**
   * Typecast given `value`
   *
   * @example
   * prop.type(String)
   * prop.typecast(123) // => '123'
   *
   * @param {Mixed} value - value to typecast
   * @return {Mixed}
   */

  typecast(value) {
    const schema = this._schema;
    let type = this._type;

    if (!type) return value;

    if (typeof type == 'function') {
      type = type.name;
    }

    const cast = schema.typecasters[type] ||
      schema.typecasters[type.toLowerCase()];

    if (typeof cast != 'function') {
      throw new Error(`Typecasting failed: No typecaster defined for ${type}.`);
    }

    return cast(value);
  }

  /**
   * Validate given `value`
   *
   * @example
   * prop.type(Number)
   * assert(prop.validate(2) == null)
   * assert(prop.validate('hello world') instanceof Error)
   *
   * @param {Mixed} value - value to validate
   * @param {Object} ctx - the object containing the value
   * @param {String} [path] - path of the value being validated
   * @return {ValidationError}
   */

  validate(value, ctx, path = this.name) {
    const types = Object.keys(this.registry);

    for (const type of types) {
      const err = this._run(type, value, ctx, path);
      if (err) return err;
    }

    return null;
  }

  /**
   * Run validator of given `type`
   *
   * @param {String} type - type of validator
   * @param {Mixed} value - value to validate
   * @param {Object} ctx - the object containing the value
   * @param {String} path - path of the value being validated
   * @return {ValidationError}
   * @private
   */

  _run(type, value, ctx, path) {
    if (!this.registry[type]) return;
    const schema = this._schema;
    const { args, fn } = this.registry[type];
    const validator = fn || schema.validators[type];
    const valid = validator(value, ctx, ...args, path);
    if (!valid) return this._error(type, ctx, args, path);
  }

  /**
   * Register validator
   *
   * @param {String} type - type of validator
   * @param {Array} args - argument to pass to validator
   * @param {Function} [fn] - custom validation function to call
   * @return {Property}
   * @private
   */

  _register(type, args, fn) {
    this.registry[type] = { args, fn };
    return this;
  }

  /**
   * Create an error
   *
   * @param {String} type - type of validator
   * @param {Object} ctx - the object containing the value
   * @param {Array} args - arguments to pass
   * @param {String} path - path of the value being validated
   * @return {ValidationError}
   * @private
   */

  _error(type, ctx, args, path) {
    const schema = this._schema;

    let message = this.messages[type] ||
      this.messages.default ||
      schema.messages[type] ||
      schema.messages.default;

    if (typeof message == 'function') {
      message = message(path, ctx, ...args);
    }

    return new ValidationError(message, path);
  }
}











/**
 * A Schema defines the structure that objects should be validated against.
 *
 * @example
 * const post = new Schema({
 *   title: {
 *     type: String,
 *     required: true,
 *     length: { min: 1, max: 255 }
 *   },
 *   content: {
 *     type: String,
 *     required: true
 *   },
 *   published: {
 *     type: Date,
 *     required: true
 *   },
 *   keywords: [{ type: String }]
 * })
 *
 * @example
 * const author = new Schema({
 *   name: {
 *     type: String,
 *     required: true
 *   },
 *   email: {
 *     type: String,
 *     required: true
 *   },
 *   posts: [post]
 * })
 *
 * @param {Object} [obj] - schema definition
 * @param {Object} [opts] - options
 * @param {Boolean} [opts.typecast=false] - typecast values before validation
 * @param {Boolean} [opts.strip=true] - strip properties not defined in the schema
 * @param {Boolean} [opts.strict=false] - validation fails when object contains properties not defined in the schema
 */

class Schema {
  constructor(obj = {}, opts = {}) {
    this.opts = opts;
    this.hooks = [];
    this.props = {};
    this.messages = Object.assign({}, Messages);
    this.validators = Object.assign({}, Validators);
    this.typecasters = Object.assign({}, typecast);
    Object.keys(obj).forEach(k => this.path(k, obj[k]));
  }

  /**
   * Create or update `path` with given `rules`.
   *
   * @example
   * const schema = new Schema()
   * schema.path('name.first', { type: String })
   * schema.path('name.last').type(String).required()
   *
   * @param {String} path - full path using dot-notation
   * @param {Object|Array|String|Schema|Property} [rules] - rules to apply
   * @return {Property}
   */

  path(path, rules) {
    const parts = path.split('.');
    const suffix = parts.pop();
    const prefix = parts.join('.');

    // Make sure full path is created
    if (prefix) {
      this.path(prefix);
    }

    // Array index placeholder
    if (suffix === '$') {
      this.path(prefix).type(Array);
    }

    // Nested schema
    if (rules instanceof Schema) {
      rules.hook((k, v) => this.path(join(k, path), v));
      return this.path(path, rules.props);
    }

    // Return early when given a `Property`
    if (rules instanceof Property) {
      this.props[path] = rules;
      // Notify parents if mounted
      this.propagate(path, rules);
      return rules;
    }

    const prop = this.props[path] || new Property(path, this);

    this.props[path] = prop;
    // Notify parents if mounted
    this.propagate(path, prop);

    // No rules?
    if (!rules) return prop;

    // type shorthand
    // `{ name: String }`
    if (typeof rules == 'string' || typeof rules == 'function') {
      prop.type(rules);
      return prop;
    }

    // Allow arrays to be defined implicitly:
    // `{ keywords: [String] }`
    // `{ keyVal: [[String, Number]] }`
    if (Array.isArray(rules)) {
      prop.type(Array);

      if (rules.length === 1) {
        prop.each(rules[0]);
      } else {
        prop.elements(rules);
      }

      return prop;
    }

    const keys = Object.keys(rules);
    let nested = false;

    // Check for nested objects
    for (const key of keys) {
      if (typeof prop[key] == 'function') continue;
      prop.type(Object);
      nested = true;
      break;
    }

    keys.forEach(key => {
      const rule = rules[key];

      if (nested) {
        return this.path(join(key, path), rule);
      }

      prop[key](rule);
    });

    return prop;
  }

  /**
   * Typecast given `obj`.
   *
   * @param {Object} obj - the object to typecast
   * @return {Schema}
   * @private
   */

  typecast(obj) {
    for (const [path, prop] of Object.entries(this.props)) {
      enumerate(path, obj, (key, value) => {
        if (value == null) return;
        const cast = prop.typecast(value);
        if (cast === value) return;
        dot.set(obj, key, cast);
      });
    }

    return this;
  }

  /**
   * Strip all keys not defined in the schema
   *
   * @param {Object} obj - the object to strip
   * @param {String} [prefix]
   * @return {Schema}
   * @private
   */

  strip(obj) {
    walk(obj, (path, prop) => {
      if (this.props[prop]) return true;
      dot.delete(obj, path);
      return false;
    });

    return this;
  }

  /**
   * Create errors for all properties that are not defined in the schema
   *
   * @param {Object} obj - the object to check
   * @return {Schema}
   * @private
   */

  enforce(obj) {
    const errors = [];

    walk(obj, (path, prop) => {
      if (this.props[prop]) return true;
      const error = new ValidationError(Messages.illegal(path), path);
      errors.push(error);
      return false;
    });

    return errors;
  }

  /**
   * Validate given `obj`.
   *
   * @example
   * const schema = new Schema({ name: { required: true }})
   * const errors = schema.validate({})
   * assert(errors.length == 1)
   * assert(errors[0].message == 'name is required')
   * assert(errors[0].path == 'name')
   *
   * @param {Object} obj - the object to validate
   * @param {Object} [opts] - options, see [Schema](#schema-1)
   * @return {Array}
   */

  validate(obj, opts = {}) {
    opts = Object.assign(this.opts, opts);

    const errors = [];

    if (opts.typecast) {
      this.typecast(obj);
    }

    if (opts.strict) {
      errors.push(...this.enforce(obj));
    }

    if (opts.strip !== false) {
      this.strip(obj);
    }

    for (const [path, prop] of Object.entries(this.props)) {
      enumerate(path, obj, (key, value) => {
        const err = prop.validate(value, obj, key);
        if (err) errors.push(err);
      });
    }

    return errors;
  }

  /**
   * Assert that given `obj` is valid.
   *
   * @example
   * const schema = new Schema({ name: String })
   * schema.assert({ name: 1 }) // Throws an error
   *
   * @param {Object} obj
   * @param {Object} [opts]
   */

  assert(obj, opts) {
    const [err] = this.validate(obj, opts);
    if (err) throw err;
  }

  /**
   * Override default error messages.
   *
   * @example
   * const hex = (val) => /^0x[0-9a-f]+$/.test(val)
   * schema.path('some.path').use({ hex })
   * schema.message('hex', path => `${path} must be hexadecimal`)
   *
   * @example
   * schema.message({ hex: path => `${path} must be hexadecimal` })
   *
   * @param {String|Object} name - name of the validator or an object with name-message pairs
   * @param {String|Function} [message] - the message or message generator to use
   * @return {Schema}
   */

  message(name, message) {
    assign(name, message, this.messages);
    return this;
  }

  /**
   * Override default validators.
   *
   * @example
   * schema.validator('required', val => val != null)
   *
   * @example
   * schema.validator({ required: val => val != null })
   *
   * @param {String|Object} name - name of the validator or an object with name-function pairs
   * @param {Function} [fn] - the function to use
   * @return {Schema}
   */

  validator(name, fn) {
    assign(name, fn, this.validators);
    return this;
  }

  /**
   * Override default typecasters.
   *
   * @example
   * schema.typecaster('SomeClass', val => new SomeClass(val))
   *
   * @example
   * schema.typecaster({ SomeClass: val => new SomeClass(val) })
   *
   * @param {String|Object} name - name of the validator or an object with name-function pairs
   * @param {Function} [fn] - the function to use
   * @return {Schema}
   */

  typecaster(name, fn) {
    assign(name, fn, this.typecasters);
    return this;
  }

  /**
   * Accepts a function that is called whenever new props are added.
   *
   * @param {Function} fn - the function to call
   * @return {Schema}
   * @private
   */

  hook(fn) {
    this.hooks.push(fn);
    return this;
  }

  /**
   * Notify all subscribers that a property has been added.
   *
   * @param {String} path - the path of the property
   * @param {Property} prop - the new property
   * @return {Schema}
   * @private
   */

  propagate(path, prop) {
    this.hooks.forEach(fn => fn(path, prop));
    return this;
  }
}

// Export ValidationError
Schema.ValidationError = ValidationError;




/**
 * Cast given `val` to `type`
 *
 * @param {Mixed} val
 * @param {String} type
 * @api public
 */

function typecast (val, type) {
  var fn = typecast[type];
  if (typeof fn != 'function') throw new Error('cannot cast to ' + type);
  return fn(val);
}

/**
 * Cast `val` to `String`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.string = function (val) {
  return val.toString();
};

/**
 * Cast `val` to `Number`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.number = function (val) {
  var num = parseFloat(val);
  return isNaN(num)
    ? null
    : num;
};

/**
 * Cast `val` to a`Date`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.date = function (val) {
  var date = new Date(val);
  return isNaN(date.valueOf())
    ? null
    : date;
};

/**
 * Cast `val` to `Array`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.array = function (val) {
  if (val instanceof Array) return val;
  var arr = val.toString().split(',');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  return arr;
};

/**
 * Cast `val` to `Boolean`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.boolean = function (val) {
  return !! val && val !== 'false';
};





/**
 * Assign given key and value (or object) to given object
 *
 * @private
 */

function assign(key, val, obj) {
  if (typeof key == 'string') {
    obj[key] = val;
    return;
  }

  Object.keys(key).forEach(k => obj[k] = key[k]);
}

/**
 * Enumerate all permutations of `path`, replacing $ with array indices
 *
 * @private
 */

function enumerate(path, obj, callback) {
  const parts = path.split(/\.\$(?=\.|$)/);
  const first = parts.shift();
  const arr = dot.get(obj, first);

  if (!parts.length) {
    return callback(first, arr);
  }

  if (!Array.isArray(arr)) {
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const current = join(i, first);
    const next = current + parts.join('.$');
    enumerate(next, obj, callback);
  }
}

/**
 * Walk object and call `callback` with path and prop name
 *
 * @private
 */

function walk(obj, callback, path, prop) {
  const type = typeOf(obj);

  if (type === 'array') {
    obj.forEach((v, i) =>
      walk(v, callback, join(i, path), join('$', prop))
    );
    return;
  }

  if (type !== 'object') {
    return;
  }

  for (const [key, val] of Object.entries(obj)) {
    const newPath = join(key, path);
    const newProp = join(key, prop);
    if (callback(newPath, newProp)) {
      walk(val, callback, newPath, newProp);
    }
  }
}

/**
 * Join `path` with `prefix`
 *
 * @private
 */

function join(path, prefix) {
  return prefix
    ? `${prefix}.${path}`
    : path;
}



/**
 * Default validators.
 *
 * @private
 */

const Validators = {
	/**
	 * Validates presence.
	 *
	 * @param {Mixed} value - the value being validated
	 * @param {Object} ctx - the object being validated
	 * @param {Bolean} required
	 * @return {Boolean}
	 */

	required(value, ctx, required) {
		if (required === false) return true;
		return value != null && value !== '';
	},

	/**
	 * Validates type.
	 *
	 * @param {Mixed} value - the value being validated
	 * @param {Object} ctx - the object being validated
	 * @param {String|Function} name name of the type or a constructor
	 * @return {Boolean}
	 */

	_type(value, ctx, name) {
		if (typeof name == 'function') {
			return value.constructor === name;
		}

		return typeOf(value) === name;
	},

	type(value, ctx, name) {
		if (value == null) return true;

		if (Array.isArray(name)) {
			let result = false;
			for (const x of name) {
				result = result || Validators._type(value, ctx, x);
			}
			return result;
		}
		return Validators._type(value, ctx, name);
	},

	/**
	 * Validates length.
	 *
	 * @param {String} value the string being validated
	 * @param {Object} ctx the object being validated
	 * @param {Object|Number} rules object with .min and/or .max props or a number
	 * @param {Number} [rules.min] - minimum length
	 * @param {Number} [rules.max] - maximum length
	 * @return {Boolean}
	 */

	length(value, ctx, len) {
		if (value == null) return true;
		if (typeof len == 'number') {
			return value.length === len;
		}
		const { min, max } = len;
		if (min && value.length < min) return false;
		if (max && value.length > max) return false;
		return true;
	},

	/**
	 * Validates size.
	 *
	 * @param {Number} value the number being validated
	 * @param {Object} ctx the object being validated
	 * @param {Object|Number} size object with .min and/or .max props or a number
	 * @param {String|Number} [size.min] - minimum size
	 * @param {String|Number} [size.max] - maximum size
	 * @return {Boolean}
	 */

	size(value, ctx, size) {
		if (value == null) return true;
		if (typeof size == 'number') {
			return value === size;
		}
		const { min, max } = size;
		if (parseInt(min) != null && value < min) return false;
		if (parseInt(max) != null && value > max) return false;
		return true;
	},

	/**
	 * Validates enums.
	 *
	 * @param {String} value the string being validated
	 * @param {Object} ctx the object being validated
	 * @param {Array} enums array with allowed values
	 * @return {Boolean}
	 */

	enum(value, ctx, enums) {
		if (value == null) return true;
		return enums.includes(value);
	},

	/**
	 * Validates against given `regexp`.
	 *
	 * @param {String} value the string beign validated
	 * @param {Object} ctx the object being validated
	 * @param {RegExp} regexp the regexp to validate against
	 * @return {Boolean}
	 */

	match(value, ctx, regexp) {
		if (value == null) return true;
		return regexp.test(value);
	},
};


