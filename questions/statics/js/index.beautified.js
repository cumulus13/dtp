const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", event => {
    // if validation fails, prevent form submission
    var lastRow_pendidikan = $(".pendidikan tr:last");
    var lastRow_pengalaman = $(".pengalaman tr:last");
    if ($('input[name^="nama"]').val() == "" || $('input[name^="alamat"]').val() == "" || $('input[name^="no_ktp"]').val() == "" || lastRow_pendidikan.find("input[name^=sekolah]").val() == "" || lastRow_pendidikan.find("input[name^=jurusan]").val() == "" || lastRow_pendidikan.find("input[name^=masuk]").val() == "" || lastRow_pendidikan.find("input[name^=lulus]").val() == "" || lastRow_pengalaman.find("input[name^=nama_perusahaan]").val() == "" || lastRow_pengalaman.find("input[name^=jabatan]").val() == "" || lastRow_pengalaman.find("input[name^=tahun]").val() == "" || lastRow_pengalaman.find("input[name^=keterangan]").val() == "" || $('input[name^="foto"]').val() == "") {
        console.log("submit button [NOT VALID] is clicking ............");
        alert("silahkan isi semua input field terlebih dahulu !");
        event.preventDefault();
    } else {
        console.log("submit button [VALID] is clicking ............");
        form.action = "/profile/add/";
        form.submit();
    }
});

$(document).ready(function() {
    console.log("read .....");
    // Target the file input element
    var inputFile = $("input[type=file]");
    // Target the upload button element
    var uploadButton = $(".custom-file-upload");
    var foto_name = $("#foto_name");
    // Add a change event listener to the file input element
    inputFile.change(function() {
        var fileName = $(this).val().split("\\").pop();
        if (fileName) {
            console.log("filename =" + fileName);
            // uploadButton.text('File selected: ' + fileName);
            foto_name.text(fileName);
            foto_name.style.color = "blue";
            foto_name.style.textAlign = "center";
        } else {
            uploadButton.text("Upload Foto");
        }
    });
});

const delBtn = document.querySelector(".del-btn");

const addBtn = document.querySelector(".add-btn");

const addBtn_pendidikan = document.querySelector(".pendidikan .add-btn");

const addBtn_pengalaman = document.querySelector(".pengalaman .add-btn");

const tb_pendidikan = document.querySelector("#table-bio .pendidikan");

const tb_pengalaman = document.querySelector("#table-bio .pengalaman");

const notext_pendidikan = document.querySelector("#notext_pendidikan");

const notext_pengalaman = document.querySelector("#notext_pengalaman");

function checkPendidikanRows() {
    const numRows = tb_pendidikan.querySelectorAll("tr").length;
    console.log("numRows pendidikan = " + numRows);
    if (numRows <= 2) {
        console.log("run .... ");
        notext_pendidikan.style.display = "";
    } else {
        notext_pendidikan.style.display = "none";
    }
}

function checkPengalamanRows() {
    const numRows = tb_pengalaman.querySelectorAll("tr").length;
    console.log("numRows pengalaman = " + numRows);
    if (numRows <= 2) {
        console.log("run .... ");
        notext_pengalaman.style.display = "";
    } else {
        notext_pengalaman.style.display = "none";
    }
}
// let count = 1;
// addBtn_pendidikan.addEventListener('click', (event) => {
//   console.log("add button pendidikan clicked ...")
//   const numRowsToAdd = 1; // change this to add more rows with a single click
//   for (let i = 0; i < numRowsToAdd; i++) {
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//       <tr>
//       <td><input type="text" class="form-control" name="sekolah"></td>
//       <td><input type="text" class="form-control" name="jurusan"></td>
//       <td><input type="text" class="form-control" name="masuk" id="tahun_masuk_${count}"></td>
//       <td><input type="text" class="form-control" name="lulus" id="tahun_lulus_${count}"></td>
//       <td>
//         <button type="button" class="btn btn-success btn-sm save-btn">Save</button>
//         <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
//         <button type="button" class="btn btn-sm btn-primary me-2 edit-btn">Edit</button>
//         <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
//       </td>
//       </tr>
//     `;
//     tb_pendidikan.appendChild(newRow);
//     $("#tahun_masuk_" + count).datepicker();
//     $("#tahun_lulus_" + count).datepicker();
//     count++;
//   }
//   notext_pendidikan.remove();
// });
// Add event listener to "delete" button to remove current row

tb_pendidikan.addEventListener("click", event => {
    const row = event.target.closest("tr");
    if (event.target.classList.contains("del-btn")) {
        row.remove();
    }
});

tb_pengalaman.addEventListener("click", event => {
    const row = event.target.closest("tr");
    if (event.target.classList.contains("del-btn")) {
        row.remove();
    }
});

tb_pendidikan.addEventListener("click", event => {
    // const lastRow = tb_pendidikan.querySelector('tr:last-child');
    // var lastRow = $('.pendidikan tr.bordered:last');
    // var lastRow = $('.pendidikan tr:last');
    // const numRows = tb_pendidikan.querySelectorAll('tr').length;
    // console.log("numRows [X] = " + numRows);
    // Check if the last row exists and if its input fields are filled
    // if (lastRow && (lastRow.querySelector('input[name^=sekolah]').value == '' || 
    //                 lastRow.querySelector('input[name^=jurusan]').value == '' ||
    //                 lastRow.querySelector('input[name^=masuk]').value == '' ||
    //                 lastRow.querySelector('input[name^=lulus]').value == '')) {
    //   alert('Please fill the previous row before adding a new one.');
    //   return;
    // }
    // if (numRows > 3 && lastRow && (lastRow.find('input[name^=sekolah]').val() == '' || 
    //                 lastRow.find('input[name^=jurusan]').val() == '' ||
    //                 lastRow.find('input[name^=masuk]').val() == '' || 
    //                 lastRow.find('input[name^=lulus]').val() == '' )
    //   ) {
    //   alert('Please fill the previous row before adding a new one.');
    //   return; 
    // }
    // if (event.target.classList.contains('add-btn')) {
    if (event.target.classList.contains("add-btn")) {
        const tbody_pendidikan = event.target.closest(".pendidikan");
        if (tbody_pendidikan) {
            // add new row to the table
            const newRow = document.createElement("tr");
            var lastRow = $(".pendidikan tr:last");
            const numRows = tb_pendidikan.querySelectorAll("tr").length;
            console.log("numRows [X] = " + numRows);
            // var lastRow = $('tbody tr:last');
            // console.log('lastRow = ' + lastRow);
            if (numRows > 1 && lastRow && (lastRow.find("input[name^=sekolah]").val() == "" || lastRow.find("input[name^=jurusan]").val() == "" || lastRow.find("input[name^=masuk]").val() == "" || lastRow.find("input[name^=lulus]").val() == "")) {
                alert("Please fill the previous row before adding a new one.");
                return;
            } else {
                newRow.innerHTML = `
          <tr>
            <td><input type="text" class="form-control" name="sekolah"></td>
            <td><input type="text" class="form-control" name="jurusan"></td>
            <td><input type="text" class="form-control" name="masuk" id="tahun_masuk"></td>
            <td><input type="text" class="form-control" name="lulus" id="tahun_lulus"></td>
            <td>
              <!--button type="button" class="btn btn-success btn-sm save-btn">Save</button-->
              <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
              <!--button type="button" class="btn btn-sm btn-primary me-2 edit-btn">Edit</button-->
              <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
            </td>
          </tr>
        `;
                tb_pendidikan.appendChild(newRow);
                $("#tahun_masuk").datepicker();
                $("#tahun_lulus").datepicker();
                // notext_pendidikan.remove();
                checkPendidikanRows();
            }
            // Add event listener to new "delete" button for canceling adding new row
            const newDelBtn = newRow.querySelector(".del-btn");
            newDelBtn.addEventListener("click", event => {
                console.log("remove row start");
                newRow.remove();
                console.log("remove row finish");
                console.log("lenth tr = " + tb_pendidikan.querySelectorAll("tr").length);
                checkPendidikanRows();
            });
        }
    }
});

tb_pengalaman.addEventListener("click", event => {
    if (event.target.classList.contains("add-btn")) {
        const tbody_pengalaman = event.target.closest(".pengalaman");
        if (tbody_pengalaman) {
            // add new row to the table
            const newRow = document.createElement("tr");
            var lastRow = $(".pengalaman tr:last");
            const numRows = tb_pengalaman.querySelectorAll("tr").length;
            console.log("numRows [X] = " + numRows);
            // var lastRow = $('tbody tr:last');
            // console.log('lastRow = ' + lastRow);
            if (numRows > 1 && lastRow && (lastRow.find("input[name^=nama_perusahaan]").val() == "" || lastRow.find("input[name^=jabatan]").val() == "" || lastRow.find("input[name^=tahun]").val() == "")) {
                alert("Please fill the previous row before adding a new one.");
                return;
            } else {
                newRow.innerHTML = `
          <tr>
            <td><input type="text" class="form-control" name="nama_perusahaan"></td>
            <td><input type="text" class="form-control" name="jabatan"></td>
            <td><input type="text" class="form-control" name="tahun" id="tahun"></td>
            <td><input type="text" class="form-control" name="keterangan"></td>
            <td>
              <!--button type="button" class="btn btn-success btn-sm save-btn">Save</button-->
              <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
              <!--button type="button" class="btn btn-sm btn-primary me-2 edit-btn">Edit</button-->
              <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
            </td>
          </tr>
        `;
                tb_pengalaman.appendChild(newRow);
                notext_pengalaman.remove();
                $("#tahun").datepicker();
                checkPengalamanRows();
            }
            // Add event listener to new "delete" button for canceling adding new row
            const newDelBtn = newRow.querySelector(".del-btn");
            newDelBtn.addEventListener("click", event => {
                console.log("remove row start");
                newRow.remove();
                console.log("pengalaman remove row finish");
                console.log("pengalaman length tr = " + tb_pengalaman.querySelectorAll("tr").length);
                checkPengalamanRows();
            });
        }
    }
});
// addBtn_pengalaman.addEventListener('click', (event) => {
//   console.log("add button pengalaman clicked ...")
//   event.preventDefault();
//   const newRow = document.createElement('tr');
//     var lastRow = $('.pengalaman tr:last');
//     const numRows = tb_pengalaman.querySelectorAll('tr').length;
//     console.log("numRows [X] = " + numRows);
//     // var lastRow = $('tbody tr:last');
//     // console.log('lastRow = ' + lastRow);
//     if (numRows > 1 && lastRow && (lastRow.find('input[name^=nama_perusahaan]').val() == '' || 
//                   lastRow.find('input[name^=jabatan]').val() == '' ||
//                   lastRow.find('input[name^=tahun]').val() == '')
//       ) {
//         alert('Please fill the previous row before adding a new one.');
//         return; 
//         }
//     else {
//       console.log("RUN PENGALAMAN .....")
//       newRow.innerHTML = `
//         <tr>
//         <td><input type="text" class="form-control" name="nama_perusahaan"></td>
//         <td><input type="text" class="form-control" name="jabatan"></td>
//         <td><input type="text" class="form-control" name="tahun" id="tahun"></td>
//         <td><input type="text" class="form-control" name="keterangan"></td>
//         <td>
//           <!--button type="button" class="btn btn-success btn-sm save-btn">Save</button-->
//           <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
//           <!--button type="button" class="btn btn-sm btn-primary me-2 edit-btn">Edit</button-->
//           <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
//         </td>
//         </tr>
//       `;
//       tb_pengalaman.appendChild(newRow);
//       notext_pengalaman.remove();
//       $("#tahun").datepicker();
//       checkPengalamanRows()
//     }
//     // Add event listener to new "delete" button for canceling adding new row
//     const newDelBtn = newRow.querySelector('.del-btn');
//     newDelBtn.addEventListener('click', (event) => {
//       console.log("remove row start");
//       newRow.remove();
//       console.log("remove row finish");
//       console.log("lenth tr = " + tb_pengalaman.querySelectorAll('tr').length);
//       checkPengalamanRows();
//     });
// });
// Attach a click event listener to the delete button

addBtn.addEventListener("click", event => {
    console.log("add btn [MAIN] clicked ....");
    event.preventDefault();
});
// delBtn.addEventListener('click', (event) => {
//   console.log('delete delbtn clicked ....')
//   event.preventDefault();
//   $(this).closest('tr').remove();
// });

const form = document.getElementById("myForm");

const namaInput = document.getElementById("nama");

const alamatInput = document.getElementById("alamat");

const ktpInput = document.getElementById("ktp");

const pendidikanInput = document.getElementById("pendidikan");

const sekolahInput = document.getElementById("sekolah");

const jurusanInput = document.getElementById("jurusan");

const tahunMasukInput = document.getElementById("tahunMasuk");

const tahunLulusInput = document.getElementById("tahunLulus");

const perusahaanInput = document.getElementById("perusahaan");

const jabatanInput = document.getElementById("jabatan");

const tahunInput = document.getElementById("tahun");

const keteranganInput = document.getElementById("keterangan");

const fotoInput = document.getElementById("foto");

const fotoPreview = document.getElementById("foto-preview");
// const submitBtn = document.getElementById('submitBtn');

const updateBtn = document.getElementById("updateBtn");
// Get bio data from server

const bio = JSON.parse("{{ bio | tojson | safe}}");

console.log("bio =" + bio);

const pendidikan = JSON.parse("{{ pendidikan | tojson | safe}}");

namaInput.value = bio.nama;

alamatInput.value = bio.alamat;

ktpInput.value = bio.no_ktp;

pendidikanInput.value = bio.pendidikan;

sekolahInput.value = bio.sekolah;

jurusanInput.value = bio.jurusan;

tahunMasukInput.value = bio.tahun_masuk;

tahunLulusInput.value = bio.tahun_lulus;

perusahaanInput.value = bio.perusahaan;

jabatanInput.value = bio.jabatan;

tahunInput.value = bio.tahun;

keteranganInput.value = bio.keterangan;

if (bio.foto) {
    fotoPreview.innerHTML = `<img src="${bio.foto}" alt="Foto">`;
}
// Check if there are changes in form inputs

let isChanged = false;

const checkChanges = () => {
    if (namaInput.value !== bio.nama || alamatInput.value !== bio.alamat || ktpInput.value !== bio.ktp || pendidikanInput.value !== bio.pendidikan || sekolahInput.value !== bio.sekolah || jurusanInput.value !== bio.jurusan || tahunMasukInput.value !== bio.tahun_masuk || tahunLulusInput.value !== bio.tahun_lulus || perusahaanInput.value !== bio.perusahaan || jabatanInput.value !== bio.jabatan || tahunInput.value !== bio.tahun || keteranganInput.value !== bio.keterangan || fotoInput.files.length > 0) {
        isChanged = true;
    } else {
        isChanged = false;
    }
    // Toggle the visibility of update button
    if (isChanged) {
        updateBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    } else {
        updateBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    }
};
// Handle form submission

form.addEventListener("submit", async e => {
    e.preventDefault();
    // Prepare form data
    const formData = new FormData(form);
    const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    formData.append("csrfmiddlewaretoken", csrfToken);
    // Submit the form data to server
    try {
        const response = await fetch("/update_bio/", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error("Failed to update bio.");
        }
    } catch (error) {
        console.error("Failed to update bio:", error);
    }
});
// Handle update button click
// updateBtn.addEventListener('click', () => {
//   console.log('submit button is clicking ............');
//   form.action = "/add/";
//   form.submit();
// });
// //