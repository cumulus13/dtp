//$(document).ready(function() {
  //// Select all input elements of type text
  //const inputFields = document.querySelectorAll('input[type="text"]');
  
  //// Add event listener to each input field
  //inputFields.forEach(function(inputField) {
    //inputField.addEventListener('click', function() {
      //// Enable the input field on click
      //console.log("im clicked !...........");
      //inputField.removeAttribute("disabled");
    //});
  //});
//});

//// Get all the input fields
//var inputs = document.querySelectorAll('.row-input');

//// Add an event listener to each input field
//inputs.forEach(function(input) {
  //input.addEventListener('click', function() {
    //console.log("im clicked !...........");
    //this.disabled = false; // enable the clicked input field
  //});
//});


const form = document.getElementById('myForm');
const is_edit = false;
const editBtns = document.querySelectorAll('.edit-btn');
const saveBtns = document.querySelectorAll('.save-btn');
const inputFields = document.querySelectorAll('input:not([type="submit"])');
//const inputFields = document.querySelectorAll('input[type="text"]');

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (event) => {
    var lastRow_pendidikan = $('.pendidikan tr:last');
    var lastRow_pengalaman = $('.pengalaman tr:last');
    var form = document.getElementById('myForm');
    if ($('input[name^="nama"]').val() == '' || 
        $('input[name^="alamat"]').val() == '' || 
        $('input[name^="no_ktp"]').val() == '' || 
        lastRow_pendidikan.find('input[name^=sekolah]').val() == '' ||  
        lastRow_pendidikan.find('input[name^=jurusan]').val() == '' || 
        lastRow_pendidikan.find('input[name^=masuk]').val() == '' ||  
        lastRow_pendidikan.find('input[name^=lulus]').val() == '' ||  
        lastRow_pengalaman.find('input[name^=nama_perusahaan]').val() == '' || 
        lastRow_pengalaman.find('input[name^=jabatan]').val() == '' || 
        lastRow_pengalaman.find('input[name^=tahun]').val() == '' || 
        $('input[name^="foto"]').val() == ''
      ) {
        console.log('submit button [NOT VALID] is clicking ............');
        alert("silahkan isi semua input field terlebih dahulu !");
        event.preventDefault();
    } else {
      console.log('submit button [VALID] is clicking ............');
      if (is_edit) {
        form.action = "/profile/update/?id=";  
      }
      form.action = "/profile/add/";
      form.submit();    
    }
});

$(document).ready(function() {
  console.log("read .....");
  const uploadButton = $('.custom-file-upload');
  const foto_preview = document.getElementById('foto_preview');

  $('.change-btn').click(function(event){ 
    event.preventDefault();
    $('#file-upload').trigger('click'); 
  
    console.log("change btn clicked ....");
    
    const fileInput = document.getElementById('file-upload');

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (!file.type.match('image.*')) {
        alert('Only image files are allowed!');
        return;
      }

      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        console.log("event.target.result = " + event.target.result);
        foto_preview.src = event.target.result;
        foto_preview.style.width = "200px";
        foto_preview.style.height = "200px";
        uploadButton.innerHTML = 'Change';
        submitBtn.style.display = 'block';
        submitBtn.style.margin = '0 auto';

      });

      reader.readAsDataURL(file);

    });

  });

  //document.addEventListener('DOMContentLoaded', () => {

  const fileInput = document.getElementById('file-upload');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log('foto chamge ');
    if (!file.type.match('image.*')) {
      alert('Only image files are allowed!');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      console.log("event.target.result = " + event.target.result);
      foto_preview.src = event.target.result;
      foto_preview.style.width = "200px";
      foto_preview.style.height = "200px";
      uploadButton.innerHTML = 'Change';
      submitBtn.style.display = 'block';
      submitBtn.style.margin = '0 auto';

    });

    reader.readAsDataURL(file);

  });
 //});
});

const delBtn = document.querySelector('.del-btn');
const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');
const newBtn = document.querySelector('.new-btn');

const addBtn_pendidikan = document.querySelector('.pendidikan .add-btn');
const addBtn_pengalaman = document.querySelector('.pengalaman .add-btn');

const tb_pendidikan = document.querySelector('#table-bio .pendidikan');
const tb_pengalaman = document.querySelector('#table-bio .pengalaman');

const notext_pendidikan = document.querySelector('#notext_pendidikan');
const notext_pengalaman = document.querySelector('#notext_pengalaman');

function checkPendidikanRows() {
  const numRows = tb_pendidikan.querySelectorAll('tr').length;
  console.log("numRows pendidikan = " + numRows);
  if (numRows >= 3) {
    console.log("run .... ")
    if (notext_pendidikan){
      notext_pendidikan.style.display = 'none';
    }
  } else {
    if (notext_pendidikan){
      notext_pendidikan.style.display = '';
    }

    inputFields.forEach((field) => {
      field.disabled = false;
    });
  }
}

function checkPengalamanRows(event) {
  const numRows = tb_pengalaman.querySelectorAll('tr').length;
  console.log("numRows pengalaman = " + numRows);
  if (numRows > 2) {
    console.log("run .... ")
    notext_pengalaman.style.display = 'none';
  } else {
    console.log("run [1] .... ")
    if (notext_pengalaman) {
      notext_pengalaman.style.display = '';
    }
    //event.preventDefault();

    inputFields.forEach((field) => {
      field.disabled = false;
    });

  }

  if (numRows == 1) {
    console.log("run [2] .... ")
    if (notext_pengalaman){
      notext_pengalaman.style.display = '';
    }

    inputFields.forEach((field) => {
      field.disabled = false;
    });
  }
}

tb_pendidikan.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (event.target.classList.contains('del-btn')) {
    row.remove();
  }

  // if (event.target.classList.contains('edit-btn')) {
  //   const inputFields = row.querySelectorAll('input');
      
  //   inputFields.forEach((field) => {
  //     field.disabled = false;
  //     field.style.color = 'black';
  //   });
  // }

});

tb_pengalaman.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (event.target.classList.contains('del-btn')) {
    row.remove();
  }

  // if (event.target.classList.contains('edit-btn')) {
  //   const inputFields = row.querySelectorAll('input');
      
  //   inputFields.forEach((field) => {
  //     field.disabled = false;
  //     field.style.color = 'black';
  //   });
  // }
});


tb_pendidikan.addEventListener('click', (event) => {
  event.preventDefault();
 if (event.target.classList.contains('add-btn')) {
    const tbody_pendidikan = event.target.closest('.pendidikan');    
    if (tbody_pendidikan) {
      const newRow = document.createElement('tr');
      var lastRow = $('.pendidikan tr:last');
      const numRows = tb_pendidikan.querySelectorAll('tr').length;
      console.log("numRows [X] = " + numRows);
      if (numRows > 1 && lastRow && (lastRow.find('input[name^=sekolah]').val() == '' || 
                    lastRow.find('input[name^=jurusan]').val() == '' ||
                    lastRow.find('input[name^=masuk]').val() == '' || 
                    lastRow.find('input[name^=lulus]').val() == '' )
        ) {
          alert('Please fill the previous row before adding a new one.');
          return; 
          }
      else {
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
        var new_tahun_masuk = newRow.querySelector('#tahun_masuk');
        var new_tahun_lulus = newRow.querySelector('#tahun_lulus');
        $(new_tahun_masuk).datepicker({dateFormat: "yy-mm-dd"});
        $(new_tahun_lulus).datepicker({dateFormat: "yy-mm-dd"});
        
        checkPendidikanRows();
      }

      const newDelBtn = newRow.querySelector('.del-btn');
      newDelBtn.addEventListener('click', (event) => {
        console.log("remove row start");
        newRow.remove();
        console.log("remove row finish");
        console.log("lenth tr = " + tb_pendidikan.querySelectorAll('tr').length);
        checkPendidikanRows();
      });

      // const newEditBtn = newRow.querySelector('.edit-btn');
      // newEditBtn.addEventListener('click', (event) => {
      //   console.log("edit pendidikan row start");
      //   inputFields.forEach((field) => {
      //     field.disabled = false;
      //     field.style.color = 'black';
      //   });
      // });
    }
   }
  
});


tb_pengalaman.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('add-btn')) {
    const tbody_pengalaman = event.target.closest('.pengalaman');
    if (tbody_pengalaman){
      const newRow = document.createElement('tr');
      var lastRow = $('.pengalaman tr:last');
      const numRows = tb_pengalaman.querySelectorAll('tr').length;
      const numRows_pend = tb_pendidikan.querySelectorAll('tr').length;
      console.log("numRows [X] = " + numRows);
      if (numRows > 1 && numRows_pend > 1 && lastRow && (lastRow.find('input[name^=nama_perusahaan]').val() == '' || 
                    lastRow.find('input[name^=jabatan]').val() == '' ||
                    lastRow.find('input[name^=tahun]').val() == '' )
        ) {
          alert('Please fill the previous row before adding a new one.');
          return; 
          }
      else {
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
        var new_tahun = newRow.querySelector('#tahun');
        $(new_tahun).datepicker({dateFormat: "yy-mm-dd"});
        checkPengalamanRows()
      }

      const newDelBtn = newRow.querySelector('.del-btn');
      newDelBtn.addEventListener('click', (event) => {
        console.log("remove row start");
        newRow.remove();
        console.log("pengalaman remove row finish");
        console.log("pengalaman length tr = " + tb_pengalaman.querySelectorAll('tr').length);
        checkPengalamanRows();
      });

      // const newEdtBtn = newRow.querySelector('.edit-btn');
      // newEdtBtn.addEventListener('click', (event) => {
      //   console.log("edit row start");
      //   event.preventDefault();
      //   inputFields.forEach((field) => {
      //     field.disabled = false;
      //     field.style.color = 'black';
      //   });
      // });

    }
  }
});

// Attach a click event listener to the delete button
addBtn.addEventListener('click', (event) => {
  console.log('add btn [MAIN] clicked ....')
  event.preventDefault();
});

delBtn.addEventListener('click', (event) => {
  console.log('del btn [MAIN] clicked ....')
  event.preventDefault();
});

if (editBtn){
  editBtn.addEventListener('click', (event) => {
    console.log('edit btn [MAIN] clicked ....')
    event.preventDefault();
  });
  
  editBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    const inputFields = row.querySelectorAll('input');
    
      inputFields.forEach((field) => {
        field.disabled = false;
        field.style.color = 'black';
      });
    });
  });

}

if (saveBtn) {
  saveBtn.addEventListener('click', (event) => {
    console.log('save btn [MAIN] clicked ....')
    event.preventDefault();
  });
  
  saveBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    const inputFields = row.querySelectorAll('input');
    
      inputFields.forEach((field) => {
        field.disabled = true;
        field.style.color = 'yellow';
      });
    });
  });

}

newBtn.addEventListener('click', (event) => {
  console.log('clear all ....')
  $('input[type="text"]').val('');;
  // var rows_pendidikans = $('tbody.pendidikan tr.bordered');
  // var rows_pengalamans = $('tbody.pengalaman tr.bordered');
  // rows_pendidikans.remove();
  // rows_pengalamans.remove();

  // Get the table element
  const table = document.getElementById("table-bio");

  // Get all rows except the first one
  // const rows = table.querySelectorAll("tr:not(:first-child)");
  const rows = table.querySelectorAll("tbody:not(#biodata) tr:not(:first-child)");

  // Remove each row
  rows.forEach(row => row.remove());

  const firstRowInputs = table.querySelector("tr:first-child").querySelectorAll("input");

  firstRowInputs.forEach(input => {
    input.disabled = false;
    console.log('change style ....');
    input.style.color = 'black';
  });

  // const inputFields = row.querySelectorAll('input');
    
  // inputFields.forEach((field) => {
  //   field.disabled = false;
  //   field.style.color = 'black';
  // });
  
  // Add event listener to each input field
  inputFields.forEach(function(inputField) {
    inputField.removeAttribute("disabled");
    console.log('change style ....');
    inputField.style.color = 'black';
  });
  
  checkPendidikanRows();
  checkPengalamanRows();

});

// Get the input element for no_ktp
//const noKtpInput = document.querySelector('#no_ktp');
const noKtpInput = document.getElementById("no_ktp");
noKtpInput.addEventListener("mouseleave", () => {
  // Handle the mouse leave event here
  console.log('why you leaving me ...');
  // Get the value of no_ktp input
  const noKtpValue = noKtpInput.value;
  if (noKtpValue.length > 0) {
    // Check if no_ktp has input and its length is 16 digits
    if (noKtpValue && /^\d{16}$/.test(noKtpValue)) {
      // no_ktp is valid
      console.log('no_ktp is valid');
    } else {
      // no_ktp is not valid
      console.log('no_ktp is not valid');
      alert('no ktp is not valid !, masukkan 16 digit no ktp anda !');
    }
  }  

});

// Get the input element for no_ktp
//const noKtpInput = document.querySelector('#no_ktp');
const alamat_field = document.getElementById("alamat");
const nama_field = document.getElementById("nama");
const alamat_fieldValue = alamat_field.value;
const nama_fieldValue = nama_field.value;

nama_field.addEventListener("blur", () => {
  console.log("nama_fieldValue.length = " + nama_fieldValue.length);
  if (nama_field.value.trim() === '') {
    alert('nama tidak boleh kosong !');
  }
});

//if (alamat_fieldValue.length < 1) {
  //alert('alamat tidak boleh kosong !');
//}
    
let all_inputFields = document.querySelectorAll('input[type="text"]');

all_inputFields.forEach((field) => {
    field.addEventListener('click', () => {
    //console.log("field = " + field);
    // check if the input is disabled
    if (field.disabled) {
        console.log('This input is disabled');
      } else {
        console.log('This input is enabled and was clicked');
      }
    });
});

//$(document).ready(function() {
  //$('tbody').on('click', 'input[disabled]', function() {
    //console.log("try enable ...");
    //$(this).removeAttr('disabled');
  //});
//});

//$(document).on('click', '.pendidikan input[type="text"]', function() {
  //console.log("im clicked ! ....");
  //$(this).prop('disabled', false);
//});

//$(document).on('blur', '.pendidikan input[type="text"]', function() {
  //$(this).prop('disabled', true);
//});

//$(document).on('click', '.pengalaman input[type="text"]', function() {
  //$(this).prop('disabled', false);
//});

//$(document).on('blur', '.pengalaman input[type="text"]', function() {
  //$(this).prop('disabled', true);
//});

//$('tbody').on('click', 'input[type="text"]:disabled', function() {
  //console.log("im clicked ! ....");
  //$(this).prop('disabled', false);
//});

//$('tbody').on('blur', 'input[type="text"]:enabled', function() {
  //console.log("im clicked ! ....");
  //$(this).prop('disabled', true);
//});

//$('tbody').on('click', 'input[type="text"]:disabled', function() {
  //console.log("im clicked ! ....");
  //$(this).prop('disabled', false);
//});

//$('tbody').on('blur', 'input[type="text"]:enabled', function() {
  //console.log("im clicked ! ....");
  //$(this).prop('disabled', true);
//});

