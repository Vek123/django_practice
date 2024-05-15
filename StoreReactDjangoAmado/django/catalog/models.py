from django.db import models


# Create your models here.
class Products(models.Model):
    def upload_to(instance, filename):
        return 'images/%s/%s' % (instance.title, filename)

    title = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=upload_to, default="/images/default/default.png", blank=True, null=True)

    # def save(
    #     self, force_insert=False, force_update=False, using=None, update_fields=None
    # ):
    #     if self.image.name is None:
    #         self.image = '/images/default/default.png'
    #     super().save(force_insert=False, force_update=False, using=None, update_fields=None)


