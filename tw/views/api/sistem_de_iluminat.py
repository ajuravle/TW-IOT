from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.sistem_de_iluminat import SistemDeIluminat
from ...models.activitate_si import ActivitateSI
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
import datetime
from jsonschema import validate, FormatChecker,ValidationError
from .. import api_session_validation

@view_defaults(route_name = 'sistem_de_iluminat', renderer = 'json')
class SistemDeIluminatt(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST', renderer = 'json')
    def post(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
    	request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/sistem_de_iluminat.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        request_body["id_dispozitiv"]= id
        record = SistemDeIluminat(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).first().as_dict()
        return new_record
  
@view_defaults(route_name = 'sistem_de_iluminat_one', renderer = 'json')
class SistemDeIluminatOne(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).first()
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

        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/sistem_de_iluminat.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        
        if 'denumire' in request_body.keys():
            update_fields['denumire'] = request_body['denumire']

        if 'stare' in request_body.keys():
            update_fields['stare'] = request_body['stare']

        if 'intensitate' in request_body.keys():
            update_fields['intensitate'] = request_body['intensitate']

        if 'nr_becuri_aprinse' in request_body.keys():
            update_fields['nr_becuri_aprinse'] = request_body['nr_becuri_aprinse']

        id = self.request.matchdict['id']
        DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).update(update_fields)
        updated = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == id).first().as_dict()

        update_fields['id_dispozitiv'] = id
        update_fields['id_activitate'] = str(uuid.uuid4())[:6]
        if 'denumire' in update_fields.keys():
            del update_fields['denumire']
        update_fields['ora'] = datetime.datetime.now().hour
        activitate = ActivitateSI(**update_fields)
        DBSession.add(activitate)
        
        return updated

    @view_config(request_method = 'DELETE')
    def delete(self):
        verify = api_session_validation(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. Please login")
         
        id = self.esteIdCorect()
        if id is None:
            return Response(status = 404, body = "Incorrect id")
        record = DBSession.query(SistemDeIluminat).filter(SistemDeIluminats.id_dispozitiv == id['id_dispozitiv']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")
