import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Slider,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { backgroundColor } from './theme';
import { FilterProps } from '../app/interfaces';

export const Filter: React.FC<FilterProps> = ({
  chooseCategory,
  choosePriceRange,
  chooseSortMethod,
  search,
  orderBy,
  categoryName,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    chooseCategory(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    chooseSortMethod(event.target.value as string);
  };
  const [value, setValue] = useState<number[]>([0, 200]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const valuetext = (value: number[]) => {
    return `€${value[0]} - €${value[1]}`;
  };

  const debouncedPriceSearch = useRef(
    debounce((value) => {
      choosePriceRange(value);
    }, 300),
  ).current;

  const debouncedTermSearch = useRef(
    debounce((value) => {
      search(value);
    }, 400),
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

  const clearSearchTermHandler = () => {
    setSearchTerm('');
    search(undefined);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        mb: 3,
        position: 'sticky',
        top: '3.5rem',
        backgroundColor: backgroundColor,
        p: '1rem',
        zIndex: 5,
      }}
    >
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
          <MenuItem value={'Interior plants'}>Interior plants</MenuItem>
          <MenuItem value={'Cactuses'}>Cactuses</MenuItem>
          <MenuItem value={'Mixes'}>Mixes</MenuItem>
          <MenuItem value={'Tools'}>Tools</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="select-price-range-label">Price Range</InputLabel>
        <Select
          labelId="select-price-range-label"
          id="select-price-range-label"
          label="Price Range"
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
              defaultValue={0}
              value={value}
              onChange={handlePriceRangeChange}
              step={10}
              min={0}
              max={200}
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
    </Box>
  );
};
