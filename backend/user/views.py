import json
from backend.user.models import User
from django.views.decorators.csrf import csrf_exempt 
from django.http import JsonResponse
import ldap
from rest_framework.exceptions import APIException

# Authentication: LDAP two
# ldap的地址和端口号
AUTH_LDAP_SERVER_URI = 'ldap://10.1.2.180:389'
# root DN
AUTH_LDAP_BIND_DN = 'OU=大华技术,DC=dahuatech,DC=com'
AUTH_LDAP_BIND_PASSWORD = ''
AUTH_DOMAIN = 'dahuatech'
# cn, uid, sAMAccountName
AUTH_LDAP_USER_SEARCH_FILTER_NAME = 'sAMAccountName'
# Retrieve attributes from ldap
AUTH_LDAP_USER_ATTR_MAP = None
# AUTH_LDAP_USER_ATTR_MAP = {
#     'username': 'sAMAccountName',
#     'email': 'mail',
#     'telephone': 'telephone',
#     'truename': 'givenName'
# }

class MyLdap(object):
    def __init(self, server_uri, username='', password=''):
        self.server_uri = server_uri
        self.ldap_obj = None
        self.ldap_connect(username, password)

    def ldap_connect(self, username='', password=''):
        url = self.server_uri
        conn = ldap.initialize(url)
        conn.protocol_version = ldap.VERSION3
        if username and not password:
            raise APIException("Please input password!")
        try:
            username = '{0}/{1}'.format(AUTH_DOMAIN, username)
            rest = conn.simple_bind_s(username, password)
        except ldap.SERVER_DOWN:
            raise APIException("Can't connect to LDAP!")
        except ldap.INVALID_CREDENTIALS:
            raise APIException("LADP user failed!")
        except Exception as e:
            raise APIException(type(e))
        # 97 表示success
        if rest[0] != 97:
            raise APIException(rest[1])
        self.ldap_obj = conn

    def ldap_search(self, username=''):
        """
        AUTH_LDAP_BIND_DN: 域
        AUTH_LDAP_USER_SEARCH_FILTER_NAME: 搜索策略
        AUTH_LDAP_USER_ATTR_MAP: 同步账户信息到django的auth_user表中
        username: 搜索的用户
        """
        AUTH_LDAP_USER_SEARCH_FILTER = '({0}={1})'.format(AUTH_LDAP_USER_SEARCH_FILTER_NAME, username)
        try:
            search_id = self.ldap_obj.search(AUTH_LDAP_BIND_DN, ldap.SCOPE_SUBTREE, AUTH_LDAP_USER_SEARCH_FILTER, AUTH_LDAP_USER_ATTR_MAP)
            _, user_data = self.ldap_obj.result(search_id)
            if not user_data:
                return False, []
        except ldap.LDAPError as e:
            raise APIException(e)
        return True, user_data

@csrf_exempt
def userLogon(ldapUserInfo):
    response = {}
    # ldapUserInfo = json.dumps(str(ldapUserInfo[0][1]), ensure_ascii=False)
    username = "yang test"
    response = {
        'username': username,
        'roles': 'guster',
        'truename': '',
        'sex': '',
        'email': '',
        'introduction': '',
        'avatar': ''
    }
    return response

@csrf_exempt
def userLogin(request):
    response = {}
    try:
        req = json.loads(request.body.decode())
        username = req['username']
        password = req['password']
        myLdap = MyLdap(AUTH_LDAP_SERVER_URI, username, password)
        result, ldapUserInfo = myLdap.ldap_search(username)
        if result:
            userInfo = userLogon(ldapUserInfo)
            # 生成随机字符串
            if request.session.get('username'):
                del request.session["username"]
            request.session['username'] = username
            request.session.set_expiry(60)
            response['data'] = {
                'token': request.session.session_key,
                'userInfo': userInfo
            }
            response['message'] = 'Login Success'
            response['status'] = 200
    except Exception as e:
        response['message'] = 'Login Failed: {0}'.format(e)
        response['status'] = 500
    finally:
        pass
    return JsonResponse(response)

@csrf_exempt
def userLogout(request):
    response = {}
    try:
        # request.session.flush()
        del request.session['username']
        response['message'] = 'Logout Success'
        response['status'] = 200
    except Exception as e:
        response['message'] = str(e)
        response['status'] = 500
    return JsonResponse(response)

@csrf_exempt
def userInfo(request):
    response = {}
    try:
        req = json.loads(request.body.decode())
        user = User.objects.get(username=req['username'])
        if not user.roles:
            user.roles = ''
        response['data'] = {
            'token': request.session.session_key,
            'userInfo': {
                'username': user.username,
                'roles': user.roles,
                'truename': user.truename,
                'sex': user.sex,
                'email': user.email,
                'introduction': user.introduction,
                'avatar': user.avatar
            }
        }
        response['message'] = 'success'
        response['code'] = 200
    except Exception as e:
        response['message'] = str(e)
        response['code'] = 500
    return JsonResponse(response)
