/* ------------------------------ Node Modules ------------------------------ */
import util from 'node:util'
/* ------------------------------ Custom Module ----------------------------- */
import { io } from '../../../../application.js'
/* -------------------------------------------------------------------------- */

export const dynamicEmitter = (event_name, channel_name, data) => {
	io.to(channel_name).emit(event_name, data)
	console.log(util.inspect({ channel: channel_name, event: event_name, data }, false, null, true))
}
