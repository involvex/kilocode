export declare class SSEStream {
	private readonly _stream
	private readonly _writer
	private readonly _encoder
	private _isClosed
	constructor()
	write(data: string | object): Promise<boolean>
	close(): Promise<void>
	get isClosed(): boolean
	getResponse(): Response
}
//# sourceMappingURL=sse-stream.d.ts.map
