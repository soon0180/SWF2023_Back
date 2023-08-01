const pool = require('./index')

// proposal_id
// account
class Propose {
    static async find() {
        try {
            const sql = `SELECT * FROM propose`
            const [rows, fields] = await pool.query(sql)

            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async findByAccount(account) {
        try {
            const sql = 'SELECT * FROM propse WHERE account=?'
            const [rows, fields] = await pool.query(sql, [account])

            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async findByProposalId(proposal_id) {
        try {
            const sql = 'SELECT * FROM propse WHERE proposal_id=?'
            const [rows, fields] = await pool.query(sql, [proposal_id])

            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async findByUnique({ proposal_id, account }) {
        try {
            const sql = `SELECT * FROM propose WHERE account=? AND proposal_id=?`
            const [rows, fields] = await pool.query(sql, [account, proposal_id])
            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async create({ account, proposal_id, IpfsHash }) {
        try {
            const sql = `INSERT INTO propose(account, proposal_id,IpfsHash) values(?, ?, ?)`
            const [rows, fields] = await pool.query(sql, [account, proposal_id, IpfsHash])

            if (!rows.affectedRows) {
                throw new Error('Proposal 이 등록되지 않았습니다.')
            }

            const [result] = await Propose.findByUnique({ proposal_id, account })

            return result
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async updateAccountByProposalId({ user_id, proposal_id }) {
        try {
            const sql = `UPDATE users SET user_id=? WHERE proposal_id=?`
            const [rows, fields] = await pool.query(sql, [user_id, proposal_id])

            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static async updateProposalIdByAccount({ user_id, proposal_id }) {
        try {
            const sql = `UPDATE users SET proposal_id=? WHERE user_id=?`
            const [rows, fields] = await pool.query(sql, [proposal_id, user_id])

            return rows
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = Propose
