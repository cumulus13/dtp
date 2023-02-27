from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Biography, Pengalaman, Pendidikan

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    email = serializers.CharField()
    username = serializers.CharField()
    # tokens = serializers.DictField(child=serializers.CharField())

    class Meta:
        model = User
        fields = ['email', 'username', 'password']#, 'tokens']

    def create(self, validated_data):
        user = super().create(validated_data)
        tokens = self.get_tokens_for_user(user)
        validated_data['tokens'] = tokens
        return validated_data

    def get_tokens_for_user(self, user):
        from rest_framework.authtoken.models import Token
        from rest_framework_simplejwt.tokens import RefreshToken

        refresh = RefreshToken.for_user(user)
        tokens = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
        return tokens

    def validate(self, attrs):
        email = attrs.get('email')
        username = attrs.get('username')

        # Validate that the email is not already in use
        if email and User.objects.filter(email=email).exists():
            raise ValidationError('Email address is already in use')

        # Validate that the username is not already in use
        if username and User.objects.filter(username=username).exists():
            raise ValidationError('Username is already in use')

        # Call the validate method of the superclass to perform default validation
        attrs = super().validate(attrs)

        return attrs

class PengalamanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pengalaman
        fields = ('id', 'perusahaan', 'jabatan', 'tahun', 'ket')

class PendidikanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pendidikan
        fields = ('id', 'sekolah', 'jurusan', 'masuk', 'lulus')

class BiographySerializer(serializers.ModelSerializer):
    pengalaman_set = PengalamanSerializer(many=True, required=False)

    class Meta:
        model = Biography
        fields = ('id', 'nama', 'alamat', 'ktp', 'pendidikan', 'sekolah', 'jurusan', 'masuk', 'lulus', 'foto', 'pengalaman_set', 'pendidikan_set')
        
    def validate_ktp(self, value):
        if len(str(value)) != 16:
            raise serializers.ValidationError("Nomor KTP harus terdiri dari 16 angka.")
        return value

    def validate_tahun(self, value):
        if value.year < 1900:
            raise serializers.ValidationError("Tahun tidak valid.")
        return value
    
    def create(self, validated_data):
        pengalamans_data = validated_data.pop('pengalaman_set', [])
        biography = Biography.objects.create(**validated_data)
        for pengalaman_data in pengalamans_data:
            Pengalaman.objects.create(biography=biography, **pengalaman_data)
        return biography
    
    # def update(self, instance, validated_data):
    #     instance.nama = validated_data.get('nama', instance.nama)
    #     instance.alamat = validated_data.get('alamat', instance.alamat)
    #     instance.ktp = validated_data.get('ktp', instance.ktp)
    #     instance.pendidikan = validated_data.get('pendidikan', instance.pendidikan)
    #     instance.sekolah = validated_data.get('sekolah', instance.sekolah)
    #     instance.jurusan = validated_data.get('jurusan', instance.jurusan)
    #     instance.masuk = validated_data.get('masuk', instance.masuk)
    #     instance.lulus = validated_data.get('lulus', instance.lulus)
    #     instance.foto = validated_data.get('foto', instance.foto)
    #     instance.save()
    #     return instance

    def update(self, instance, validated_data):
        pengalamans_data = validated_data.pop('pengalaman_set', [])
        pendidikan_data = validated_data.pop('pendidikan_set', [])

        instance = super().update(instance, validated_data)
        pengalamans = list(instance.pengalaman_set.all())
        pendidikans = list(instance.pendidikan_set.all())
        
        for pengalaman_data in pengalamans_data:
            pengalaman_id = pengalaman_data.get('id')
            if pengalaman_id:
                pengalaman = next((p for p in pengalamans if p.id == pengalaman_id), None)
                if pengalaman:
                    pengalaman.perusahaan = pengalaman_data.get('perusahaan', pengalaman.perusahaan)
                    pengalaman.jabatan = pengalaman_data.get('jabatan', pengalaman.jabatan)
                    pengalaman.tahun = pengalaman_data.get('tahun', pengalaman.tahun)
                    pengalaman.ket = pengalaman_data.get('ket', pengalaman.ket)
                    pengalaman.save()
            else:
                Pengalaman.objects.create(biography=instance, **pengalaman_data)

        pengalaman_ids = [p.id for p in pengalamans]
        pengalaman_ids_to_delete = [p.id for p in pengalamans if p.id not in [pd.get('id') for pd in pengalamans_data]]
        Pengalaman.objects.filter(id__in=pengalaman_ids_to_delete).delete()

        for pendidikan_data in pendidikans_data:
            pendidikan_id = pendidikan_data.get('id')
            if pendidikan_id:
                pendidikan = next((p for p in pendidikans if p.id == pendidikan_id), None)
                if pendidikan:
                    pendidikan.sekolah = pendidikan_data.get('sekolah', pendidikan.sekolah)
                    pendidikan.jurusan = pendidikan_data.get('jurusan', pendidikan.jurusan)
                    pendidikan.masuk = pendidikan_data.get('masuk', pendidikan.masuk)
                    pendidikan.lulus = pendidikan_data.get('lulus', pendidikan.lulus)
                    pendidikan.save()
            else:
                Pendidikan.objects.create(biography=instance, **pendidikan_data)

        pendidikan_ids = [p.id for p in pendidikans]
        pendidikan_ids_to_delete = [p.id for p in pendidikans if p.id not in [pd.get('id') for pd in pendidikans_data]]
        Pendidikan.objects.filter(id__in=pendidikan_ids_to_delete).delete()

        return instance
        
    def delete(self, instance):
        instance.delete()
        
# class PengalamanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pengalaman
#         fields = ['id', 'perusahaan', 'jabatan', 'tahun', 'ket']
        
#     def validate_tahun(self, value):
#         if value.year < 1900:
#             raise serializers.ValidationError("Tahun tidak valid.")
#         return value
    
#     def create(self, validated_data):
#         return Pengalaman.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         instance.perusahaan = validated_data.get('perusahaan', instance.perusahaan)
#         instance.jabatan = validated_data.get('jabatan', instance.jabatan)
#         instance.tahun = validated_data.get('tahun', instance.tahun)
#         instance.ket = validated_data.get('ket', instance.ket)
#         instance.save()
#         return instance
        
#     def delete(self, instance):
#         instance.delete()
