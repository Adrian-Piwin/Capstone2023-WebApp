// controllers/authController.js
const sql = require('mssql'); // Import the mssql package

// ... other code ...

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await sql.connect(); // Get a connection from the pool

        const result = await pool
            .request()
            .input('username', sql.VarChar(50), username)
            .input('password', sql.VarChar(50), password)
            .query('SELECT * FROM Users WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            // Authentication successful
            res.json({ success: true, result: result.recordset[0] });
        } else {
            // Authentication failed
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
