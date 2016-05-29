from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.frigider import Frigider
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
from jsonschema import validate, FormatChecker,ValidationError

@view_defaults(route_name = 'frigider', renderer = 'json')
class MasinaSpalat(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST', renderer = 'json')
    def post(self):
    	request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/frigider.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        if 'temperatura_frigider' in request_body.keys():
            if not verifica_interval(request_body['temperatura_frigider'], -30, 0):
                return Response(status = 400, body = "Temperatura trebuie sa fie in intervalul [-30,0]")

        if 'temperatura_congelator' in request_body.keys():
            if not verifica_interval(request_body['temperatura_congelator'], 200, 1000):
                return Response(status = 400, body = "Temperatura trebuie sa fie in intervalul [-50,0]")


        request_body["id_dispozitiv"]= id
        record = Frigider(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(Frigider).filter(Frigider.id_dispozitiv == id).first().as_dict()
        return new_record
        

