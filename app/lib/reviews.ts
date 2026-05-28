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
    // In development mode, bypass caching to show changes instantly.
    // In production, cache for 1 hour (3600s).
    const response = await fetch(googleSheetUrl, process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : { next: { revalidate: 3600 } }
    );

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
