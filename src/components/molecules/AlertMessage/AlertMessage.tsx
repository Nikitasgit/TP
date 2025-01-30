import Text from "@atoms/Text/Text";
import { CiCircleAlert } from "react-icons/ci";
import "./AlertMessage.scss";
import { IAlertMessageProps } from "./AlertMessage.props";
const AlertMessage: React.FC<IAlertMessageProps> = ({
  message,
  isErrorMessage,
}) => {
  return (
    <div className={`alert-message ${isErrorMessage ? "error" : ""}`}>
      <Text text={message} />
      <CiCircleAlert className={"alert_icon"} />
    </div>
  );
};

export default AlertMessage;
