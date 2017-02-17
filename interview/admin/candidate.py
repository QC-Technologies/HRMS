from django.contrib import admin


class CandidateAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['email', 'first_name', 'last_name', 'gender', 'cv']
        }),
        ('Contact Information', {
            'classes': ('collapse',),
            'fields': ['mobile_phone']
        }),
        ('Address Information', {
            'classes': ('collapse',),
            'fields': ['address', 'city']
        }),
        ('Additional Information', {
            'classes': ('collapse',),
            'fields': ['qualification', 'institute', 'experienced']
        })
    ]

    def get_fieldsets(self, request, obj=None):
        if obj is None:
            self.fieldsets[0][1]['fields'] = ['email', 'first_name',
                                              'last_name', 'gender', 'cv']
        else:
            self.fieldsets[0][1]['fields'] = ['email', 'first_name',
                                              'last_name', 'gender', 'cv',
                                              'status']
        return self.fieldsets
