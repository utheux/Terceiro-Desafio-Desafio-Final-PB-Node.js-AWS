import { decode, verify, JwtPayload } from 'jsonwebtoken';
import JsonSecret from '../config/JsonSecret';

const authenticated = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {  
        return res.status(401).send('Access token not provided');
    }

    const [, accessToken] = token.split(' ');

    try {
        const jsonSecret = new JsonSecret();
        verify(accessToken, jsonSecret.secret);

        const decodedToken = decode(accessToken);

        if (decodedToken && typeof decodedToken !== 'string') {
            const { id, email } = decodedToken as JwtPayload;

            req.userId = id;
            req.userEmail = email;

            return next();
        } else {
            return res.status(401).send('invalid token');
        }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return res.status(401).send('Unauthorized user');
    }
};

export default authenticated;
