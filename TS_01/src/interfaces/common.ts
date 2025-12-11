// Định nghĩa địa chỉ chi tiết
export interface Address {
  street: string;
  district: string;
  city: string;
  postalCode: number;
  country: string;
}

// Định nghĩa thông tin liên lạc
export interface Contact {
  phone: string;
  address: Address;
}

// Định nghĩa cấu hình thông báo
export interface NotificationSetting {
  email: boolean;
  sms: boolean;
  push: boolean;
}

// Định nghĩa các sở thích của người dùng
export interface Preferences {
  theme: "dark" | "light";
  languages: string[];
  notification: NotificationSetting;
  updateLanguage(lang: string): string;
}

// Định nghĩa Metadata
export interface Metadata {
  version: string;
  build: string;
  updatedAt: Date;
}
