'use client';

import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '@/app/types/product';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link href={`/product/${product.url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'cover' }}
          onError={(e) => {
            console.log('Error loading image:', e);
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.webp';
          }}
        />
      </Link>
      <CardContent sx={{ flexGrow: 'inherit' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          {product.isNew && (
            <Chip label="Новинка" color="primary" size="small" aria-label="Новый товар" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.brand}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          {product.price} ₽
        </Typography>
        
        {!cartItem ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => addToCart(product)}
            sx={{ height: '40px' }}
            aria-label={`Добавить ${product.title} в корзину`}
          >
            Добавить в корзину
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              aria-label={`Уменьшить количество ${product.title}`}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{cartItem.quantity}</Typography>
            <IconButton
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              aria-label={`Увеличить количество ${product.title}`}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 