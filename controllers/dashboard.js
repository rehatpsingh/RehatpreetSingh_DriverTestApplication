module.exports = (req, res) => {
    const userLoggedIn = req.session.userLoggedIn || false;
    res.render('dashboard', { userLoggedIn });
}