import fs from 'fs';
import path from 'path';

// Path to settings file
const settingsPath = path.join(__dirname, '../../settings.json');

interface Settings {
  announcementChannelId?: string;
}

let settingsCache: Settings | null = null; // Cache to store settings in memory

// Ensures the settings file exists or creates a new one
function ensureSettingsFile(): void {
  if (!fs.existsSync(settingsPath)) {
    try {
      fs.writeFileSync(settingsPath, JSON.stringify({}, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error creating settings file:', error);
    }
  }
}

// Function to read settings
export function getSettings(): Settings {
  if (settingsCache) return settingsCache;

  ensureSettingsFile();

  try {
    const data = fs.readFileSync(settingsPath, 'utf-8');
    settingsCache = JSON.parse(data) as Settings;
    return settingsCache;
  } catch (error) {
    console.error('Error reading settings file:', error);
    return {};
  }
}

// Function to update settings
export function updateSetting<T extends keyof Settings>(
  key: T,
  value: Settings[T]
): boolean {
  ensureSettingsFile();

  try {
    const settings = getSettings();
    settings[key] = value;

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    settingsCache = settings;
    return true;
  } catch (error) {
    console.error(`Error updating settings ${key}`, error);
    return false;
  }
}
