import fetch from 'node-fetch';
import routes from '../routes';

export const registerView = (id) => {
    try {
        console.log(`http://localhost:4000${routes.registerView(id)}`);
        fetch(`http://localhost:4000${routes.registerView(id)}`, {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
};

export const nothing = () => 0;
