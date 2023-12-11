import User from '../models/users';

const createUser = async (name: string, email: string, password: string) => {
    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getUserbyemail = async (email: string) => {
    try {
        let user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createUser,
    getUserbyemail,
}
