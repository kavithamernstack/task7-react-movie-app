

function FilterDropDown({ onFilterChange }){

    return(
       <div className="flex justify-center mb-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 pb-2 mb-2 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    </div>
    )
}
export default FilterDropDown