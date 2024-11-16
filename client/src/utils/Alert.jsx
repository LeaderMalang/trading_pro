import React from "react";
import { Button, notification, Space } from "antd";

const NotificationButton = ({ alertType, alertLabel, handleClick }) => (
  <Button onClick={() => handleClick(alertType)}>{alertLabel}</Button>
);

const Alert = ({ type, label }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    let config;

    switch (type) {
      case "success":
        config = {
          message: "Success Notification",
          description: "This is a success notification.",
        };
        api.success(config);
        break;
      case "info":
        config = {
          message: "Information Notification",
          description: "This is an information notification.",
        };
        api.info(config);
        break;
      case "warning":
        config = {
          message: "Warning Notification",
          description: "This is a warning notification.",
        };
        api.warning(config);
        break;
      case "error":
        config = {
          message: "Error Notification",
          description: "This is an error notification.",
        };
        api.error(config);
        break;
      default:
        // Handle invalid notification type
        console.log("Invalid notification type");
    }
  };

  const handleClick = (notificationType) => {
    openNotificationWithIcon(notificationType);
  };

  const buttonConfigs = [
    { type: "success", label: "Success" },
    { type: "info", label: "Info" },
    { type: "warning", label: "Warning" },
    { type: "error", label: "Error" },
  ];

  return (
    <>
      {contextHolder}
      <Space>
        {type ? (
          <NotificationButton
            key={type}
            alertType={type}
            alertLabel={label}
            handleClick={handleClick}
          />
        ) : (
          ""
        )}
      </Space>
    </>
  );
};

export default Alert;
