import TextField from "@atoms/TextField/TextField";
import { useMovies, useSearchMovie } from "@hooks/queries";
import { ChangeEvent, useEffect, useState } from "react";
import { IFiltersProps } from "./Filters.props";
import CustomSelect from "@molecules/CustomSelect/CustomSelect";
import "./Filters.scss";
import Button from "@atoms/Button/Button";

const Filters: React.FC<IFiltersProps> = ({
  setFilteredMovies,
  setIsLoading,
}) => {
  const [page, setPage] = useState(1);

  const filterOptions = [
    { value: "popular", display: "Populaires" },
    { value: "top_rated", display: "Mieux Notés" },
    { value: "upcoming", display: "À venir" },
  ];

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);

  const { data: moviesResult, isLoading: isMoviesLoading } = useMovies({
    result: selectedFilter,
    page,
  });

  const { data: movies, isLoading: isSearchLoading } = useSearchMovie({
    query: search,
    page,
  });
  useEffect(() => {
    if (isMoviesLoading || isSearchLoading) {
      return setIsLoading(true);
    }
    return setIsLoading(false);
  }, [isSearchLoading, isMoviesLoading, setIsLoading]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  useEffect(() => {
    if (search) {
      setFilteredMovies(movies || []);
    } else {
      setFilteredMovies(moviesResult?.results || []);
    }
  }, [search, movies, moviesResult, setFilteredMovies]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch("");
    setSelectedFilter(e.target.value);
    setPage(1);
  };

  return (
    <section className="filters_section">
      <div className="filters_inputs">
        <TextField
          label="Rechercher"
          placeholder="Titanic"
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <CustomSelect
          label="Filter"
          options={filterOptions}
          onChange={handleOptionChange}
        />
      </div>
      <div className="filters_buttons">
        <Button
          label="Page précédente"
          onClick={handlePrevPage}
          disabled={page === 1 || isMoviesLoading || isSearchLoading}
        />
        <Button
          label="Page suivante"
          onClick={handleNextPage}
          disabled={isMoviesLoading || isSearchLoading}
        />
      </div>
    </section>
  );
};

export default Filters;
