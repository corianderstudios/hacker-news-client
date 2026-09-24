import {
  useQuery,
  useInfiniteQuery,
  QueryClientProvider,
} from "@tanstack/react-query";
export const HN_API = "https://hacker-news.firebaseio.com/v0";
const PAGE_SIZE = 30;
export const VALID_TYPES = ["new", "top", "best", "ask", "show", "job"];

export async function fetchJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchPage({ pageParam, type, signal }) {
  const ids = await fetchJson(`${HN_API}/${type}stories.json`, signal);

  const results = await Promise.allSettled(
    ids
      .slice(pageParam, pageParam + PAGE_SIZE)
      .map((id) => fetchJson(`${HN_API}/item/${id}.json`, signal)),
  );

  return {
    items: results.filter((r) => r.status === "fulfilled").map((r) => r.value),
    nextOffset: pageParam + PAGE_SIZE,
    total: ids.length,
  };
}

export function queryResults(type) {
  return useInfiniteQuery({
    queryKey: ["hn", type],
    queryFn: ({ pageParam, signal }) => fetchPage({ type, pageParam, signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset < lastPage.total ? lastPage.nextOffset : undefined,
    enabled: VALID_TYPES.includes(type),
  });
}

export function renderComments(id) {
  return useQuery({
    queryKey: ["hn", "comment", id],
    queryFn: ({ signal }) => fetchComment(id, signal),
    enabled: !!id,
  });
}

export async function fetchComment(id, signal) {
  const comment = await fetchJson(`${HN_API}/item/${id}.json`, signal);

  // deleted/dead comments still exist as IDs but have no real content
  if (!comment || comment.deleted || comment.dead) {
    return null;
  }

  const childIds = comment.kids ?? [];

  const childResults = await Promise.allSettled(
    childIds.map((childId) => fetchComment(childId, signal)),
  );

  const children = childResults
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);

  return {
    id: comment.id,
    author: comment.by,
    text: comment.text,
    createdAt: comment.time * 1000,
    children,
  };
}
