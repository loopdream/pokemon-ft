export default function SkeletonList() {
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      role="list"
    >
      {[...Array(8)].map((_, i) => (
        <li key={i} className="col-span-1 flex flex-col" role="listitem">
          <div className="bg-slate-200 w-full h-[360px] mt-3 rounded-lg animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
}
