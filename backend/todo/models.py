from django.db import models

# Create your models here.
class Todo(models.Model):
    taskName = models.CharField(max_length=120)
    dueDate = models.CharField(max_length=120)
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.taskName