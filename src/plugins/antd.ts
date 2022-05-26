import {
  Button,
  Card,
  Descriptions,
  Tooltip,
  Row,
  Col,
  Popconfirm,
  Radio,
  Input,
  Layout,
  ConfigProvider,
  Modal,
  Form,
  Menu,
  Dropdown,
  Drawer,
  InputNumber,
  Slider,
  Rate,
  Select,
  Space,
  Spin,
} from 'ant-design-vue'

/**
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app
 * @returns void
 */
export default function loadAnt(app: any) {
  ;[
    Button,
    Card,
    Descriptions,
    Tooltip,
    Row,
    Col,
    Popconfirm,
    Radio,
    Input,
    Layout,
    ConfigProvider,
    Modal,
    Form,
    Menu,
    Dropdown,
    Drawer,
    InputNumber,
    Slider,
    Rate,
    Select,
    Space,
    Spin,
  ].forEach(v => {
    app.use(v)
  })
}
