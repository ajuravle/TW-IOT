from pyramid.httpexceptions import HTTPFound

def session_validation(func):
    def view_session_validation(request):	
        session = request.session
        for i in session.keys():
        	print("S ", session[i])
        if not 'email' in session.keys():
            return HTTPFound(location = request.route_url('login'))
        return_callable = func(request)
        return return_callable

    return view_session_validation 