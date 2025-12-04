"use server"
import { redisClient } from "@/lib/server/redis"
export const getHeartbeat = async (runId) => {
	const redis = await redisClient()
	return redis.get(`heartbeat:${runId}`)
}
