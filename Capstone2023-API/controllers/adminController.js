// controllers/authController.js
const sql = require('mssql'); // Import the mssql package

exports.sendPostCommand = async (req, res) => {
    const { command } = req.body;
    try {
        const pool = await sql.connect(); // Get a connection from the pool

        await pool
            .request()
            .query(command);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Function to get Campus data by lobbyID
exports.sendGetCommand = async (req, res) => {
    const { command } = req.query; // Use req.query to access query parameters

    try {
        const pool = await sql.connect(); // Get a connection from the pool

        const result = await pool
            .request()
            .query(command);

        if (result.recordset.length > 0) {
            // Campus data found
            res.json({ success: true, result: result.recordset });
        } else {
            // Campus data not found
            res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
