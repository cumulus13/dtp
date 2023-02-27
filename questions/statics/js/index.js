// $(function() {
//   $("#tahun_lulus").datepicker();
//   $("#tahun_masuk").datepicker();
//   $("#tahun").datepicker();
// });

const is_edit = false;
const inputFields = document.querySelectorAll('input:not([type="submit"])');

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (event) => {
    // if validation fails, prevent form submission
    var lastRow_pendidikan = $('.pendidikan tr:last');
    var lastRow_pengalaman = $('.pengalaman tr:last');

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

// $('.change-btn').click(function(event){ 
//   event.preventDefault();
//   $('#file-upload').trigger('click'); 
//   console.log("change btn clicked ....");
// });

$(document).ready(function() {
  console.log("read .....");
  // Target the file input element
  // var inputFile = $('input[type=file]');

  // Target the upload button element
  const uploadButton = $('.custom-file-upload');
  // const uploadButton = document.querySelector('.custom-file-upload');

  // var foto_preview = $('#foto_preview');
  const foto_preview = document.getElementById('foto_preview');

  // Add a change event listener to the file input element
  // inputFile.change(function() {
  //   var fileName = $(this).val().split('\\').pop();
  //   if (fileName) {
  //     console.log("filename =" + fileName);
  //     // uploadButton.text('File selected: ' + fileName);
  //     uploadButton.text('Change');
  //     // uploadButton.style.display = 'none';
  //     // foto_name.text(fileName);
  //     // foto_name.style.color = 'blue';
  //     // foto_name.style.textAlign = 'center'
  //   } else {
  //     uploadButton.text('Upload Foto');
  //   }
  // });

  // let fileInput = $("#file-upload");
  // const fileInput = document.querySelector('#file-upload');

// const chnBtn = document.querySelector('.change-btn');
// // $(".change-btn").click(function(event) {
// chnBtn.addEventListener('click', (event) => {
//   // Trigger the file upload input
//   event.preventDefault();
//   // $("#file-upload").trigger("change");
//   // $("#file-upload").trigger("click");
//   // $("#file-upload").click();
//   // $("#file-upload").prop("disabled", false).trigger("click");
//   $('.change-btn').click(function(){ $('#file-upload').trigger('click'); });
//   console.log("change btn clicked ....");
// });
$('.change-btn').click(function(event){ 
    event.preventDefault();
    $('#file-upload').trigger('click'); 
    // $('#file-upload').click();
    console.log("change btn clicked ....");
    
    const fileInput = document.getElementById('file-upload');

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      // check if file is an image
      if (!file.type.match('image.*')) {
        alert('Only image files are allowed!');
        return;
      }

      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        console.log("event.target.result = " + event.target.result);
        // set the preview image source to the data URL
        foto_preview.src = event.target.result;
        foto_preview.style.width = "200px";
        foto_preview.style.height = "200px";
        // uploadButton.text('Change');
        uploadButton.innerHTML = 'Change';
        // submitBtn.style.float = 'right';
        submitBtn.style.display = 'block';
        submitBtn.style.margin = '0 auto';

      });

      reader.readAsDataURL(file);

    });

});

document.addEventListener('DOMContentLoaded', () => {

  const fileInput = document.getElementById('file-upload');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // check if file is an image
    if (!file.type.match('image.*')) {
      alert('Only image files are allowed!');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      console.log("event.target.result = " + event.target.result);
      // set the preview image source to the data URL
      foto_preview.src = event.target.result;
      foto_preview.style.width = "200px";
      foto_preview.style.height = "200px";
      // uploadButton.text('Change');
      uploadButton.innerHTML = 'Change';
      // submitBtn.style.float = 'right';
      submitBtn.style.display = 'block';
      submitBtn.style.margin = '0 auto';

    });

    reader.readAsDataURL(file);

  });
 });
});

const delBtn = document.querySelector('.del-btn');
const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');

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
    notext_pendidikan.style.display = '';

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
    event.preventDefault();

    inputFields.forEach((field) => {
      field.disabled = false;
    });

  }

  if (numRows == 1) {
    console.log("run [2] .... ")
    notext_pengalaman.style.display = '';

    inputFields.forEach((field) => {
      field.disabled = false;
    });
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

tb_pendidikan.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (event.target.classList.contains('del-btn')) {
    row.remove();
  }
});

tb_pengalaman.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (event.target.classList.contains('del-btn')) {
    row.remove();
  }
});


tb_pendidikan.addEventListener('click', (event) => {
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
 if (event.target.classList.contains('add-btn')) {
    const tbody_pendidikan = event.target.closest('.pendidikan');
    
    if (tbody_pendidikan) {
      // add new row to the table
      const newRow = document.createElement('tr');
      var lastRow = $('.pendidikan tr:last');
      const numRows = tb_pendidikan.querySelectorAll('tr').length;
      console.log("numRows [X] = " + numRows);
      // var lastRow = $('tbody tr:last');
      // console.log('lastRow = ' + lastRow);
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
        // $("#tahun_masuk").datepicker();
        // $("#tahun_lulus").datepicker();
        var new_tahun_masuk = newRow.querySelector('#tahun_masuk');
        var new_tahun_lulus = newRow.querySelector('#tahun_lulus');
        $(new_tahun_masuk).datepicker({dateFormat: "yy-mm-dd"});
        $(new_tahun_lulus).datepicker({dateFormat: "yy-mm-dd"});
        
        // notext_pendidikan.remove();
        checkPendidikanRows();
      }


      // Add event listener to new "delete" button for canceling adding new row
      const newDelBtn = newRow.querySelector('.del-btn');
      newDelBtn.addEventListener('click', (event) => {
        console.log("remove row start");
        newRow.remove();
        console.log("remove row finish");
        console.log("lenth tr = " + tb_pendidikan.querySelectorAll('tr').length);
        checkPendidikanRows();
      });

      const newEditBtn = newRow.querySelector('.edit-btn');
      newEditBtn.addEventListener('click', (event) => {
        console.log("edit pendidikan row start");
        // event.preventDefault();
        inputFields.forEach((field) => {
          field.disabled = false;
          field.style.color = 'black';
        });
      });
    }
   }
  
});


tb_pengalaman.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('add-btn')) {
    const tbody_pengalaman = event.target.closest('.pengalaman');
    if (tbody_pengalaman){
      // add new row to the table
      const newRow = document.createElement('tr');
      var lastRow = $('.pengalaman tr:last');
      const numRows = tb_pengalaman.querySelectorAll('tr').length;
      const numRows_pend = tb_pendidikan.querySelectorAll('tr').length;
      console.log("numRows [X] = " + numRows);
      // var lastRow = $('tbody tr:last');
      // console.log('lastRow = ' + lastRow);
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
        // notext_pengalaman.remove();
        // $("#tahun").datepicker();
        var new_tahun = newRow.querySelector('#tahun');
        $(new_tahun).datepicker({dateFormat: "yy-mm-dd"});
        checkPengalamanRows()
      }


      // Add event listener to new "delete" button for canceling adding new row
      const newDelBtn = newRow.querySelector('.del-btn');
      newDelBtn.addEventListener('click', (event) => {
        console.log("remove row start");
        newRow.remove();
        console.log("pengalaman remove row finish");
        console.log("pengalaman length tr = " + tb_pengalaman.querySelectorAll('tr').length);
        checkPengalamanRows();
      });

      const newEdtBtn = newRow.querySelector('.edit-btn');
      newEdtBtn.addEventListener('click', (event) => {
        console.log("edit row start");
        event.preventDefault();
        inputFields.forEach((field) => {
          field.disabled = false;
          field.style.color = 'black';
        });
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
addBtn.addEventListener('click', (event) => {
  console.log('add btn [MAIN] clicked ....')
  event.preventDefault();
});

delBtn.addEventListener('click', (event) => {
  console.log('del btn [MAIN] clicked ....')
  event.preventDefault();
});

editBtn.addEventListener('click', (event) => {
  console.log('edit btn [MAIN] clicked ....')
  event.preventDefault();
});

saveBtn.addEventListener('click', (event) => {
  console.log('save btn [MAIN] clicked ....')
  event.preventDefault();
});
// delBtn.addEventListener('click', (event) => {
//   console.log('delete delbtn clicked ....')
//   event.preventDefault();
//   $(this).closest('tr').remove();
// });


const form = document.getElementById('myForm');
const namaInput = document.getElementById('nama');
const alamatInput = document.getElementById('alamat');
const ktpInput = document.getElementById('ktp');
const pendidikanInput = document.getElementById('pendidikan');
const sekolahInput = document.getElementById('sekolah');
const jurusanInput = document.getElementById('jurusan');
const tahunMasukInput = document.getElementById('tahunMasuk');
const tahunLulusInput = document.getElementById('tahunLulus');
const perusahaanInput = document.getElementById('perusahaan');
const jabatanInput = document.getElementById('jabatan');
const tahunInput = document.getElementById('tahun');
const keteranganInput = document.getElementById('keterangan');
const fotoInput = document.getElementById('foto');
const fotoPreview = document.getElementById('foto-preview');
// const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');

// Get bio data from server
console.log("bio = " + bio);
console.log("type of bio = " + typeof(a));
const bio = JSON.parse('{{ bio | tojson | safe}}');
console.log("bio =" + bio);
const pendidikan = JSON.parse('{{ pendidikan | tojson | safe}}');
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
  if (namaInput.value !== bio.nama ||
      alamatInput.value !== bio.alamat ||
      ktpInput.value !== bio.ktp ||
      pendidikanInput.value !== bio.pendidikan ||
      sekolahInput.value !== bio.sekolah ||
      jurusanInput.value !== bio.jurusan ||
      tahunMasukInput.value !== bio.tahun_masuk ||
      tahunLulusInput.value !== bio.tahun_lulus ||
      perusahaanInput.value !== bio.perusahaan ||
      jabatanInput.value !== bio.jabatan ||
      tahunInput.value !== bio.tahun ||
      keteranganInput.value !== bio.keterangan ||
      fotoInput.files.length > 0) {
    isChanged = true;
  } else {
    isChanged = false;
  }

  // Toggle the visibility of update button
  if (isChanged) {
    updateBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  } else {
    updateBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  }
};

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Prepare form data
  const formData = new FormData(form);
  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  formData.append('csrfmiddlewaretoken', csrfToken);

  // Submit the form data to server
  try {
    const response = await fetch('/update_bio/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Failed to update bio.');
    }
  } catch (error) {
    console.error('Failed to update bio:', error);
  }
});

// Handle update button click
// updateBtn.addEventListener('click', () => {
//   console.log('submit button is clicking ............');
//   form.action = "/add/";
//   form.submit();
// });

// //
