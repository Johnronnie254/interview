from django.db import models

# Create your models here.

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='uploads/')  # This will save images to an 'uploads' folder
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the image was uploaded
