import axios from "axios";
import * as cheerio from 'cheerio';


const response = await axios.get("https://loot-link.com/s?a71a5892")

function extractValuesFromHTML(html) {
  // Load HTML into Cheerio
  const $ = cheerio.load(html);

  // Initialize an object to store the extracted values
  const extractedValues = {
    TID: null,
    KEY: null,
    CDN_DOMAIN: null,
  };

  // Extract <script> tags and iterate through them
  $('script').each((i, script) => {
    const scriptContent = $(script).html();

    // Use regex to find the required values in the script
    const tidMatch = scriptContent.match(/p\['TID'\]\s*=\s*(\d+);/);
    const keyMatch = scriptContent.match(/p\['KEY'\]\s*=\s*"(\d+)"/);
    const cdnMatch = scriptContent.match(/p\['CDN_DOMAIN'\]\s*=\s*'([^']+)';/);

    // Store matched values if found
    if (tidMatch) extractedValues.TID = tidMatch[1];
    if (keyMatch) extractedValues.KEY = keyMatch[1];
    if (cdnMatch) extractedValues.CDN_DOMAIN = cdnMatch[1];
  });

  return extractedValues;
}

export default extractValuesFromHTML;

// const extracted = extractValuesFromHTML(response.data);
// console.log('Extracted Values:', extracted);