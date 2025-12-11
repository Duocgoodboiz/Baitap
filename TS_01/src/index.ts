import { User } from "./interfaces/user";

// Khai báo biến userData với kiểu dữ liệu là User
const userData: User = {
  id: 1001,
  username: "dai.phan",
  fullName: "Dai Phan",
  email: "dai.phan@example.com",
  isActive: true,
  pointBalance: 1500.75,
  age: null,
  roles: ["admin", "manager", "viewer"],
  createdAt: new Date("2025-01-01T10:00:00.000Z"),
  lastLogin: new Date("2025-12-01T08:30:00.000Z"),

  contact: {
    phone: "+84-123-456-789",
    address: {
      street: "45 Nguyen Trai",
      district: "Thanh Xuan",
      city: "Ha Noi",
      postalCode: 100000,
      country: "VN",
    },
  },

  preferences: {
    theme: "dark",
    languages: ["vi", "en"],
    notification: {
      email: true,
      sms: false,
      push: true,
    },
    updateLanguage(lang: string): string {
      return `changed to ${lang}`;
    },
  },

  scores: [9.8, 8.5, 7.9, 6.5],

  projects: [
    {
      projectId: 501,
      title: "Internal System Upgrade",
      isCompleted: false,
      startDate: new Date("2025-03-10"),
      progress: 45.5,
      teamMembers: [
        { memberId: 1, name: "Alice", role: "developer" },
        { memberId: 2, name: "Bob", role: "tester" },
      ],
      getProgress(): string {
        return `${this.progress}%`;
      },
    },
  ],

  orders: [
    {
      orderId: 9001,
      date: new Date("2025-11-05"),
      items: [
        {
          sku: "TS-001",
          productName: "T-Shirt",
          quantity: 2,
          price: 15.5,
        },
      ],
      totalAmount: 39.0,
      calculateTotal(): number {
        return this.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
      },
    },
  ],

  metadata: {
    version: "2.1.0",
    build: "release-2025",
    updatedAt: new Date("2025-12-05T14:20:00.000Z"),
  },

  tags: [],
  token: "XYZ-123-ABC",

  logInfo(): void {
    console.log(`User: ${this.username}`);
  },

  redeemPoints(points: number): number {
    return this.pointBalance - points;
  },
};
//test
console.log("User Data initialized successfully!");
userData.logInfo();
console.log("Current Project Progress:", userData.projects[0]?.getProgress());
