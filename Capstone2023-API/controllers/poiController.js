// controllers/poiController.js
const sql = require('mssql'); // Import the mssql package

exports.getAllPOI = async (req, res) => {
    const { campusID } = req.query;
    try {
        const pool = await sql.connect(); // Get a connection from the pool

        const result = await pool
            .request()
            .input('campusID', sql.Int, campusID)
            .query('SELECT * FROM POI WHERE campusID = @campusID');

        res.json({ success: true, result: result.recordset });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.upsertPOI = async (req, res) => {
    const { campusID, poiID, order, name, description, image, map } = req.body;
    console.log(req.body);
    try {
        const pool = await sql.connect(); // Get a connection from the pool

        // Check if POI data exists
        const existingResult = await pool
            .request()
            .input('poiID', sql.Int, poiID)
            .query('SELECT * FROM POI WHERE id = @poiID');
        console.log(existingResult.recordset)
        if (existingResult.recordset.length > 0) {
            // Update existing POI data
            await pool
                .request()
                .input('poiID', sql.Int, poiID)
                .input('order', sql.Int, order)
                .input('name', sql.VarChar(30), name)
                .input('description', sql.VarChar(250), description)
                .input('image', sql.VarChar(40), image)
                .input('map', sql.VarChar(40), map)
                .query('UPDATE POI SET [order] = @order, [name] = @name, description = @description, image = @image, map = @map WHERE id = @poiID');

            res.json({ success: true });
        } else {
            // Insert new POI data
            await pool
                .request()
                .input('campusID', sql.Int, campusID)
                .input('order', sql.Int, order)
                .input('name', sql.VarChar(30), name)
                .input('description', sql.VarChar(250), description)
                .input('image', sql.VarChar(40), image)
                .input('map', sql.VarChar(40), map)
                .query('INSERT INTO POI (campusID, [order], [name], description, image, map) VALUES (@campusID, @order, @name, @description, @image, @map)');

            res.json({ success: true });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};
