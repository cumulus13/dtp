from django import forms
from .models import Biography, Pengalaman, Pendidikan

class BiographyForm(forms.ModelForm):
    class Meta:
        model = Biography
        fields = ('nama', 'alamat', 'ktp', 'foto')

class PendidikanForm(forms.ModelForm):
    class Meta:
        model = Pendidikan
        fields = ('sekolah', 'jurusan', 'masuk', 'lulus')

class PengalamanForm(forms.ModelForm):
    class Meta:
        model = Pengalaman
        fields = ('perusahaan', 'jabatan', 'tahun', 'ket')
