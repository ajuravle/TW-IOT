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

    @view_config(request_method = 'POST', renderer = 'json')
    def post(self):
    	request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/masina_spalat.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        record = MasinaDeSpalat()
        id = str(uuid.uuid4())[:6]
        record.id_dispozitiv = id

        if 'temperatura' in request_body.keys():
        	if not verifica_interval(request_body['temperatura'], 10, 90):
        		return Response(status = 400, body = "Temperatura trebuie sa fie in intervalul [10,90]")

        if 'rotatii' in request_body.keys():
            if not verifica_interval(request_body['rotatii'], 200, 1000):
                return Response(status = 400, body = "Rotatiile trebuie sa fie in intervalul [200,1000]")
        if 'timp_ramas' in request_body.keys():
            if not verifica_interval(request_body['timp_ramas', 0, 7200]):
                return Response(status = 400, body = "Timpul ramas trebuie sa fie in intervalul [0, 7200]")


        for field in request_body.keys():
            setattr(record, field, request_body[field])
        DBSession.add(record)
        new_record = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == id).first().as_dict()
        return new_record
        

