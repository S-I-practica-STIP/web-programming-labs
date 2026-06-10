import { VARIANT } from "./config.js";

const products = [
  {
    id: 1,
    name: "Ноутбук",
    price: 25000 + VARIANT * 100,
    category: "electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Навушники",
    price: 2500 + VARIANT * 10,
    category: "electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Футболка",
    price: 800 + VARIANT * 5,
    category: "clothing",
    inStock: false,
  },
  {
    id: 4,
    name: "Книга 'JavaScript'",
    price: 450 + VARIANT * 3,
    category: "books",
    inStock: true,
  },
  {
    id: 5,
    name: "Рюкзак",
    price: 1500 + VARIANT * 8,
    category: "accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "Клавіатура",
    price: 3200 + VARIANT * 15,
    category: "electronics",
    inStock: false,
  },
  {
    id: 7,
    name: "Кросівки",
    price: 4200 + VARIANT * 20,
    category: "clothing",
    inStock: true,
  },
  {
    id: 8,
    name: "Книга 'TypeScript'",
    price: 520 + VARIANT * 4,
    category: "books",
    inStock: true,
  },
  {
    id: 9,
    name: "Чохол для телефону",
    price: 350 + VARIANT * 2,
    category: "accessories",
    inStock: true,
  },
  {
    id: 10,
    name: "Монітор",
    price: 12000 + VARIANT * 50,
    category: "electronics",
    inStock: true,
  },
];

export function getAvailableProducts(products)
{
    const availableProducts = products.filter(products => products.inStock === true);
    return availableProducts.map(availableProducts => availableProducts.name);
}

export function getProductsByCategory(products, category)
{
    const productsList = products.filter(products => products.category === category);
    return productsList.sort((a, b) => a.price - b.price);
}

export function getTotalPrice(products)
{
    const availableProducts = products.filter(products => products.inStock === true);
    return availableProducts.reduce((totalPrice, product) => totalPrice + product.price, 0);
}

export function getProductsSummary(products)
{
    const collector = (list, product) => 
    {
        const category = product.category;
        
        if(!list[product.category]) 
        {
            list[product.category] = {count: 0, totalPrice: 0};
        } 
        list[category].count += 1;
        list[category].totalPrice += product.price;

        return list;
    }

    return products.reduce(collector, {});
}

console.log("=== Завдання 2: Методи масивів ===");
console.log("Варіант:", VARIANT);
console.log("2.1:", getAvailableProducts(products));
console.log("2.2:", getProductsByCategory(products, "electronics"));
console.log("2.3:", getTotalPrice(products));
console.log("2.4:", getProductsSummary(products));