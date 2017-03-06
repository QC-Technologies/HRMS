from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

from interview import constants

CANDIDATE_STATUS = (
    (constants.CANDIDATE_STATUS_APPLIED, 'Applied'),
    (constants.CANDIDATE_STATUS_INTERVIEW_SCHEDULED, 'Interview Scheduled'),
    (constants.CANDIDATE_STATUS_INTERVIEW_DECLINED, 'Interview Declined'),
    (constants.CANDIDATE_STATUS_NOT_RECOMMENDED, 'Not Recommended after Interview'),
    (constants.CANDIDATE_STATUS_RECOMMENDED, 'Recommended after Interview'),
    (constants.CANDIDATE_STATUS_JOB_OFFERED, 'Job Offered'),
    (constants.CANDIDATE_STATUS_JOB_ACCEPTED, 'Job Accepted'),
    (constants.CANDIDATE_STATUS_JOB_DECLINED, 'Job Declined'),
    (constants.CANDIDATE_STATUS_JOINED, 'Joined'),
)
INTERVIEW_STATUS = (
    (constants.INTERVIEW_STATUS_SCHEDULED, 'Interview Scheduled'),
    (constants.INTERVIEW_STATUS_CANCELLED, 'Cancelled'),
    (constants.INTERVIEW_STATUS_NOSHOW, 'No Show'),
    (constants.INTERVIEW_STATUS_RECOMMENDED, 'Recommended'),
    (constants.INTERVIEW_STATUS_NOT_RECOMMENDED, 'Not Recommended'),
    (constants.INTERVIEW_STATUS_SECOND_INTERVIEW, 'Recommended Second Interview'),
)

CANDIDATE_GENDER = (
    ('male', 'Male'),
    ('female', 'Female'),
)

COMMUNICATION_EVENT_CODES = (
    (constants.COMMUNICATION_EVENT_CODES_INTERVIEW_SCHEDULED, 'Interview Scheduled'),
)


def cv_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/interview/resume/<id>_<filename>
    return 'interview/resume/%s%s_%s' % (instance.first_name,
                                         instance.last_name,
                                         filename)


class Candidate(TimeStampedModel):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, default='', blank=True)
    mobile_phone = models.CharField(max_length=14, default='', blank=True)
    address = models.CharField(max_length=255, default='', blank=True)
    city = models.CharField(max_length=50, default='', blank=True)
    state = ''
    country = ''
    gender = models.CharField(max_length=6, choices=CANDIDATE_GENDER)
    qualification = models.CharField(max_length=50, default='', blank=True)
    institute = models.CharField(max_length=50, default='', blank=True)
    experienced = models.CharField(max_length=10, blank=True,
                                   help_text='e.g Fresh, 11 Months, 2 Years and 11 Months')
    cv = models.FileField(upload_to=cv_directory_path,
                          help_text='Why cv required? Becuase while taking '
                                    'interview, interviewer mostly want to '
                                    'look candidate cv')
    status = models.CharField(max_length=50, choices=CANDIDATE_STATUS,
                              default=constants.CANDIDATE_STATUS_APPLIED)

    def __unicode__(self):
        return "%s %s (%s)" % (self.first_name.title(), self.last_name.title(),
                               self.email)

    def full_name(self):
        return self.first_name + ' ' + self.last_name


class InterviewRemarks(TimeStampedModel):
    interview = models.OneToOneField('Interview', related_name='remarks')
    oop_concepts = models.IntegerField(verbose_name='OOP Concepts', default=0,
                                       blank=True,
                                       help_text='in percentage, by default set to 0 %')
    db_concepts = models.IntegerField(verbose_name='Database Concepts',
                                      default=0, blank=True,
                                      help_text='in percentage, by default set to 0 %')
    ds_concepts = models.IntegerField(verbose_name='Data Structure Concepts',
                                      default=0, blank=True,
                                      help_text='in percentage, by default set to 0 %')
    recursion_concepts = models.IntegerField(verbose_name='Recursion Concepts',
                                             default=0, blank=True,
                                             help_text='in percentage, by default set to 0 %')
    remarks = models.TextField()
    overall_score = models.IntegerField(help_text='Out of 10')
    remarks_by = models.ForeignKey(User, null=True, blank=True)


class Interview(TimeStampedModel):
    candidate = models.ForeignKey(Candidate)
    taken_by = models.ForeignKey(User, null=True, blank=True)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=50, choices=INTERVIEW_STATUS,
                              default=constants.INTERVIEW_STATUS_SCHEDULED)

    def __unicode__(self):
        return "%s on %s at %s" % (self.candidate, self.date, self.time)

    def save(self, *args, **kwargs):
        super(Interview, self).save(*args, **kwargs)
        self.candidate.status = constants.CANDIDATE_STATUS_INTERVIEW_SCHEDULED
        self.candidate.save()


class CommunicationEventCopiedUsers(models.Model):
    communication_event = models.ForeignKey('CommunicationEvent')
    user = models.ForeignKey(User, related_name='cc')


class CommunicationEvent(models.Model):
    code = models.CharField(verbose_name='Event', max_length=100, unique=True,
                            choices=COMMUNICATION_EVENT_CODES)
    email_subject_template = models.CharField(
        verbose_name='Email Subject Template', max_length=255,
        help_text="Specify the email subject for selected event. Yon can "
                  "specify replacement tag like {candidate_first_name}. "
                  "So candidate's first name will be replaced by above tag."
    )
    email_body_template = models.TextField(
        verbose_name='Email Body Template',
        help_text="Specify the email body for selected event. Yon can "
                  "specify replacement tag like {candidate_first_name}. "
                  "So candidate's first name will be replaced by above tag."
    )

    class Meta:
        verbose_name = 'Communication Event'
        verbose_name_plural = 'Communication Events'
        unique_together = ("id", "code")

    def __unicode__(self):
        return "[%s] %s" % (self.code, self.email_subject_template)
