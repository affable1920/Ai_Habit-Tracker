import asyncio
from typing import Any
from fastapi import WebSocket
from datetime import datetime
from pydantic import BaseModel
from fastapi.websockets import WebSocketState


class WS_Conn(BaseModel):
    conn_at: datetime
    socket: WebSocket
    queue: asyncio.Queue

    class Config:
        arbitrary_types_allowed = True


class WSManager:
    _def_maxsize = 4

    def __init__(self):
        self.active_conns: dict[str, WS_Conn] = {}

#

    async def connect(self, ws_id: str, ws: WebSocket):
        # Del old and connect the new conn
        self.remove_ws(ws_id=ws_id)

        try:
            await ws.accept()
            self.active_conns[ws_id] = WS_Conn(conn_at=datetime.now(), socket=ws,
                                               queue=asyncio.Queue(maxsize=self._def_maxsize))

        except Exception as ex:
            print(ex)
            return

#

    async def disconnect(self, ws_id, reason: dict):
        ws_to_disconn: WS_Conn = self.active_conns.get(ws_id, None)
        # Check if the socket to disconn is already disconnected.
        if not ws_to_disconn or not self.is_connected(ws_id=ws_id):
            return

        else:
            try:
                socket = ws_to_disconn.socket
                await socket.close(**reason)

            except Exception as ex:
                print(ex)

            finally:
                self.remove_ws(ws_id=ws_id)
        return

#

    def remove_ws(self, ws_id):
        if not ws_id in self.active_conns:
            return
        del self.active_conns[ws_id]

#

    def is_connected(self, ws_id) -> bool:
        ws_to_check = self.active_conns.get(ws_id, None)
        if not ws_to_check:
            return False

        socket = ws_to_check.socket
        return all(state == WebSocketState.CONNECTED for state in (socket.application_state, socket.client_state))


#
    # A consumer method.


    async def send_msg(self, subscribers: list[str], msg: str | None = None):
        connected = {ws_id: self.is_connected(
            ws_id=ws_id) for ws_id in subscribers}

        self.msg_qs = {id: asyncio.Queue(maxsize=5) for id in subscribers}
        # await asyncio.gather(*(queue.put(msg) for queue in self.msg_qs.values()))

        for q in self.msg_qs.values():
            await q.put(msg)

#
    # A producer method.
    async def broadcast(self, subscribers: list[str], msg: str | None = None):
        for i, conn in self.active_conns.items():
            if i in subscribers:
                try:
                    await conn.queue.put(msg)

                except Exception as ex:
                    print(ex)
                    continue
