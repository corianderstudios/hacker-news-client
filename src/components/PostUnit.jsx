import { FaRegComment } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiCircleQuestion } from "react-icons/ci";
import { BiShow } from "react-icons/bi";

const creditBarClass = "items-center text-sm hidden md:flex";

export default function PostUnit({
  author,
  url,
  title,
  id,
  score,
  createdAt,
  comments,
  type,
}) {
  return (
    <li key={id} className="p-4 flex items-center w-full">
      <div className="text-md mr-4">{linkTypeIcon(url, type)}</div>
      <div className="min-w-0 flex-1">
        <a href={url} className="min-w-0 font-medium">
          {title}
        </a>
        <div className="flex w-fit flex-row items-center gap-4">
          <div className={creditBarClass}>
            <MdKeyboardDoubleArrowUp />
            <span>{score} points</span>
          </div>
          <div className={creditBarClass}>
            <LuPen />
            <span className="ml-1">
              by <span className="text-amber-500">{author}</span>
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CiClock2 />
            <span className="ml-1">{convertTime(new Date(createdAt))}</span>
          </div>
          <div className={creditBarClass}>
            <FaRegComment /> <span className="ml-1"> {comments} comments</span>
          </div>
        </div>
      </div>
    </li>
  );
}

function linkTypeIcon(url, type) {
  switch (type) {
    case "job":
      return <BsSuitcaseLg size={22} />;
      break;
    case "show":
      return <BiShow size={22} />;
      break;
    case "question":
      return <CiCircleQuestion size={22} />;
      break;
    default:
      if (!url || !type) return <MdOutlineArticle size={22} />;
      if (!url.includes("news.ycombinator")) {
        return <FiExternalLink size={22} />;
      }
      break;
  }
}

function convertTime(unixTimestamp, locale = "en") {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const differenceInSeconds = Math.floor(unixTimestamp - Date.now() / 1000);

  const intervals = [
    { unit: "year", value: 31536000 },
    { unit: "month", value: 2592000 },
    { unit: "week", value: 604800 },
    { unit: "day", value: 86400 },
    { unit: "hour", value: 3600 },
    { unit: "minute", value: 60 },
    { unit: "second", value: 1 },
  ];

  for (const interval of intervals) {
    if (
      Math.abs(differenceInSeconds) >= interval.value ||
      interval.unit === "second"
    ) {
      const count = Math.round(differenceInSeconds / interval.value);
      return rtf.format(count, interval.unit);
    }
  }
}
