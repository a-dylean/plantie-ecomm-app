import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Slider,
  styled,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { backgroundColor } from './theme';
import { FilterProps } from '../app/interfaces';
import { debounceTime } from '../appconfig';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi';
import {
  useGetMaxPriceQuery,
  useGetMinPriceQuery,
} from '../features/products/productsApi';
import { Price } from './price';

const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  marginBottom: theme.spacing(0.5),
  position: 'sticky',
  top: theme.spacing(7),
  backgroundColor: backgroundColor,
  padding: theme.spacing(2),
  zIndex: 5,
}));

export const Filter: React.FC<FilterProps> = ({
  chooseCategory,
  choosePriceRange,
  chooseSortMethod,
  search,
  orderBy,
  categoryName,
}) => {
  const { data: minPrice } = useGetMinPriceQuery();
  const { data: maxPrice } = useGetMaxPriceQuery();
  const { data: categories } = useGetCategoriesQuery();

  const handleCategoryChange = (event: SelectChangeEvent) => {
    chooseCategory(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    chooseSortMethod(event.target.value as string);
  };
  const [value, setValue] = useState<number[]>([minPrice ?? 0, maxPrice ?? 0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const valuetext = (value: number[]) => {
    if (value[0] === 0 && value[1] === 0) {
      return 'Price range';
    }
    return (
      <>
        <Price price={value[0]} /> -&nbsp;
        <Price price={value[1]} />
      </>
    );
  };

  const debouncedPriceSearch = useRef(
    debounce((value) => {
      choosePriceRange(value);
    }, debounceTime),
  ).current;

  const debouncedTermSearch = useRef(
    debounce((value) => {
      search(value);
    }, debounceTime),
  ).current;

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
    debouncedPriceSearch(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedTermSearch(newSearchTerm);
  };

  const clearSearch = () => search(undefined);

  const clearSearchTermHandler = () => {
    setSearchTerm('');
    clearSearch();
  };

  return (
    <>
      <FilterBox>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="select-sort-label">Sort</InputLabel>
          <Select
            labelId="select-sort-label"
            id="select-sort-label"
            value={orderBy}
            label="Sort"
            onChange={handleSortChange}
            sx={{ width: 200 }}
          >
            <MenuItem value={'desc'}>Price high to low</MenuItem>
            <MenuItem value={'asc'}>Price low to high</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="select-product-type-label">Product Type</InputLabel>
          <Select
            labelId="select-product-type-label"
            id="select-product-type-label"
            value={categoryName}
            label="Product Type"
            onChange={handleCategoryChange}
            sx={{ width: 200 }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <Select
            labelId="select-price-range-label"
            id="select-price-range-label"
            sx={{ width: 200 }}
            value={value}
            renderValue={() => valuetext(value)}
          >
            <Box
              sx={{
                width: '10rem',
                m: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Slider
                size="small"
                getAriaLabel={() => {
                  return 'Price range';
                }}
                defaultValue={undefined}
                value={value}
                onChange={handlePriceRangeChange}
                step={10}
                min={minPrice}
                max={maxPrice}
              />
            </Box>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
          <OutlinedInput
            id="search-field"
            value={searchTerm}
            onChange={handleSearchChange}
            endAdornment={
              searchTerm.length > 0 && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear-search-term"
                    onClick={clearSearchTermHandler}
                    edge="end"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
            label="Search"
          />
        </FormControl>
      </FilterBox>
    </>
  );
};
