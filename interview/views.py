import json
import pdb

from datetime import datetime
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.core import serializers
from django.core import mail
from django.core.paginator import Paginator
from .forms import CandidateForm
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
#from .models import Candidate, Interview
import models
import constants


def index(request):
    if request.user.is_authenticated():
        return render(request, 'interview/index.html')
    else:
        return HttpResponseRedirect('/login/')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect("/index/")
    else:
        form = UserCreationForm()
    return render(request, "interview/register.html", {
        'form': form,
    })


@csrf_exempt
def build_profile(request):
    response = {'success': False, 'form': ''}
    template = loader.get_template('interview/candidate.html')
    if request.method == 'POST':
        form = CandidateForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            response['success'] = True
    else:
        form = CandidateForm()
    response['form'] = template.render({'form': form}, request)
    return HttpResponse(json.dumps(response))

@csrf_exempt
def candidates_list(request):
    response = {}
    candidates = models.Candidate.objects.all()

    response['data'] = serializers.serialize('json', candidates)
    return HttpResponse(json.dumps(response))


def schedule_interview(request):
    response = {}
    data = json.loads(request.body)
    candidate_id = data.get('candidate_id')
    date = datetime.strptime(data.get('date'), '%Y-%m-%dT%H:%M:%S.%fZ').date()
    time = datetime.strptime(data.get('time'), '%Y-%m-%dT%H:%M:%S.%fZ').time()
    models.Interview.objects.create(candidate_id=candidate_id,
                            date=date,
                             time=time)
    #mail.send_mail('subject here', 'here is the message', 'afnannazir.qc@gmail.com', ['afnannazir.qc@gmail.com'])
    return HttpResponse(json.dumps(response))


def interviews_list(request):
    #pdb.set_trace()
    response  = {'data': [], 'page':{}}
    page = request.POST.get('page', 1)
    perPage = request.POST.get('perPage');
    interviews = models.Interview.objects.all()
    paginator = Paginator(interviews, perPage)
    response['page']['total'] = paginator.count
    for interview in paginator.page(page):
        response['data'].append({
        'full_name':('{0} {1}'.format(
            interview.candidate.first_name,
            interview.candidate.last_name
        )),
        'date':interview.date.strftime('%d-%m-%Y'),
        'time':interview.time.strftime('%H:%i'),
        'pk':interview.pk
        })
    return HttpResponse(json.dumps(response))


