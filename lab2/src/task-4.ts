export {};

abstract class BaseNotifier 
{
    constructor(protected readonly name: string) {}

    // Абстрактний метод — нащадки зобов'язані реалізувати
    abstract send(to: string, subject: string, body: string): void;

    // Шаблонний метод — спільна логіка для всіх нащадків
    notify(to: string, subject: string, body: string): void 
    {
        console.log(`[${this.name}] Надсилання сповіщення...`);
        this.send(to, subject, body);
        console.log(`[${this.name}] Сповіщення надіслано`);
    }
}
//клас для емейл розсилки
class EmailNotifier extends BaseNotifier
{
    constructor(private readonly smtpServer: string) 
    {
        super("Email");
    }
    //реалізація абстрактного методу батьківського класу
    send(to: string, subject: string, body: string): void 
    {
        const shortBody = body.substring(0, 50);
        console.log("📧 Email → " + to + ": \"" + subject + 
        "\" | Тіло: " + shortBody + " через " + this.smtpServer);
    }
}

//клас для смс розсилки
class SmsNotifier extends BaseNotifier
{
    constructor(private readonly phonePrefix: string = "+380")
    {
        super("SMS");
    }
    //реалізація абстрактного методу батьківського класу
    send(to: string, subject: string, body: string): void 
    {
        const shortBody = body.substring(0, 160);
        console.log("📱 SMS → " + this.phonePrefix + to + ": \"" + shortBody + "\"");
    }
}

//функція для розсилки сповіщень через усі канали
function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void 
{
    notifiers.forEach(function(notifier) {
        //виклик спільниого шаблонного методу
        notifier.notify(to, subject, body);
    });
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

// Параметр to — рядок-адресат; його формат залежить від каналу
sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "📧Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);