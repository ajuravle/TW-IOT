from pyramid.view import view_config, view_defaults
from ...models.meta import DBSession
from ...models.canal import Canal
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
import uuid
from .. import api_session_validation

@view_defaults(route_name = 'canal', renderer = 'json')
class CanalApi(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'GET')
    def get(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        records = DBSession.query(Canal).all()
        list_records = []
        for record in records:
            list_records.append(record.as_dict())
        return list_records

    @view_config(request_method = 'POST')
    def post(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        request_body = json.loads(self.request.body.decode("utf8"))
        if not 'denumire' in request_body.keys():
            return Response(status = 400, body = "Campul denumire este obligatoriu")
        if len(request_body) != 1:
            return Response(status = 400, body = "Campuri incorecte")
        id = str(uuid.uuid4())[:6]

        request_body["id_canal"] = id
        record = Canal(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(Canal).filter(Canal.id_canal == id).first().as_dict()
        return new_record

@view_defaults(route_name = 'canal_one', renderer = 'json')
class CanalOneApi(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(Canal).filter(Canal.id_canal == id).first()
        if record == None:
            return None
        return record.as_dict()
           
    @view_config(request_method = 'GET') 
    def get(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        record = self.esteIdCorect()
        if record is None:
            return Response(status = 404, body = "Incorrect id")
        return record

    @view_config(request_method = 'PUT')
    def put(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        if self.esteIdCorect() is None:
            return Response(status = 404, body = "Incorrect id")
        request_body = json.loads(self.request.body.decode("utf8"))

        update_fields = {}
        if 'denumire' in request_body.keys():
            update_fields['denumire'] = request_body['denumire']

        id = self.request.matchdict['id']
        DBSession.query(Canal).filter(Canal.id_canal == id).update(update_fields)
        update_fields['id_canal'] = id
        return update_fields

    @view_config(request_method = 'DELETE')
    def delete(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        id = self.esteIdCorect()
        if id is None:
            return Response(status = 400, body = "Incorrect id")
        record = DBSession.query(Canal).filter(Canal.id_canal == id['id_canal']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")