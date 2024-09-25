const express = require('express');


const router = express.Router(); // Fix Router initialization

router.get('/api/greet', (req, res) => {
    const username = req.signedCookies.username; // Ensure this matches how you set the username cookie
    console.log('we here baby')
    console.log('Cookies:', req.cookies);
    console.log('Signed Cookies:', req.signedCookies);

    if (req.signedCookies.hello && req.signedCookies.hello === "helloworld") { // Match the value you set
        console.log("Cookie is valid");
        return res.status(200).json({ message: `Hi ${username}` });
    }

    if (username) {
        return res.status(200).json({ message: `Hi ${username}` });
    } else {
        return res.status(400).json({ message: 'Username is required' });
    }
});

module.exports = router; // Use module.exports for CommonJS
