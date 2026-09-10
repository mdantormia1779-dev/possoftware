# 🚀 Postman API Testing Guide - XYZ Retail POS

এই ফোল্ডারে আপনার POS অ্যাপ্লিকেশনের সব ব্যাকএন্ড API টেস্ট করার জন্য তৈরি **Postman Collection** এবং **Environment** রয়েছে।

---

## 📁 ফাইল সমূহ

1. **`XYZ_POS_API.postman_collection.json`** - ৪৬টি API রুট সহ সম্পূর্ণ কালেকশন।
2. **`XYZ_POS_Local.postman_environment.json`** - লোকাল সার্ভার (`http://localhost:3000`) এবং ক্রেডেনশিয়াল পরিবেশ ভ্যারিয়েবল।

---

## 🛠️ পোস্টম্যানে সেটআপ করার সহজ ধাপ

### ধাপ ১: Postman-এ Import করুন
1. Postman ওপেন করুন।
2. উপরের বাম পাশের **Import** বাটনে ক্লিক করুন।
3. `c:\Web Development\Pos\postman` ফোল্ডার থেকে এই ২টি ফাইল ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা সিলেক্ট করুন:
   - `XYZ_POS_API.postman_collection.json`
   - `XYZ_POS_Local.postman_environment.json`

### ধাপ ২: Environment সিলেক্ট করুন
- Postman-এর উপরের ডান পাশে Environment ড্রপডাউন থেকে **`XYZ POS - Local`** সিলেক্ট করুন।

### ধাপ ৩: লোকাল সার্ভার রান করুন
টার্মিনালে নিশ্চিত করুন Next.js সার্ভার চালু আছে:
```bash
npm run dev
```

---

## ⚡ অটোমেটিক লগইন ও টোকেন ম্যানেজমেন্ট (Auto-Auth)

ম্যানুয়ালি কোনো টোকেন কপি-পেস্ট করার প্রয়োজন নেই!

1. কালেকশনের **`1. Authentication` -> `Login (Auto-saves Token & Org)`** রিকুয়েস্টে যান।
2. **Send** বাটনে ক্লিক করুন।
3. লগইন সফল হলে টেস্ট স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে:
   - `authToken`
   - `organizationId`
   - `branchId`
   পোস্টম্যানের ভ্যারিয়েবলে সেভ করে দিবে।
4. এরপর আপনি যে কোনো ক্যাটাগরি (Products, Sales, Dashboard, Inventory ইত্যাদি)-এর রিকুয়েস্টে ক্লিক করে সরাসরি **Send** করতে পারবেন।

---

## 👤 ডেমো ক্রেডেনশিয়ালসমূহ (Demo Personas)

যেকোনো রোল দিয়ে টেস্ট করতে পারেন:

| রোল (Role) | ইমেইল (Email) | পাসওয়ার্ড (Password) |
|---|---|---|
| **Company Owner** | `owner@rahmanfashion.com.bd` | `password123` |
| **Branch Manager** | `manager.dhk@rahmanfashion.com.bd` | `password123` |
| **Accountant** | `accountant@rahmanfashion.com.bd` | `password123` |
| **Cashier** | `cashier1@rahmanfashion.com.bd` | `password123` |
| **Super Admin** | `superadmin@xyzpos.com` | `password123` |
