from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from ...models.meta import DBSession
from ...models.meta import verifica_interval
from ...models.user import User
from ...models.camera import Camera
from ...models.user_camera import UserCamera
from pyramid.response import Response
import json
from sqlalchemy.orm import load_only
from sqlalchemy import update
from sqlalchemy import and_
import pkgutil
import yaml
import uuid
from passlib.hash import sha256_crypt
from jsonschema import validate, FormatChecker,ValidationError
from .. import api_session_validation_admin

@view_defaults(route_name = 'user', renderer = 'json')
class Userr(object):

    def __init__(self, request):
        self.request = request

    @view_config(request_method = 'POST', renderer = 'json')
    def post(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
    	request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw", "schemas/user.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        id = str(uuid.uuid4())[:6]

        request_body["id_user"]= id
        request_body["parola"] = sha256_crypt.encrypt(request_body["parola"]);
        record = User(**request_body)
        DBSession.add(record)
        new_record = DBSession.query(User).filter(User.id_user == id).first().as_dict()
        return new_record
        
    @view_config(request_method = 'GET')
    def get(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        records = DBSession.query(User).all()
        list_records = []
        for i in records:
            record = i.as_dict()
            rooms = DBSession.query(UserCamera).filter(UserCamera.id_user == record["id_user"])
            list_rooms = []

            for room in rooms:
                print("-------------------")
                rec = room.as_dict()
                del rec["id_user"]
                del rec["id_uc"]
                room_name = DBSession.query(Camera.denumire).filter(Camera.id_camera == rec["id_camera"]).first()
                rec["denumire"]=room_name[0]
                list_rooms.append(rec)
            record['camere'] = list_rooms
            list_records.append(record)
        return list_records

    @view_config(request_method = 'PUT')
    def put(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw","schemas/user_update.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        
        if 'nume' in request_body.keys():
            update_fields['nume'] = request_body['nume']

        if 'prenume' in request_body.keys():
            update_fields['prenume'] = request_body['prenume']

        if 'parola' in request_body.keys():
            update_fields['parola'] = sha256_crypt.encrypt(request_body["parola"]);

        if 'mail' in request_body.keys():
            update_fields['mail'] = request_body['mail']

        if 'tip' in request_body.keys():
            update_fields['tip'] = request_body['tip']

        id = self.request.session['id_user']

        if not 'actiune' in request_body.keys():
            DBSession.query(User).filter(User.id_user == id).update(update_fields)
            updated = DBSession.query(User).filter(User.id_user == id).first().as_dict()
        
        if 'actiune' in request_body.keys():
            if request_body['actiune'] == "adauga":
                new_uc = UserCamera()
                new_uc.id_camera = request_body["id_camera"]
                new_uc.id_uc = str(uuid.uuid4())[:6]
                new_uc.id_user = id
                DBSession.add(new_uc)

            if request_body['actiune'] == 'sterge':
                id_correct = DBSession.query(UserCamera).filter(UserCamera.id_user == id, UserCamera.id_camera == request_body["id_camera"]).first()
                if id_correct is None:
                    return Response(status = 404, body = "Incorrect id_camera")
                DBSession.delete(id_correct)

        return self.get()


@view_defaults(route_name = 'user_one', renderer = 'json')
class UserOne(object):

    def __init__(self, request):
        self.request = request

    def esteIdCorect(self):
        id = self.request.matchdict['id']
        record = DBSession.query(User).filter(User.id_user == id).first()
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
        
        rooms = DBSession.query(UserCamera).filter(UserCamera.id_user == record["id_user"])
        list_rooms = []

        for room in rooms:
            rec = room.as_dict()
            del rec["id_user"]
            del rec["id_uc"]
            room_name = DBSession.query(Camera.denumire).filter(Camera.id_camera == rec["id_camera"]).first()
            rec["denumire"]=room_name[0]
            list_rooms.append(rec)

        record["camere"] = list_rooms;
        
        return record

    @view_config(request_method = 'PUT')
    def put_one(self):
        verify = api_session_validation_admin(self.request)
        if not verify:
            return Response(status=401, body="Unauthorized for this api. You are not an admin")
        
        id = self.request.matchdict['id']
        user = DBSession.query(User).filter(User.id_user == id).first()
        if user is None:
            return Response(status = 400, body = "Incorect user id")
        request_body = json.loads(self.request.body.decode("utf8"))
        schema = yaml.safe_load( pkgutil.get_data("tw","schemas/user_update.yaml") )
        try:
            validate(request_body, schema, format_checker = FormatChecker())
        except ValidationError as ex:
            return Response( status = 400, body = "Incorect json format" + str(ex) )

        update_fields = {}
        
        if 'nume' in request_body.keys():
            update_fields['nume'] = request_body['nume']

        if 'prenume' in request_body.keys():
            update_fields['prenume'] = request_body['prenume']

        if 'parola' in request_body.keys():
            update_fields['parola'] = sha256_crypt.encrypt(request_body["parola"]);

        if 'mail' in request_body.keys():
            update_fields['mail'] = request_body['mail']

        if 'tip' in request_body.keys():
            update_fields['tip'] = request_body['tip']

        if not 'actiune' in request_body.keys():
            DBSession.query(User).filter(User.id_user == id).update(update_fields)
            updated = DBSession.query(User).filter(User.id_user == id).first().as_dict()
        
        if 'actiune' in request_body.keys():
            if request_body['actiune'] == "adauga":
                new_uc = UserCamera()
                new_uc.id_camera = request_body["id_camera"]
                new_uc.id_uc = str(uuid.uuid4())[:6]
                new_uc.id_user = id
                DBSession.add(new_uc)

            if request_body['actiune'] == 'sterge':
                id_correct = DBSession.query(UserCamera).filter(UserCamera.id_user == id, UserCamera.id_camera == request_body["id_camera"]).first()
                if id_correct is None:
                    return Response(status = 404, body = "Incorrect id_camera")
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
        record = DBSession.query(User).filter(User.id_user == id['id_user']).first()
        DBSession.delete(record)
        return Response(status=201, body = "OK")
