import { Request, Response, NextFunction } from 'express';

 const getHomePage = (request: Request, response: Response, next: NextFunction) => {
    response.sendFile('home.html', { root: 'views' });
};

 const getErrorPage = (request: Request, response: Response, next: NextFunction) => {
    response.sendFile('notFound.html', { root: 'views' });
};

export default{
    getHomePage,
    getErrorPage
}
