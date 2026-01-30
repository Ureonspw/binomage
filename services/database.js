import * as SQLite from 'expo-sqlite';
import { initialParticipants } from './initialData';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

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
        
        await seedDatabase(db);
        
        console.log("Database initialized successfully");
        return db;
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

const seedDatabase = async (db) => {
    try {
        // Check if we have any participants
        const countResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM participants');
        
        if (countResult && countResult.count === 0) {
            console.log("Seeding database with initial data...");
            
            await db.withTransactionAsync(async () => {
                for (const participant of initialParticipants) {
                    // Determine imageUri
                    let uri = null;
                    if (participant.image) {
                         const assetSource = Image.resolveAssetSource(participant.image);
                         uri = assetSource ? assetSource.uri : null;
                    }

                    await db.runAsync(
                        'INSERT INTO participants (name, role, speciality, imageUri) VALUES (?, ?, ?, ?)',
                        [participant.name, participant.role, participant.speciality, uri]
                    );
                }
            });
            console.log("Seeding complete.");
        }
    } catch (error) {
        console.error("Error seeding database:", error);
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

export const updateParticipant = async (id, name, role, speciality, imageUri) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.runAsync(
            'UPDATE participants SET name = ?, role = ?, speciality = ?, imageUri = ? WHERE id = ?',
            [name, role, speciality, imageUri, id]
        );
    } catch (error) {
        console.error("Error updating participant:", error);
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
