import { flattenAndFilter } from "../lib/instagram";

const fixtures = [
  {
    id: "single_2025_image",
    media_type: "IMAGE" as const,
    media_url: "https://cdn/1.jpg",
    permalink: "https://ig/p/1",
    timestamp: "2025-06-01T00:00:00+0000",
  },
  {
    id: "video_ignored",
    media_type: "VIDEO" as const,
    media_url: "https://cdn/v.mp4",
    permalink: "https://ig/p/v",
    timestamp: "2025-06-01T00:00:00+0000",
  },
  {
    id: "old_2024_ignored",
    media_type: "IMAGE" as const,
    media_url: "https://cdn/old.jpg",
    permalink: "https://ig/p/old",
    timestamp: "2024-12-31T23:59:59+0000",
  },
  {
    id: "carousel_2026",
    media_type: "CAROUSEL_ALBUM" as const,
    permalink: "https://ig/p/car",
    timestamp: "2026-01-15T00:00:00+0000",
    children: {
      data: [
        { id: "c1", media_type: "IMAGE" as const, media_url: "https://cdn/c1.jpg" },
        { id: "c2", media_type: "VIDEO" as const, media_url: "https://cdn/c2.mp4" },
        { id: "c3", media_type: "IMAGE" as const, media_url: "https://cdn/c3.jpg" },
      ],
    },
  },
];

const tiles = flattenAndFilter(fixtures);
console.log(JSON.stringify(tiles, null, 2));
console.log("count:", tiles.length);
