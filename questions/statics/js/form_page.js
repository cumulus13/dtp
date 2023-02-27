const app = new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    formData: {
      nama: '',
      alamat: '',
      ktp: '',
      pendidikan: '',
      sekolah: [
        {
          nama: '',
          jurusan: '',
          masuk: '',
          lulus: '',
        },
      ],
      pengalaman: [
        {
          perusahaan: '',
          jabatan: '',
          tahun: '',
          ket: '',
        },
      ],
      foto: '',
    },
    isFormValid: false,
  },
  methods: {
    addSekolah() {
      this.formData.sekolah.push({
        nama: '',
        jurusan: '',
        masuk: '',
        lulus: '',
      });
    },
    removeSekolah(index) {
      this.formData.sekolah.splice(index, 1);
    },
    addPengalaman() {
      this.formData.pengalaman.push({
        perusahaan: '',
        jabatan: '',
        tahun: '',
        ket: '',
      });
    },
    removePengalaman(index) {
      this.formData.pengalaman.splice(index, 1);
    },
    isNamaValid() {
      return this.formData.nama !== '';
    },
    isAlamatValid() {
      return this.formData.alamat !== '';
    },
    isKtpValid() {
      return this.formData.ktp !== '';
    },
    isPendidikanValid() {
      return this.formData.pendidikan !== '';
    },
    isSekolahValid(index) {
      return (
        this.formData.sekolah[index].nama !== '' &&
        this.formData.sekolah[index].jurusan !== '' &&
        this.formData.sekolah[index].masuk !== '' &&
        this.formData.sekolah[index].lulus !== ''
      );
    },
    isJurusanValid(index) {
      return this.formData.sekolah[index].jurusan !== '';
    },
    isMasukValid(index) {
      return this.formData.sekolah[index].masuk !== '';
    },
    isLulusValid(index) {
      return this.formData.sekolah[index].lulus !== '';
    },
    isPengalamanValid(index) {
      return (
        this.formData.pengalaman[index].perusahaan !== '' &&
        this.formData.pengalaman[index].jabatan !== '' &&
        this.formData.pengalaman[index].tahun !== '' &&
        this.formData.pengalaman[index].ket !== ''
      );
    },
    isFotoValid() {
      return this.formData.foto !== '';
    },
    isFormInputValid() {
      return (
        this.isNamaValid() &&
        this.isAlamatValid() &&
        this.isKtpValid() &&
        this.isPendidikanValid() &&
        this.formData.sekolah.every((item) => this.isSekolahValid(this.formData.sekolah.indexOf(item))) &&
        this.formData.pengalaman.every((item) => this.isPengalamanValid(this.formData.pengalaman.indexOf(item))) &&
        this.isFotoValid()
      );
    },
    handleSubmit() {
      if (this.isFormInputValid()) {
        axios
          .post('/api/biography/create', this.formData)
          .then((response) => {
            console.log(response.data);
            alert('Data berhasil disimpan');
            window.location.href = '/';
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },

  watch: {
    formData: {
      handler() {
        this.isFormValid = this.isFormInputValid();
        },
    deep: true,
    },
  },
  
  computed: {
    isKtpValid() {
      return !!this.formData.ktp;
    },
    isNamaValid() {
      return !!this.formData.nama.trim();
    },
    isAlamatValid() {
      return !!this.formData.alamat.trim();
    },
    isPendidikanValid() {
      return !!this.formData.pendidikan.trim();
    },
    isSekolahValid(index) {
      return !!this.formData.sekolah[index].nama.trim();
    },
    isJurusanValid(index) {
      return !!this.formData.sekolah[index].jurusan.trim();
    },
    isTahunMasukValid(index) {
      return !!this.formData.sekolah[index].masuk.trim();
    },
    isTahunLulusValid(index) {
      return !!this.formData.sekolah[index].lulus.trim();
    },
    isPerusahaanValid(index) {
      return !!this.formData.pengalaman[index].perusahaan.trim();
    },
    isJabatanValid(index) {
      return !!this.formData.pengalaman[index].jabatan.trim();
    },
    isTahunValid(index) {
      return !!this.formData.pengalaman[index].tahun.trim();
    },
    isKetValid(index) {
      return !!this.formData.pengalaman[index].ket.trim();
    },

    isFormInputValid() {
      let isValid = true;
      // check ktp
      if (!this.isKtpValid) {
        isValid = false;
      }
      // check nama
      if (!this.isNamaValid) {
        isValid = false;
      }
      // check alamat
      if (!this.isAlamatValid) {
        isValid = false;
      }
      // check pendidikan
      if (!this.isPendidikanValid) {
        isValid = false;
      }
      // check sekolah
      for (let i = 0; i < this.formData.sekolah.length; i++) {
        if (!this.isSekolahValid(i) || !this.isJurusanValid(i) || !this.isMasukValid(i) || !this.isLulusValid(i)) {
          isValid = false;
          break;
        }
      }
      // check pengalaman
      for (let i = 0; i < this.formData.pengalaman.length; i++) {
        if (!this.isPerusahaanValid(i) || !this.isJabatanValid(i) || !this.isTahunValid(i) || !this.isKetValid(i)) {
          isValid = false;
          break;
        }
      }
      return isValid;
    },
  },
})
  // methods: {
  //     addSekolah() {
  //       this.formData.sekolah.push({ nama: '', jurusan: '', tahun_masuk: '', tahun_lulus: '' });
  //     },
  //     removeSekolah(index) {
  //       this.formData.sekolah.splice(index, 1);
  //     },
  //     handleSubmit() {
  //       if (this.isFormValid) {
  //         const formData = new FormData();
  //         formData.append("ktp", this.formData.ktp);
  //         formData.append("nama", this.formData.nama);
  //         formData.append("alamat", this.formData.alamat);
  //         formData.append("pendidikan", this.formData.pendidikan);
  //         formData.append("sekolah", JSON.stringify(this.formData.sekolah));

  //         axios.post('/api/form/', formData)
  //           .then(response => {
  //             // do something with response
  //           })
  //           .catch(error => {
  //             // handle error
  //           });
  //       }
  //     }
  //   }
// };