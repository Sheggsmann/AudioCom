import {
  product1,
  product2,
  product3,
  product4,
  product5,
  profile,
} from "./Images";

const categories = ["Headphone", "Headbands", "Earpads", "Cable"];

const sliderProducts = [
  {
    id: 1,
    name: "TMA-2 Modular Headphone",
    image: product1,
  },
  {
    id: 2,
    name: "TMA-2 DJ Modular",
    image: product2,
  },
  {
    id: 3,
    name: "CO2 - Cable Modular",
    image: product3,
  },
  {
    id: 4,
    name: "CO2 - Cable Modular",
    image: product3,
  },
  {
    id: 5,
    name: "CO2 - Cable Modular",
    image: product3,
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
  { id: 2, name: "CO2 - Cable", price: 25, currency: "USD", image: product3 },
  { id: 3, name: "CO2 - Cable", price: 25, currency: "USD", image: product3 },
];

const exploreProducts = [
  {
    id: 1,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
  {
    id: 2,
    name: "TMA-2 HD Wireless",
    price: 350,
    currency: "USD",
    image: product1,
  },
  {
    id: 3,
    name: "TMA-2 HD Wireless",
    price: 46,
    currency: "USD",
    image: product1,
  },
  {
    id: 4,
    name: "TMA-2 HD Wireless",
    price: 100,
    currency: "USD",
    image: product1,
  },
  {
    id: 5,
    name: "TMA-2 HD Wireless",
    price: 1002,
    currency: "USD",
    image: product1,
  },
  {
    id: 6,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
  {
    id: 7,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
  {
    id: 8,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
  {
    id: 9,
    name: "TMA-2 HD Wireless",
    price: 25,
    currency: "USD",
    image: product1,
  },
];

const filterBy = [
  "Popularity",
  "Newest",
  "Oldest",
  "High Price",
  "Low Price",
  "Review",
];

const reviews = [
  {
    id: 1,
    user: {
      name: "Madelina",
      image: profile,
    },
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    user: {
      name: "Irfan",
      image: profile,
    },
    rating: 1,
    comment:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    images: [product1, product1, product1],
  },
  {
    id: 3,
    user: {
      name: "Ravi Putara",
      image: profile,
    },
    rating: 5,
    comment: "Excepteur sint occaecat cupidatat non proident",
  },
];

export {
  categories,
  sliderProducts,
  featuredProducts,
  exploreProducts,
  filterBy,
  reviews,
};
