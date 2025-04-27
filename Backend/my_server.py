from ast import parse
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from habit_manager import HabitManager
import socketserver
import json

# urlparse: breaks the path into path and other components
# parse_qs: converts query string params into a python dict

PORT = 8000


class Server(BaseHTTPRequestHandler):
    default_query = {
        'limit': 10, 'page': 1, 'search_query': '', 'status': None
    }

    err_obj = {
        'URL': {'name': 'INVALID_RESOURCE_ERROR', 'msg': 'Trying to access an invalid resource or URL !'},
        'AUTH': {'name': 'AUTH_ERROR', 'msg': 'You are probably not logged in !'},
        'SERVER': {'name': 'UNEXPECTED_ERROR', 'msg': 'An Internal server error occurred !'},
        'POST': {'name': 'INVALID_REQUEST', 'msg': 'An invalid request was recieved !',
                 'description': 'Please check the data you are sending to the backend'}
    }

    def send_headers(self, status=200):
        self.send_response(status)

        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')

        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')

        self.end_headers()

    def do_OPTIONS(self):
        self.send_headers(200)

#

    def set_query(self, qs):
        if 'limit' in qs:
            lmt = int(qs.get('limit', 10)[0])
            self.default_query.update({'limit': lmt})

        if 'page' in qs:
            pg = int(qs.get('page', 1)[0])
            self.default_query.update({'page': pg})

        if 'search_query' in qs:
            sq = qs.get('search_query', '')[0]
            self.default_query.update({'search_query': sq})

        if 'status' in qs:
            st = qs.get('status', None)[0]
            self.default_query.update({'status': st})

#

    def make_response(self, success, data=None, error=None):
        res = {'success': success, 'response': data, 'error': error}
        return self.wfile.write(json.dumps(res).encode('utf-8'))

#

    def do_GET(self):
        parsed = urlparse(self.path)
        path_parts = parsed.path.strip('/').split('/')

        if len(path_parts) not in (2, 3):
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        user_id, path = path_parts[0], path_parts[1]

        if not user_id:
            self.send_headers(401)
            return self.make_response(False, None, self.err_obj['AUTH'])

        if path != 'habits':
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        qs = parse_qs(parsed.query)
        self.set_query(qs)

        manager = HabitManager()
        success, response = manager.read_habits(user_id, self.default_query)

        if not success:
            self.send_headers(500)
            return self.make_response(False, None, self.err_obj['SERVER'])

        self.send_headers(200)
        return self.make_response(True, {'habits': response}, None)

    def do_POST(self):
        parsed = urlparse(self.path)
        path_parts = parsed.path.strip('/').split('/')

        if len(path_parts) not in (2, 3):
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        user_id, path = path_parts[0], path_parts[1]

        if not user_id:
            self.send_headers(401)
            return self.make_response(False, None, self.err_obj['AUTH'])

        if path != 'habits':
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        manager = HabitManager()

        try:
            content_length = int(self.headers['Content-Length'])
            data = self.rfile.read(content_length).decode('utf-8')

        except KeyError:
            self.send_headers(411)
            return self.make_response(False, None, self.err_obj['POST'])

        try:
            habit = json.loads(data)

            if not 'title' in habit:
                self.send_headers(400)
                return self.make_response(True, None, self.err_obj['POST'])

        except json.JSONDecodeError:
            self.send_headers(500)
            return self.make_response(False, None, self.err_obj['SERVER'])

        success, response = manager.add_habit(habit, user_id)

        if not success:
            self.send_headers(500)
            return self.make_response(False, None, self.err_obj['SERVER'])

        self.send_headers(201)
        return self.make_response(True, {
            'server_habit': response, 'msg': 'Habit successfully added to your collection !'}, None)

#

    def do_PUT(self):
        parsed = urlparse(self.path)
        path_parts = parsed.path.strip('/').split('/')

        if len(path_parts) < 3:
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        user_id, path, habit_id, *rest = path_parts

        if not user_id:
            self.send_headers(401)
            return self.make_response(False, None, self.err_obj['AUTH'])

        if path != 'habits':
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        try:
            content_length = int(self.headers['Content-Length'])
            fields = self.rfile.read(content_length).decode('utf-8')

        except KeyError:
            self.send_headers(411)
            return self.make_response(False, None, self.err_obj['POST'])

        try:
            fields = json.loads(fields)
            manager = HabitManager()

        except json.JSONDecodeError:
            self.send_headers(500)
            return self.make_response(False, None, self.err_obj['SERVER'])

        success, message = manager.update_habit(user_id, habit_id, fields)

        if not success:
            self.send_headers(500)

            return self.make_response(False, None, self.err_obj['SERVER'])

        self.send_headers(201)
        return self.make_response(True, {'msg': message}, None)

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path_parts = parsed.path.lstrip('/').split('/')

        if len(path_parts) < 3:
            self.send_headers(401)
            return self.make_response(False, None, self.err_obj['URL'])

        user_id, path, habit_id, *rest = path_parts

        if path != 'habits':
            self.send_headers(404)
            return self.make_response(False, None, self.err_obj['URL'])

        manager = HabitManager()
        success, msg = manager.delete_habit(user_id, habit_id)

        if not success:
            self.send_headers(501)
            return self.make_response(False, None, self.err_obj['SERVER'])

        self.send_headers(204)
        return self.make_response(True, {'msg': msg}, None)


server_address = ('', PORT)


def run():
    with socketserver.ThreadingTCPServer(server_address, Server) as http:
        try:
            print(f'Server running on port {PORT} ...')
            http.serve_forever()

        except ConnectionError as e:
            print(f'Failed to connect to server on port {PORT}: {e}')


if __name__ == '__main__':
    run()
