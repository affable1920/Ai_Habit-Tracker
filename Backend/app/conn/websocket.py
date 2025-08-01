import asyncio
from dataclasses import dataclass
from datetime import datetime
from typing import Any
from fastapi import WebSocket
from fastapi.websockets import WebSocketState


@dataclass
class Socket():
    id: str
    socket: WebSocket
    conn_at: datetime


class WSManager:
    active_conns: dict[str, Socket] = {}

    async def connect(self, ws_id: str, ws: WebSocket):
        if ws_id in self.active_conns:
            return

        await ws.accept()
        self.active_conns[ws_id] = Socket(
            socket=ws, id=ws_id, conn_at=datetime.now())

    async def disconnect(self, ws_id, reason: dict):
        ws_to_disconnect: Socket = self.active_conns.get(ws_id, None).socket

        # Check if the socket to disconn is already disconnected.
        if not ws_to_disconnect or not self.is_connected(ws_id=ws_id):
            return

        else:
            try:
                await ws_to_disconnect.close(**reason)

            except Exception as ex:
                print(ex)

            finally:
                self.remove_ws(ws_id=ws_id)
        return

    def remove_ws(self, ws_id):
        if not ws_id in self.active_conns:
            return
        del self.active_conns[ws_id]

    def is_connected(self, ws_id) -> bool:
        ws_to_check = self.active_conns.get(ws_id, None).socket
        if not ws_to_check:
            return False

        return all(state == WebSocketState.CONNECTED for state in (ws_to_check.application_state, ws_to_check.client_state))

    async def broadcast(self, msg: str | Any):
        # Create tasks to send msg to each client connected to the ws.
        try:
            tasks = [(ws_id, asyncio.create_task(ws.socket.send_text(
                msg))) for ws_id, ws in self.active_conns.items() if self.is_connected(ws_id=ws_id)]

            # Run tasks concurrently.
            results = asyncio.gather(
                *[task for _, task in tasks], return_exceptions=True)

            # Remove disconnected clients.
            disconnected_ws_ids = []
            for (ws_id, _), result in zip(tasks, results):
                if isinstance(result, Exception):
                    disconnected_ws_ids.append(ws_id)

            for id in disconnected_ws_ids:
                self.remove_ws(ws_id=id)

        except Exception as ex:
            print(ex)
