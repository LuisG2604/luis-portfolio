// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');
// Creer tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            birthdate TEXT NOT NULL,
            sexe TEXT NOT NULL,
            phone TEXT NOT NULL,
            password TEXT NOT NULL,
            picture TEXT NOT NULL)`);

    db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT)`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_name TEXT NOT NULL,
            project_description TEXT NOT NULL,
            project_price REAL NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id))`);

    console.log('Tables created');
});

export default db;
