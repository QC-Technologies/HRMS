from django.contrib import admin
from django.core.exceptions import ObjectDoesNotExist

from ..models import InterviewRemarks


class InterviewRemarksInline(admin.StackedInline):
    model = InterviewRemarks
    exclude = ['remarks_by']

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = []
        try:
            obj.remarks
        except ObjectDoesNotExist:
            pass
        else:
            if not request.user.has_perm('interview.delete_interviewremarks'):
                readonly_fields = ['oop_concepts', 'db_concepts', 'ds_concepts',
                                   'recursion_concepts', 'remarks',
                                   'overall_score']
        return readonly_fields


class InterviewAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['candidate', 'taken_by']}),
        ('Scheduling Date', {'fields': ['date', 'time']}),
    ]
    list_display = ['candidate', 'date', 'time', 'status', 'taken_by']
    search_fields = ['candidate', 'date', 'time', 'status']
    list_filter = ('status', 'date')
    inlines = [InterviewRemarksInline]

    def get_fieldsets(self, request, obj=None):
        if obj is not None:
            fieldsets = [
                (None, {'fields': ['candidate', 'taken_by']}),
                ('Scheduling Date', {'fields': ['date', 'time']}),
                ('Status', {'fields': ['status']}),
            ]
            return fieldsets
        return self.fieldsets

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = []
        if obj is not None:
            readonly_fields.append('candidate')
            if not request.user.has_perm('interview.delete_interview'):
                readonly_fields.append('date')
                readonly_fields.append('time')
                readonly_fields.append('taken_by')
        return readonly_fields

    def save_model(self, request, obj, form, change):
        super(InterviewAdmin, self).save_model(request, obj, form, change)
        obj.remarks.remarks_by = request.user
        obj.remarks.save()
