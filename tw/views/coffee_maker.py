from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
from . import session_validation
from passlib.hash import sha256_crypt
from ..models.cafetiera import Cafetiera
from ..models.meta import DBSession

@view_config(request_method = 'GET', route_name = 'coffee_maker')
@session_validation
def getLoginPage(request):
    id = request.matchdict["id"]
    record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first()
    if record is None:
        return HTTPFound(location = request.route_url('not_found'))
    response = render_to_response('templates/home/coffee_maker.jinja2',{}, request = request)
    return response