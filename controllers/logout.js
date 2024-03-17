module.exports = (req, res) => {
    // Destroy session to log out the user
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
        } else {
            res.redirect('/');
        }
    });
}