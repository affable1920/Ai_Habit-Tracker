import socketserver
import json
from http.server import  BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from habit_manager import HabitManager

# urlparse: breaks the path into path and other components
# parse_qs: converts query string params into a python dict 

PORT = 8000

class Server(BaseHTTPRequestHandler):
    error = 'Log in first you IDIOT!.'    

    def send_headers(self, status=200):
        self.send_response(status)

        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-origin', '*')
        self.end_headers()


    def do_OPTIONS(self):
        self.send_headers(200)


    def do_GET(self):
        url = urlparse(self.path)
        qs = parse_qs(url.query)

        manager = HabitManager()

        if not 'userid' in qs:
            self.send_headers(403)
            
            self.wfile.write(self.error.encode('utf-8'))
            return
        
        if url.path == '/habits':
            user_id = qs['userid'][0]
            try:
                self.send_headers(200)

                habits = manager.read_habits(user_id)
                self.wfile.write(json.dumps(habits).encode('utf-8'))
            
            except json.JSONDecodeError:
                self.send_headers(400)
                self.wfile.write(json.dumps({'error': 'JSON error'}).encode('utf-8'))

        else:
            self.send_headers(404)


    def do_POST(self):
        url = urlparse(self.path)
        qs = parse_qs(url.query)

        manager = HabitManager()

        if not 'userid' in qs:
            self.send_headers(403)

            self.wfile.write(json.dumps(self.error.encode('utf-8')))
            return
        
        user_id = qs['userid'][0]
        
        if url.path == '/habits':
            content_length = int(self.headers['Content-Length'])
            data = self.rfile.read(content_length).decode('utf-8')

            try:
                habit = json.loads(data)

                if not 'title' in habit:
                    self.send_headers(400)

                    self.wfile.write(json.dumps({'Error': 'Incomplete habit recieved.'}).encode('utf-8'))
                    return
            
            except json.JSONDecodeError:
                self.send_headers(400)
                self.wfile.write(json.dumps('Invalid json recieved').encode('utf-8'))
            
            try:
                response = manager.add_habit(habit, user_id)

                self.send_headers(201)
                self.wfile.write(json.dumps(response).encode('utf-8'))

            except Exception:
                self.send_headers(500)
                self.wfile.write(json.dumps({'error': 'An unknown error occurred.'}).encode('utf-8'))

        else:
            self.send_headers(404)


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