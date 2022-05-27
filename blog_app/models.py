from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=500)
    text = models.CharField(max_length=500)
    pub_date = models.DateField()

    def __str__(self):
        return self.title
