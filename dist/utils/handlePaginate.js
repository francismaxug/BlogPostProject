"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandlePaginate {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
        this.page = 1;
        this.limit = 4;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            // Handle both string and array cases:
            let sortBy = this.queryString.sort;
            if (Array.isArray(sortBy)) {
                sortBy = sortBy.join(" ");
            }
            else {
                sortBy = sortBy.split(",").join(" ");
            }
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            // Handle both string and array cases:
            let fields = this.queryString.fields;
            if (Array.isArray(fields)) {
                fields = fields.join(" ");
            }
            else {
                fields = fields.split(",").join(" ");
            }
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    paginate() {
        const page = Number(this.queryString.page) || this.page; // Convert to number, or default to 1
        const limit = Number(this.queryString.limit) || this.limit; // Convert to number, or default to 4
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
exports.default = HandlePaginate;
