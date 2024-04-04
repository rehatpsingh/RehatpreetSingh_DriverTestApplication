module.exports = (req, res) => {
    const userLoggedIn = req.session.userLoggedIn || false;
    const userType = req.session.userType;
    res.render('Login', { userLoggedIn, userType, req });
};
