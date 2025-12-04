"use server"
import { redisClient } from "@/lib/server/redis"
export const getRunners = async (runId) => {
	const redis = await redisClient()
	return redis.sMembers(`runners:${runId}`)
}
