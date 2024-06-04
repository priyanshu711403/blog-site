import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogPage } from "../components/BlogPage";
import { BlogPageSkeleton } from "../components/BlogPageSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog)
    return (
      <div>
        <Appbar />
        <div>
          <BlogPageSkeleton />
        </div>
      </div>
    );

  return (
    <div>
      <Appbar />
      <BlogPage blog={blog} />
    </div>
  );
};
