
import { LIBRARY_NAME, books } from './data.JS';

import BookCollection, { getAveragePages, getOldestBook as findOldest } from './utils.JS';

console.log("=== Завдання 5: Модулі ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг на початку:", books.length);

const myCollection = new BookCollection(books);

console.log("Середня кількість сторінок:", getAveragePages(books).toFixed(0));
console.log("Найстаріша книга:", findOldest(books).title);

myCollection.addBook({ title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, pages: 176, genre: "Технічна література" });

console.log("Кількість книг після додавання:", myCollection.count);
console.log("Книги, відсортовані за роком:", myCollection.getSortedByYear().map(b => b.title + " (" + b.year + ")"));