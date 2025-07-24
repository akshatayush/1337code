import { findLeetcodePage, startListening } from "./leetcode-controller/index.js";
import { getBrowser, setTimer } from "./utils/index.js";


async function main() {
  try {
    const port = 9222;
    const browser = await getBrowser(port);
    const leetcodePage = await findLeetcodePage(browser);
    if (!leetcodePage) {
      console.warn("No leetcode problems page is currently open\nDisconnecting...");
      await browser.disconnect();
      process.exit(0);
    }
    console.log(`Leetcode page found at: ${leetcodePage.url()}`);
    setTimer(10000, 2000)
    await startListening(leetcodePage);
    process.exit(0);
  }
  catch (error) {
    console.error(`An error occured:\n${error.message}`);
    process.exit(0);
  }
}


await main();
