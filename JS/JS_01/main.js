function tinhDiem() {
  let name = document.getElementById("studentName").value;
  let score1 = parseFloat(document.getElementById("score1").value);
  let score2 = parseFloat(document.getElementById("score2").value);
  let score3 = parseFloat(document.getElementById("score3").value);
  if (name === "") {
    alert("Vui lòng nhập tên");
    return;
  }
  if (isNaN(score1) || isNaN(score2) || isNaN(score3)) {
    document.getElementById("result").innerHTML = "Vui lòng nhập lại điểm";
    return;
  }
  let avg = (score1 + score2 + score3) / 3;
  let rank = "";
  if (avg >= 8) {
    rank = "Giỏi";
  } else if (avg >= 6.5) {
    rank = "Khá";
  } else if (avg >= 5) {
    rank = "Trung bình";
  } else {
    rank = "Yếu";
  }
  let output = `
        <h3>Kết quả học tập:</h3>
        <p><strong>Học viên:</strong> ${name}</p>
        <p><strong>Điểm trung bình:</strong> ${avg.toFixed(2)}</p>
        <p><strong>Xếp loại:</strong> <span class="highlight">${rank}</span></p>
    `;
  document.getElementById("result").innerHTML = output;
}
