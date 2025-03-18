'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ProductCard from '@/app/components/ProductCard';
import Filters from '@/app/components/Filters';
import CartHeader from '@/app/components/CartHeader';
import { Product } from '@/app/types/product';

type SortField = 'title' | 'price';
type SortDirection = 'asc' | 'desc';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showOnlyNew, setShowOnlyNew] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch products');
        }
        const data = await response.json();
        if (!data.products) {
          throw new Error('Invalid response format');
        }
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedProducts = useMemo(() => {
    try {
      return products
        .filter(
          (product) =>
            product.price >= priceRange.min &&
            product.price <= priceRange.max &&
            (!showOnlyNew || product.isNew)
        )
        .sort((a, b) => {
          const modifier = sortDirection === 'asc' ? 1 : -1;
          if (sortField === 'title') {
            return modifier * a.title.localeCompare(b.title);
          }
          return modifier * (a.price - b.price);
        });
    } catch (err) {
      console.error('Error filtering/sorting products:', err);
      return [];
    }
  }, [products, sortField, sortDirection, priceRange, showOnlyNew]);

  if (error) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Магазин
            </Typography>
            <CartHeader />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          <Typography>Пожалуйста, попробуйте перезагрузить страницу</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Магазин
          </Typography>
          <CartHeader />
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Filters
                priceRange={priceRange}
                showOnlyNew={showOnlyNew}
                onPriceRangeChange={setPriceRange}
                onShowOnlyNewChange={setShowOnlyNew}
              />
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }} >
                  <InputLabel id="select-label">Сортировать по</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={sortField}
                    label="Сортировать по"
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    aria-label="Выберите поле для сортировки"
                  >
                    <MenuItem value="title">Названию</MenuItem>
                    <MenuItem value="price">Цене</MenuItem>
                  </Select>
                </FormControl>
                
                <IconButton 
                  onClick={toggleSortDirection}
                  aria-label={`Сортировка по ${sortDirection === 'asc' ? 'возрастанию' : 'убыванию'}`}
                >
                  {sortDirection === 'asc' ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                {filteredAndSortedProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
