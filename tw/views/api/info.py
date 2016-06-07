from pyramid.view import view_config, view_defaults
from ...models.meta import DBSession
from ...models.info import Info
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
import uuid
from .. import api_session_validation_admin

@view_config(request_method = 'PUT', route_name = 'info', renderer = 'json')
def put(request):
    verify = api_session_validation_admin(request)
    if not verify:
        return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
    request_body = json.loads(request.body.decode("utf8"))
    if not 'oras' in request_body.keys():
        return Response(status = 400, body = "Oras este un camp mandatoriu")
    DBSession.query(Info).delete()
    new = {}
    new['oras'] = request_body['oras']
    new['id'] = str(uuid.uuid4())[:6]
    DBSession.add(Info(**new))
    return new

@view_config(request_method = 'GET', route_name = 'info', renderer = 'json')
def get(request):
    verify = api_session_validation_admin(request)
    if not verify:
        return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
    oras = DBSession.query(Info).first().as_dict();
    return oras

