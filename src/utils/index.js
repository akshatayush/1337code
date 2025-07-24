import puppeteer, { Browser } from "puppeteer";


/**
  * Connect to a browser instance at a given port
  * @param {number} port - Debugging port number of the browser
  * @returns {Promise<Browser>} Promise that resolves to a browser instance
  */
export async function getBrowser(port) {
  try {
    const browser = await puppeteer.connect({
      browserURL: `http://localhost:${port}`,
      defaultViewport: null
    });
    return browser;
  }
  catch (error) {
    throw new Error(`Failed to connect to browser on port ${port}:\n${error.message}`);
  }
}


/**
  * Wait for the specified time, logging remaining time at an interval
  * @param {number} time - Time to wait in milliseconds
  * @param {number} logInterval - Logging interval in milliseconds
  * @returns {Promise<void>}
  */
export function setTimer(time, logInterval) {
  function convertTime(ms) {
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds }
  }

  const t = convertTime(time);
  console.log(`Timer set for ${t.minutes}m ${t.seconds}s`);

  const start = Date.now();

  const interval = setInterval(() => {
    const now = Date.now();
    const remaining = Math.max(0, time - (now - start));
    const t = convertTime(remaining);
    console.log(`You have ${t.minutes}m ${t.seconds}s remaining...`);
  }, logInterval);

  setTimeout(() => {
    clearInterval(interval);
    console.log("Time's up!");
    process.exit(1);
  }, time);
}
