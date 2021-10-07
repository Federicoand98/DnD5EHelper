class TestRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = 
        'CREATE TABLE IF NOT EXISTS test (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            name TEXT)';
        
        return this.dao.run(sql);
    }

    create(name) {
        return this.dao.run(
            'INSERT INTO test (name) VALUES (?)',
            [name]
        );
    }

    update(test) {
        const { id, name } = test;

        return this.dao.run(
            'UPDATE test SET name = ? WHERE id = ?',
            [name, id]
        );
    }

    delete(id) {
        return this.dao.run(
            'DELETE FROM test WHERE id = ?',
            [id]
        );
    }

    getById(id) {
        return this.dao.get(
            'SELECT * FROM test WHERE id = ?',
            [id]
        );
    }

    getAll() {
        return this.dao.all(
            'SELECT * FROM test'
        );
    }
}

module.exports = TestRepository;