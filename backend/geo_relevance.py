US_CENTRIC_DOMAINS = {
    "builtin.com", "techcrunch.com", "crunchbase.com", "producthunt.com",
    "ycombinator.com", "angel.co", "wellfound.com", "forbes.com",
    "businessinsider.com", "inc.com", "fastcompany.com", "venturebeat.com",
    "bloomberg.com", "wsj.com", "nytimes.com", "cnbc.com", "axios.com",
    "theverge.com", "wired.com", "glassdoor.com", "indeed.com",
}

REGION_NEUTRAL_DOMAINS = {
    "reddit.com", "wikipedia.org", "medium.com", "linkedin.com",
    "youtube.com", "quora.com",
}

REGION_LOCAL_DOMAINS = {
    "india": {"yourstory.com", "inc42.com", "economictimes.indiatimes.com", "livemint.com"},
    "nigeria": {"techcabal.com", "businessday.ng", "thecable.ng"},
    "southeast asia": {"techinasia.com", "e27.co", "dealstreetasia.com"},
    "uk": {"sifted.eu", "uktech.news", "businessweekly.co.uk"},
    "europe": {"sifted.eu", "eu-startups.com", "tech.eu"},
    "brazil": {"startse.com", "labs.com.br", "exame.com"},
}

def detect_geographic_relevance(results: list[dict], user_region: str = "global") -> dict:
    """
    Checks actual source DOMAIN against known US-centric and region-local
    domains, compared against the user's stated region — not text keyword
    matching. Returns a status + human-readable message.
    """
    if not results:
        return {"status": "insufficient_data",
                "message": "Insufficient data to assess geographic relevance",
                "us_centric_count": 0, "total": 0}

    region_key = user_region.strip().lower()
    local_domains_for_region = REGION_LOCAL_DOMAINS.get(region_key, set())

    us_centric_count = 0
    region_local_count = 0

    for r in results:
        domain = r.get("domain", "")
        if domain in REGION_NEUTRAL_DOMAINS:
            continue
        elif domain in local_domains_for_region:
            region_local_count += 1
        elif domain in US_CENTRIC_DOMAINS:
            us_centric_count += 1

    total = len(results)
    us_ratio = us_centric_count / total if total else 0

    if region_key in ("global", "us", "usa", "united states", ""):
        if us_ratio >= 0.5:
            status = "us_skewed_global"
            message = f"{us_centric_count}/{total} sources are from US-centric platforms. Results may underrepresent non-US markets."
        else:
            status = "ok"
            message = "No significant source-domain skew detected"
    else:
        if us_ratio >= 0.4 and region_local_count == 0:
            status = "region_mismatch"
            message = f"You're researching for {user_region}, but {us_centric_count}/{total} sources are from US-centric platforms and none are from {user_region}-specific sources. Treat these scores as low-confidence for your actual market and validate locally."
        elif region_local_count > 0:
            status = "region_matched"
            message = f"{region_local_count}/{total} sources are specific to {user_region}."
        else:
            status = "unknown_relevance"
            message = f"Source origins couldn't be confidently matched to {user_region}. Treat these scores as a starting point, not a local market signal."

    return {"status": status, "message": message,
            "us_centric_count": us_centric_count,
            "region_local_count": region_local_count, "total": total}
