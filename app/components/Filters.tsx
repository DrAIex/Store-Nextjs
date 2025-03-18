'use client';

import { Paper, TextField, Switch, FormControlLabel, Box, Typography } from '@mui/material';

interface FiltersProps {
  priceRange: { min: number; max: number };
  showOnlyNew: boolean;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onShowOnlyNewChange: (show: boolean) => void;
}

export default function Filters({
  priceRange,
  showOnlyNew,
  onPriceRangeChange,
  onShowOnlyNewChange,
}: FiltersProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Цена
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="От"
            type="number"
            size="small"
            value={priceRange.min}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                min: Number(e.target.value),
              })
            }
          />
          <TextField
            label="До"
            type="number"
            size="small"
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                max: Number(e.target.value),
              })
            }
          />
        </Box>
      </Box>

      <FormControlLabel
        label="Только новинки"
        control={
          <Switch
            id="show-only-new"
            checked={showOnlyNew}
            onChange={(e) => onShowOnlyNewChange(e.target.checked)}
          />
        }
      />
    </Paper>
  );
} 