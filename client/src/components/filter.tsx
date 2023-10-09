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
import { Price } from './price';
import { useQuery } from '@tanstack/react-query';
import { api } from '../helpers/axios';
import { Category, Product } from '../models/api';
import { queryClient } from '..';
import { getMax, getMin } from '../helpers/helperFunctions';

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
  gap: theme.spacing(1),
}));

export const Filter: React.FC<FilterProps> = ({
  chooseCategory,
  choosePriceRange,
  chooseSortMethod,
  search,
}) => {
  const products: Product[] | undefined = queryClient.getQueryData([
    'products',
  ]);
  const minPrice = getMin(products);
  const maxPrice = getMax(products);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data as Category[];
    },
  });

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
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-sort-label">Sort</InputLabel>
          <Select
            labelId="select-sort-label"
            id="select-sort-label"
            label="Sort"
            onChange={handleSortChange}
            sx={{ width: '100%' }}
          >
            <MenuItem value={'desc'}>Price high to low</MenuItem>
            <MenuItem value={'asc'}>Price low to high</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-product-type-label">Product Type</InputLabel>
          <Select
            labelId="select-product-type-label"
            id="select-product-type-label"
            label="Product Type"
            onChange={handleCategoryChange}
            sx={{ width: '100%' }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <Select
            labelId="select-price-range-label"
            id="select-price-range-label"
            sx={{ width: 'auto' }}
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
                value={value}
                onChange={handlePriceRangeChange}
                step={10}
                min={minPrice}
                max={maxPrice}
              />
            </Box>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="outlined">
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
