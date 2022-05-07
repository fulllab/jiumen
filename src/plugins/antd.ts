import { Button, Card, Descriptions, Tooltip } from 'ant-design-vue'

/**
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app
 * @returns void
 */
export default function loadAnt(app: any) {
  ;[Button, Card, Descriptions, Tooltip].forEach(v => {
    app.use(v)
  })
}
