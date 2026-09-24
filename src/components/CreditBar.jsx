import Rreact from "react";
import { FaRegComment } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const creditBarClass = "items-center text-sm hidden md:flex";

export default function CreditBar({ score, author, createdAt, comments }) {
  return (
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
  );
}

export function convertTime(unixTimestamp, locale = "en") {
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
