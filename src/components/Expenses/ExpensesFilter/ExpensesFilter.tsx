import { useState } from "react";
import { IconButton, InputPicker } from "rsuite";
import { TYPES } from "../Expense";
import "./ExpensesFilter.css";
import SearchIcon from '@rsuite/icons/Search';

type Filter = { label: string; value: string; };

function ExpensesFilter({ className, handleSearch }: { className: string; handleSearch: (filter: string) => void; }): JSX.Element {
  const loadSavedFilters = (): Filter[] => {
    const savedCustomFilters = localStorage.getItem('customFilters');
    if (!savedCustomFilters) {
      const defaultFilter: Filter[] = [];
      defaultFilter.push({
        label: 'Filtro por defecto',
        value: '&pageSize=10'
      });
      console.log("Adding default filter")
      console.log(defaultFilter);
      localStorage.setItem('customFilters', JSON.stringify(defaultFilter));
      return defaultFilter;
    }
    console.log(JSON.parse(savedCustomFilters));
    return JSON.parse(savedCustomFilters);
  };
  const [filters, setFilters] = useState<Filter[]>(loadSavedFilters());
  const handleSelectType = (selectedType: string) => console.log(selectedType);
  const handleSelectSubtype = (selectedSubtype: string) => console.log(selectedSubtype);
  const addFilter = (customFilter: Filter) => {
    const index = filters.findIndex((filter: Filter) => filter.label === customFilter.label)
    if (index >= 0) {
      filters.splice(index, 1);
    }
    filters.push(customFilter);
    setFilters([...filters])
    localStorage.setItem('customFilters', JSON.stringify(filters));
  };
  const onSearch = () => {
    handleSearch('&pageSize=1');
  }
  return (
    <div className={className + " ExpensesFilter"}>
      <div className="ExpensesFilter-search-filter">
        <div className="ExpensesFilter-search-filter-item">Filtro: <InputPicker size="xs" data={filters} placeholder="S/N" onSelect={handleSelectType} style={{ width: "200px" }} /></div>
        <div className="ExpensesFilter-search-filter-item">Tipo: <InputPicker size="xs" data={TYPES} placeholder=" " onSelect={handleSelectType} style={{ width: "200px" }} /></div>
        <div className="ExpensesFilter-search-filter-item">Subtipo: <InputPicker size="xs" data={TYPES} placeholder=" " onSelect={handleSelectSubtype} style={{ width: "200px" }} /></div>
      </div>
      <button className="ExpensesFilter-search-button" onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default ExpensesFilter;
