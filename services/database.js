import * as SQLite from 'expo-sqlite';

const databaseName = "binomage.db";

export const initDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS participants (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                role TEXT NOT NULL, -- 'PARRAIN' or 'FILLEUL'
                speciality TEXT NOT NULL, -- 'INFO' or 'EIT'
                imageUri TEXT
            );
        `);
        console.log("Database initialized successfully");
        return db;
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

export const addParticipant = async (name, role, speciality, imageUri) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        const result = await db.runAsync(
            'INSERT INTO participants (name, role, speciality, imageUri) VALUES (?, ?, ?, ?)',
            [name, role, speciality, imageUri]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error adding participant:", error);
        throw error;
    }
};

export const getParticipants = async (speciality, role) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        const allRows = await db.getAllAsync(
            'SELECT * FROM participants WHERE speciality = ? AND role = ?',
            [speciality, role]
        );
        return allRows;
    } catch (error) {
        console.error("Error getting participants:", error);
        throw error;
    }
};

export const deleteParticipant = async (id) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.runAsync('DELETE FROM participants WHERE id = ?', [id]);
    } catch (error) {
        console.error("Error deleting participant:", error);
        throw error;
    }
};

export const clearAllParticipants = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.runAsync('DELETE FROM participants');
    } catch (error) {
        console.error("Error clearing database:", error);
        throw error;
    }
};
