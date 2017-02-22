from .models import Candidate
from django.forms import ModelForm


class CandidateForm(ModelForm):
    class Meta:
        model = Candidate
        fields = '__all__'


