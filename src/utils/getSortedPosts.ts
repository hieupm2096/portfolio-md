import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.last_edited_time ?? b.data.created_time).getTime() /
            1000
        ) -
        Math.floor(
          new Date(a.data.last_edited_time ?? a.data.created_time).getTime() /
            1000
        )
    );
};

export default getSortedPosts;
