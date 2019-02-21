import routes from "../routes";

export const getJoin = (req, res) => 
{
    res.render("join", {pageTitle : "Join"});
};

export const postJoin = (req, res) =>
{
    // ES6 방식
    const
    {
        body:{name, email, password, password2}
    } = req;
    if(password !== password2)
    {
        // status code
        // Bad request
        res.status(400);
    }
    else
    {
        // To Do: Register User
        // To Do: Log User in
        res.redirect(routes.home);
    }
    res.render("join", {pageTitle : "Join"});
};

export const login = (req, res) => res.render("login", {pageTitle : "Login"});
export const logout = (req, res) => res.render("logout", {pageTitle : "Logout"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});