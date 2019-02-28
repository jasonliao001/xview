import Affix from './components/affix';
import locale from './locale/index';
import Layout from './components/layout';
import Content from './components/content';
import Button from './components/button';
import Footer from './components/footer';
import Header from './components/header';
import Sider from './components/sider';
import Menu from './components/menu';
import Icon from './components/icon';
import Input from './components/input';
import Radio from './components/radio';
import Checkbox from './components/checkbox';
import Cell from './components/cell';
import Badge from './components/badge';
import Card from './components/Card';
import Switch from './components/switch';
import InputNumber from './components/input-number';
import Dropdown from './components/dropdown';
import Tabs from './components/tabs';
import Collapse from './components/collapse';
import LoadingBar from './components/loading-bar';
import Modal from './components/modal';
import Tooltip from './components/tooltip';
import Poptip from './components/poptip';
import { Select, Option, OptionGroup } from './components/select';
import Message from './components/message';
import Notice from './components/notice';
import TimePicker from './components/time-picker';
import DatePicker from './components/date-picker';
import Tree from './components/tree';
import Table from './components/table';
import Spin from './components/spin';
const components = {
    Affix,
    Layout: Layout,
    Button,
    ButtonGroup: Button.Group,
    Content,
    Sider: Sider,
    Menu,
    MenuGroup: Menu.Group,
    MenuItem: Menu.Item,
    Header: Header,
    Footer: Footer,
    Icon,
    Submenu: Menu.Sub,
    Option: Option,
    OptionGroup,
    Panel: Collapse.Panel,
    Select,
    Input,
    Radio,
    Badge,
    RadioGroup: Radio.Group,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    Cell,
    Card,
    Collapse,
    InputNumber,
    // Switch,
    Tabs: Tabs,
    TabPane: Tabs.Pane,
    CellGroup: Cell.Group,
    Modal,
    Dropdown,
    DropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    Poptip,
    Tooltip,
    DatePicker,
    TimePicker,
    Tree,
    Table,
    Spin
};

const iview = {
    ...components,
    iButton: Button,
    // iCircle: Circle,
    // iCol: Col,
    iContent: Content,
    // iForm: Form,
    iFooter: Footer,
    iHeader: Header,
    iInput: Input,
    iMenu: Menu,
    iOption: Option,
    // iProgress: Progress,
    iSelect: Select,
    iSwitch: Switch,
    iTable: Table
    // iTime: Time
};

const install = function(Vue, opts = {}) {
    if (install.installed) return;
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });

    Vue.prototype.$IVIEW = {
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : ''
    };

    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    // Vue.prototype.$Spin = Spin;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    i18n: locale.i18n,
    install,
    // Circle,
    // Switch,
    ...components
};

API.lang = code => {
    const langObject = window['iview/locale'].default;
    if (code === langObject.i.locale) locale.use(langObject);
    else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
};

module.exports.default = module.exports = API; // eslint-disable-line no-undef
