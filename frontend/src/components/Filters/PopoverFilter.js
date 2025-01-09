import React from "react";
import PropTypes from "prop-types";
import { Badge, Button, Popover } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  box-shadow: unset;
  border-radius: 8px;
  padding: 8px 12px;
  text-align: start;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  justify-content: center;
  height: 40px;
  align-items: center;
  display: flex;
  &:hover {
    border: 1px solid #333333 !important;
    color: #333 !important;
  }
  .arrow-down {
    margin-left: 8px;
  }
`;

function PopoverFilter({
  content,
  count,
  heading,
  showIcon,
  onOpenChange,
  filterPopoverButtonStyle,
  ...restProps
}) {
  return (
    <Popover
      destroyTooltipOnHide={!(count > 0)}
      placement="bottomLeft"
      trigger="click"
      overlayClassName="popoverStyled"
      content={content}
      autoAdjustOverflow
      onOpenChange={onOpenChange}
      {...restProps}
    >
      <StyledButton className="popoverFilterButton">
        <span style={filterPopoverButtonStyle}>{heading}</span>
        {showIcon && (
          <span className="material-symbols-rounded arrow-down">
            keyboard_arrow_down
          </span>
        )}
        {count > 0 && (
          <Badge
            count={`0${count}`}
            style={{
              backgroundColor: "#DFDFDF",
              color: "#333333",
              borderRadius: "8px",
              marginLeft: "1px",
            }}
          />
        )}
      </StyledButton>
    </Popover>
  );
}

export default PopoverFilter;

PopoverFilter.propTypes = {
  count: PropTypes.number,
  heading: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  showIcon: PropTypes.bool,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  filterPopoverButtonStyle: PropTypes.shape(),
};

PopoverFilter.defaultProps = {
  count: 0,
  showIcon: true,
  open: false,
  onOpenChange: () => {},
  filterPopoverButtonStyle: {},
};
