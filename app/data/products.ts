import { Product } from '@/app/types/product';

export const products: Product[] = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    price: 999,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    brand: "Apple",
    isNew: true,
    image: "/images/iphone.webp",
    url: "iphone14pro"
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    price: 899,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    brand: "Samsung",
    isNew: true,
    image: "/images/samsung2.webp",
    url: "samsung23"
  },
  {
    id: 3,
    title: "MacBook Pro 16",
    price: 2499,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    brand: "Apple",
    isNew: false,
    image: "/images/mak.webp",
    url: "macbookpro16"
  },
  {
    id: 4,
    title: "iPad Air",
    price: 599,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    brand: "Apple",
    isNew: false,
    image: "/images/ipad.webp",
    url: "ipadair"
  },
  {
    id: 5,
    title: "Sony Xperia 10",
    price: 349,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    brand: "Sony",
    isNew: true,
    image: "/images/iphone.webp",
    url: "sonyxperia10"
  }
]; 