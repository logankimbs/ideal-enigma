import {
    ChatPostMessageResponse,
    TeamInfoResponse,
    UsersInfoResponse,
    UsersListResponse,
    WebClient,
} from "@slack/web-api"
import { SlackService } from "../../src/services/SlackService"
import logger from "../../src/utils/logger"

jest.mock("@slack/web-api", () => ({
    WebClient: jest.fn().mockImplementation(() => ({
        apiCall: jest.fn(),
    })),
}))

jest.mock("../../src/utils/logger")

describe("SlackService", () => {
    let slackService: SlackService
    let webClient: WebClient

    beforeEach(() => {
        webClient = new WebClient()
        slackService = new SlackService(webClient)
        jest.clearAllMocks()
    })

    describe("getUserInfo", () => {
        it("should return user information from api if call is successful", async () => {
            const user = { id: "U0000000001" }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue({
                ok: true,
                user,
            })

            const result = await slackService.getUserInfo(user.id)

            expect(result).toEqual(user)
            expect(webClient.apiCall).toHaveBeenCalledWith("users.info", {
                user: user.id,
            })
        })

        it("should throw error if api call fails", async () => {
            const user = { id: "U0000000001" }
            const params = { user: user.id }
            const method = "users.info"
            const mockResponse: UsersInfoResponse = {
                ok: false,
                error: "user_not_found",
            }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue(mockResponse)

            await expect(slackService.getUserInfo(user.id)).rejects.toThrow(
                `Slack API error during ${method} with parameters ${JSON.stringify(
                    params,
                )}: ${mockResponse.error}`,
            )
        })
    })

    describe("getUsersList", () => {
        it("should return filtered list of users if api call is successful", async () => {
            const members = [
                { id: "U0000000001", is_bot: false },
                { id: "U0000000002", is_bot: true },
                { id: "USLACKBOT", is_bot: false },
            ]
            ;(webClient.apiCall as jest.Mock).mockResolvedValue({
                ok: true,
                members,
            })

            const result = await slackService.getUsersList("T12345")

            expect(result).toEqual([{ id: members[0].id, is_bot: false }])
            expect(webClient.apiCall).toHaveBeenCalledWith("users.list", {
                team_id: "T12345",
            })
        })

        it("should throw error if api call fails", async () => {
            const teamId = "T0000000001"
            const params = { team_id: teamId }
            const method = "users.list"
            const mockResponse: UsersListResponse = {
                ok: false,
                error: "invalid_auth",
            }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue(mockResponse)

            await expect(slackService.getUsersList(teamId)).rejects.toThrow(
                `Slack API error during ${method} with parameters ${JSON.stringify(
                    params,
                )}: ${mockResponse.error}`,
            )
        })
    })

    describe("getTeamInfo", () => {
        it("should return team information from api if call is successful", async () => {
            const team = { id: "T12345", name: "Test Team" }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue({
                ok: true,
                team,
            })

            const result = await slackService.getTeamInfo(team.id)

            expect(result).toEqual(team)
            expect(webClient.apiCall).toHaveBeenCalledWith("team.info", {
                team: team.id,
            })
        })

        it("should throw error if api call fails", async () => {
            const teamId = "T0000000001"
            const params = { team: teamId }
            const method = "team.info"
            const mockResponse: TeamInfoResponse = {
                ok: false,
                error: "invalid_auth",
            }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue(mockResponse)

            await expect(slackService.getTeamInfo(teamId)).rejects.toThrow(
                `Slack API error during ${method} with parameters ${JSON.stringify(
                    params,
                )}: ${mockResponse.error}`,
            )
        })
    })

    describe("postMessage", () => {
        it("should post message if api call is successful", async () => {
            ;(webClient.apiCall as jest.Mock).mockResolvedValue({ ok: true })

            const result = await slackService.postMessage(
                "C12345",
                "Hello, World!",
            )

            expect(result).toBe(true)
            expect(webClient.apiCall).toHaveBeenCalledWith("chat.postMessage", {
                channel: "C12345",
                text: "Hello, World!",
                blocks: undefined,
            })
        })

        it("should throw error if api call fails", async () => {
            const channelId = "U0000000001"
            const params = {
                channel: channelId,
                text: "Hello, World!",
            }
            const method = "chat.postMessage"
            const mockResponse: ChatPostMessageResponse = {
                ok: false,
                error: "invalid_auth",
            }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue(mockResponse)

            await expect(
                slackService.postMessage(channelId, params.text),
            ).rejects.toThrow(
                `Slack API error during ${method} with parameters ${JSON.stringify(
                    params,
                )}: ${mockResponse.error}`,
            )
        })
    })

    describe("scheduleMessage", () => {
        it("should schedule message if api call is successful", async () => {
            ;(webClient.apiCall as jest.Mock).mockResolvedValue({ ok: true })

            const result = await slackService.scheduleMessage(
                "C12345",
                "Hello, World!",
                1234567890,
            )

            expect(result).toBe(true)
            expect(webClient.apiCall).toHaveBeenCalledWith(
                "chat.scheduleMessage",
                {
                    channel: "C12345",
                    text: "Hello, World!",
                    post_at: 1234567890,
                    blocks: undefined,
                },
            )
        })

        it("should throw error if api call fails", async () => {
            const channelId = "U0000000001"
            const params = {
                channel: channelId,
                text: "Hello, World!",
                post_at: 1234567890,
                blocks: undefined,
            }
            const method = "chat.scheduleMessage"
            const mockResponse: ChatPostMessageResponse = {
                ok: false,
                error: "invalid_auth",
            }
            ;(webClient.apiCall as jest.Mock).mockResolvedValue(mockResponse)

            await expect(
                slackService.scheduleMessage(
                    params.channel,
                    params.text,
                    params.post_at,
                    params.blocks,
                ),
            ).rejects.toThrow(
                `Slack API error during ${method} with parameters ${JSON.stringify(
                    params,
                )}: ${mockResponse.error}`,
            )
        })
    })

    describe("callApi", () => {
        it("should log and rethrow the error if the API call fails", async () => {
            const mockError = new Error("API error")
            ;(webClient.apiCall as jest.Mock).mockRejectedValue(mockError)

            await expect(
                slackService["callApi"]("chat.postMessage", {}),
            ).rejects.toThrow(mockError)
            expect(logger.error).toHaveBeenCalledWith(
                `API call to chat.postMessage with parameters {} failed: ${mockError}`,
            )
        })
    })
})
