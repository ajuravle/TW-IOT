from pyramid.view import view_config, view_defaults
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.renderers import render_to_response
import json
import uuid
from passlib.hash import sha256_crypt
from ..models.meta import DBSession
from ..models.inregistrare_token import InregistrareToken
import re
from api.MailManager import send_email
from ..models.user import User

@view_config(route_name="send_mail_register", request_method="POST")
def post(request):
    request_body = json.loads(request.body.decode("utf8"))
    if not 'email' in request_body.keys():
        return Response(status = 400, body = "Email este un camp obligatoriu")
    email = request_body['email']
    if not re.match(r'[\w.-]+@[\w.-]+.\w+', email):
        return Response(status = 400, body = "Invalid email")

    token = str(uuid.uuid4())
    row = InregistrareToken(id=str(uuid.uuid4())[:6], token = token, email = email)
    DBSession.add(row)
    subject = 'Inregistrare WOHA'
    body = 'Pentru inregistrare accesati: http://192.168.0.241:6543/register/' + token
    send_email(email, subject, body)
    return Response(status = 200, body = "OK")

@view_config(route_name="register_one", request_method = "GET")
def get(request):
    token = request.matchdict["id"]
    record = DBSession.query(InregistrareToken).filter(InregistrareToken.token == token).first()
    if record is None:
        return Response(status = 400, body = "Incorect token")
    response = render_to_response('templates/home/register.jinja2',{}, request = request)
    return response

@view_config(route_name="register_one", request_method = "POST")
def postRegister(request):
    token = request.matchdict["id"]
    request_body = json.loads(request.body.decode("utf8"))
    email = request_body['email']
    print ("----------------->",email,token)
    record = DBSession.query(InregistrareToken).filter(InregistrareToken.token == token, InregistrareToken.email == email).first()
    if record is None:
        return Response(status = 400, body = "Incorect token")

    DBSession.delete(record)
    
    id = str(uuid.uuid4())[:6]
    insert_row = {}
    insert_row['nume'] = request_body['nume']
    insert_row['prenume'] = request_body['prenume']
    insert_row['parola'] = sha256_crypt.encrypt(request_body['parola']);
    insert_row['mail'] = request_body['email']
    insert_row['id_user'] = id
    record = User(**insert_row)
    DBSession.add(record)


    
    return HTTPFound(location = request.route_url("login"))
