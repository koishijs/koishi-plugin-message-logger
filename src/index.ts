import { Context, Schema, Logger } from 'koishi'

const logger = new Logger('message-logger')

export const name = 'message-logger'

export interface Config {}
export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.middleware(async (session, next) => {
    if (!session.guildId) logger.info(`收到来自于 ${session.platform} 平台 ${session.username}(${session.userId}) 的私聊消息：${session.content}`)
    else try {
      const guild = await session.bot.getGuild(session.guildId)
      logger.info(`收到来自于 ${session.platform} 平台 ${guild.guildName}(${guild.guildId}) 成员 ${session.username}(${session.userId}) 的群聊消息：${session.content}`)
    } catch {
      logger.info(`收到来自于 ${session.platform} 平台 未命名群组(${session.guildId}) 成员 ${session.username}(${session.userId}) 的群聊消息：${session.content}`)
    }
    return next()
  }, true)
}
