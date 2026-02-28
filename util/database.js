import { Place } from "@/models/place";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("places.db");

// ✅ Initialize DB
export async function init() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

// ✅ Insert
export async function insertPlace(place) {
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng)
     VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );

  return result;
}

// ✅ Fetch
export async function fetchPlaces() {
  const rows = await db.getAllAsync(`SELECT * FROM places`);

  const places = rows.map(
    (dp) =>
      new Place(
        dp.title,
        dp.imageUri,
        {
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
        },
        dp.id,
      ),
  );

  return places;
}
