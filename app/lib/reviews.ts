interface Review {
  date: string;
  name: string;
  rating: number;
  comment: string;
}

export async function getReviews(): Promise<Review[]> {
  const googleSheetUrl = process.env.GOOGLE_SHEET_API_URL;

  if (
    !googleSheetUrl ||
    googleSheetUrl.trim() === "" ||
    googleSheetUrl.includes("YOUR_DEPLOYMENT_ID") ||
    !googleSheetUrl.startsWith("http")
  ) {
    return [];
  }

  try {
    // Disable caching completely so that all additions, edits, or deletions in the Google Sheet
    // reflect instantly on every page refresh on Vercel without needing a redeployment!
    const response = await fetch(googleSheetUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Google Sheets fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching reviews from Google Sheets:", error);
    return [];
  }
}
