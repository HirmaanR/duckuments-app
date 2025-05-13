from django.db import models

LANGUAGE_SUPPORT = {".py": "Python"}

TRANSACTION_TYPE = {"INCREMENT": "INCREMENT", "DECREMENT": "DECREMENT"}


class ProjectModel(models.Model):
    title = models.CharField(max_length=200)  # get from user
    description = models.TextField()  # get from user
    language = models.CharField(
        max_length=10, choices=LANGUAGE_SUPPORT
    )  # select => # get from user
    # zip_file = models.FileField(upload_to="zip/")
    extract_file_path = models.CharField(
        max_length=100, null=True, blank=True
    )  # save path of extract_file
    doc_folder_path = models.CharField(
        max_length=100, null=True, blank=True
    )  # save path of doc_folder
    doc_zip_path = models.CharField(max_length=100, null=True, blank=True)
    used_coin = models.IntegerField(default=1)
    is_finished = models.BooleanField(default=False)
    slug = models.CharField(max_length=30, blank=True)
    create_date = models.DateField(auto_now_add=True)

    # realtionship
    for_user = models.ForeignKey(to="account.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    """
    def save(self, *args, force_insert=False, force_update=False, using=None, update_fields=None):
        self.slug = get_random_string(30)
        return super().save(*args, force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
    """

    def get_zip_path(self):
        return self.doc_zip_path

    def get_doc_folder_path(self):
        return self.doc_folder_path

    def get_slug(self):
        return self.slug

    def set_extract_file_path(self, extract_path):
        self.extract_file_path = extract_path

    def set_doc_folder_path(self, folder_path):
        self.doc_folder_path = folder_path

    def set_zip_path(self, new_path):
        self.doc_zip_path = new_path


class CoinTransAction(models.Model):
    transaction_type = models.CharField(
        max_length=20, choices=TRANSACTION_TYPE
    )  # select
    used_coin = models.IntegerField(default=1)
    description = models.CharField(max_length=200, null=True)
    create_date = models.DateField(auto_now_add=True)

    for_project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE)
    for_user = models.ForeignKey("account.User", on_delete=models.CASCADE)

    def __init__(self, *args, **kwargs):
        self.description = f"{self.used_coin} coin {self.transaction_type} for {self.for_project.title}"
        super().__init__(*args, **kwargs)
