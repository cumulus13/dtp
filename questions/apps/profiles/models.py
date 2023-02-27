from django.db import models

class Biography(models.Model):
    nama = models.CharField(max_length=100)
    alamat = models.CharField(max_length=200)
    ktp = models.IntegerField()
    foto = models.ImageField(upload_to='images/')

class Pendidikan(models.Model):
    biography = models.ForeignKey(Biography, on_delete=models.CASCADE)
    sekolah = models.CharField(max_length=100)
    jurusan = models.CharField(max_length=100)
    masuk = models.DateField()
    lulus = models.DateField()

class Pengalaman(models.Model):
    biography = models.ForeignKey(Biography, on_delete=models.CASCADE)
    perusahaan = models.CharField(max_length=100)
    jabatan = models.CharField(max_length=100)
    tahun = models.DateField()
    ket = models.CharField(max_length=200)