from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.televizor import Televizor
from ...models.activitate_tv import ActivitateTV
from ...models.canal import Canal
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
from jsonschema import validate, FormatChecker,ValidationError
import datetime

@view_defaults(route_name = 'televizor', renderer = 'json')
class TelevizorApi(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST')
    def post(self):
        request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/televizor.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        request_body["id_dispozitiv"]= id
        if 'id_canal' in request_body.keys():
            canal = DBSession.query(Canal).filter(Canal.id_canal == request_body['id_canal']).first()
            if canal is None:
                return Response(status = 400, body = "Id canal is incorect")
        record = Televizor(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).first().as_dict()
        return new_record

@view_defaults(route_name = 'televizor_one', renderer = 'json')
class TelevizorOneApi(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).first()
        if record == None:
            return None
        return record.as_dict()
           
    @view_config(request_method = 'GET') 
    def get(self):
        record = self.esteIdCorect()
        if record is None:
            return Response(status = 404, body = "Incorrect id")
        return record

    @view_config(request_method = 'PUT')
    def put(self):
        if self.esteIdCorect() is None:
            return Response(status = 404, body = "Incorrect id")
        request_body = json.loads(self.request.body.decode("utf8"))

        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/televizor.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        if 'id_canal' in request_body.keys():
            canal = DBSession.query(Canal).filter(Canal.id_canal == request_body['id_canal']).first()
            if canal is None:
                return Response(status = 400, body = "Id canal is incorect")
            update_fields['id_canal'] = request_body['id_canal']

        if 'denumire' in request_body.keys():
            update_fields['denumire'] = request_body['denumire']

        if 'volum' in request_body.keys():
            update_fields['volum'] = request_body['volum']

        if 'luminozitate' in request_body.keys():
            update_fields['luminozitate'] = request_body['luminozitate']

        if 'stare' in request_body.keys():
            update_fields['stare'] = request_body['stare']


        id = self.request.matchdict['id']
        DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).update(update_fields)
        updated = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id).first().as_dict()

        update_fields['id_dispozitiv'] = id
        update_fields['id_activitate'] = str(uuid.uuid4())[:6]
        if 'denumire' in request_body.keys():
            del update_fields['denumire']
        if 'luminozitate' in request_body.keys():
            del update_fields['luminozitate']
        update_fields['ora'] = datetime.datetime.now().hour
        activitate = ActivitateTV(**update_fields)
        DBSession.add(activitate)

        return updated

    @view_config(request_method = 'DELETE')
    def delete(self):
        id = self.esteIdCorect()
        if id is None:
            return Response(status = 400, body = "Incorrect id")
        record = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == id['id_dispozitiv']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")