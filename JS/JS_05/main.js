const orders = [
  { id: 1, customer: "Nguyễn Văn A", total: 150000, status: "completed" },
  { id: 2, customer: "Trần Thị B", total: 80000, status: "pending" },
  { id: 3, customer: "Lê Văn C", total: 200000, status: "completed" },
  { id: 4, customer: "Phạm Thị D", total: 50000, status: "cancelled" },
  { id: 5, customer: "Hoàng Văn E", total: 300000, status: "completed" },
];

function renderData() {
  let html = "";
  orders.forEach((item) => {
    html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.customer}</td>
                <td>${item.total.toLocaleString()}</td>
                <td>${item.status}</td>
            </tr>
        `;
  });
  document.getElementById("tableBody").innerHTML = html;
}

function thongKe() {
  let revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  let countComp = orders.filter((o) => o.status === "completed").length;
  let countPend = orders.filter((o) => o.status === "pending").length;
  let countCanc = orders.filter((o) => o.status === "cancelled").length;

  let maxOrd = orders.reduce(
    (max, curr) => (curr.total > max.total ? curr : max),
    orders[0]
  );

  let taxListHtml = orders
    .filter((o) => o.status === "completed")
    .map((o) => {
      let taxPrice = o.total * 1.1;
      return `<li>${
        o.customer
      } - Sau thuế: <b>${taxPrice.toLocaleString()}</b></li>`;
    })
    .join("");

  document.getElementById("reportSection").style.display = "block";

  document.getElementById(
    "revenue"
  ).innerHTML = `<b>${revenue.toLocaleString()}</b> VND`;

  document.getElementById("countStatus").innerHTML = `
        <li>Completed: ${countComp}</li>
        <li>Pending: ${countPend}</li>
        <li>Cancelled: ${countCanc}</li>
    `;

  document.getElementById("maxOrder").innerHTML = `${
    maxOrd.customer
  } (Giá trị: <b>${maxOrd.total.toLocaleString()}</b>)`;

  document.getElementById("taxList").innerHTML = taxListHtml;
}

renderData();
