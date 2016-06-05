from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
from . import session_validation

@view_config(request_method = 'GET', route_name = 'user_id',renderer="json")
@session_validation
def getIdUser(request):
    info={}
    info["id_user"]=request.session["id_user"]
    info["tip"]=request.session["tip"]
    info["nume"]=request.session["nume"]
    info["prenume"]=request.session["prenume"]
    info["email"]=request.session["email"]
    return info