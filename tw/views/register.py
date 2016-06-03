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

@view_config(route_name="register", request_method="POST")
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
    body = 'Pentru inregistrare accesati: http://192.168.0.94:6543/register/' + token
    send_email(email, subject, body)
    return Response(status = 200, body = "OK")