export default function Skeleton({ small }) {
   return (
       <div className={small ? "w-150 flex flex-col gap-2" : "w-full flex flex-col gap-4"}>
           <div className={`skeleton h-64 w-full rounded-lg`}></div>
           <div className="skeleton h-4 w-28 rounded"></div>
           <div className="skeleton h-4 w-full rounded"></div>
           <div className="skeleton h-4 w-full rounded"></div>
       </div>
   );
}