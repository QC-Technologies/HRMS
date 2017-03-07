from django.contrib import admin

from ..models import CommunicationEventCopiedUsers


class CommunicationEventCopiedUsersInLine(admin.TabularInline):
    model = CommunicationEventCopiedUsers
    extra = 2


class CommunicationEventAdmin(admin.ModelAdmin):
    inlines = [CommunicationEventCopiedUsersInLine]
