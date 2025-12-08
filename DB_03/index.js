const { MongoClient } = require("mongodb");

// 1. Cấu hình kết nối
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "shop_db";

async function main() {
  try {
    // Kết nối đến server
    await client.connect();
    console.log("✅ Đã kết nối thành công đến MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("products");

    await collection.deleteMany({});

    // --- B. INSERT DATA (Câu 1) ---
    console.log("\n--- 1. Đang thêm 10 sản phẩm mẫu... ---");
    const products = [
      {
        name: "Laptop Gaming X",
        price: 2500,
        category: "tech",
        tags: ["laptop", "gaming"],
        stock: 10,
        rating: { avg: 4.8, count: 200 },
      },
      {
        name: "Smartphone Y",
        price: 1200,
        category: "electronics",
        tags: ["mobile", "tech"],
        stock: 50,
        rating: { avg: 4.5, count: 150 },
      },
      {
        name: "Tai nghe Bluetooth",
        price: 150,
        category: "electronics",
        tags: ["audio", "wireless"],
        stock: 100,
        rating: { avg: 4.1, count: 80 },
      },
      {
        name: "Màn hình 4K",
        price: 1100,
        category: "tech",
        tags: ["monitor", "display"],
        stock: 20,
        rating: { avg: 4.6, count: 50 },
      },
      {
        name: "Chuột không dây",
        price: 50,
        category: "accessories",
        tags: ["mouse", "peripheral"],
        stock: 0,
        rating: { avg: 3.9, count: 300 },
      },
      {
        name: "Bàn phím cơ",
        price: 120,
        category: "accessories",
        tags: ["keyboard", "rgb"],
        stock: 30,
        rating: { avg: 4.7, count: 90 },
      },
      {
        name: "Smart TV 55 inch",
        price: 1800,
        category: "electronics",
        tags: ["tv", "home"],
        stock: 15,
        rating: { avg: 4.3, count: 120 },
      },
      {
        name: "Máy tính bảng Pro",
        price: 900,
        category: "tech",
        tags: ["tablet", "mobile"],
        stock: 25,
        rating: { avg: 4.4, count: 110 },
      },
      {
        name: "Loa thông minh",
        price: 300,
        category: "electronics",
        tags: ["speaker", "smart home"],
        stock: 0,
        rating: { avg: 4.0, count: 60 },
      },
      {
        name: "Camera an ninh",
        price: 1050,
        category: "electronics",
        tags: ["security", "camera"],
        stock: 40,
        rating: { avg: 4.2, count: 75 },
      },
    ];
    await collection.insertMany(products);
    console.log("✅ Đã thêm xong 10 sản phẩm.");

    // --- C. QUERY (Câu 2) ---

    // 2a. Giá 1000 - 2000
    console.log("\n--- 2a. Sản phẩm giá 1000 - 2000 ---");
    const queryA = await collection
      .find({ price: { $gte: 1000, $lte: 2000 } })
      .toArray();
    console.log(queryA);

    // 2b. Category = electronics
    console.log("\n--- 2b. Category là electronics ---");
    const queryB = await collection.find({ category: "electronics" }).toArray();
    console.log(queryB.map((p) => p.name));
    console.log("\n--- 2c. Chỉ lấy Name và Price ---");
    const queryC = await collection
      .find({}, { projection: { name: 1, price: 1, _id: 0 } })
      .toArray();
    console.log(queryC);

    // 2d. Filter rating.avg > 4.2
    console.log("\n--- 2d. Rating avg > 4.2 ---");
    const queryD = await collection
      .find({ "rating.avg": { $gt: 4.2 } })
      .toArray();
    console.log(queryD.map((p) => `${p.name} (${p.rating.avg})`));

    // --- D. UPDATE (Câu 3) ---
    console.log('\n--- 3. Tăng stock lên 5 cho "tech" ---');
    const updateResult = await collection.updateMany(
      { category: "tech" },
      { $inc: { stock: 5 } }
    );
    console.log(`✅ Đã update ${updateResult.modifiedCount} sản phẩm.`);

    // --- E. DELETE (Câu 4) ---
    console.log("\n--- 4. Xóa sản phẩm stock = 0 ---");
    const deleteResult = await collection.deleteMany({ stock: 0 });
    console.log(`✅ Đã xóa ${deleteResult.deletedCount} sản phẩm.`);
  } catch (err) {
    console.error("❌ Có lỗi xảy ra:", err);
  } finally {
    // Đóng kết nối
    await client.close();
    console.log("\n🔒 Đã đóng kết nối Database.");
  }
}

main();
