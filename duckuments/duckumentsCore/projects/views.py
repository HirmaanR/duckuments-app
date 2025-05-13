from django.utils.crypto import get_random_string
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from io import BytesIO

from .models import ProjectModel
from .serializer import NewProjectSerializer
from .utilities import extractor, generator, create_zip_file

from django.conf import settings
import os

from django.http import FileResponse
from rest_framework.permissions import IsAuthenticated


# INFO : project generator view
class CreateProjectView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        uploaded_file = request.FILES.get("zip_file")
        if not uploaded_file:
            return Response({"error": "No file uploaded."}, status=400)

        newProject = NewProjectSerializer(data=request.data)

        if newProject.is_valid():
            # wrap the uploaded file into a bytesio object
            zip_file_bytes = BytesIO(uploaded_file.read())
            generated_slug = get_random_string(30)
            extract_path = extractor(zip_file_bytes, generated_slug)

            project_title = request.POST.get("title")
            project_des = request.POST.get("description")
            target_extention = request.POST.get("language")

            # save new project in db
            newProject.save(slug=generated_slug, for_user=request.user)

            all_is_done = generator(
                extract_path,
                generated_slug,
                project_title,
                project_des,
                target_extention,
            )
            print(f"all is done : {all_is_done}")
            if all_is_done:
                return Response(newProject.data, status=status.HTTP_201_CREATED)

        return Response(newProject.errors, status=status.HTTP_400_BAD_REQUEST)


# INFO : return all user project
class AllUserProjects(viewsets.ModelViewSet):
    serializer_class = NewProjectSerializer

    def get_queryset(self):
        user = self.request.user
        return ProjectModel.objects.filter(for_user=user).all()


# INFO : show folder structure and file content for live preview
class DocumentExplorerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, uuid):
        base_path = f"{settings.BASE_DIR}/media/documents/{uuid}"
        full_path = base_path

        query_filter = request.query_params.get("path")

        if query_filter:
            full_path = os.path.join(full_path, query_filter)

        if not os.path.exists(full_path):
            return Response(
                {"error": "path problem"}, status=status.HTTP_400_BAD_REQUEST
            )

        if os.path.isdir(full_path):
            # Return folder structure
            folders = []
            files = []

            for item in os.listdir(full_path):
                if os.path.isdir(os.path.join(full_path, item)):
                    folders.append(item)
                else:
                    files.append(item)

            return Response({"type": "folder", "folders": folders, "files": files})

        elif os.path.isfile(full_path):
            # Return file content
            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read()
                return Response({"type": "file", "content": content})
            except Exception as e:
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


# INFO : download doc_zip_file
class DownloadZipDocFile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, project_slug):
        project = ProjectModel.objects.filter(slug=project_slug).first()
        if not project:
            return Response("file not found!", status=status.HTTP_404_NOT_FOUND)
        if not project.get_zip_path():
            output_file_path = create_zip_file(
                project.get_doc_folder_path(), project.get_slug()
            )
            # set zip file path in db model
            project.set_zip_path(output_file_path)

            try:
                project.save()
            except Exception as e:
                print(f"project save error : {e}")

            return FileResponse(
                open(output_file_path, "rb"),
                as_attachment=True,
                filename=project_slug,
            )
        else:
            file_name = os.path.splitext(project_slug)[0] + ".zip"
            response = FileResponse(
                open(project.get_zip_path(), "rb"),
                as_attachment=True,
                filename=file_name,
            )
            response["Content-Type"] = "application/zip"
            return response
