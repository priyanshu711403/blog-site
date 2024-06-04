import { Blog } from "./../hooks/index";
import { Avatar } from "./Avatar";

export const BlogPage = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="grid grid-cols-10 px-16  w-full pt-10 ">
        <div className="col-span-7 px-5 border-r border-slate-100">
          <div className="text-5xl font-bold ">{blog.title}</div>
          <div className="text-slate-500 mt-3 ">Posted on August 24, 2023</div>
          <div className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
        <div className="col-span-3 px-5">
          <div>Author</div>
          <div className="mt-5 ">
            <div className="flex">
              <Avatar name={blog.author.name} size="large" />
              <div className="text-xl font-bold flex flex-col justify-center">{blog.author.name || "Anonymous"}</div>
            </div>
            <div className="text-slate-500 pt-2 pl-1">
              Master of mirth, purveyor of puns, and the funniest person in the kingdom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
