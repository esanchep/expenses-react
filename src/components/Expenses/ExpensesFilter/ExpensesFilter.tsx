import { useState } from "react";
import DatePicker from "../../Form/DatePicker/DatePicker";
import Select, { SelectDataType } from "../../Form/Select/Select";
import TextInput from "../../Form/TextInput/TextInput";
import { FILTER_SUBTYPES, FILTER_TYPES } from "../Expense";
import "./ExpensesFilter.css";
import SearchIcon from '@rsuite/icons/Search';

// type Filter = { label: string; value: string; };

function ExpensesFilter({ className, handleSearch }: { className: string; handleSearch: (filter: string) => void; }): JSX.Element {
  // const defaultFilter = {
  //   label: 'Filtro por defecto',
  //   value: '&pageSize=10'
  // };
  // const loadSavedFilters = (): Filter[] => {
  //   const savedCustomFilters = localStorage.getItem('customFilters');
  //   if (!savedCustomFilters) {
  //     const filters: Filter[] = [];
  //     filters.push(defaultFilter);
  //     localStorage.setItem('customFilters', JSON.stringify(filters));
  //     return filters;
  //   }
  //   return JSON.parse(savedCustomFilters);
  // };
  // const [filters, setFilters] = useState<Filter[]>(loadSavedFilters());
  // const addFilter = (customFilter: Filter) => {
  //   const index = filters.findIndex((filter: Filter) => filter.label === customFilter.label)
  //   if (index >= 0) {
  //     filters.splice(index, 1);
  //   }
  //   filters.push(customFilter);
  //   setFilters([...filters])
  //   localStorage.setItem('customFilters', JSON.stringify(filters));
  // };
  const [type, setType] = useState<string>();
  const [subtype, setSubtype] = useState<string>();
  // const [subtypeDisabled, setSubtypeDisabled] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [comment, setComment] = useState<string>();
  // const [SUBTYPES, setSubtypes] = useState<ItemDataType[]>([]);
  const [SUBTYPES, setSubtypes] = useState<SelectDataType[]>([]);
  const handleSelectType = (selectedType: string) => {
    setType(selectedType);
    setSubtype(undefined);
    const subtypes = FILTER_SUBTYPES[selectedType];
    // setSubtypeDisabled(!subtypes || subtypes.length === 0);
    setSubtypes(subtypes);
  };
  // const handleCleanType = () => {
  //   setType(undefined);
  //   setSubtype(undefined);
  //   setSubtypes([]);
  //   setSubtypeDisabled(true);
  // };
  const handleSelectSubtype = (selectedSubtype: string) => setSubtype(selectedSubtype);
  // const handleCleanSubtype = () => setSubtype(undefined);
  // const handleChangeDates = (dates: DateRange) => {
  //   setDateFrom(dates[0]);
  //   setDateTo(dates[1]);
  // };
  const handleDateFromChange = (date: Date) => setDateFrom(date);
  const handleDateToChange = (date: Date) => setDateTo(date);
  const handleChangeCommentFilter = (text: string) => setComment(text);
  const toUriParameter = (parameter: string, value: string | number | Date | undefined): string => {
    if (!value) {
      return '';
    }
    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        return '';
      }
      return `&${parameter}=${value.toJSON().split('T')[0]}`;
    }
    return `&${parameter}=${value}`;
  }
  const onSearch = () => {
    handleSearch(`&pageSize=100${toUriParameter('type', type)}${toUriParameter('subtype', subtype)}${toUriParameter('dateFrom', dateFrom)}${toUriParameter('dateTo', dateTo)}${toUriParameter('comment', comment)}`);
  }
  return (
    <>
      <div className={className + " ExpensesFilter"}>
        <div className="ExpensesFilter-search-filter">
          <div className="ExpensesFilter-search-filter-item">
            Tipo: <Select data={FILTER_TYPES} handleSelect={handleSelectType} width="175px" />
          </div>
          <div className="ExpensesFilter-search-filter-item">
            Subtipo: <Select data={SUBTYPES} handleSelect={handleSelectSubtype} width="175px" disabled={!SUBTYPES || SUBTYPES.length === 0} />
          </div>
          <div className="ExpensesFilter-search-filter-item">
            Desde: <DatePicker handleChange={handleDateFromChange} />
          </div>
          <div className="ExpensesFilter-search-filter-item">
            Hasta: <DatePicker handleChange={handleDateToChange} />
          </div>
          <div className="ExpensesFilter-search-filter-item">
            Comentario: <TextInput handleChange={handleChangeCommentFilter} />
          </div>
        </div>
        <button className="ExpensesFilter-search-button" onClick={onSearch}><SearchIcon /></button>
      </div>
    </>
  );
}

export default ExpensesFilter;
