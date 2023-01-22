export default function Index() {
  return (
    <div className="flex justify-center mt-20">
      <section className="flex flex-col items-center w-1/2 bg-white rounded-md p-8">
        <p className="text-lg font-bold">
          Find the perfect property today to buy or rent
        </p>
        <form method="get" className="flex justify-between w-full gap-3 mt-7">
          <input
            aria-label="Location"
            name="search"
            placeholder="Brisbane"
            className="border border-slate-400 rounded-md px-3 py-2 w-full"
          />
          <button className="bg-emerald-300 rounded-md px-4 font-bold">
            Search
          </button>
        </form>
      </section>
    </div>
  );
}
