export class SSEStream {
	_stream
	_writer
	_encoder
	_isClosed = false
	constructor() {
		this._stream = new TransformStream()
		this._writer = this._stream.writable.getWriter()
		this._encoder = new TextEncoder()
	}
	async write(data) {
		if (this._isClosed) {
			return false
		}
		try {
			const buffer = typeof data === "object" ? JSON.stringify(data) : data
			await this._writer.write(this._encoder.encode(`data: ${buffer}\n\n`))
			return true
		} catch (error) {
			console.error("[SSEStream#write]", error)
			this._isClosed = true
			this.close().catch(() => {})
			return false
		}
	}
	async close() {
		if (this._isClosed) {
			return
		}
		this._isClosed = true
		try {
			await this._writer.close()
		} catch (_error) {
			// Writer might already be closed, ignore the error.
		}
	}
	get isClosed() {
		return this._isClosed
	}
	getResponse() {
		return new Response(this._stream.readable, {
			headers: {
				"Content-Type": "text/event-stream",
				Connection: "keep-alive",
				"Cache-Control": "no-cache, no-transform",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Cache-Control",
			},
		})
	}
}
