const sql = require('mssql'); // Import the mssql package

// Function to get Campus data by lobbyID
exports.getCampus = async (req, res) => {
    const { lobbyID } = req.query; // Use req.query to access query parameters
    try {
        const pool = await sql.connect(); // Get a connection from the pool

        const result = await pool
            .request()
            .input('lobbyID', sql.VarChar(50), lobbyID)
            .query('SELECT * FROM Campus WHERE lobbyID = @lobbyID');

        if (result.recordset.length > 0) {
            // Campus data found
            res.json({ success: true, result: result.recordset[0] });
        } else {
            // Campus data not found
            res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to insert or update Campus data by lobbyID
exports.upsertCampus = async (req, res) => {
    const { lobbyID, name } = req.body;

    try {
        const pool = await sql.connect(); // Get a connection from the pool

        // Check if Campus data exists
        const existingResult = await pool
            .request()
            .input('lobbyID', sql.VarChar(50), lobbyID)
            .query('SELECT * FROM Campus WHERE lobbyID = @lobbyID');

        if (existingResult.recordset.length > 0) {
            // Update existing Campus data
            await pool
                .request()
                .input('lobbyID', sql.VarChar(5), lobbyID)
                .input('name', sql.VarChar(30), name)
                .query('UPDATE Campus SET name = @name WHERE lobbyID = @lobbyID');

            res.json({ success: true });
        } else {
            // Insert new Campus data
            await pool
                .request()
                .input('lobbyID', sql.VarChar(5), lobbyID)
                .input('name', sql.VarChar(30), name)
                .input('map', sql.VarChar(40), map)
                .query('INSERT INTO Campus (lobbyID, name) VALUES (@lobbyID, @name)');

            res.json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
