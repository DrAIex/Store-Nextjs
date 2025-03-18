'use client';

import { useParams } from 'next/navigation';
import { Container, Typography, Box, Button, Paper, Chip, AppBar, Toolbar, CircularProgress, Alert } from '@mui/material';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import CartHeader from '@/app/components/CartHeader';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const { addToCart, items, updateQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 404) {
            setProduct(null);
          } else {
            throw new Error(errorText || 'Failed to fetch product');
          }
        } else {
          const data = await response.json();
          if (!data || typeof data !== 'object') {
            throw new Error('Invalid response format');
          }
          setProduct(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке товара');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Вернуться на главную</Button>
          </Link>
        </Container>
      </>
    );
  }

  if (!product) {
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
          <Alert severity="warning" sx={{ mb: 2 }}>Товар не найден</Alert>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Вернуться на главную</Button>
          </Link>
        </Container>
      </>
    );
  }

  const cartItem = items.find((item) => item.id === product.id);

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
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
          <Typography sx={{ mb: 2, lineHeight: 1 }}>←</Typography>
          <Typography sx={{ mb: 2 }}>Назад к списку</Typography>
        </Link>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '0 0 300px' }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: 'auto' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.webp';
                }}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4" component="h1">
                  {product.title}
                </Typography>
                {product.isNew && (
                  <Chip label="Новинка" color="primary" />
                )}
              </Box>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {product.brand}
              </Typography>

              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                {product.price} ₽
              </Typography>

              <Typography variant="body1" sx={{ mb: 4 }}>
                {product.description}
              </Typography>

              {!cartItem ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => addToCart(product)}
                >
                  Добавить в корзину
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  >
                    -
                  </Button>
                  <Typography>{cartItem.quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  >
                    +
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
} 