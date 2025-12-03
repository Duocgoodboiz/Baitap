function tinhBMI() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    alert("Vui lòng nhập cân nặng và chiều cao hợp lệ!");
    return;
  }
  let bmi = w / (h * h);

  let status = "";
  if (bmi < 18.5) {
    status = "Gầy";
  } else if (bmi < 23) {
    status = "Bình thường";
  } else if (bmi < 25) {
    status = "Thừa cân";
  } else {
    status = "Béo phì";
  }
  document.getElementById("bmiVal").innerText = bmi.toFixed(2);
  document.getElementById("bmiStatus").innerText = status;
}
