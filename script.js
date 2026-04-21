// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "zito" && pass === "123") {
        window.location.href = "admin.html";
    } else {
        alert("Login Falha!");
    }
}

function cancel() {
    window.location.href = "index.html";
}

// SIMPAN DATA
function simpan() {
    let nama = document.getElementById("nama").value;
    let file = document.getElementById("foto").files[0];

    if (!nama || !file) {
        alert("Hatama naran ho foto lai!");
        return;
    }

    let reader = new FileReader();

    reader.onload = function () {
        let data = JSON.parse(localStorage.getItem("orang")) || [];

        data.push({
            nama: nama,
            foto: reader.result
        });

        localStorage.setItem("orang", JSON.stringify(data));
        tampilData();
        alert("Dadus rai Susesu!");
    };

    reader.readAsDataURL(file);
}

// TAMPIL DATA
function tampilData() {
    let list = document.getElementById("listData");
    if (!list) return;

    list.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("orang")) || [];

    data.forEach((d, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <b>${d.nama}</b><br>
            <button class="btn-danger" onclick="hapus(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

window.onload = tampilData;

// DELETE
function hapus(index) {
    let data = JSON.parse(localStorage.getItem("orang")) || [];

    if (confirm("Hakarak atu hamos?")) {
        data.splice(index, 1);
        localStorage.setItem("orang", JSON.stringify(data));
        tampilData();
    }
}

// CARI
function cari() {
    let nama = document.getElementById("searchNaran").value;
    let data = JSON.parse(localStorage.getItem("orang")) || [];

    let hasil = data.find(d => d.nama.toLowerCase() === nama.toLowerCase());

    if (hasil) {
        document.getElementById("hasilFoto").src = hasil.foto;
    } else {
        alert("Data la hetan");
    }
}

// REFRESH
function refreshPage() {
    location.reload();
}

// EXIT
function exit() {
    window.location.href = "index.html";
}