import { Request, Response, NextFunction } from 'express';
import User from '../models/users';
import Awsservice from '../services/awsservices';

interface CustomRequest extends Request {
  user:object,
  headers:any,
  body:any,
  query:any
  params:any
}

 const getLeaderboardExpenses = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ['id', 'name', 'totalExpenses'],
      order: [['totalExpenses', 'DESC']],
      limit: 15,
    });
    return response.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    return response.status(401).json({ message: 'Unauthorized - please relogin' });
  }
};

 const getDownloadURL = async (request: CustomRequest, response: Response, next: NextFunction) => {
  try {
    const user = request.user as any;
    const expenses = await user.getExpenses({
      attributes: ["category", "pmethod", "amount", "date"],
    });
    const formattedExpenses = expenses.map(expense => {
      return `Category: ${expense.category}
Payment Method: ${expense.pmethod}
Amount: ${expense.amount}
Date: ${expense.date}
`;
    });
    const textData = formattedExpenses.join("\n");
    const filename = `expense-data/user${user.id}/${user.name}${new Date()}.txt`;
    const URL = await Awsservice.uploadToS3(textData, filename);
    await user.createDownload({
      downloadUrl: URL
    });
    response.status(200).json({ URL, success: true });
  } catch (error) {
    console.log("Error while creating download link: " + error);
    response.status(500).json({ message: "Unable to generate URL" });
  }
};

 const getDownloadHistory = async (request: CustomRequest, response: Response, next: NextFunction) => {
  try {
    const user = request.user as any;
    const history = await user.getDownloads();
    response.status(200).json(history);
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Unable to fetch history' });
  }
};

export default{
  getLeaderboardExpenses,
  getDownloadURL,
  getDownloadHistory
}
