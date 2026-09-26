# imports of course
import json, socket, os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class Handler(SimpleHTTPRequestHandler):
    server_version = "hidden for security reasons"
    sys_version = ""
    def do_GET(self): # literally just serves a get request
        if self.path == "/api/whoami": # the whoami part of the api
            self.send_whoami()
        else:
            super().do_GET() # just serve the static page

    def send_whoami(self): # the packet to send when asked "who am i?"
        body = json.dumps({"node": os.environ.get("NODE_NAME", socket.gethostname())}).encode() # which server is hosting it?
        self.send_response(200) # everything is OK
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    
bind = os.environ.get("BIND", "127.0.0.1")
handler = partial(Handler, directory="static") # create the request handler
server = ThreadingHTTPServer((bind, 8081), handler) # and the server
print("Serving on http://127.0.0.1:8081")
server.serve_forever() # aaaand serve!