import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
    res.render('join', { pageTitle: 'Join' });
};
export const postJoin = async (req, res, next) => {
    // ES6 방식
    const {
        body: {
            name, email, password, password2,
        },
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render('join', { pageTitle: 'Join' });
    } else {
        try {
            const user = await User({
                name,
                email,
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render('login', { pageTitle: 'Login' });
};
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});

// passport.js 에 함께 써도 되나 더러워보이기 때문에 이곳에 작성
export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id, avatar_url, name, email,
        },
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            avatarUrl: avatar_url,
            githubId: id,
        });
        return cb(null, newUser);
    } catch (error) {
        print(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
