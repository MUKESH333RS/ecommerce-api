const pool = require('../config/db');  

const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];  
    } catch (error) {
        throw new Error('Error fetching user from the database');
    }
};

module.exports = {
    getUserByEmail,
};
