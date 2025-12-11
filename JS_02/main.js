function renderTable() {
  const products = [
    { name: "iPhone 15 Pro", price: 25000000, qty: 2 },
    { name: "Samsung S24", price: 20000000, qty: 3 },
    { name: "Tai nghe Sony", price: 3000000, qty: 5 },
    { name: "Chuột Logitech", price: 1000000, qty: 10 },
  ];

  let maxTotal = 0;
  products.forEach((item) => {
    item.total = item.price * item.qty;
    if (item.total > maxTotal) maxTotal = item.total;
  });

  let listTr = "";
  let grandTotal = 0;

  for (let item of products) {
    grandTotal += item.total;

    let note = item.total === maxTotal ? " (MAX)" : "";
    let boldStyle =
      item.total === maxTotal ? "font-weight:bold; color:red;" : "";

    listTr += `
            <tr style="${boldStyle}">
                <td>${item.name} ${note}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.total}</td>
            </tr>
        `;
  }

  document.getElementById("tableBody").innerHTML = listTr;

  document.getElementById("totalBill").innerText = "Tổng tiền: " + grandTotal;
}
