from django.shortcuts import render, redirect, get_object_or_404
from django.forms import formset_factory
from django.http import JsonResponse

USE_REST_FRAMEWORK = True

try:
    from rest_framework.response import Response
    from rest_framework import status
    from rest_framework import generics
    from rest_framework.views import APIView
    from .serializers import UserSerializer, BiographySerializer, PengalamanSerializer, PendidikanSerializer
except:
    USE_REST_FRAMEWORK = False
    
from .models import Biography, Pengalaman, Pendidikan
from .forms import BiographyForm, PengalamanForm, PendidikanForm

try:
    from pydebugger.debug import debug
except:
    def debug(*args, **kwargs):
        return None

def add(request):
    debug(post = request.POST.keys(), debug = 1)
    # debug(post = request.POST.values(), debug = 1)
    # for key, value in request.POST.items():
    #     # print(key, value)
    #     debug(key = value, debug = 1)
    # get all rows with the 'pendidikan' class
    debug(foto = request.FILES.get('foto'), debug = 1)
    bio = Biography(nama = request.POST.get('nama'), alamat = request.POST.get('alamat'), ktp = request.POST.get('no_ktp'), foto = request.FILES.get('foto'))
    bio.save()
    #request.POST.update({'id': bio.id})

    rows_pendidikan = request.POST.getlist('sekolah[]')
    debug(sekolah = request.POST.getlist('sekolah[]'), debug = 1)
    debug(jurusan = request.POST.getlist('jurusan[]'), debug = 1)
    debug(masuk = request.POST.getlist('masuk[]'), debug = 1)
    debug(lulus = request.POST.getlist('lulus[]'), debug = 1)
    debug(len_rows_pendidikan = len(rows_pendidikan), debug = 1)
    # iterate through the rows and get the values for each input
    for i in range(len(rows_pendidikan)):
        debug(i = i, debug = 1)
        sekolah = request.POST.getlist('sekolah[]')[i]
        jurusan = request.POST.getlist('jurusan[]')[i]
        masuk = request.POST.getlist('masuk[]')[i].replace('/', '-')
        lulus = request.POST.getlist('lulus[]')[i].replace('/', '-')
        
        # do something with the values
        # for example, create a new Pendidikan object and save it to the database
        # pendidikan = Pendidikan(biography = bio, sekolah=sekolah, jurusan=jurusan, masuk=masuk, lulus=lulus)
        pendidikan = Pendidikan(biography = bio, sekolah = sekolah, jurusan = jurusan, masuk = masuk, lulus = lulus)
        pendidikan.save()

    rows_pengalaman = request.POST.getlist('nama_perusahaan[]')
    debug(nama_perusahaan = request.POST.getlist('nama_perusahaan[]'), debug = 1)
    debug(jabatan = request.POST.getlist('jabatan[]'), debug = 1)
    debug(tahun = request.POST.getlist('tahun[]'), debug = 1)
    debug(keterangan = request.POST.getlist('keterangan[]'), debug = 1)
    debug(len_rows_pengalaman = len(rows_pengalaman), debug = 1)
    # iterate through the rows and get the values for each input
    for i in range(len(rows_pengalaman)):
        keterangan = ''
        debug(i = i, debug = 1)
        nama_perusahaan = request.POST.getlist('nama_perusahaan[]')[i]
        jabatan = request.POST.getlist('jabatan[]')[i]
        tahun = request.POST.getlist('tahun[]')[i].replace('/', '-')
        if len(request.POST.getlist('keterangan[]')) == i + 1:
            keterangan = request.POST.getlist('keterangan[]')[i]
        
        # do something with the values
        # for example, create a new Pendidikan object and save it to the database
        pengalaman = Pengalaman(biography = bio, perusahaan = nama_perusahaan, jabatan = jabatan, tahun = tahun, ket = keterangan)
        pengalaman.save()
        # request.POST.update({'id': pendidikan.id})
    

    return index(request)

# class Biography(APIView):
#     def get(self, request):
#         serializer = UserSerializer(data=request.data)
#         debug(serializer = serializer, debug = 1)
#         debug(dir_serializer = dir(serializer), debug = 1)
#         if serializer.is_valid():
#             serializer.save()
#             return Response("User created successfully.", status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response("User created successfully.", status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def index(request):
    bio_id = request.POST.get('id') or request.GET.get('id')
    debug(bio_id = bio_id, debug = 1)
    if bio_id:
        # bio = Biography.objects.filter(id=id)
        bio = get_object_or_404(Biography, pk=bio_id)
        request.POST.update({'edit':'0'})
        request.GET.update({'edit':'0'})
    else:    
        bio = Biography.objects.last() 
    # pendidikan_list = Pendidikan.objects.all()
    pengalaman_kerja_list = Pengalaman.objects.all()
    pengalaman_kerja_form = ''

    pendidikan_list = Pendidikan.objects.all()
    pendidikan_form = ''

    if request.method == 'POST':
        bio_form = BiographyForm(request.POST, request.FILES, instance=bio)
        
        if pendidikan_list:
            pendidikan_form = PendidikanForm(request.POST, instance=pendidikan_list[0])
            if bio_form.is_valid():
                bio_form.save()
            if pendidikan_form.is_valid():
                pendidikan_form.save()

        if pengalaman_kerja_list:
            pengalaman_kerja_form = PengalamanForm(request.POST, instance=pengalaman_kerja_list[0])
            if bio_form.is_valid():
                bio_form.save()
            if pengalaman_kerja_form.is_valid():
                pengalaman_kerja_form.save()
    else:
        bio_form = BiographyForm(instance=bio)
        
        if pengalaman_kerja_list:
            pengalaman_kerja_form = PengalamanForm(instance=pengalaman_kerja_list[0])
        else:
            pengalaman_kerja_form = PengalamanForm()

        if pendidikan_list:
            pendidikan_form = PendidikanForm(instance=pendidikan_list[0])
        else:
            pendidikan_kerja_form = PendidikanForm()


    return render(request, 'index.html', {'bio': bio, 'bio_form': bio_form, 'pengalaman_kerja_list': pengalaman_kerja_list, 'pengalaman_kerja_form': pengalaman_kerja_form, 'pendidikan_list': pendidikan_list, 'pendidikan_form': pendidikan_form})

def add_bio(request):
    if request.method == 'POST':
        bio = Biography()
        bio.nama = request.POST.get('nama')
        bio.alamat = request.POST.get('alamat')
        bio.no_ktp = request.POST.get('no_ktp')
        
        for i in range(1, 6):
            if request.POST.get(f'nama_sekolah_{i}'):
                pendidikan = Pendidikan(
                    nama_sekolah=request.POST.get(f'nama_sekolah_{i}'),
                    jurusan=request.POST.get(f'jurusan_{i}'),
                    tahun_masuk=request.POST.get(f'tahun_masuk_{i}'),
                    tahun_lulus=request.POST.get(f'tahun_lulus_{i}'),
                )
                pendidikan.save()
        
        for i in range(1, 6):
            if request.POST.get(f'perusahaan_{i}'):
                pengalaman_kerja = Pengalaman(
                    bio=bio,
                    perusahaan=request.POST.get(f'perusahaan_{i}'),
                    jabatan=request.POST.get(f'jabatan_{i}'),
                    tahun=request.POST.get(f'tahun_{i}'),
                    keterangan=request.POST.get(f'keterangan_{i}'),
                )
                pengalaman_kerja.save()

        if request.FILES.get('foto'):
            bio.foto = request.FILES.get('foto')

        bio.save()

        # Return a JSON response indicating success
        return JsonResponse({'success': True})
    
    # If the request is not a POST request, return a 404 error
    # return render(request, '404.html')
    return render(request, 'index.html', {})

def update_bio(request):
    if request.method == 'POST':
        # Get the Bio instance from the database
        bio_id = request.POST.get('id')
        bio = get_object_or_404(Biography, pk=bio_id)

        # Update the Bio instance with the new values from the form
        bio.nama = request.POST.get('nama')
        bio.alamat = request.POST.get('alamat')
        bio.no_ktp = request.POST.get('no_ktp')
        bio.pendidikan_set.all().delete()
        for i in range(1, 6):
            if request.POST.get(f'nama_sekolah_{i}'):
                pendidikan = Pendidikan(
                    nama_sekolah=request.POST.get(f'nama_sekolah_{i}'),
                    jurusan=request.POST.get(f'jurusan_{i}'),
                    tahun_masuk=request.POST.get(f'tahun_masuk_{i}'),
                    tahun_lulus=request.POST.get(f'tahun_lulus_{i}'),
                )
                pendidikan.save()
        bio.pengalaman_kerja_set.all().delete()
        for i in range(1, 6):
            if request.POST.get(f'perusahaan_{i}'):
                pengalaman_kerja = Pengalaman(
                    bio=bio,
                    perusahaan=request.POST.get(f'perusahaan_{i}'),
                    jabatan=request.POST.get(f'jabatan_{i}'),
                    tahun=request.POST.get(f'tahun_{i}'),
                    keterangan=request.POST.get(f'keterangan_{i}'),
                )
                pengalaman_kerja.save()
        if request.FILES.get('foto'):
            bio.foto = request.FILES.get('foto')
        bio.save()

        # Return a JSON response indicating success
        return JsonResponse({'success': True})
    
    # If the request is not a POST request, return a 404 error
    # return render(request, '404.html')
    return render(request, 'index.html', {})

def delete_bio(request):
    id = request.POST.get('id') or request.GET.get('id')
    bio = Biography.objects.filter(id=id)
    bio.delete()
    return index(request)

def delete_pendidikan(request):
    id = request.POST.get('id') or request.GET.get('id')
    pendidikan = Pendidikan.objects.filter(id=id)
    pendidikan.delete()
    return index(request)

def delete_pengalaman(request):
    id = request.POST.get('id') or request.GET.get('id')
    pendidikan = Pengalaman.objects.filter(id=id)
    pendidikan.delete()
    return index(request)

def form_page(request):
    BioFormSet = formset_factory(BiographyForm, extra=1)
    if request.method == 'POST':
        bio_formset = BioFormSet(request.POST, request.FILES, prefix='bio')
        pengalaman_form = PengalamanForm(request.POST, prefix='pengalaman')
        if bio_formset.is_valid() and pengalaman_form.is_valid():
            # process the form data
            for bio_form in bio_formset:
                bio = bio_form.save(commit=False)
                bio.save()
            pengalaman = pengalaman_form.save(commit=False)
            pengalaman.save()
            return redirect('success_page')
    else:
        bio_formset = BioFormSet(prefix='bio')
        pengalaman_form = PengalamanForm(prefix='pengalaman')
    context = {
        'bio_formset': bio_formset,
        'pengalaman_form': pengalaman_form,
    }
    return render(request, 'form_page.html', context)

def success_page(request):
    return render(request, 'success_page.html')



if USE_REST_FRAMEWORK:
    class User(APIView):
        def get(self, request):
            serializer = UserSerializer(data=request.data)
            debug(serializer = serializer, debug = 1)
            debug(dir_serializer = dir(serializer), debug = 1)
            if serializer.is_valid():
                serializer.save()
                return Response("User created successfully.", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
        def post(self, request):
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response("User created successfully.", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    class BiographyListView(generics.ListAPIView):
        queryset = Biography.objects.all()
        serializer_class = BiographySerializer
    
    class BiographyDetailView(generics.RetrieveAPIView):
        queryset = Biography.objects.all()
        serializer_class = BiographySerializer
    
    class BiographyCreateView(generics.CreateAPIView):
        serializer_class = BiographySerializer
    
    class BiographyUpdateView(generics.UpdateAPIView):
        queryset = Biography.objects.all()
        serializer_class = BiographySerializer
    
    class BiographyDeleteView(generics.DestroyAPIView):
        queryset = Biography.objects.all()
        serializer_class = BiographySerializer
    
    class PengalamanListView(generics.ListAPIView):
        queryset = Pengalaman.objects.all()
        serializer_class = PengalamanSerializer
    
    class PengalamanDetailView(generics.RetrieveAPIView):
        queryset = Pengalaman.objects.all()
        serializer_class = PengalamanSerializer
    
    class PengalamanCreateView(generics.CreateAPIView):
        serializer_class = PengalamanSerializer
    
    class PengalamanUpdateView(generics.UpdateAPIView):
        queryset = Pengalaman.objects.all()
        serializer_class = PengalamanSerializer
    
    class PengalamanDeleteView(generics.DestroyAPIView):
        queryset = Pengalaman.objects.all()
        serializer_class = PengalamanSerializer
    
    class PendidikanListView(generics.ListAPIView):
        queryset = Pendidikan.objects.all()
        serializer_class = PendidikanSerializer
    
    class PendidikanDetailView(generics.RetrieveAPIView):
        queryset = Pendidikan.objects.all()
        serializer_class = PendidikanSerializer
    
    class PendidikanCreateView(generics.CreateAPIView):
        serializer_class = PendidikanSerializer
    
    class PendidikanUpdateView(generics.UpdateAPIView):
        queryset = Pendidikan.objects.all()
        serializer_class = PendidikanSerializer
    
    class PendidikanDeleteView(generics.DestroyAPIView):
        queryset = Pendidikan.objects.all()
        serializer_class = PendidikanSerializer
