---
nav: Components
group: Layout
title: Page
---

Page container, include Breadcrumb, Header, Content and Footer.

## Usage

```jsx | pure
import { StarOutlined } from '@ant-design/icons';
import { Button, Input, Page, Space } from '@yuntijs/ui';
import { Link } from 'react-router';

const { Breadcrumb, Header, Content } = Page;

const IndexPage = () => {
  return (
    <Page>
      <Breadcrumb
        Link={Link}
        items={[{ title: '插件列表', path: '/plugins' }, { title: '插件详情' }]}
      />
      <Header
        descriptions={[
          {
            icon: {
              content: <UserOutlined />,
              tooltip: '创建者',
            },
            text: '张萝卜',
          },
        ]}
        extraContent={{
          items: [
            {
              key: 'delete',
              label: '删除',
              danger: true,
            },
          ],
          onClick: (key, e) => console.log('key', key, e),
        }}
        icon={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
        status={{
          status: 'processing',
          text: '运行中',
        }}
        title="我是一个插件"
        titleRender={title => (
          <Space>
            {title} <StarOutlined />
          </Space>
        )}
      />
      <Content>
        <Space size={12}>
          <Button icon={<PlusOutlined />} type="primary">
            创建
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
          <Input.Search placeholder="请输入关键字搜索" />
        </Space>
        {/* ... */}
      </Content>
    </Page>
  );
};
export default IndexPage;
```

### Simple usage

<code src="./demos/index.tsx"></code>

### Loading sample

<code src="./demos/Loading.tsx"></code>

## API

待补充

<!-- <API id="Page"></API> -->