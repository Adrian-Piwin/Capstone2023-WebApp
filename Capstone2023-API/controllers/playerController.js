// controllers/poiController.js
const sql = require('mssql'); // Import the mssql package

exports.getPlayers = async (req, res) => {
    const { lobbyID } = req.query;
    try {
        const pool = await sql.connect(); // Get a connection from the pool

        const result = await pool
            .request()
            .input('lobbyID', sql.Int, lobbyID)
            .query('SELECT * FROM Players WHERE lobbyID = @lobbyID');

        res.json({ success: true, result: result.recordset });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
