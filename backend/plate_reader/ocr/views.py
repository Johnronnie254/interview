from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ImageUpload
from .serializers import ImageUploadSerializer
from PIL import Image
import pytesseract

class ImageUploadView(APIView):
    def post(self, request):
        # Validate and save the image using the serializer
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image_instance = serializer.save()  # Save instance, which contains image file
            image_file = image_instance.image.path  # Get the full path to the image

            try:
                # Open the uploaded image file for OCR
                image = Image.open(image_file)
                text = pytesseract.image_to_string(image)  # Perform OCR to extract text

                # Return the extracted text along with the saved image data
                return Response({
                    'text': text,
                    'image_data': serializer.data  # Original serialized data if needed
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
