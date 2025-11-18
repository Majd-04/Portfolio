import { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'alkitab_portfolio_data';

export const savePortfolioData = (data: PortfolioData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to local storage", error);
    alert("Storage limit reached. Please use smaller text or fewer items.");
  }
};

export const getPortfolioData = (): PortfolioData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load from local storage", error);
  }
  return INITIAL_DATA;
};

export const resetPortfolioData = (): PortfolioData => {
  savePortfolioData(INITIAL_DATA);
  return INITIAL_DATA;
};
