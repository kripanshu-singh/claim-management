import React, { useState } from "react";
import { DotChartOutlined } from "@ant-design/icons";
import { Flex, Divider, Form, Radio, Skeleton, Space, Switch } from "antd";
import styled from "styled-components";
const TableSkeleton = () => {
  const active = true;
  const [block, setBlock] = useState(false);
  const size = "large";
  const [buttonShape, setButtonShape] = useState("default");
  const [avatarShape, setAvatarShape] = useState("circle");
  const handleActiveChange = (checked) => {
    // setActive(checked);
  };
  const handleBlockChange = (checked) => {
    setBlock(checked);
  };
  const handleSizeChange = (e) => {
    // setSize(e.target.value);
  };
  const handleShapeButton = (e) => {
    setButtonShape(e.target.value);
  };
  const handleAvatarShape = (e) => {
    setAvatarShape(e.target.value);
  };

  const StyledContainer = styled.div`
    // display: flex;
    padding: 10px;
    justify-content: flex-end;
    gap: 80px;
    align-items: stretch; /* Correct spelling for stretch */
    height: 100%; /* Ensures container takes full available height */
  `;
  const VerticalSpace = styled.div`
    display: flex;
    flex-direction: column; /* Arrange items vertically */
    gap: 16px; /* Add spacing between items (adjust as needed) */
    flex: 1; /* Take up remaining vertical space */
  `;
  return (
    <StyledContainer className="">
      <Flex gap="middle" vertical>
        <Space
          style={{
            height: "40dvh",
            justifyContent: "space-between",
            // width: "25rem",
          }}
        >
          <VerticalSpace style={{ width: "25rem" }}>
            <Skeleton.Button
              active={active}
              size={size}
              shape={buttonShape}
              block={block}
              style={{ width: "15rem" }}
            />
            <Skeleton.Input
              active={active}
              size={size}
              style={{ width: "25rem" }}
            />
          </VerticalSpace>
          {/* <Skeleton.Image
            active={active}
            style={{ height: "40dvh", width: "400px" }}
          /> */}
          <Skeleton.Node
            active={active}
            style={{
              height: "40dvh",
              width: "300px",
            }}
          />
          <Skeleton.Node
            active={active}
            style={{ height: "40dvh", width: "500px" }}
          >
            <DotChartOutlined
              style={{
                fontSize: 40,
                color: "#bfbfbf",
              }}
            />
          </Skeleton.Node>
        </Space>
        <Skeleton.Button
          active={active}
          size={size}
          shape={buttonShape}
          block={true}
        />
        <Skeleton.Input active={active} size={size} block={true} />
        <Space>
          <Skeleton.Button
            active={active}
            size={size}
            shape={buttonShape}
            block={block}
          />
          <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
          <Skeleton.Input active={active} size={size} />
        </Space>

        <Divider />

        {/* <Form
          layout="inline"
          style={{
            margin: "16px 0",
          }}
        >
          <Space size={16} wrap>
            <Form.Item label="Active">
              <Switch checked={active} onChange={handleActiveChange} />
            </Form.Item>
            <Form.Item label="Button and Input Block">
              <Switch checked={block} onChange={handleBlockChange} />
            </Form.Item>
            <Form.Item label="Size">
              <Radio.Group value={size} onChange={handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Button Shape">
              <Radio.Group value={buttonShape} onChange={handleShapeButton}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="square">Square</Radio.Button>
                <Radio.Button value="round">Round</Radio.Button>
                <Radio.Button value="circle">Circle</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Avatar Shape">
              <Radio.Group value={avatarShape} onChange={handleAvatarShape}>
                <Radio.Button value="square">Square</Radio.Button>
                <Radio.Button value="circle">Circle</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Form> */}
      </Flex>
    </StyledContainer>
  );
};
export default TableSkeleton;
