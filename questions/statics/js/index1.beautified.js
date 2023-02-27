const is_edit = false;

const inputFields = document.querySelectorAll('input:not([type="submit"])');

const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", event => {
    var lastRow_pendidikan = $(".pendidikan tr:last");
    var lastRow_pengalaman = $(".pengalaman tr:last");
    if ($('input[name^="nama"]').val() == "" || $('input[name^="alamat"]').val() == "" || $('input[name^="no_ktp"]').val() == "" || lastRow_pendidikan.find("input[name^=sekolah]").val() == "" || lastRow_pendidikan.find("input[name^=jurusan]").val() == "" || lastRow_pendidikan.find("input[name^=masuk]").val() == "" || lastRow_pendidikan.find("input[name^=lulus]").val() == "" || lastRow_pengalaman.find("input[name^=nama_perusahaan]").val() == "" || lastRow_pengalaman.find("input[name^=jabatan]").val() == "" || lastRow_pengalaman.find("input[name^=tahun]").val() == "" || $('input[name^="foto"]').val() == "") {
        console.log("submit button [NOT VALID] is clicking ............");
        alert("silahkan isi semua input field terlebih dahulu !");
        event.preventDefault();
    } else {
        console.log("submit button [VALID] is clicking ............");
        if (is_edit) {
            form.action = "/profile/update/?id=";
        }
        form.action = "/profile/add/";
        form.submit();
    }
});

$(document).ready(function() {
    console.log("read .....");
    const uploadButton = $(".custom-file-upload");
    const foto_preview = document.getElementById("foto_preview");
    $(".change-btn").click(function(event) {
        event.preventDefault();
        $("#file-upload").trigger("click");
        console.log("change btn clicked ....");
        const fileInput = document.getElementById("file-upload");
        fileInput.addEventListener("change", event => {
            const file = event.target.files[0];
            if (!file.type.match("image.*")) {
                alert("Only image files are allowed!");
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", event => {
                console.log("event.target.result = " + event.target.result);
                foto_preview.src = event.target.result;
                foto_preview.style.width = "200px";
                foto_preview.style.height = "200px";
                uploadButton.innerHTML = "Change";
                submitBtn.style.display = "block";
                submitBtn.style.margin = "0 auto";
            });
            reader.readAsDataURL(file);
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const fileInput = document.getElementById("file-upload");
        fileInput.addEventListener("change", event => {
            const file = event.target.files[0];
            if (!file.type.match("image.*")) {
                alert("Only image files are allowed!");
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", event => {
                console.log("event.target.result = " + event.target.result);
                foto_preview.src = event.target.result;
                foto_preview.style.width = "200px";
                foto_preview.style.height = "200px";
                uploadButton.innerHTML = "Change";
                submitBtn.style.display = "block";
                submitBtn.style.margin = "0 auto";
            });
            reader.readAsDataURL(file);
        });
    });
});

const delBtn = document.querySelector(".del-btn");

const addBtn = document.querySelector(".add-btn");

const editBtn = document.querySelector(".edit-btn");

const saveBtn = document.querySelector(".save-btn");

const addBtn_pendidikan = document.querySelector(".pendidikan .add-btn");

const addBtn_pengalaman = document.querySelector(".pengalaman .add-btn");

const tb_pendidikan = document.querySelector("#table-bio .pendidikan");

const tb_pengalaman = document.querySelector("#table-bio .pengalaman");

const notext_pendidikan = document.querySelector("#notext_pendidikan");

const notext_pengalaman = document.querySelector("#notext_pengalaman");

function checkPendidikanRows() {
    const numRows = tb_pendidikan.querySelectorAll("tr").length;
    console.log("numRows pendidikan = " + numRows);
    if (numRows >= 3) {
        console.log("run .... ");
        if (notext_pendidikan) {
            notext_pendidikan.style.display = "none";
        }
    } else {
        notext_pendidikan.style.display = "";
        inputFields.forEach(field => {
            field.disabled = false;
        });
    }
}

function checkPengalamanRows(event) {
    const numRows = tb_pengalaman.querySelectorAll("tr").length;
    console.log("numRows pengalaman = " + numRows);
    if (numRows > 2) {
        console.log("run .... ");
        notext_pengalaman.style.display = "none";
    } else {
        console.log("run [1] .... ");
        if (notext_pengalaman) {
            notext_pengalaman.style.display = "";
        }
        event.preventDefault();
        inputFields.forEach(field => {
            field.disabled = false;
        });
    }
    if (numRows == 1) {
        console.log("run [2] .... ");
        notext_pengalaman.style.display = "";
        inputFields.forEach(field => {
            field.disabled = false;
        });
    }
}

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
    if (event.target.classList.contains("add-btn")) {
        const tbody_pendidikan = event.target.closest(".pendidikan");
        if (tbody_pendidikan) {
            const newRow = document.createElement("tr");
            var lastRow = $(".pendidikan tr:last");
            const numRows = tb_pendidikan.querySelectorAll("tr").length;
            console.log("numRows [X] = " + numRows);
            if (numRows > 1 && lastRow && (lastRow.find("input[name^=sekolah]").val() == "" || lastRow.find("input[name^=jurusan]").val() == "" || lastRow.find("input[name^=masuk]").val() == "" || lastRow.find("input[name^=lulus]").val() == "")) {
                alert("Please fill the previous row before adding a new one.");
                return;
            } else {
                event.preventDefault();
                newRow.innerHTML = `
          <tr>
            <td><input type="text" class="form-control" name="sekolah[]"></td>
            <td><input type="text" class="form-control" name="jurusan[]"></td>
            <td><input type="text" class="form-control" name="masuk[]" id="tahun_masuk"></td>
            <td><input type="text" class="form-control" name="lulus[]" id="tahun_lulus"></td>
            <td>
              <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
              <button type="button" class="btn btn-sm btn-primary me-0 edit-btn">Edit</button>
              <button type="button" class="btn btn-success btn-sm save-btn">Save</button>
              <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
            </td>
          </tr>
        `;
                tb_pendidikan.appendChild(newRow);
                var new_tahun_masuk = newRow.querySelector("#tahun_masuk");
                var new_tahun_lulus = newRow.querySelector("#tahun_lulus");
                $(new_tahun_masuk).datepicker({
                    dateFormat: "yy-mm-dd"
                });
                $(new_tahun_lulus).datepicker({
                    dateFormat: "yy-mm-dd"
                });
                checkPendidikanRows();
            }
            const newDelBtn = newRow.querySelector(".del-btn");
            newDelBtn.addEventListener("click", event => {
                console.log("remove row start");
                newRow.remove();
                console.log("remove row finish");
                console.log("lenth tr = " + tb_pendidikan.querySelectorAll("tr").length);
                checkPendidikanRows();
            });
            const newEditBtn = newRow.querySelector(".edit-btn");
            newEditBtn.addEventListener("click", event => {
                console.log("edit pendidikan row start");
                inputFields.forEach(field => {
                    field.disabled = false;
                    field.style.color = "black";
                });
            });
        }
    }
});

tb_pengalaman.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.classList.contains("add-btn")) {
        const tbody_pengalaman = event.target.closest(".pengalaman");
        if (tbody_pengalaman) {
            const newRow = document.createElement("tr");
            var lastRow = $(".pengalaman tr:last");
            const numRows = tb_pengalaman.querySelectorAll("tr").length;
            const numRows_pend = tb_pendidikan.querySelectorAll("tr").length;
            console.log("numRows [X] = " + numRows);
            if (numRows > 1 && numRows_pend > 1 && lastRow && (lastRow.find("input[name^=nama_perusahaan]").val() == "" || lastRow.find("input[name^=jabatan]").val() == "" || lastRow.find("input[name^=tahun]").val() == "")) {
                alert("Please fill the previous row before adding a new one.");
                return;
            } else {
                newRow.innerHTML = `
          <tr>
            <td><input type="text" class="form-control" name="nama_perusahaan[]"></td>
            <td><input type="text" class="form-control" name="jabatan[]"></td>
            <td><input type="text" class="form-control" name="tahun[]" id="tahun"></td>
            <td><input type="text" class="form-control" name="keterangan[]"></td>
            <td>
              <button type="button" class="btn btn-sm btn-warning add-btn">Add</button>
              <button type="button" class="btn btn-sm btn-primary me-0 edit-btn">Edit</button>
              <button type="button" class="btn btn-success btn-sm save-btn">Save</button>
              <button type="button" class="btn btn-danger btn-sm del-btn">Delete</button>
            </td>
          </tr>
        `;
                tb_pengalaman.appendChild(newRow);
                var new_tahun = newRow.querySelector("#tahun");
                $(new_tahun).datepicker({
                    dateFormat: "yy-mm-dd"
                });
                checkPengalamanRows();
            }
            const newDelBtn = newRow.querySelector(".del-btn");
            newDelBtn.addEventListener("click", event => {
                console.log("remove row start");
                newRow.remove();
                console.log("pengalaman remove row finish");
                console.log("pengalaman length tr = " + tb_pengalaman.querySelectorAll("tr").length);
                checkPengalamanRows();
            });
            const newEdtBtn = newRow.querySelector(".edit-btn");
            newEdtBtn.addEventListener("click", event => {
                console.log("edit row start");
                event.preventDefault();
                inputFields.forEach(field => {
                    field.disabled = false;
                    field.style.color = "black";
                });
            });
        }
    }
});
// Attach a click event listener to the delete button

addBtn.addEventListener("click", event => {
    console.log("add btn [MAIN] clicked ....");
    event.preventDefault();
});

delBtn.addEventListener("click", event => {
    console.log("del btn [MAIN] clicked ....");
    event.preventDefault();
});

editBtn.addEventListener("click", event => {
    console.log("edit btn [MAIN] clicked ....");
    event.preventDefault();
});

saveBtn.addEventListener("click", event => {
    console.log("save btn [MAIN] clicked ....");
    event.preventDefault();
});