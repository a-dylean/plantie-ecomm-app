import { Box, FormControl, InputLabel, MenuItem, Slider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { backgroundColor } from './theme';

export const Filter = ({
  chooseCategory,
  categoryId,
  choosePriceRange,
  chooseSortMethod,
  sortMethod,
}: any) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    chooseCategory(event.target.value as string);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    chooseSortMethod(event.target.value as string);
  };
  const [value, setValue] = useState<number[]>([0, 200]);

  const valuetext = (value: number[]) => {
    return `€${value[0]} - €${value[1]}`;
  };

  const debouncedSearch = useRef(
    debounce((value) => {
      choosePriceRange(value);
    }, 300),
  ).current;

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
    debouncedSearch(value);
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
          value={sortMethod}
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
          value={categoryId}
          label="Product Type"
          onChange={handleCategoryChange}
          sx={{ width: 200 }}
        >
          <MenuItem value={'null'}>All</MenuItem>
          <MenuItem value={1}>Interior plants</MenuItem>
          <MenuItem value={2}>Cactuses</MenuItem>
          <MenuItem value={3}>Mixes</MenuItem>
          <MenuItem value={4}>Tools</MenuItem>
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
            <Box sx={{ width: '10rem', m: 'auto', display: "flex", justifyContent: "center" }}>
              <Slider
                size="small"
                aria-label="Price range"
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
    </Box>
  );
};
