from django.contrib import admin

from .communication_event import CommunicationEventAdmin
from .candidate import CandidateAdmin
from .interview import InterviewAdmin
from ..models import Candidate
from ..models import CommunicationEvent
from ..models import Interview

admin.site.register(Candidate, CandidateAdmin)
admin.site.register(Interview, InterviewAdmin)
admin.site.register(CommunicationEvent, CommunicationEventAdmin)
