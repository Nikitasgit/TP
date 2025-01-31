import { TLanguage } from "@/types/filtersType";
import Button from "@atoms/Button/Button";
import TextField from "@atoms/TextField/TextField";
import { filterOptions, languages } from "@constants/filters";
import { useMovies, useSearchMovie } from "@hooks/queries";
import CustomSelect from "@molecules/CustomSelect/CustomSelect";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useFilters } from "store/useFilters";
import { IFiltersProps } from "./Filters.props";
import "./Filters.scss";

const Filters: React.FC<IFiltersProps> = ({
  setFilteredMovies,
  setIsLoading,
}) => {
  const [page, setPage] = useState(1);
  const {
    search,
    changeSearch,
    category,
    changeCategory,
    language,
    changeLanguage,
  } = useFilters();

  const { data: moviesByCat, isLoading: isMoviesLoading } = useMovies({
    language,
    result: category,
    page,
  });
  const { data: movies, isLoading: isSearchLoading } = useSearchMovie({
    query: search,
    page,
    language,
  });
  useEffect(() => {
    if (isMoviesLoading || isSearchLoading) {
      return setIsLoading(true);
    }
    return setIsLoading(false);
  }, [isSearchLoading, isMoviesLoading, setIsLoading]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: TLanguage
  ) => {
    changeLanguage(newLanguage);
  };

  useEffect(() => {
    if (search) {
      setFilteredMovies(movies || []);
    } else {
      setFilteredMovies(moviesByCat?.results || []);
    }
  }, [search, movies, moviesByCat, setFilteredMovies]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeSearch("");
    const newCategory = e.target.value as "popular" | "top_rated" | "up_coming";
    changeCategory(newCategory);
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
      <ToggleButtonGroup
        color="primary"
        value={language}
        exclusive
        disabled={isMoviesLoading || isSearchLoading}
        onChange={handleLanguageChange}
      >
        {languages.map((lg) => (
          <ToggleButton key={lg.value} value={lg.value}>
            {lg.display}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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
