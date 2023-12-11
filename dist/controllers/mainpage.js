"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHomePage = (request, response, next) => {
    response.sendFile('home.html', { root: 'views' });
};
const getErrorPage = (request, response, next) => {
    response.sendFile('notFound.html', { root: 'views' });
};
exports.default = {
    getHomePage,
    getErrorPage
};
