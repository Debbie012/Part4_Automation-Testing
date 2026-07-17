const { defineConfig } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// 1. Locate the config folder safely
const configDir = path.resolve(__dirname, 'config');
let configData = {};

if (fs.existsSync(configDir)) {
  // 2. Scan the folder for any file starting with "config"
  const files = fs.readdirSync(configDir);
  const configFile = files.find(file => file.toLowerCase().startsWith('config'));

  if (configFile) {
    const fullPath = path.join(configDir, configFile);
    console.log(`[Config Loader] Dynamically resolved and loading: ${fullPath}`);
    configData = require(fullPath);
  } else {
    throw new Error("Could not find any file starting with 'config' inside your 'config' folder!");
  }
} else {
  throw new Error("The 'config' folder does not exist at the project root!");
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  
  use: {
    baseURL: configData.baseURL || "https://practicetestautomation.com/practice-test-login/",
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'configured-browser',
      use: {
        channel: configData.browser === 'chrome' ? 'chrome' : 'chromium',
      },
    },
  ],
});