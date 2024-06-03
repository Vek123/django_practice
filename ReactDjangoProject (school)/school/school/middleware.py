def auth_token(get_response):
    def middleware(request):
        if 'HTTP_AUTHORIZATION' not in request.META and request.path != "/auth/token/login/":
            token = request.COOKIES.get('Token')
            if token:
                request.META['HTTP_AUTHORIZATION'] = f"Token {token}"
        return get_response(request)

    return middleware
