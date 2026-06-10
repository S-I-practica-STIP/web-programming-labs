export function delay(ms) {
    return new Promise((resolve) => 
    {
        setTimeout(resolve, ms); 
    });
}

export function simulateFetch(url) {
    return new Promise((resolve, reject) => 
    {
        const waitTime = Math.random() * (500 - 200) + 200;
        setTimeout(() => 
        {
            if (!url.startsWith("https")) 
            {
                reject(new Error(`Invalid URL: ${url}`));
            } 
            else if (Math.random() < 0.7) 
            {
                resolve({ url, status: 200, data: "OK" }); 
            } 
            else 
            {
                reject(new Error("Server error: 500"));
            }
        }, 
        waitTime);
    });
}

export async function fetchWithRetry(url, attempts) 
{
    let lastError;

    for (let i = 1; i <= attempts; i++) 
    {
        try 
        {
            console.log("спроба " + i);
            return await simulateFetch(url);
        } 
        catch (error) 
        {
            console.error("Помилка під час спроби " + i + " " + error.message);
            lastError = error;
            if (i < attempts) 
            {
                await delay(500);
            } 
        }
    }
    throw lastError; 
}

export async function fetchMultiple(urls) 
{
    const results = await Promise.allSettled(urls.map(url => simulateFetch(url))); 

    return results.reduce((acc, res) => 
    {
        if (res.status === "fulfilled") 
        {
            acc.successful.push(res.value); 
        } 
        else 
        {
            acc.failed.push(res.reason.message); 
        }
        return acc;
    }, 
    { successful: [], failed: [] });
}

async function main() {
  console.log("=== Завдання 4: async/await ===");

  // 4.1
  console.time("delay");
  await delay(1000);
  console.timeEnd("delay"); // ~1000ms

  // 4.2
  try {
    const result = await simulateFetch(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log("Успіх:", result);
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  // 4.3 — retry для нестабільного сервера
  try {
    const result = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/posts",
      5,
    );
    console.log("fetchWithRetry результат:", result);
  } catch (error) {
    console.error("Всі спроби невдалі:", error.message);
  }

  // 4.4
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);
  console.log("Результати:", results);
}

main();
