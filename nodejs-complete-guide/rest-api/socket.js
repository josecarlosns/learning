import { Server } from "socket.io";
import { isEmptyObject } from "./utils/jsUtils.js";

let io;

function initSocket(server) {
  io = new Server(server);

  return io;
}

function getSocket() {
  if (isEmptyObject(io)) throw new Error("Socket not initialized");

  return io;
}

export { getSocket, initSocket };
