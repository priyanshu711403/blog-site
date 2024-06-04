import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface CardInputs {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
export const BlogCard = ({ authorName, title, content, publishedDate, id }: CardInputs) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 mt-4 ">
        <div className="flex ">
          <Avatar name={authorName} />
          <div className=" font-normal flex flex-col justify-center">{authorName}</div>
          <div className=" mx-1 font-semibold text-gray-400 flex flex-col justify-center"> &#183;</div>
          <div className="text-gray-400 flex flex-col justify-center text-sm">{publishedDate}</div>
        </div>
        <div className="mt-3 text-2xl font-bold">{title}</div>
        <div className="mt-2  " dangerouslySetInnerHTML={{ __html: content.slice(0, 170) + "..." }}></div>
        <div className="text-sm text-slate-400 my-4  ">{`${Math.ceil(content.length / 100)} minutes read`}</div>
      </div>
    </Link>
  );
};
export function Circle() {
  return <div className=" mx-1 font-semibold text-gray-400 flex flex-col justify-center"> &#183;</div>;
}
