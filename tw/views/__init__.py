from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response

def session_validation(func):
    def view_session_validation(request):	
        session = request.session
        if not 'email' in session.keys():
            return HTTPFound(location = request.route_url('login'))
        return_callable = func(request)
        return return_callable

    return view_session_validation 

def api_session_validation(request):	
        session = request.session
        if not 'email' in session.keys():
            return False
        return True


def api_session_validation_admin(func):
    def api_view_session_validation_admin(request):	
        session = request.session
        if not 'email' in session.keys():
            return Response(status=401, body="Unauthorized for this api.Must be an admin")
        api_return_callable_admin = func(request)
        return api_return_callable_admin

    return api_view_session_validation_admin 