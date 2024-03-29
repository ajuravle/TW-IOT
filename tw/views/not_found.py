from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
from . import session_validation
from passlib.hash import sha256_crypt

@view_config(request_method = 'GET', route_name = 'not_found')
def notFound(request):
    response = render_to_response('templates/home/not_found.jinja2',{}, request = request)
    return response