const zhCN = {
  languageName: '中文（简体）',
  'Current Language:': '你已切换至:',
  notification: {
    failed: '失败',
    confirmed: '已确认',
    completed: '已成功'
  },
  editor: {
    edit: '编辑',
    preview: '预览',
    exitPreview: '退出预览',
    release: {
      name: '发布',
      confirm: '确定上传文件到 Arwave 网络?'
    },
    exitEdit: '退出编辑',
    emptyDraft: {
      name: '清空草稿',
      confirm: '你将再也见不到你的草稿，确定清空?'
    },
  }
}
type i18nType = typeof zhCN
export default zhCN
export type { i18nType }
