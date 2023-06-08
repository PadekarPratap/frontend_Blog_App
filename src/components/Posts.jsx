import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Posts = ({ title, summary, createdBy, updatedAt, cover, _id }) => {

  const navigate = useNavigate()
  return (
    <article className='flex gap-5 md:flex-row flex-col basis-1/3 hover:opacity-50 cursor-pointer duration-200 border-t-2 border-[#f1f1f1] pt-8' onClick={()=>navigate(`post/${_id}`) }>
      {/* text  */}
      <div className="self-center basis-1/3">
        <h2 className="text-2xl font-bold text-center md:text-left line-clamp-3">
          {title}
        </h2>
        <div className="my-3 lg:my-6 text-center md:text-left">
          <span className="font-bold tracking-wider">{createdBy}</span>
          <time className="text-gray-400 text-sm font-bold ml-4">
            {format(new Date(updatedAt), "LLL dd, yyyy")}
          </time>
        </div>
      </div>

      {/* article   */}
      <div className="basis-1/3">
        <p className="text-lg lg:leading-8 line-clamp-4">{summary}</p>
      </div>

      {/* image */}
      <div className="basis-1/3 flex items-center order-first md:order-none">
        <img
          src={cover.url}
          alt=""
          loading="lazy"
          className="w-[300px] object-cover object-center mx-auto aspect-video"
        />
      </div>
    </article>
  );
};
export default Posts;
