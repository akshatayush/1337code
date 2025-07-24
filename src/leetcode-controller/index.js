import { Browser, Page } from "puppeteer";


/**
  * Search for leetcode problems page among open tabs
  * @param {Browser} browser - Browser instance
  * @returns {Promise<Page>} Promise that resolves into the leetcode page if open, or null
  */
export async function findLeetcodePage(browser) {
  try {
    const openPages = await browser.pages();
    for (const page of openPages) {
      if (page.url().includes("leetcode.com/problems/")) {
        return page;
      }
    }
    return null;
  }
  catch (error) {
    throw new Error(`Error retrieving open pages:\n${error.message}`);
  }
}


export async function startListening(page) {
  await new Promise((res) => setTimeout(res, 11000));
  console.log("Submission detected");
  process.exit(0);
}
