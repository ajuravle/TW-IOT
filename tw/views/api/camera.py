from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.camera import Camera
from ...models.camera_dispozitiv import CameraDispozitiv
from ...models.cafetiera import Cafetiera
from ...models.frigider import Frigider
from ...models.masina_de_spalat import MasinaDeSpalat
from ...models.sistem_de_iluminat import SistemDeIluminat
from ...models.user_camera import UserCamera
from ...models.televizor import Televizor
from ...models.termostat import Termostat
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
from jsonschema import validate, FormatChecker,ValidationError
from .. import api_session_validation_admin

def cauta_dis(id_camera):
    dispozitive = DBSession.query(CameraDispozitiv).filter(CameraDispozitiv.id_camera == id_camera).all()
    rezultat = []
    for d in dispozitive:
        dispozitiv = d.as_dict()
        if dispozitiv['tip'] == 'cafetiera':
            dis = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        if dispozitiv['tip'] == 'frigider':
            dis = DBSession.query(Frigider).filter(Frigider.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        if dispozitiv['tip'] == 'masina_de_spalat':
            dis = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        if dispozitiv['tip'] == 'sistem_de_iluminat':
            dis = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        if dispozitiv['tip'] == 'televizor':
            dis = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        if dispozitiv['tip'] == 'termostat':
            dis = DBSession.query(Termostat).filter(Termostat.id_dispozitiv == dispozitiv['id_dispozitiv']).first()
        dis = dis.as_dict()
        dis['tip_dispozitiv'] = dispozitiv['tip']
        rezultat.append(dis)
    return rezultat


@view_defaults(route_name = 'camera', renderer = 'json')
class CameraApi(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST', renderer = 'json')
    def post(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        request_body = json.loads(self.request.body.decode("utf8"))
        if not 'denumire' in request_body.keys():
            return Response(status = 400, body = "Campul denumire este obligatoriu")
        if len(request_body) != 1:
            return Response(status = 400, body = "Campuri incorecte")
        
        id = str(uuid.uuid4())[:6]
        request_body["id_camera"]= id
        record = Camera(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(Camera).filter(Camera.id_camera == id).first().as_dict()
        return new_record

    @view_config(request_method = 'GET')
    def get(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        id = self.request.session['id_user']
        tip = self.request.session['tip']
        records = DBSession.query(Camera).all()

        list_records = []

        if tip == 'admin':
            for record in records:
                dis = record.as_dict()
                dis['dispozitive'] = cauta_dis(dis['id_camera'])
                list_records.append(dis)
            return list_records

        for record in records:
            dis = record.as_dict()
            my = DBSession.query(UserCamera).filter(UserCamera.id_user == id, UserCamera.id_camera == dis['id_camera']).first()
            if not my:
                continue
            dis['dispozitive'] = cauta_dis(dis['id_camera'])
            list_records.append(dis)
        return list_records

@view_defaults(route_name = 'camera_one', renderer = 'json')
class CameraOneApi(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(Camera).filter(Camera.id_camera == id).first()
        if record == None:
            return None
        return record.as_dict()
           
    @view_config(request_method = 'GET') 
    def get(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        record = self.esteIdCorect()
        if record is None:
            return Response(status = 404, body = "Incorrect id")
        record["dispozitive"] = cauta_dis(record['id_camera'])
        return record

    @view_config(request_method = 'PUT')
    def put(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        if self.esteIdCorect() is None:
            return Response(status = 404, body = "Incorrect id")
        request_body = json.loads(self.request.body.decode("utf8"))

        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/camera.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )
        update_fields = {}
        
        if request_body['tip'] == 'cafetiera':
            dis = DBSession.query(Cafetiera).filter(Cafetiera.id_dispozitiv == request_body['id_dispozitiv']).first()
        if request_body['tip'] == 'frigider':
            dis = DBSession.query(Frigider).filter(Frigider.id_dispozitiv == request_body['id_dispozitiv']).first()
        if request_body['tip'] == 'masina_de_spalat':
            dis = DBSession.query(MasinaDeSpalat).filter(MasinaDeSpalat.id_dispozitiv == request_body['id_dispozitiv']).first()
        if request_body['tip'] == 'sistem_de_iluminat':
            dis = DBSession.query(SistemDeIluminat).filter(SistemDeIluminat.id_dispozitiv == request_body['id_dispozitiv']).first()
        if request_body['tip'] == 'televizor':
            dis = DBSession.query(Televizor).filter(Televizor.id_dispozitiv == request_body['id_dispozitiv']).first()
        if request_body['tip'] == 'termostat':
            dis = DBSession.query(Termostat).filter(Termostat.id_dispozitiv == request_body['id_dispozitiv']).first()
        if dis is None:
            return Response(status = 404, body = "Incorrect id dispozitiv")

        id = self.request.matchdict['id']

        if request_body['actiune'] == "adauga":
            new_cd = CameraDispozitiv()
            new_cd.id_dispozitiv = request_body["id_dispozitiv"]
            new_cd.id_cd = str(uuid.uuid4())[:6]
            new_cd.tip = request_body["tip"]
            new_cd.id_camera = id
            DBSession.add(new_cd)

        if request_body['actiune'] == 'sterge':
            id_correct = DBSession.query(CameraDispozitiv).filter(CameraDispozitiv.id_camera == id, CameraDispozitiv.id_dispozitiv == request_body["id_dispozitiv"]).first()
            if id_correct is None:
                return Response(status = 404, body = "Incorrect id_dispozitiv")
            DBSession.delete(id_correct)

        return self.get()

    @view_config(request_method = 'DELETE')
    def delete(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        id = self.esteIdCorect()
        if id is None:
            return Response(status = 404, body = "Incorrect id")
        record = DBSession.query(Camera).filter(Camera.id_camera == id['id_camera']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")
