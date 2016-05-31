from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.cafetiera import Cafetiera
from ...models.activitate_cafetiera import ActivitateCafetiera
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
import pkgutil
import yaml
import uuid
import datetime
from jsonschema import validate, FormatChecker,ValidationError

@view_defaults(route_name = 'cafetiera', renderer = 'json')
class CafetieraApi(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST')
    def post(self):
        request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/cafetiera.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        request_body["id_dispozitiv"]= id
        record = Cafetiera(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first().as_dict()
        return new_record

@view_defaults(route_name = 'cafetiera_one', renderer = 'json')
class CafetieraOneApi(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first()
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

        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/cafetiera.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        if 'denumire' in request_body.keys():
            update_fields['denumire'] = request_body['denumire']

        if 'zahar' in request_body.keys():
            update_fields['zahar'] = request_body['zahar']

        if 'tip' in request_body.keys():
            update_fields['tip'] = request_body['tip']

        if 'stare' in request_body.keys():
            update_fields['stare'] = request_body['stare']


        id = self.request.matchdict['id']
        DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).update(update_fields)
        updated = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id).first().as_dict()

        update_fields['id_dispozitiv'] = id
        update_fields['id_activitate'] = str(uuid.uuid4())[:6]
        if 'denumire' in update_fields.keys():
            del update_fields['denumire']
        update_fields['ora'] = datetime.datetime.now().hour
        activitate = ActivitateCafetiera(**update_fields)
        DBSession.add(activitate)

        return updated

    @view_config(request_method = 'DELETE')
    def delete(self):
        id = self.esteIdCorect()
        if id is None:
            return Response(status = 400, body = "Incorrect id")
        record = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == id['id_dispozitiv']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")