import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
// import { Loader } from "../components/Loader";
import { useBlogs } from "./../hooks/index";

export const Blogs = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();
  if (!localStorage.getItem("token")) {
    navigate("/signin");
  } else if (loading)
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <Appbar />
      <div className="flex justify-center ">
        <div className=" w-7/12">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name || "Anonymous"}
              publishedDate="May 25,2022"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
