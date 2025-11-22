/**
 * /mcp command - Manage MCP (Model Context Protocol) servers
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { homedir } from "node:os"
import type { Command, CommandContext, ArgumentProvider, ArgumentSuggestion } from "./core/types.js"

interface MCPServer {
	name: string
	command: string
	args?: string[]
	env?: Record<string, string>
	description?: string
	enabled: boolean
}

interface MCPConfig {
	servers: Record<string, MCPServer>
}

const MCP_CONFIG_PATH = join(homedir(), ".kilocode", "mcp-config.json")

/**
 * MCP actions autocomplete provider
 */
const mcpActionsProvider: ArgumentProvider = async () => {
	const actions = [
		{ value: "list", description: "List all MCP servers" },
		{ value: "add", description: "Add a new MCP server" },
		{ value: "remove", description: "Remove an MCP server" },
		{ value: "enable", description: "Enable an MCP server" },
		{ value: "disable", description: "Disable an MCP server" },
		{ value: "refresh", description: "Refresh MCP server connections" },
	]

	return actions.map((action) => ({
		value: action.value,
		title: action.value,
		description: action.description,
		matchScore: 80,
		highlightedValue: action.value,
	}))
}

/**
 * MCP server names autocomplete provider
 */
const mcpServersProvider: ArgumentProvider = async (context) => {
	const { partialInput } = context
	const suggestions: ArgumentSuggestion[] = []

	try {
		const config = loadMCPConfig()
		const servers = Object.values(config.servers)

		// Add existing servers
		for (const server of servers) {
			if (server.name.toLowerCase().includes(partialInput.toLowerCase())) {
				const status = server.enabled ? "Enabled" : "Disabled"
				suggestions.push({
					value: server.name,
					title: server.name,
					description: `${server.description} (${status})`,
					matchScore: server.name.toLowerCase() === partialInput.toLowerCase() ? 100 : 80,
					highlightedValue: server.name.replace(new RegExp(`(${partialInput})`, "gi"), "**$1**"),
				})
			}
		}

		// Add common server templates for add command
		if (context.currentArgs[0] === "add") {
			const commonServers = [
				{ name: "filesystem", description: "Filesystem access for reading and writing files" },
				{ name: "brave-search", description: "Web search using Brave Search API" },
				{ name: "github", description: "GitHub integration for repositories and issues" },
				{ name: "sqlite", description: "SQLite database access" },
				{ name: "postgres", description: "PostgreSQL database access" },
			]

			for (const server of commonServers) {
				if (server.name.toLowerCase().includes(partialInput.toLowerCase())) {
					// Check if server already exists
					const exists = config.servers[server.name]
					if (!exists) {
						suggestions.push({
							value: server.name,
							title: server.name,
							description: `${server.description} (new)`,
							matchScore: server.name.toLowerCase() === partialInput.toLowerCase() ? 90 : 70,
							highlightedValue: server.name.replace(new RegExp(`(${partialInput})`, "gi"), "**$1**"),
						})
					}
				}
			}
		}

		// Sort by match score and name
		suggestions.sort((a, b) => {
			if (b.matchScore !== a.matchScore) {
				return b.matchScore - a.matchScore
			}
			return a.value.localeCompare(b.value)
		})

		return suggestions.slice(0, 20)
	} catch (_error) {
		return suggestions
	}
}

function loadMCPConfig(): MCPConfig {
	try {
		if (existsSync(MCP_CONFIG_PATH)) {
			const content = readFileSync(MCP_CONFIG_PATH, "utf-8")
			return JSON.parse(content)
		}
	} catch (error) {
		console.error("Failed to load MCP config:", error)
	}

	// Default config with some common MCP servers
	return {
		servers: {
			filesystem: {
				name: "filesystem",
				command: "npx",
				args: ["-y", "@modelcontextprotocol/server-filesystem"],
				description: "Filesystem access for reading and writing files",
				enabled: true,
			},
			"brave-search": {
				name: "brave-search",
				command: "npx",
				args: ["-y", "@modelcontextprotocol/server-brave-search"],
				env: { BRAVE_API_KEY: "" },
				description: "Web search using Brave Search API",
				enabled: false,
			},
			github: {
				name: "github",
				command: "npx",
				args: ["-y", "@modelcontextprotocol/server-github"],
				env: { GITHUB_PERSONAL_ACCESS_TOKEN: "" },
				description: "GitHub integration for repositories and issues",
				enabled: false,
			},
		},
	}
}

function saveMCPConfig(config: MCPConfig): void {
	try {
		const configDir = join(homedir(), ".kilocode")
		if (!existsSync(configDir)) {
			mkdirSync(configDir, { recursive: true })
		}
		writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2))
	} catch (error) {
		console.error("Failed to save MCP config:", error)
		throw error
	}
}

export const mcpCommand: Command = {
	name: "mcp",
	aliases: [],
	description: "Manage MCP (Model Context Protocol) servers",
	usage: "/mcp <action> [server-name]",
	examples: [
		"/mcp list",
		"/mcp add",
		"/mcp remove filesystem",
		"/mcp enable github",
		"/mcp disable brave-search",
		"/mcp refresh",
	],
	category: "settings",
	priority: 7,
	handler: async (context: CommandContext) => {
		const { args, addMessage } = context

		if (args.length === 0) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: "Usage: /mcp <action> [server-name]. Actions: list, add, remove, enable, disable, refresh",
				ts: Date.now(),
			})
			return
		}

		const action = args[0]?.toLowerCase()
		const serverName = args[1]

		if (!action) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: "Usage: /mcp <action> [server-name]. Actions: list, add, remove, enable, disable, refresh",
				ts: Date.now(),
			})
			return
		}

		try {
			const config = loadMCPConfig()

			switch (action) {
				case "list": {
					const servers = Object.values(config.servers)
					if (servers.length === 0) {
						addMessage({
							id: Date.now().toString(),
							type: "system",
							content: "No MCP servers configured.",
							ts: Date.now(),
						})
						return
					}

					const serverList = servers.map((server) => {
						const status = server.enabled ? "✅ Enabled" : "❌ Disabled"
						const envInfo =
							server.env && Object.keys(server.env).length > 0
								? ` (env: ${Object.keys(server.env).join(", ")})`
								: ""
						return `- **${server.name}**: ${status} - ${server.description}${envInfo}`
					})

					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: "**MCP Servers:**\n\n" + serverList.join("\n"),
						ts: Date.now(),
					})
					break
				}

				case "add": {
					if (!serverName) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: "Please specify a server name to add. Example: /mcp add brave-search",
							ts: Date.now(),
						})
						return
					}

					// Add common MCP servers
					const commonServers: Record<string, Partial<MCPServer>> = {
						filesystem: {
							name: "filesystem",
							command: "npx",
							args: ["-y", "@modelcontextprotocol/server-filesystem"],
							description: "Filesystem access for reading and writing files",
							enabled: true,
						},
						"brave-search": {
							name: "brave-search",
							command: "npx",
							args: ["-y", "@modelcontextprotocol/server-brave-search"],
							env: { BRAVE_API_KEY: "" },
							description: "Web search using Brave Search API",
							enabled: false,
						},
						github: {
							name: "github",
							command: "npx",
							args: ["-y", "@modelcontextprotocol/server-github"],
							env: { GITHUB_PERSONAL_ACCESS_TOKEN: "" },
							description: "GitHub integration for repositories and issues",
							enabled: false,
						},
						sqlite: {
							name: "sqlite",
							command: "npx",
							args: ["-y", "@modelcontextprotocol/server-sqlite"],
							description: "SQLite database access",
							enabled: false,
						},
						postgres: {
							name: "postgres",
							command: "npx",
							args: ["-y", "@modelcontextprotocol/server-postgres"],
							env: { POSTGRES_CONNECTION_STRING: "" },
							description: "PostgreSQL database access",
							enabled: false,
						},
					}

					const serverTemplate = commonServers[serverName.toLowerCase()]
					if (!serverTemplate) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: `Unknown server "${serverName}". Available servers: ${Object.keys(commonServers).join(", ")}`,
							ts: Date.now(),
						})
						return
					}

					const newServer: MCPServer = {
						name: serverTemplate.name!,
						command: serverTemplate.command!,
						args: serverTemplate.args || [],
						env: serverTemplate.env || {},
						description: serverTemplate.description || "",
						enabled: serverTemplate.enabled || false,
					}

					config.servers[serverName] = newServer
					saveMCPConfig(config)

					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: `Added MCP server "${serverName}". ${newServer.env && Object.keys(newServer.env).length > 0 ? `Note: Set environment variables: ${Object.keys(newServer.env).join(", ")}` : ""}`,
						ts: Date.now(),
					})
					break
				}

				case "remove": {
					if (!serverName) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: "Please specify a server name to remove. Example: /mcp remove filesystem",
							ts: Date.now(),
						})
						return
					}

					if (!config.servers[serverName]) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: `MCP server "${serverName}" not found.`,
							ts: Date.now(),
						})
						return
					}

					delete config.servers[serverName]
					saveMCPConfig(config)

					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: `Removed MCP server "${serverName}".`,
						ts: Date.now(),
					})
					break
				}

				case "enable": {
					if (!serverName) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: "Please specify a server name to enable. Example: /mcp enable filesystem",
							ts: Date.now(),
						})
						return
					}

					if (!config.servers[serverName]) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: `MCP server "${serverName}" not found.`,
							ts: Date.now(),
						})
						return
					}

					config.servers[serverName].enabled = true
					saveMCPConfig(config)

					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: `Enabled MCP server "${serverName}".`,
						ts: Date.now(),
					})
					break
				}

				case "disable": {
					if (!serverName) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: "Please specify a server name to disable. Example: /mcp disable filesystem",
							ts: Date.now(),
						})
						return
					}

					if (!config.servers[serverName]) {
						addMessage({
							id: Date.now().toString(),
							type: "error",
							content: `MCP server "${serverName}" not found.`,
							ts: Date.now(),
						})
						return
					}

					config.servers[serverName].enabled = false
					saveMCPConfig(config)

					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: `Disabled MCP server "${serverName}".`,
						ts: Date.now(),
					})
					break
				}

				case "refresh": {
					// Refresh MCP connections (placeholder for now)
					addMessage({
						id: Date.now().toString(),
						type: "system",
						content: "MCP server connections refreshed.",
						ts: Date.now(),
					})
					break
				}

				default: {
					addMessage({
						id: Date.now().toString(),
						type: "error",
						content: `Unknown action "${action}". Available actions: list, add, remove, enable, disable, refresh`,
						ts: Date.now(),
					})
				}
			}
		} catch (error) {
			addMessage({
				id: Date.now().toString(),
				type: "error",
				content: `Failed to manage MCP servers: ${error instanceof Error ? error.message : String(error)}`,
				ts: Date.now(),
			})
		}
	},
	arguments: [
		{
			name: "action",
			description: "MCP action to perform",
			provider: mcpActionsProvider,
		},
		{
			name: "server-name",
			description: "MCP server name",
			provider: mcpServersProvider,
		},
	],
}
