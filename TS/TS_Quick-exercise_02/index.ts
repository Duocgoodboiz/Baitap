// ==========================================
// 6.Interface and Type alias
// ==========================================

interface Employee {
  id: number;
  name: string;
  position: string;
}
type ResponseStatus = "ok" | "error";

type EmployeeWithTime = Employee & {
  createdAt: Date;
};
const newStaff: EmployeeWithTime = {
  id: 1,
  name: "Nguyen Van A",
  position: "Developer",
  createdAt: new Date(),
};

const currentStatus: ResponseStatus = "ok";

// ==========================================
//enum
// ==========================================

//1.Tạo Orderstatus Enum
enum Orderstatus {
  Pending = "PENDING",
  Paid = "PAID",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

function isPaid(status: Orderstatus): boolean {
  return (
    status === Orderstatus.Paid ||
    status === Orderstatus.Shipped ||
    status === Orderstatus.Delivered
  );
}

function canCancel(status: Orderstatus): boolean {
  return status === Orderstatus.Pending || status === Orderstatus.Paid;
}

// Usage
const orderstatus: Orderstatus = Orderstatus.Paid;
console.log(isPaid(orderstatus)); // true
console.log(canCancel(orderstatus)); // true

//2.Tạo LogLevel Enum
enum LogLevel {
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
  Debug = "DEBUG",
}

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;

  switch (level) {
    case LogLevel.Error:
      console.error(`${prefix} ❌ ${message}`);
      break;
    case LogLevel.Warn:
      console.warn(`${prefix} ⚠️ ${message}`);
      break;
    case LogLevel.Info:
      console.info(`${prefix} ℹ️ ${message}`);
      break;
    case LogLevel.Debug:
      console.debug(`${prefix} 🐛 ${message}`);
      break;
  }
}

// Usage
log(LogLevel.Info, "Application started");
log(LogLevel.Error, "Failed to connect to database");
log(LogLevel.Warn, "Deprecated API usage detected");

// ==========================================
//8.generic
// ==========================================

// 1. Generic Function: Merge hai objects
function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

// 2. Generic Queue: Enqueue, Dequeue, Peek
class Queue<T> {
  private data: T[] = [];
  // Thêm vào cuối hàng đợi
  enqueue(item: T): void {
    this.data.push(item);
  }
  // Lấy ra từ đầu hàng đợi
  dequeue(): T | undefined {
    return this.data.shift();
  }
  // Xem phần tử đầu tiên mà không lấy ra
  peek(): T | undefined {
    return this.data[0];
  }
  // Helper: xem độ dài
  size(): number {
    return this.data.length;
  }
}

// 3. Generic Validator với Constraints
interface Lengthwise {
  length: number;
}

class LengthValidator<T extends Lengthwise> {
  constructor(private value: T) {}

  // Kiểm tra xem độ dài có lớn hơn minLength không
  isValid(minLength: number): boolean {
    return this.value.length >= minLength;
  }
}

// 4. Generic Function: Filter Array
function filterArray<T>(items: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

//TEST

console.log("--- 1. Test Merge ---");
const user = { name: "Huy", age: 25 };
const info = { job: "Developer", country: "Vietnam" };
const merged = mergeObjects(user, info);
console.log(merged);

console.log("\n--- 2. Test Queue ---");
const numberQueue = new Queue<number>();
numberQueue.enqueue(10);
numberQueue.enqueue(20);
console.log("Peek:", numberQueue.peek()); // 10
console.log("Dequeue:", numberQueue.dequeue()); // 10
console.log("Size remaining:", numberQueue.size()); // 1

console.log("\n--- 3. Test Validator (Constraint: Lengthwise) ---");
const passValidator = new LengthValidator("password123");
console.log("Is valid password (> 5 chars)?", passValidator.isValid(5)); // true

console.log("\n--- 4. Test Filter ---");
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterArray(numbers, (n) => n % 2 === 0);
console.log("Even numbers:", evenNumbers); // [2, 4, 6]

// ======================================================
// Class và Lập trình hướng đối tượng trong TypeScript
// ======================================================

//tạo class Customer
class Customer {
  constructor(public id: number, public name: string, public email: string) {}

  greet() {
    console.log(`Hello ${this.name}, your email is ${this.email}`);
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
  }
}

const customer = new Customer(1, "John Doe", "john@example.com");
customer.greet(); // Hello John Doe, your email is john@example.com

//Tạo class VIPCustomer kế thừa Customer
class VIPCustomer extends Customer {
  constructor(
    id: number,
    name: string,
    email: string,
    public level: "bronze" | "silver" | "gold" | "platinum",
    private discount: number = 0
  ) {
    super(id, name, email);
  }

  getDiscount() {
    return this.discount;
  }

  override greet() {
    console.log(`VIP Customer ${this.name} - Level: ${this.level}`);
  }

  calculatePrice(originalPrice: number) {
    return originalPrice * (1 - this.discount);
  }
}

const vip = new VIPCustomer(2, "Jane Smith", "jane@example.com", "gold", 0.15);
vip.greet(); // VIP Customer Jane Smith - Level: gold
console.log(vip.calculatePrice(100)); // 85 (15% discount)

//Tạo class Circle với static methods
class Circle {
  static PI = 3.14159265359;

  constructor(public radius: number) {}

  getArea(): number {
    return Circle.PI * this.radius * this.radius;
  }

  getCircumference(): number {
    return 2 * Circle.PI * this.radius;
  }

  static areaFromRadius(radius: number): number {
    return this.PI * radius * radius;
  }

  static circumferenceFromRadius(radius: number): number {
    return 2 * this.PI * radius;
  }
}

const circle = new Circle(5);
console.log(circle.getArea()); // 78.53981633975
console.log(circle.getCircumference()); // 31.4159265359

console.log(Circle.areaFromRadius(10)); // 314.159265359
console.log(Circle.circumferenceFromRadius(10)); // 62.8318530718

//=============================================
//Modules, Import và Export trong TypeScript
//=============================================
import { capitalize, slugify, VALIDATION_RULES } from "./src/utils.js";

// Test capitalize
console.log(capitalize("hello world")); // "Hello world"
console.log(capitalize("JAVASCRIPT")); // "Javascript"

// Test slugify
console.log(slugify("Hello World!")); // "hello-world"
console.log(slugify("User@Name#123")); // "username123"

// Test validation
console.log(VALIDATION_RULES.email.test("user@example.com")); // true
console.log(VALIDATION_RULES.email.test("invalid-email")); // false

//=============================================
//Utility Types trong TypeScript
//=============================================
import { updateProduct } from "./src/product.service.js";
import { CONFIG } from "./src/app.config.js";
import { ROLE_PERMISSIONS } from "./src/user.types.js";

console.log("=== TEST 1: PRODUCT SERVICE ===");
try {
  const updated = updateProduct(1, { price: 2000, inStock: true });
  console.log("Updated Product:", updated);
} catch (error: any) {
  console.error("Update Failed:", error.message);
}

console.log("\n=== TEST 2: CONFIG ===");
console.log("Current API (Dev):", CONFIG.development.apiUrl);

console.log("\n=== TEST 3: PERMISSIONS ===");
console.log("Admin Permissions:", ROLE_PERMISSIONS.admin);
