from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
from . import session_validation
from passlib.hash import sha256_crypt

@view_config(request_method = 'GET', route_name = 'admin')
@session_validation
def getLoginPage(request):
    mode = request.session['tip']
    if mode != 'admin' :
        return Response(status = 401, body="Not an admin")
    response = render_to_response('templates/home/admin.jinja2',{}, request = request)
    return response