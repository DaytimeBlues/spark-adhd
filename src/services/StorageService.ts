import LoggerService from './LoggerService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  streakCount: 'streakCount',
  lastUseDate: 'lastUseDate',
  theme: 'theme',
  tasks: 'tasks',
  brainDump: 'brainDump',
};

const StorageService = {
  async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      LoggerService.error('Storage get failed', error, {service: 'StorageService', action: 'get', key});
      return null;
    }
  },

  async set(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      LoggerService.error('Storage set failed', error, {service: 'StorageService', action: 'set', key});
      return false;
    }
  },

  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      LoggerService.error('Storage remove failed', error, {service: 'StorageService', action: 'remove', key});
      return false;
    }
  },

  async getJSON<T>(key: string): Promise<T | null> {
    try {
      const value = await this.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      LoggerService.error('Storage getJSON parse failed', error, {service: 'StorageService', action: 'getJSON', key});
      return null;
    }
  },

  async setJSON<T>(key: string, value: T): Promise<boolean> {
    try {
      return await this.set(key, JSON.stringify(value));
    } catch (error) {
      LoggerService.error('Storage setJSON serialization failed', error, {service: 'StorageService', action: 'setJSON', key});
      return false;
    }
  },

  STORAGE_KEYS,
};

export default StorageService;
