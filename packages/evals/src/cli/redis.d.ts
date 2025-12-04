import { type RedisClientType } from "redis"
export declare const redisClient: () => Promise<RedisClientType>
export declare const getPubSubKey: (runId: number) => string
export declare const getRunnersKey: (runId: number) => string
export declare const getHeartbeatKey: (runId: number) => string
export declare const registerRunner: ({
	runId,
	taskId,
	timeoutSeconds,
}: {
	runId: number
	taskId: number
	timeoutSeconds: number
}) => Promise<void>
export declare const deregisterRunner: ({ runId, taskId }: { runId: number; taskId: number }) => Promise<void>
export declare const startHeartbeat: (runId: number, seconds?: number) => Promise<NodeJS.Timeout>
export declare const stopHeartbeat: (runId: number, heartbeat: NodeJS.Timeout) => Promise<void>
//# sourceMappingURL=redis.d.ts.map
