import { message as Message, notification } from 'ant-design-vue'

import { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification'

export interface NotifyApi {
  info(config: NotificationArgsProps): void
  success(config: NotificationArgsProps): void
  error(config: NotificationArgsProps): void
  warn(config: NotificationArgsProps): void
  warning(config: NotificationArgsProps): void
  open(args: NotificationArgsProps): void
  close(key: String): void
  config(options: ConfigProps): void
  destroy(): void
}

notification.config({
  placement: 'topRight',
  duration: 3,
})

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
  }
}
