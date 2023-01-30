import { Context, Schema, Logger } from 'koishi'

const logger = new Logger('message-logger')

export const name = 'message-logger'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.middleware(async (session, next) => {
    switch (session.subtype) {
      case 'private': {
        const user = await session.bot.getUser(session.userId)
        logger.info(`收到来自于 ${session.platform} 平台 ${user.username}(${user.userId}) 的私聊消息：${session.content}`)
      }
      break
      case 'group': {
        const guild = await session.bot.getGuild(session.guildId)
        const user = await session.bot.getGuildMember(session.guildId, session.userId)
        logger.info(`收到来自于 ${session.platform} 平台 ${guild.guildName}(${guild.guildId}) 成员 ${user.username}(${user.userId}) 的群聊消息：${session.content}`)
      }
    }
    return next()
  }, true)
}
