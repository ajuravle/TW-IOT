from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.masina_de_spalat import MasinaDeSpalat
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
from jsonschema import validate, FormatChecker,ValidationError

@view_defaults(route_name = 'masina_spalat', renderer = 'json')
class MasinaSpalat(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST')
    def post(self):
        request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/masina_spalat.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        request_body["id_dispozitiv"]= id
        record = MasinaDeSpalat(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).first().as_dict()
        return new_record

@view_defaults(route_name = 'masina_spalat_one', renderer = 'json')
class MasinaSpalatOne(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).first()
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

        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/masina_spalat.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        if 'temperatura' in request_body.keys():
            update_fields['temperatura'] = request_body['temperatura']

        if 'denumire' in request_body.keys():
            update_fields['denumire'] = request_body['denumire']

        if 'stare' in request_body.keys():
            update_fields['stare'] = request_body['stare']

        if 'nr_rotatii' in request_body.keys():
            update_fields['nr_rotatii'] = request_body['nr_rotatii']

        if 'program' in request_body.keys():
            update_fields['program'] = request_body['program']

        if 'timp_ramas' in request_body.keys():
            update_fields['timp_ramas'] = request_body['timp_ramas']

        id = self.request.matchdict['id']
        DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).update(update_fields)
        updated = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).first().as_dict()
        return updated