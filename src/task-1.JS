
export function getFullName(user)
{
    const {firstName, lastName, middleName} = user;
    let answer = "";
    answer += lastName + " ";
    answer += firstName[0] + ". ";
    if(middleName != null)
    { answer += middleName[0] + ". "}
    return answer;
}

export function mergeObjects(...objects)
{
    const mergedObj = Object.assign({}, ...objects);
    return mergedObj;
}

export function removeDuplicates(...objects)
{
    let nonDuplicates = new Set(); 
    for (let i = 0; i < objects.length; i++) 
    {
        const currentObjects = objects[i];
        for (let j = 0; j < currentObjects.length; j++) 
        {
            nonDuplicates.add(currentObjects[j]);
        }
    }
    return [...nonDuplicates];
}

export function createUpdatedUser(user, updates)
{
    return { ...user, ...updates, address: { ...user.address, ...updates.address } };
}

const user1 = {
  firstName: "Петро",
  lastName: "Іванов",
  middleName: "Сергійович",
};

getFullName(user1); // "Іванов П. С."

const user2 = { firstName: "Анна", lastName: "Коваль" };
getFullName(user2); // "Коваль А."

mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }); // { a: 3, b: 2, c: 4 }

removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]); // [1, 2, 3, 4, 5]

const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
const updated = createUpdatedUser(user, { age: 26, address: { zip: "02002" } });
// updated: { name: "John", age: 26, address: { city: "Kyiv", zip: "02002" } }
// user — залишається незмінним

console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");
console.log(
  "1.1:",
  getFullName({
    firstName: "Петро",
    lastName: "Іванов",
    middleName: "Сергійович",
  }),
);
console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));
// ... і так далі
