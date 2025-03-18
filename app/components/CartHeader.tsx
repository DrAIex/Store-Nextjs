'use client';

import { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography, Box, Button, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function CartHeader() {
  const { items, getTotalPrice, updateQuantity } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Typography color="inherit">{totalPrice} ₽</Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items.length === 0 ? (
          <MenuItem>
            <Typography>Корзина пуста</Typography>
          </MenuItem>
        ) : (
          <div>
            {items.map((item) => (
              <MenuItem key={item.id} sx={{ minWidth: '400px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center', width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Link 
                      href={`/product/${item.id}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={handleClose}
                    >
                      <Typography variant="body1" sx={{ margin: '10px 0 0' }}>{item.title}</Typography>
                    </Link>

                  </Box>

                  <Box sx={{ display: 'flex'}}>
                    <Button
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Typography sx={{ width: '20px', textAlign: 'center', mt: '4px' }}>{item.quantity}</Typography>
                      <Button
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Typography variant="body2" color="primary" sx={{ width: '60px', textAlign: 'end', mt: '4px' }}>
                          {item.price * item.quantity} ₽
                      </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Итого:</Typography>
                <Typography variant="subtitle1" color="primary">
                  {totalPrice} ₽
                </Typography>
              </Box>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
} 