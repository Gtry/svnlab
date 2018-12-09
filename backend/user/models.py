from django.db import models
from datetime import date

# Create your models here.
class User(models.Model):
    """
        state: {
            token: getToken(),
            avatar: '',
            userInfo: {
                username: 'guster',
                truename: '',
                sex: 'male',
                email: 'xxx@dahuatech.com',
                introduction: '',
                avatar: ''
            }
        }
    """
    username = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=64)
    truename = models.CharField(max_length=64)
    sex = models.CharField(verbose_name='sex', max_length=5, choices=(('male','male'),('female','female')),default='male')
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=64, unique=True)
    introduction = models.CharField(max_length=512)
    profile_photos_height = models.PositiveIntegerField(default=75)
    profile_photos_width = models.PositiveIntegerField(default=75)
    profile_photos = models.ImageField(upload_to="profile_photos", height_field='profile_photos_height', width_field='profile_photos_width')
    last_login = models.DateField(default=date.today)
    date_joined = models.DateField(default=date.today)

    # python2: def __unicode__
    def __str__(self):
        return self.username
