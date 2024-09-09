function main() {
 

  let sheetUrl = 'INSERT_GOOGLE_SHEET_URL'; 
  let campaignIds = ['CAMPAIGN_ID_1', 'CAMPAIGN_ID_2', 'CAMPAIGN_ID_3']; 
 
  // don't touch code below this line
 
  let ss = SpreadsheetApp.openByUrl(sheetUrl);
 

  for (let i = 0; i < campaignIds.length; i++) {
    let campaignId = campaignIds[i];
    
  
    let sheetName = `Campaign_${campaignId}`;
    
   
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear(); 
    }
    
   
    let query = AdsApp.report(
      `
      SELECT 
        campaign_search_term_insight.category_label, 
        metrics.clicks, 
        metrics.impressions, 
        metrics.conversions,
        metrics.conversions_value
      FROM campaign_search_term_insight 
      WHERE 
        segments.date DURING LAST_30_DAYS 
        AND campaign_search_term_insight.campaign_id = '${campaignId}'
      ORDER BY metrics.conversions
      `
    );
    
   
    query.exportToSheet(sheet);
  }
} // end main